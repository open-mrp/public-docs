import fs from 'fs';
import path from 'path';

const SPEC_PATH = path.join(process.cwd(), 'specs/public_openapi_spec.json');
const ARCHIVED_SPECS_DIR = path.join(process.cwd(), 'specs/versions');
const VERSIONS_MANIFEST_PATH = path.join(process.cwd(), 'api-versions.json');
const API_VERSION_PATH = path.join(process.cwd(), 'src/static/apiVersion.generated.ts');
const API_VERSIONS_OUTPUT_PATH = path.join(process.cwd(), 'src/static/apiVersions.generated.ts');
const API_NAV_OUTPUT_PATH = path.join(process.cwd(), 'src/static/apiNav.generated.ts');
const VERSION_REGISTRY_OUTPUT_PATH = path.join(
    process.cwd(),
    'src/static/apiVersionData.generated.ts',
);
const ENDPOINTS_OUTPUT_PATH = path.join(process.cwd(), 'src/static/apiEndpoints.generated.ts');
const VERSIONED_OUTPUT_DIR = path.join(process.cwd(), 'src/static/api-versions');
const LEGACY_API_REFERENCE_DIR = path.join(process.cwd(), 'src/docs/developer-resources/api-reference');
const LEGACY_API_REFERENCE_OVERVIEW = path.join(process.cwd(), 'src/docs/developer-resources/api-reference.mdx');

// ─── OpenAPI Types ───────────────────────────────────────────────

interface OpenAPITag {
    name: string;
    description?: string;
}

interface OpenAPIParameter {
    name: string;
    in: 'query' | 'path' | 'header';
    description?: string;
    required?: boolean;
    schema?: OpenAPISchema;
    example?: unknown;
}

interface OpenAPISchema {
    type?: string;
    description?: string;
    nullable?: boolean;
    default?: unknown;
    'x-expandable'?: boolean;
    // Some specs encode `nullable: true` by including `null` inside the enum array.
    // We sanitize these at generation time so the output stays strictly `string[]`.
    enum?: Array<string | null>;
    const?: string;
    format?: string;
    items?: OpenAPISchema;
    properties?: Record<string, OpenAPISchema>;
    required?: string[];
    $ref?: string;
    allOf?: OpenAPISchema[];
    oneOf?: OpenAPISchema[];
    anyOf?: OpenAPISchema[];
    example?: unknown;
}

interface OpenAPIRequestBody {
    description?: string;
    content?: {
        'application/json'?: {
            schema?: OpenAPISchema;
            example?: unknown;
        };
    };
}

interface OpenAPIResponse {
    description?: string;
    content?: {
        'application/json'?: {
            schema?: OpenAPISchema;
            example?: unknown;
        };
    };
}

interface OpenAPIOperation {
    summary?: string;
    description?: string;
    operationId?: string;
    tags?: string[];
    parameters?: OpenAPIParameter[];
    requestBody?: OpenAPIRequestBody;
    responses?: Record<string, OpenAPIResponse>;
    'x-preview'?: boolean;
}

interface OpenAPISpec {
    info: {
        title: string;
        description?: string;
        version: string;
    };
    tags?: OpenAPITag[];
    paths: Record<string, Record<string, OpenAPIOperation | OpenAPIParameter[]>>;
    components?: {
        schemas?: Record<string, OpenAPISchema>;
    };
}

// ─── Output Types ────────────────────────────────────────────────

interface SchemaField {
    name: string;
    type: string;
    description: string;
    required: boolean;
    nullable: boolean;
    alwaysNull?: boolean;
    expandable?: boolean;
    enum?: string[];
    format?: string;
    properties?: SchemaField[];
    itemType?: string;
    objectType?: string;
}

interface Parameter {
    name: string;
    in: 'query' | 'path' | 'header';
    type: string;
    required: boolean;
    description: string;
    enum?: string[];
    format?: string;
}

interface EndpointResponse {
    statusCode: string;
    description: string;
    fields?: SchemaField[];
    example?: unknown;
}

interface EndpointRequestBody {
    description: string;
    fields: SchemaField[];
    example?: unknown;
}

interface EndpointData {
    operationId: string;
    summary: string;
    description: string;
    method: string;
    path: string;
    domain: string;
    tag: string;
    tagSlug: string;
    endpointSlug: string;
    actionType: string;
    isPreview: boolean;
    parameters: Parameter[];
    requestBody?: EndpointRequestBody;
    responses: EndpointResponse[];
}

interface ResourceData {
    name: string;
    description: string;
    fields: SchemaField[];
    example?: unknown;
    /** Discriminator (`object` value) of the resource, e.g. `customer`. */
    object?: string;
}

interface ObjectUsage {
    tag: string;
    tagSlug: string;
    endpointSlug: string;
    method: string;
    actionType: string;
    summary: string;
}

interface ObjectData {
    name: string;
    /** Discriminator (`object` value), e.g. `sales_order`. */
    object: string;
    /** URL slug, the discriminator with `_` replaced by `-`, e.g. `sales-order`. */
    slug: string;
    domain: string;
    domainLabel: string;
    description: string;
    fields: SchemaField[];
    example?: unknown;
    /** Endpoints whose request/response include this object. */
    usedBy: ObjectUsage[];
}

interface TagData {
    name: string;
    slug: string;
    description: string;
    domain: string;
    domainLabel: string;
    resource?: ResourceData;
    endpoints: EndpointData[];
}

interface ApiNavEndpoint {
    name: string;
    slug: string;
    method: string;
    actionType: string;
    href: string;
}

interface ApiNavResource {
    name: string;
    slug: string;
    endpoints: ApiNavEndpoint[];
}

interface ApiNavDomain {
    name: string;
    slug: string;
    resources: ApiNavResource[];
}

interface SchemaExpansionOptions {
    includePaths?: Set<string>;
    pathPrefix?: string;
    insideIncludedExpandable?: boolean;
    /**
     * Top-level response field name that wraps the resource schema (e.g.
     * `data` for list responses, `api_key_info` for the rotate/create API
     * key responses). When set, this prefix is stripped from a field's path
     * before matching it against `includePaths`, since `include[]` enum
     * values are resource-relative (e.g. `role`, `role.permissions`) rather
     * than rooted at the response.
     */
    resourceRoot?: string;
    /**
     * True when expanding a request body schema. In a request body a nullable
     * field is a clearable PATCH field (sending null clears it), so we append a
     * "send null to clear" hint and keep null in request examples. Response
     * fields can also be nullable ("value or null") but carry no such meaning.
     */
    isRequestBody?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────

function tagToSlug(tag: string): string {
    return tag.toLowerCase().replace(/\s+/g, '-');
}

function summaryToSlug(summary: string): string {
    return summary.toLowerCase().replace(/\s+/g, '-');
}

function extractDomain(apiPath: string): string {
    const parts = apiPath.split('/');
    return parts.length >= 3 ? parts[2] : 'other';
}

function formatDefaultForDescription(defaultValue: unknown): string {
    if (typeof defaultValue === 'string') {
        return `\`${defaultValue.replaceAll('`', '\\`')}\``;
    }
    if (defaultValue === null) return '`null`';
    if (typeof defaultValue === 'number' || typeof defaultValue === 'boolean') {
        return `\`${String(defaultValue)}\``;
    }

    // For objects/arrays, stringify to keep the docs honest.
    let json = JSON.stringify(defaultValue);
    const maxLen = 120;
    if (json.length > maxLen) json = `${json.slice(0, maxLen - 3)}...`;
    return `\`${json.replaceAll('`', '\\`')}\``;
}

function appendNullClearHint(description: string): string {
    const base = description.trim();
    const hint = 'Send `null` to clear.';
    if (base.includes('null to clear')) return base;
    if (!base) return hint;
    if (/[.!?]$/.test(base)) return `${base} ${hint}`;
    return `${base}. ${hint}`;
}

function appendSentenceToParagraph(paragraph: string, sentence: string): string {
    const base = paragraph.trim();
    if (!base) return sentence;
    if (/[.!?]$/.test(base)) return `${base} ${sentence}`;
    return `${base}. ${sentence}`;
}

function appendDefaultToDescription(description: string, defaultValue: unknown): string {
    if (defaultValue === undefined) return description;

    const base = description.trim();
    const defaultStr = formatDefaultForDescription(defaultValue);
    const sentence = `Defaults to ${defaultStr}.`;

    if (!base) return sentence;
    if (/Defaults to\b/i.test(base)) return base; // avoid double-appending if spec already includes this

    const paragraphBreak = base.indexOf('\n\n');
    if (paragraphBreak === -1) return appendSentenceToParagraph(base, sentence);

    const firstParagraph = base.slice(0, paragraphBreak);
    const rest = base.slice(paragraphBreak + 2);
    const firstWithDefault = appendSentenceToParagraph(firstParagraph, sentence);
    return rest ? `${firstWithDefault}\n\n${rest}` : firstWithDefault;
}

const domainLabels: Record<string, string> = {
    ai: 'AI',
    auth: 'Auth',
    core: 'Core',
};

function getDomainLabel(domain: string): string {
    return domainLabels[domain] || domain.charAt(0).toUpperCase() + domain.slice(1);
}

function getPathSegments(apiPath: string): string[] {
    return apiPath.split('/').filter(Boolean);
}

function isPathParameter(segment: string): boolean {
    return segment.startsWith('{') && segment.endsWith('}');
}

function isCustomActionPath(apiPath: string): boolean {
    return getPathSegments(apiPath).includes('actions');
}

function classifyCrudFromMethod(method: string, apiPath: string): string | undefined {
    const segments = getPathSegments(apiPath);
    const lastSegment = segments.at(-1);
    const identifiedResource = lastSegment ? isPathParameter(lastSegment) : false;

    if (method === 'get') return identifiedResource ? 'retrieve' : 'list';
    if (method === 'post' && !identifiedResource) return 'create';
    if ((method === 'put' || method === 'patch') && identifiedResource) return 'update';
    if (method === 'delete' && identifiedResource) return 'delete';

    return undefined;
}

function classifyAction(method: string, apiPath: string): string {
    const m = method.toLowerCase();

    if (!isCustomActionPath(apiPath)) {
        const inferredCrud = classifyCrudFromMethod(m, apiPath);
        if (inferredCrud) return inferredCrud;
    }

    return 'action';
}

function resolveRef(ref: string, spec: OpenAPISpec): OpenAPISchema | undefined {
    const parts = ref.replace('#/', '').split('/');
    let current: unknown = spec;
    for (const part of parts) {
        if (current && typeof current === 'object' && part in (current as Record<string, unknown>)) {
            current = (current as Record<string, unknown>)[part];
        } else {
            return undefined;
        }
    }
    return current as OpenAPISchema;
}

function resolveSchema(schema: OpenAPISchema, spec: OpenAPISpec, depth = 0): OpenAPISchema {
    if (depth > 10) return schema; // Prevent infinite recursion
    if (schema.$ref) {
        const resolved = resolveRef(schema.$ref, spec);
        // Preserve inline extensions like `x-expandable` that may be defined on
        // the wrapper schema alongside `$ref`.
        return resolved
            ? resolveSchema({ ...resolved, ...schema, $ref: undefined }, spec, depth + 1)
            : schema;
    }
    if (schema.allOf) {
        // Preserve inline extensions like `x-expandable` and `description` that
        // may be defined on the allOf wrapper schema.
        const merged: OpenAPISchema = { ...schema, type: 'object', properties: {}, required: [] };
        delete merged.allOf;
        for (const sub of schema.allOf) {
            const resolved = resolveSchema(sub, spec, depth + 1);
            if (resolved.properties) {
                merged.properties = { ...merged.properties, ...resolved.properties };
            }
            if (resolved.required) {
                merged.required = [...(merged.required || []), ...resolved.required];
            }
        }
        return merged;
    }
    return schema;
}

/**
 * Returns the Stripe-style `object` discriminator value of a schema (e.g.
 * `customer`), if it has a single-valued `object` property. Used to identify
 * which named API object a field's value represents so it can be linked.
 */
function objectDiscriminator(
    schema: OpenAPISchema | undefined,
    spec: OpenAPISpec,
): string | undefined {
    if (!schema) return undefined;
    const resolved = resolveSchema(schema, spec);
    const objProp = resolved.properties?.object;
    if (!objProp) return undefined;
    const resolvedObjProp = resolveSchema(objProp, spec);
    if (typeof resolvedObjProp.const === 'string') return resolvedObjProp.const;
    const values = (resolvedObjProp.enum ?? []).filter(
        (v): v is string => typeof v === 'string',
    );
    return values.length === 1 ? values[0] : undefined;
}

function schemaToFields(
    schema: OpenAPISchema,
    spec: OpenAPISpec,
    requiredFields?: string[],
    depth = 0,
    options: SchemaExpansionOptions = {},
): SchemaField[] {
    if (depth > 5) return []; // Prevent infinite recursion on self-referencing schemas
    const resolved = resolveSchema(schema, spec);
    const fields: SchemaField[] = [];
    const includePaths = options.includePaths;
    const isRequestBody = options.isRequestBody || false;
    const pathPrefix = options.pathPrefix || '';
    const insideIncludedExpandable = options.insideIncludedExpandable || false;
    const currentSchemaIsList =
        resolved.properties?.object?.enum?.some((value) => value === 'list') || false;

    // At the response root, detect a wrapper field that contains the
    // resource schema so that resource-relative include paths (e.g. `role`,
    // `role.permissions`) match the actual nested field paths.
    let resourceRoot = options.resourceRoot;
    if (
        depth === 0 &&
        includePaths &&
        includePaths.size > 0 &&
        resourceRoot === undefined &&
        resolved.properties
    ) {
        const topLevelIncludeNames = new Set(
            [...includePaths].map((path) => path.split('.')[0]),
        );
        // Only look for a resource root wrapper if none of the include path
        // prefixes are already direct properties of the response schema. When
        // include names like `base_unit` or `owner` are direct properties, the
        // paths already apply at the top level and no wrapper exists. Without
        // this guard an expandable field whose sub-schema happens to contain a
        // property named after another include (e.g. Unit.owner when `owner` is
        // also an include path) would be misidentified as the resource root,
        // causing its own nested fields to be dropped.
        const directPropNames = new Set(Object.keys(resolved.properties));
        const anyIncludeMatchesDirect = [...topLevelIncludeNames].some((n) =>
            directPropNames.has(n),
        );
        if (!anyIncludeMatchesDirect) {
            for (const [name, prop] of Object.entries(resolved.properties)) {
                const resolvedProp = resolveSchema(prop, spec);
                const childContainer =
                    resolvedProp.type === 'array' && resolvedProp.items
                        ? resolveSchema(resolvedProp.items, spec)
                        : resolvedProp;
                if (
                    childContainer.properties &&
                    Object.keys(childContainer.properties).some((c) => topLevelIncludeNames.has(c))
                ) {
                    resourceRoot = name;
                    break;
                }
            }
        }
    }

    if (resolved.properties) {
        const required = requiredFields || resolved.required || [];
        for (const [name, prop] of Object.entries(resolved.properties)) {
            const resolvedProp = resolveSchema(prop, spec);
            const resolvedItems =
                resolvedProp.type === 'array' && resolvedProp.items
                    ? resolveSchema(resolvedProp.items, spec)
                    : undefined;
            const descriptionWithDefault = appendDefaultToDescription(
                resolvedProp.description || '',
                resolvedProp.default,
            );
            // In a request body, a nullable field is clearable: sending null
            // clears the stored value. Responses can also be nullable, but there
            // null is just a possible value, so the hint only applies to requests.
            const descriptionWithNullClear = isRequestBody && resolvedProp.nullable === true
                ? appendNullClearHint(descriptionWithDefault)
                : descriptionWithDefault;
            const fieldPath = pathPrefix ? `${pathPrefix}.${name}` : name;
            // Path used for `includePaths` lookups. When the response wraps
            // the resource (e.g. inside `data` or `api_key_info`), strip that
            // prefix so the resource-relative include enum values match.
            const matchPath =
                resourceRoot && fieldPath.startsWith(`${resourceRoot}.`)
                    ? fieldPath.slice(resourceRoot.length + 1)
                    : resourceRoot && fieldPath === resourceRoot
                        ? ''
                        : fieldPath;
            const hasExplicitInclude =
                matchPath.length > 0 && (includePaths?.has(matchPath) || false);
            const hasExplicitDescendantInclude =
                matchPath.length > 0 &&
                [...(includePaths || [])].some((candidate) => candidate.startsWith(`${matchPath}.`));
            const isStructuredObject =
                (resolvedProp.type === 'object' && !!resolvedProp.properties) ||
                (resolvedProp.type === 'array' && (resolvedItems?.type || 'object') === 'object' && !!resolvedItems?.properties);
            const shouldMarkAlwaysNull =
                insideIncludedExpandable &&
                !currentSchemaIsList &&
                isStructuredObject &&
                !hasExplicitInclude &&
                !hasExplicitDescendantInclude;
            const field: SchemaField = {
                name,
                type: resolvedProp.type || 'object',
                description: descriptionWithNullClear,
                required: required.includes(name),
                nullable: resolvedProp.nullable || false,
                alwaysNull: shouldMarkAlwaysNull || undefined,
                expandable: resolvedProp['x-expandable'] === true,
            };

            const enumValues = resolvedProp.enum || resolvedItems?.enum;
            if (enumValues) {
                const sanitizedEnum = enumValues.filter((v): v is string => typeof v === 'string');
                if (sanitizedEnum.length > 0) field.enum = sanitizedEnum;
            }
            if (resolvedProp.format) field.format = resolvedProp.format;

            // Link object-valued fields (and arrays of objects) to their object
            // page. Resolved schemas keep the `object` discriminator even when the
            // field is expandable but not expanded, so ID-only references link too.
            const objectType = objectDiscriminator(
                resolvedProp.type === 'array' ? resolvedItems : resolvedProp,
                spec,
            );
            // The `object` field on a resource is its own discriminator string, not
            // a reference to another object; never self-link it.
            if (objectType && name !== 'object') field.objectType = objectType;

            let shouldExpandNestedFields = false;
            if (includePaths) {
                if (insideIncludedExpandable) {
                    if (currentSchemaIsList) {
                        shouldExpandNestedFields = true;
                    } else {
                        shouldExpandNestedFields = !shouldMarkAlwaysNull;
                    }
                } else if (field.expandable === true) {
                    shouldExpandNestedFields = hasExplicitInclude || hasExplicitDescendantInclude;
                } else {
                    shouldExpandNestedFields = true;
                }
            } else {
                shouldExpandNestedFields = true;
            }

            if (resolvedProp.type === 'array' && resolvedItems) {
                field.itemType = resolvedItems.type || 'object';
                if (resolvedItems.properties && shouldExpandNestedFields) {
                    field.properties = schemaToFields(resolvedItems, spec, undefined, depth + 1, {
                        includePaths,
                        pathPrefix: fieldPath,
                        resourceRoot,
                        isRequestBody,
                        insideIncludedExpandable:
                            insideIncludedExpandable || (field.expandable === true && hasExplicitInclude),
                    });
                }
            } else if (resolvedProp.type === 'object' && resolvedProp.properties && shouldExpandNestedFields) {
                field.properties = schemaToFields(resolvedProp, spec, undefined, depth + 1, {
                    includePaths,
                    pathPrefix: fieldPath,
                    resourceRoot,
                    isRequestBody,
                    insideIncludedExpandable:
                        insideIncludedExpandable || (field.expandable === true && hasExplicitInclude),
                });
            }

            fields.push(field);
        }
    }

    return fields;
}

function parametersToList(params: OpenAPIParameter[], spec: OpenAPISpec): Parameter[] {
    return params.map((p) => {
        const resolvedSchema = p.schema ? resolveSchema(p.schema, spec) : undefined;
        const resolvedItems =
            resolvedSchema?.type === 'array' && resolvedSchema.items
                ? resolveSchema(resolvedSchema.items, spec)
                : undefined;

        // Some enum-like query params are expressed as `type=array` with `items.enum`.
        // Surface those values at the parameter level so the UI can render them.
        const enumValues = resolvedSchema?.enum || resolvedItems?.enum;
        const sanitizedEnumValues = enumValues?.filter((v): v is string => typeof v === 'string');

        const defaultValue = resolvedSchema?.default ?? resolvedItems?.default;
        const descriptionWithDefault = appendDefaultToDescription(p.description || '', defaultValue);

        return {
            name: p.name,
            in: p.in,
            type: resolvedSchema?.type || p.schema?.type || 'string',
            required: p.required || false,
            description: descriptionWithDefault,
            ...(sanitizedEnumValues && sanitizedEnumValues.length > 0 ? { enum: sanitizedEnumValues } : {}),
            ...(resolvedSchema?.format && { format: resolvedSchema.format }),
        };
    });
}

function getIncludePaths(params: OpenAPIParameter[], spec: OpenAPISpec): Set<string> | undefined {
    const includeParam = params.find((p) => p.name === 'include[]' && p.in === 'query');
    const resolvedSchema = includeParam?.schema ? resolveSchema(includeParam.schema, spec) : undefined;
    const resolvedItems =
        resolvedSchema?.type === 'array' && resolvedSchema.items
            ? resolveSchema(resolvedSchema.items, spec)
            : undefined;
    const enumValues = (resolvedSchema?.enum || resolvedItems?.enum)?.filter(
        (value): value is string => typeof value === 'string',
    );

    return enumValues && enumValues.length > 0 ? new Set(enumValues) : undefined;
}

function pathSortWeight(p: string): number {
    const segments = p.split('/');
    let hasParam = false;
    let segmentsAfterParam = 0;
    for (const s of segments) {
        if (s.startsWith('{')) {
            hasParam = true;
            continue;
        }
        if (hasParam) segmentsAfterParam++;
    }
    if (!hasParam) return 0;
    if (segmentsAfterParam === 0) return 1;
    return 2;
}

function actionTypeToOrder(actionType: string): number {
    const order: Record<string, number> = {
        create: 0,
        update: 1,
        list: 2,
        retrieve: 3,
        delete: 4,
        action: 5,
    };
    return order[actionType] ?? 6;
}

// Get the primary resource schema for a tag by looking at GET single-resource responses
function findResourceSchema(
    tagName: string,
    endpoints: { path: string; method: string; operation: OpenAPIOperation }[],
    spec: OpenAPISpec,
): ResourceData | undefined {
    // Try to find a GET single-resource endpoint (has {id} in path)
    const getEndpoint = endpoints.find(
        (e) => e.method === 'get' && e.path.includes('{id}') && !e.path.includes('/actions/'),
    );

    if (!getEndpoint?.operation.responses) return undefined;

    const successResponse =
        getEndpoint.operation.responses['200'] || getEndpoint.operation.responses['201'];
    if (!successResponse?.content?.['application/json']?.schema) return undefined;

    const schema = resolveSchema(successResponse.content['application/json'].schema, spec);
    const includePaths = getIncludePaths(getEndpointParameters(getEndpoint.path, getEndpoint.operation, spec), spec);
    const fields = schemaToFields(schema, spec, undefined, 0, { includePaths });

    // A GET single-resource response is the object itself, so its discriminator
    // is on the response root. If it's wrapped (e.g. inside `data`), fall back to
    // the first direct property that carries a discriminator.
    let object = objectDiscriminator(schema, spec);
    if (!object && schema.properties) {
        for (const prop of Object.values(schema.properties)) {
            const found = objectDiscriminator(prop, spec);
            if (found) {
                object = found;
                break;
            }
        }
    }

    return {
        name: tagName,
        description: schema.description || '',
        fields,
        example: successResponse.content['application/json'].example || schema.example,
        ...(object ? { object } : {}),
    };
}

function getEndpointParameters(
    apiPath: string,
    operation: OpenAPIOperation,
    spec: OpenAPISpec,
): OpenAPIParameter[] {
    const pathItem = spec.paths[apiPath] as Record<string, unknown>;
    const pathParams = pathItem.parameters as OpenAPIParameter[] | undefined;
    return [...(pathParams || []), ...(operation.parameters || [])];
}

// Derive a short action name from the full summary
// e.g., "List Account Groups" -> "List", "Create Account Group" -> "Create"
function deriveActionName(summary: string, tagName: string): string {
    // Remove the tag name words from the summary to get the action
    const tagWords = tagName.toLowerCase().split(/\s+/);
    const summaryWords = summary.split(/\s+/);

    // Find the action words (words that aren't part of the tag name)
    const actionWords: string[] = [];
    for (const word of summaryWords) {
        if (!tagWords.includes(word.toLowerCase())) {
            actionWords.push(word);
        }
    }

    return actionWords.length > 0 ? actionWords.join(' ') : summary;
}

// ─── Main Generation ─────────────────────────────────────────────

function generateEndpointData(
    spec: OpenAPISpec,
    basePath: string,
): { tags: TagData[]; nav: ApiNavDomain[]; objects: ObjectData[] } {
    const { tags: specTags = [], paths } = spec;

    // Group operations by tag
    const tagOps = new Map<
        string,
        { path: string; method: string; operation: OpenAPIOperation }[]
    >();
    for (const tag of specTags) {
        tagOps.set(tag.name, []);
    }

    for (const [apiPath, methods] of Object.entries(paths)) {
        for (const [method, operation] of Object.entries(methods)) {
            if (method === 'parameters') continue;
            const op = operation as OpenAPIOperation;
            const opTags = op.tags || ['Other'];
            for (const tag of opTags) {
                if (!tagOps.has(tag)) tagOps.set(tag, []);
                tagOps.get(tag)!.push({ path: apiPath, method, operation: op });
            }
        }
    }

    // Sort endpoints within each tag: List, Retrieve, Create, Update, Delete, Actions, Subresources
    for (const ops of tagOps.values()) {
        ops.sort((a, b) => {
            // Subresource endpoints (pathSortWeight >= 2) always sort after primary endpoints
            const aSub = pathSortWeight(a.path) >= 2 ? 1 : 0;
            const bSub = pathSortWeight(b.path) >= 2 ? 1 : 0;
            if (aSub !== bSub) return aSub - bSub;
            // Within the same group, sort by action type
            const aAction = classifyAction(a.method, a.path);
            const bAction = classifyAction(b.method, b.path);
            const at = actionTypeToOrder(aAction) - actionTypeToOrder(bAction);
            if (at !== 0) return at;
            return a.path.localeCompare(b.path);
        });
    }

    // Build tag data
    const tagDataList: TagData[] = [];
    const domainMap = new Map<string, ApiNavResource[]>();

    for (const specTag of specTags) {
        const ops = tagOps.get(specTag.name) || [];
        if (ops.length === 0) continue;

        const tagSlug = tagToSlug(specTag.name);
        const domain = extractDomain(ops[0].path);
        const resource = findResourceSchema(specTag.name, ops, spec);

        const endpoints: EndpointData[] = ops.map((op) => {
            const summary = op.operation.summary || `${op.method.toUpperCase()} ${op.path}`;
            const endpointSlug = summaryToSlug(summary);
            const actionType = classifyAction(op.method, op.path);

            // Merge path-level and operation-level parameters
            const allParams = getEndpointParameters(op.path, op.operation, spec);
            const includePaths = getIncludePaths(allParams, spec);

            // Parse request body
            let requestBody: EndpointRequestBody | undefined;
            if (op.operation.requestBody?.content?.['application/json']) {
                const body = op.operation.requestBody.content['application/json'];
                const bodySchema = body.schema ? resolveSchema(body.schema, spec) : undefined;
                requestBody = {
                    description: op.operation.requestBody.description || '',
                    fields: bodySchema
                        ? schemaToFields(bodySchema, spec, undefined, 0, { includePaths, isRequestBody: true })
                        : [],
                    example: body.example || bodySchema?.example,
                };
            }

            // Parse responses
            const responses: EndpointResponse[] = [];
            if (op.operation.responses) {
                for (const [code, resp] of Object.entries(op.operation.responses)) {
                    if (code === '4XX' || code === '5XX') continue; // Skip error responses
                    const respContent = resp.content?.['application/json'];
                    const respSchema = respContent?.schema
                        ? resolveSchema(respContent.schema, spec)
                        : undefined;
                    responses.push({
                        statusCode: code,
                        description: resp.description || '',
                        fields: respSchema
                            ? schemaToFields(respSchema, spec, undefined, 0, { includePaths })
                            : undefined,
                        example: respContent?.example || respSchema?.example,
                    });
                }
            }

            return {
                operationId: op.operation.operationId || endpointSlug,
                summary,
                description: op.operation.description || '',
                method: op.method.toUpperCase(),
                path: op.path,
                domain,
                tag: specTag.name,
                tagSlug,
                endpointSlug,
                actionType,
                isPreview: op.operation['x-preview'] === true,
                parameters: parametersToList(allParams, spec),
                requestBody,
                responses,
            };
        });

        tagDataList.push({
            name: specTag.name,
            slug: tagSlug,
            description: specTag.description || '',
            domain,
            domainLabel: getDomainLabel(domain),
            resource,
            endpoints,
        });

        // Build nav structure
        if (!domainMap.has(domain)) domainMap.set(domain, []);
        domainMap.get(domain)!.push({
            name: specTag.name,
            slug: tagSlug,
            endpoints: endpoints.map((e) => ({
                name: deriveActionName(e.summary, specTag.name),
                slug: e.endpointSlug,
                method: e.method,
                actionType: e.actionType,
                href: `${basePath}/${tagSlug}/${e.endpointSlug}`,
            })),
        });
    }

    // Build nav domains
    const domainOrder = ['ai', 'auth', 'core'];
    const nav: ApiNavDomain[] = domainOrder
        .filter((d) => domainMap.has(d))
        .map((d) => ({
            name: getDomainLabel(d),
            slug: d,
            resources: domainMap.get(d)!,
        }));

    // Add any remaining domains
    for (const [d, resources] of domainMap) {
        if (!domainOrder.includes(d)) {
            nav.push({ name: getDomainLabel(d), slug: d, resources });
        }
    }

    // Build object catalog: one page per top-level resource that has a
    // discriminator. The first tag declaring a given discriminator wins.
    const objects: ObjectData[] = [];
    const objectByDiscriminator = new Map<string, { obj: ObjectData; tag: TagData }>();
    for (const tag of tagDataList) {
        const resource = tag.resource;
        if (!resource?.object || objectByDiscriminator.has(resource.object)) continue;
        const obj: ObjectData = {
            name: tag.name,
            object: resource.object,
            slug: resource.object.replace(/_/g, '-'),
            domain: tag.domain,
            domainLabel: tag.domainLabel,
            description: resource.description,
            fields: resource.fields,
            example: resource.example,
            usedBy: [],
        };
        objects.push(obj);
        objectByDiscriminator.set(resource.object, { obj, tag });
    }

    // Build the "used by" reverse index: every endpoint whose request/response
    // schemas reference an object, plus the owning tag's own endpoints.
    const seenUsage = new Map<ObjectData, Set<string>>();
    const addUsage = (obj: ObjectData, usingTag: TagData, ep: EndpointData) => {
        let seen = seenUsage.get(obj);
        if (!seen) {
            seen = new Set();
            seenUsage.set(obj, seen);
        }
        const key = `${ep.tagSlug}/${ep.endpointSlug}`;
        if (seen.has(key)) return;
        seen.add(key);
        obj.usedBy.push({
            tag: usingTag.name,
            tagSlug: ep.tagSlug,
            endpointSlug: ep.endpointSlug,
            method: ep.method,
            actionType: ep.actionType,
            summary: ep.summary,
        });
    };
    const collectObjectTypes = (fields: SchemaField[] | undefined, into: Set<string>) => {
        if (!fields) return;
        for (const f of fields) {
            if (f.objectType) into.add(f.objectType);
            collectObjectTypes(f.properties, into);
        }
    };
    for (const tag of tagDataList) {
        const owned = tag.resource?.object
            ? objectByDiscriminator.get(tag.resource.object)
            : undefined;
        for (const ep of tag.endpoints) {
            if (owned && owned.tag === tag) addUsage(owned.obj, tag, ep);
            const refs = new Set<string>();
            if (ep.requestBody) collectObjectTypes(ep.requestBody.fields, refs);
            for (const r of ep.responses) collectObjectTypes(r.fields, refs);
            for (const d of refs) {
                const entry = objectByDiscriminator.get(d);
                if (entry) addUsage(entry.obj, tag, ep);
            }
        }
    }

    objects.sort((a, b) => a.name.localeCompare(b.name));

    return { tags: tagDataList, nav, objects };
}

function generateEndpointsFile(
    tags: TagData[],
    nav: ApiNavDomain[],
    objects: ObjectData[],
): string {
    return `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.

export interface SchemaField {
    name: string;
    type: string;
    description: string;
    required: boolean;
    nullable: boolean;
    alwaysNull?: boolean;
    expandable?: boolean;
    enum?: string[];
    format?: string;
    properties?: SchemaField[];
    itemType?: string;
    /** Discriminator of the API object this field holds, e.g. \`customer\`. */
    objectType?: string;
}

export interface Parameter {
    name: string;
    in: 'query' | 'path' | 'header';
    type: string;
    required: boolean;
    description: string;
    enum?: string[];
    format?: string;
}

export interface EndpointResponse {
    statusCode: string;
    description: string;
    fields?: SchemaField[];
    example?: unknown;
}

export interface EndpointRequestBody {
    description: string;
    fields: SchemaField[];
    example?: unknown;
}

export interface EndpointData {
    operationId: string;
    summary: string;
    description: string;
    method: string;
    path: string;
    domain: string;
    tag: string;
    tagSlug: string;
    endpointSlug: string;
    actionType: string;
    isPreview: boolean;
    parameters: Parameter[];
    requestBody?: EndpointRequestBody;
    responses: EndpointResponse[];
}

export interface ResourceData {
    name: string;
    description: string;
    fields: SchemaField[];
    example?: unknown;
    object?: string;
}

export interface ObjectUsage {
    tag: string;
    tagSlug: string;
    endpointSlug: string;
    method: string;
    actionType: string;
    summary: string;
}

export interface ObjectData {
    name: string;
    object: string;
    slug: string;
    domain: string;
    domainLabel: string;
    description: string;
    fields: SchemaField[];
    example?: unknown;
    usedBy: ObjectUsage[];
}

export interface TagData {
    name: string;
    slug: string;
    description: string;
    domain: string;
    domainLabel: string;
    resource?: ResourceData;
    endpoints: EndpointData[];
}

export interface ApiNavEndpoint {
    name: string;
    slug: string;
    method: string;
    actionType: string;
    href: string;
}

export interface ApiNavResource {
    name: string;
    slug: string;
    endpoints: ApiNavEndpoint[];
}

export interface ApiNavDomain {
    name: string;
    slug: string;
    resources: ApiNavResource[];
}

export const apiTags: TagData[] = ${JSON.stringify(tags, null, 4)};

export const apiNavDomains: ApiNavDomain[] = ${JSON.stringify(nav, null, 4)};

export const apiObjects: ObjectData[] = ${JSON.stringify(objects, null, 4)};

/** Look up a tag by its slug */
export function getTagBySlug(slug: string): TagData | undefined {
    return apiTags.find(t => t.slug === slug);
}

/** Look up an endpoint by tag slug and endpoint slug */
export function getEndpoint(tagSlug: string, endpointSlug: string): EndpointData | undefined {
    const tag = getTagBySlug(tagSlug);
    return tag?.endpoints.find(e => e.endpointSlug === endpointSlug);
}

/** Look up an endpoint's resource by tag slug */
export function getResource(tagSlug: string): ResourceData | undefined {
    return getTagBySlug(tagSlug)?.resource;
}

/** Look up an object by its slug */
export function getObject(slug: string): ObjectData | undefined {
    return apiObjects.find(o => o.slug === slug);
}

/** Get all object routes for static generation */
export function getAllObjectSlugs(): string[] {
    return apiObjects.map(o => o.slug);
}

/** Get all endpoint routes for static generation */
export function getAllEndpointSlugs(): { tagSlug: string; endpointSlug: string }[] {
    const slugs: { tagSlug: string; endpointSlug: string }[] = [];
    for (const tag of apiTags) {
        for (const endpoint of tag.endpoints) {
            slugs.push({ tagSlug: tag.slug, endpointSlug: endpoint.endpointSlug });
        }
    }
    return slugs;
}
`;
}

/**
 * Per-version endpoint data module, emitted under src/static/api-versions/<version>/.
 * Identical value exports to apiEndpoints.generated.ts; types are imported from
 * the latest module so the version registry can treat all versions uniformly.
 */
function generateVersionedEndpointsFile(
    tags: TagData[],
    nav: ApiNavDomain[],
    objects: ObjectData[],
): string {
    return `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.

import type {
    ApiNavDomain,
    EndpointData,
    ObjectData,
    ResourceData,
    TagData,
} from '@/static/apiEndpoints.generated';

export const apiTags: TagData[] = ${JSON.stringify(tags, null, 4)};

export const apiNavDomains: ApiNavDomain[] = ${JSON.stringify(nav, null, 4)};

export const apiObjects: ObjectData[] = ${JSON.stringify(objects, null, 4)};

/** Look up a tag by its slug */
export function getTagBySlug(slug: string): TagData | undefined {
    return apiTags.find(t => t.slug === slug);
}

/** Look up an endpoint by tag slug and endpoint slug */
export function getEndpoint(tagSlug: string, endpointSlug: string): EndpointData | undefined {
    const tag = getTagBySlug(tagSlug);
    return tag?.endpoints.find(e => e.endpointSlug === endpointSlug);
}

/** Look up an endpoint's resource by tag slug */
export function getResource(tagSlug: string): ResourceData | undefined {
    return getTagBySlug(tagSlug)?.resource;
}

/** Look up an object by its slug */
export function getObject(slug: string): ObjectData | undefined {
    return apiObjects.find(o => o.slug === slug);
}

/** Get all object routes for static generation */
export function getAllObjectSlugs(): string[] {
    return apiObjects.map(o => o.slug);
}

/** Get all endpoint routes for static generation */
export function getAllEndpointSlugs(): { tagSlug: string; endpointSlug: string }[] {
    const slugs: { tagSlug: string; endpointSlug: string }[] = [];
    for (const tag of apiTags) {
        for (const endpoint of tag.endpoints) {
            slugs.push({ tagSlug: tag.slug, endpointSlug: endpoint.endpointSlug });
        }
    }
    return slugs;
}
`;
}

/**
 * Placeholder snippets module so the version registry's static imports resolve
 * even if snippet generation is skipped. generate-sdk-snippets.ts overwrites
 * this with real snippets when it runs (build:docs runs it right after this script).
 */
function generatePlaceholderSnippetsFile(): string {
    return `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Placeholder written by generate-api-reference.ts; overwritten by generate-sdk-snippets.ts.

import type { EndpointSnippets, SdkLanguage, SdkSnippetHighlightLanguage } from '@/lib/sdk-snippet-types';
import { SNIPPET_HIGHLIGHT_MAP } from '@/lib/sdk-snippet-types';

const RAW_SNIPPETS: Record<string, EndpointSnippets> = {};

export function getEndpointSnippet(
    operationId: string,
    language: SdkLanguage,
): { code: string; highlightLanguage: SdkSnippetHighlightLanguage } | undefined {
    const raw = RAW_SNIPPETS[operationId]?.[language];
    if (raw === undefined || raw === '') return undefined;
    return { code: raw, highlightLanguage: SNIPPET_HIGHLIGHT_MAP[language] };
}

export function getEndpointSnippets(operationId: string): EndpointSnippets | undefined {
    return RAW_SNIPPETS[operationId];
}

export function hasAnySnippet(operationId: string): boolean {
    return false;
}
`;
}

// ─── Compact sidenav data (client-safe) ──────────────────────────

interface ApiNavEntry {
    domain: string;
    /** Static URL segments of the endpoint path, used to build the nested sidenav tree. */
    segments: string[];
    tagSlug: string;
    endpointSlug: string;
    /** Short action label shown in the sidenav, e.g. "List", "Create". */
    label: string;
}

/** Mirror of the sidenav's action label heuristic, computed at build time. */
function sidenavActionLabel(endpoint: EndpointData): string {
    if (endpoint.actionType === 'list') return 'List';
    if (endpoint.actionType === 'retrieve') return 'Retrieve';
    if (endpoint.actionType === 'create') return 'Create';
    if (endpoint.actionType === 'update') return 'Update';
    if (endpoint.actionType === 'delete') return 'Delete';

    const s = endpoint.summary.trim();
    const lower = s.toLowerCase();
    if (lower.startsWith('list ')) return 'List';
    if (lower.startsWith('search ')) return 'List';
    if (lower.startsWith('get ') || lower.startsWith('retrieve ')) return 'Retrieve';
    if (lower.startsWith('create ') || lower.startsWith('trigger ')) return 'Create';
    if (lower.startsWith('update ') || lower.startsWith('upsert ')) return 'Update';
    if (lower.startsWith('delete ') || lower.startsWith('revoke ')) return 'Delete';
    return s;
}

/** Static (non-parameter) path segments after /v1/<domain>, cut at "actions". */
function sidenavStaticSegments(endpointPath: string): string[] {
    const parts = endpointPath.split('/').filter(Boolean);
    const segments = parts.slice(2).filter((s) => !s.startsWith('{'));
    const actionsIdx = segments.indexOf('actions');
    return actionsIdx !== -1 ? segments.slice(0, actionsIdx) : segments;
}

function buildCompactNavEntries(tags: TagData[]): ApiNavEntry[] {
    const entries: ApiNavEntry[] = [];
    for (const tag of tags) {
        for (const e of tag.endpoints) {
            entries.push({
                domain: e.domain,
                segments: sidenavStaticSegments(e.path),
                tagSlug: e.tagSlug,
                endpointSlug: e.endpointSlug,
                label: sidenavActionLabel(e),
            });
        }
    }
    return entries;
}

interface ApiObjectNavEntry {
    domain: string;
    domainLabel: string;
    slug: string;
    label: string;
}

function buildCompactObjectNavEntries(objects: ObjectData[]): ApiObjectNavEntry[] {
    return objects.map((o) => ({
        domain: o.domain,
        domainLabel: o.domainLabel,
        slug: o.slug,
        label: o.name,
    }));
}

// ─── Version index, nav and registry emitters ────────────────────

interface VersionedData {
    version: string;
    tags: TagData[];
    nav: ApiNavDomain[];
    objects: ObjectData[];
    /** True when loaded from a previously generated module instead of a spec. */
    reused?: boolean;
}

function generateApiVersionsFile(latestVersion: string, archivedVersions: string[]): string {
    const versions = [
        { version: latestVersion, codename: parseCodename(latestVersion), isLatest: true },
        ...archivedVersions.map((v) => ({
            version: v,
            codename: parseCodename(v),
            isLatest: false,
        })),
    ];
    return `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.
//
// Client-safe index of every API version the reference is built for,
// latest first. Archived versions come from api-versions.json.

export interface ApiVersionInfo {
    version: string;
    codename: string;
    isLatest: boolean;
}

export const API_VERSIONS: ApiVersionInfo[] = ${JSON.stringify(versions, null, 4)};

export const LATEST_API_VERSION = ${JSON.stringify(latestVersion)};

export function isArchivedApiVersion(version: string): boolean {
    return API_VERSIONS.some((v) => v.version === version && !v.isLatest);
}

/**
 * Route prefix for a version's API reference. The latest version lives at the
 * canonical /api-reference; archived versions live under /api-reference/<version>.
 */
export function apiReferenceBasePath(version: string): string {
    return version === LATEST_API_VERSION ? '/api-reference' : \`/api-reference/\${version}\`;
}
`;
}

function generateApiNavFile(latest: VersionedData, archived: VersionedData[]): string {
    const byVersion: Record<string, ApiNavEntry[]> = {};
    const objectsByVersion: Record<string, ApiObjectNavEntry[]> = {};
    for (const v of [latest, ...archived]) {
        byVersion[v.version] = buildCompactNavEntries(v.tags);
        objectsByVersion[v.version] = buildCompactObjectNavEntries(v.objects);
    }
    return `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.
//
// Compact per-version endpoint listing for the API reference sidenav and
// version selector. Deliberately small so it is safe to ship to the client.

export interface ApiNavEntry {
    domain: string;
    /** Static URL segments of the endpoint path, used to build the nested sidenav tree. */
    segments: string[];
    tagSlug: string;
    endpointSlug: string;
    /** Short action label shown in the sidenav, e.g. "List", "Create". */
    label: string;
}

export interface ApiObjectNavEntry {
    domain: string;
    domainLabel: string;
    slug: string;
    label: string;
}

export const apiNavEntriesByVersion: Record<string, ApiNavEntry[]> = ${JSON.stringify(byVersion, null, 4)};

export const apiObjectNavEntriesByVersion: Record<string, ApiObjectNavEntry[]> = ${JSON.stringify(objectsByVersion, null, 4)};

export function getApiNavEntries(version: string): ApiNavEntry[] {
    return apiNavEntriesByVersion[version] ?? [];
}

export function getApiObjectNavEntries(version: string): ApiObjectNavEntry[] {
    return apiObjectNavEntriesByVersion[version] ?? [];
}
`;
}

function versionImportAlias(version: string): string {
    return `v_${version.replace(/[^a-zA-Z0-9]/g, '_')}`;
}

/**
 * Server-side registry mapping every version to its endpoint data and SDK
 * snippets. Imports the full per-version modules, so only use it from server
 * components / generateStaticParams — never from client components.
 */
function generateVersionRegistryFile(latestVersion: string, archivedVersions: string[]): string {
    const imports = archivedVersions
        .map((v) => {
            const alias = versionImportAlias(v);
            return (
                `import * as ${alias}_endpoints from '@/static/api-versions/${v}/apiEndpoints.generated';\n` +
                `import * as ${alias}_snippets from '@/static/api-versions/${v}/apiSnippets.generated';`
            );
        })
        .join('\n');
    const registryEntries = [
        `    [LATEST_API_VERSION]: { endpoints: latestEndpoints, snippets: latestSnippets },`,
        ...archivedVersions.map((v) => {
            const alias = versionImportAlias(v);
            return `    ${JSON.stringify(v)}: { endpoints: ${alias}_endpoints, snippets: ${alias}_snippets },`;
        }),
    ].join('\n');

    return `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.

import type { EndpointSnippets } from '@/lib/sdk-snippet-types';
import * as latestEndpoints from '@/static/apiEndpoints.generated';
import * as latestSnippets from '@/static/apiSnippets.generated';
import { LATEST_API_VERSION } from '@/static/apiVersions.generated';
${imports ? `${imports}\n` : ''}
type VersionModules = {
    endpoints: Pick<
        typeof latestEndpoints,
        | 'apiTags'
        | 'apiNavDomains'
        | 'apiObjects'
        | 'getTagBySlug'
        | 'getEndpoint'
        | 'getResource'
        | 'getObject'
        | 'getAllObjectSlugs'
        | 'getAllEndpointSlugs'
    >;
    snippets: Pick<typeof latestSnippets, 'getEndpointSnippet' | 'getEndpointSnippets' | 'hasAnySnippet'>;
};

const REGISTRY: Record<string, VersionModules> = {
${registryEntries}
};

export function isKnownApiVersion(version: string): boolean {
    return version in REGISTRY;
}

export function getTagsForVersion(version: string): typeof latestEndpoints.apiTags | undefined {
    return REGISTRY[version]?.endpoints.apiTags;
}

export function getObjectsForVersion(
    version: string,
): typeof latestEndpoints.apiObjects | undefined {
    return REGISTRY[version]?.endpoints.apiObjects;
}

export function getEndpointForVersion(
    version: string,
    tagSlug: string,
    endpointSlug: string,
): ReturnType<typeof latestEndpoints.getEndpoint> {
    return REGISTRY[version]?.endpoints.getEndpoint(tagSlug, endpointSlug);
}

export function getObjectForVersion(
    version: string,
    slug: string,
): ReturnType<typeof latestEndpoints.getObject> {
    return REGISTRY[version]?.endpoints.getObject(slug);
}

export function getSnippetsForVersion(
    version: string,
    operationId: string,
): EndpointSnippets | undefined {
    return REGISTRY[version]?.snippets.getEndpointSnippets(operationId);
}

/**
 * Static route params for every archived version: the overview, each object
 * page, plus each endpoint.
 */
export function getArchivedRouteParams(): { segments: string[] }[] {
    const params: { segments: string[] }[] = [];
    for (const [version, modules] of Object.entries(REGISTRY)) {
        if (version === LATEST_API_VERSION) continue;
        params.push({ segments: [version] });
        for (const slug of modules.endpoints.getAllObjectSlugs()) {
            params.push({ segments: [version, 'objects', slug] });
        }
        for (const { tagSlug, endpointSlug } of modules.endpoints.getAllEndpointSlugs()) {
            params.push({ segments: [version, tagSlug, endpointSlug] });
        }
    }
    return params;
}
`;
}

function readArchivedVersionsManifest(): string[] {
    if (!fs.existsSync(VERSIONS_MANIFEST_PATH)) return [];
    try {
        const manifest = JSON.parse(fs.readFileSync(VERSIONS_MANIFEST_PATH, 'utf-8')) as {
            archived?: string[];
        };
        return manifest.archived ?? [];
    } catch (e) {
        console.warn(`Could not parse ${VERSIONS_MANIFEST_PATH}:`, e);
        return [];
    }
}

function parseCodename(version: string): string {
    const parts = version.split('.');
    for (const part of parts) {
        if (isNaN(Number(part))) {
            return part.split('-')[0];
        }
    }
    return '';
}

function generateApiVersion(version: string): void {
    const codename = parseCodename(version);
    const content = `export const API_VERSION = {
    current: '${version}',
    currentCodename: '${codename}',
};
`;
    fs.writeFileSync(API_VERSION_PATH, content);
    console.log(`Written: ${API_VERSION_PATH}`);
}

// ─── Main ────────────────────────────────────────────────────────

async function main() {
    if (!fs.existsSync(SPEC_PATH)) {
        console.log('No OpenAPI spec found, skipping API reference generation');
        return;
    }

    console.log('Reading OpenAPI spec...');
    const specContent = fs.readFileSync(SPEC_PATH, 'utf-8');
    const spec: OpenAPISpec = JSON.parse(specContent);

    console.log(
        `Found ${spec.tags?.length || 0} tags and ${Object.keys(spec.paths).length} paths`,
    );

    // Generate API version file
    const latestVersion = spec.info.version;
    generateApiVersion(latestVersion);

    // Generate structured endpoint data
    console.log('Generating structured endpoint data...');
    const { tags, nav, objects } = generateEndpointData(spec, '/api-reference');
    const endpointsContent = generateEndpointsFile(tags, nav, objects);
    fs.writeFileSync(ENDPOINTS_OUTPUT_PATH, endpointsContent);
    console.log(`Written: ${ENDPOINTS_OUTPUT_PATH}`);

    // Generate archived versions (api-versions.json + specs/versions/<version>.json)
    const archived: VersionedData[] = [];
    for (const version of readArchivedVersionsManifest()) {
        if (version === latestVersion) {
            console.log(`Skipping archived version ${version}: it is the latest version`);
            continue;
        }
        const specPath = path.join(ARCHIVED_SPECS_DIR, `${version}.json`);
        const generatedModulePath = path.join(
            VERSIONED_OUTPUT_DIR,
            version,
            'apiEndpoints.generated.ts',
        );
        if (fs.existsSync(specPath)) {
            const versionSpec: OpenAPISpec = JSON.parse(fs.readFileSync(specPath, 'utf-8'));
            if (versionSpec.info.version !== version) {
                console.warn(
                    `Archived spec ${specPath} reports version ${versionSpec.info.version}; ` +
                        `using manifest version ${version} for routing`,
                );
            }
            const data = generateEndpointData(versionSpec, `/api-reference/${version}`);
            archived.push({ version, ...data });
        } else if (fs.existsSync(generatedModulePath)) {
            // No spec on disk (e.g. local build without S3 access): reuse the
            // committed module so the version isn't silently dropped from the docs.
            const mod = (await import(generatedModulePath)) as {
                apiTags: TagData[];
                apiNavDomains: ApiNavDomain[];
                apiObjects?: ObjectData[];
            };
            archived.push({
                version,
                tags: mod.apiTags,
                nav: mod.apiNavDomains,
                objects: mod.apiObjects ?? [],
                reused: true,
            });
            console.log(
                `Reusing previously generated data for archived version ${version} ` +
                    `(no spec in specs/versions/; run scripts/fetch-public-release-artifacts.sh to regenerate)`,
            );
        } else {
            console.warn(
                `Skipping archived version ${version}: neither ${specPath} nor a previously ` +
                    `generated module found (run scripts/fetch-public-release-artifacts.sh)`,
            );
        }
    }

    // Drop generated dirs for versions no longer in the manifest, then
    // (re)write modules for freshly generated versions.
    if (fs.existsSync(VERSIONED_OUTPUT_DIR)) {
        const expected = new Set(archived.map((v) => v.version));
        for (const entry of fs.readdirSync(VERSIONED_OUTPUT_DIR)) {
            if (!expected.has(entry)) {
                fs.rmSync(path.join(VERSIONED_OUTPUT_DIR, entry), {
                    recursive: true,
                    force: true,
                });
                console.log(`Removed stale generated version dir: ${entry}`);
            }
        }
    }
    for (const v of archived) {
        if (v.reused) continue;
        const dir = path.join(VERSIONED_OUTPUT_DIR, v.version);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(
            path.join(dir, 'apiEndpoints.generated.ts'),
            generateVersionedEndpointsFile(v.tags, v.nav, v.objects),
        );
        fs.writeFileSync(
            path.join(dir, 'apiSnippets.generated.ts'),
            generatePlaceholderSnippetsFile(),
        );
        console.log(`Written: ${dir}/ (${v.tags.length} tags)`);
    }

    const archivedVersionStrings = archived.map((v) => v.version);
    fs.writeFileSync(
        API_VERSIONS_OUTPUT_PATH,
        generateApiVersionsFile(latestVersion, archivedVersionStrings),
    );
    console.log(`Written: ${API_VERSIONS_OUTPUT_PATH}`);
    fs.writeFileSync(
        API_NAV_OUTPUT_PATH,
        generateApiNavFile({ version: latestVersion, tags, nav, objects }, archived),
    );
    console.log(`Written: ${API_NAV_OUTPUT_PATH}`);
    fs.writeFileSync(
        VERSION_REGISTRY_OUTPUT_PATH,
        generateVersionRegistryFile(latestVersion, archivedVersionStrings),
    );
    console.log(`Written: ${VERSION_REGISTRY_OUTPUT_PATH}`);

    // Remove legacy generated developer-resources api-reference docs
    fs.rmSync(LEGACY_API_REFERENCE_DIR, { recursive: true, force: true });
    fs.rmSync(LEGACY_API_REFERENCE_OVERVIEW, { force: true });

    // Log stats
    let totalEndpoints = 0;
    for (const tag of tags) {
        totalEndpoints += tag.endpoints.length;
    }
    console.log(`Generated data for ${tags.length} tags, ${totalEndpoints} endpoints`);
    console.log(`Navigation: ${nav.length} domains`);
    for (const domain of nav) {
        console.log(
            `  ${domain.name}: ${domain.resources.length} resources, ${domain.resources.reduce((sum, r) => sum + r.endpoints.length, 0)} endpoints`,
        );
    }
}

main().catch(console.error);

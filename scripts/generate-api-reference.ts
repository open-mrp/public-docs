import fs from 'fs';
import path from 'path';

const SPEC_PATH = path.join(process.cwd(), 'specs/public_openapi_spec.json');
const API_VERSION_PATH = path.join(process.cwd(), 'src/static/apiVersion.generated.ts');
const ENDPOINTS_OUTPUT_PATH = path.join(process.cwd(), 'src/static/apiEndpoints.generated.ts');
const API_REFERENCE_DOCS_DIR = path.join(process.cwd(), 'src/docs/api-reference');
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
    'x-nullable-clear'?: boolean;
    // Some specs encode `nullable: true` by including `null` inside the enum array.
    // We sanitize these at generation time so the output stays strictly `string[]`.
    enum?: Array<string | null>;
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

function appendDefaultToDescription(description: string, defaultValue: unknown): string {
    if (defaultValue === undefined) return description;

    const base = description.trim();
    const defaultStr = formatDefaultForDescription(defaultValue);
    const sentence = `Defaults to ${defaultStr}.`;

    if (!base) return sentence;
    if (/Defaults to\b/i.test(base)) return base; // avoid double-appending if spec already includes this
    if (/[.!?]$/.test(base)) return `${base} ${sentence}`;
    return `${base}. ${sentence}`;
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
            const descriptionWithNullClear = resolvedProp['x-nullable-clear'] === true
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
                        insideIncludedExpandable:
                            insideIncludedExpandable || (field.expandable === true && hasExplicitInclude),
                    });
                }
            } else if (resolvedProp.type === 'object' && resolvedProp.properties && shouldExpandNestedFields) {
                field.properties = schemaToFields(resolvedProp, spec, undefined, depth + 1, {
                    includePaths,
                    pathPrefix: fieldPath,
                    resourceRoot,
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

    return {
        name: tagName,
        description: schema.description || '',
        fields,
        example: successResponse.content['application/json'].example || schema.example,
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

function generateEndpointData(spec: OpenAPISpec): { tags: TagData[]; nav: ApiNavDomain[] } {
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
                    fields: bodySchema ? schemaToFields(bodySchema, spec, undefined, 0, { includePaths }) : [],
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
                href: `/api-reference/${tagSlug}/${e.endpointSlug}`,
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

    return { tags: tagDataList, nav };
}

function generateEndpointsFile(tags: TagData[], nav: ApiNavDomain[]): string {
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

// ─── MDX Generation (new static api-reference docs) ──────────────

function safeMkdir(dir: string) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function resetDir(dir: string) {
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
}

function writeMdxFile(filePath: string, contents: string) {
    safeMkdir(path.dirname(filePath));
    fs.writeFileSync(filePath, contents);
}

function escapeSingleQuotes(input: string): string {
    return input.replaceAll("'", "''");
}

function generateApiReferenceIndexMdx(spec: OpenAPISpec): string {
    return `---
title: 'API Reference'
subtitle: 'Complete API documentation for all endpoints'
route: '/api-reference'
layout: api-reference
toc: false
nav:
    hidden: true
---

{/* THIS FILE IS AUTO-GENERATED FROM specs/public_openapi_spec.json */}
{/* Run 'bun run build:docs' to regenerate. */}

<ApiReferenceOverview />
`;
}

function generateEndpointMdx(endpoint: EndpointData): string {
    const title = escapeSingleQuotes(endpoint.summary);
    const subtitle = escapeSingleQuotes(`${endpoint.method.toUpperCase()} ${endpoint.path}`);

    return `---
title: '${title}'
subtitle: '${subtitle}'
route: '/api-reference/${endpoint.tagSlug}/${endpoint.endpointSlug}'
layout: api-reference
toc: false
nav:
    hidden: true
---

{/* THIS FILE IS AUTO-GENERATED FROM specs/public_openapi_spec.json */}
{/* Run 'bun run build:docs' to regenerate. */}

<ApiEndpoint tagSlug="${endpoint.tagSlug}" endpointSlug="${endpoint.endpointSlug}" />
`;
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
    generateApiVersion(spec.info.version);

    // Generate structured endpoint data
    console.log('Generating structured endpoint data...');
    const { tags, nav } = generateEndpointData(spec);
    const endpointsContent = generateEndpointsFile(tags, nav);
    fs.writeFileSync(ENDPOINTS_OUTPUT_PATH, endpointsContent);
    console.log(`Written: ${ENDPOINTS_OUTPUT_PATH}`);

    // Reset and generate MDX docs under src/docs/api-reference
    console.log('Generating static API reference MDX pages...');
    resetDir(API_REFERENCE_DOCS_DIR);

    const indexMdx = generateApiReferenceIndexMdx(spec);
    writeMdxFile(path.join(API_REFERENCE_DOCS_DIR, 'index.mdx'), indexMdx);

    let endpointPageCount = 0;
    for (const tag of tags) {
        for (const endpoint of tag.endpoints) {
            const filePath = path.join(
                API_REFERENCE_DOCS_DIR,
                endpoint.tagSlug,
                `${endpoint.endpointSlug}.mdx`,
            );
            writeMdxFile(filePath, generateEndpointMdx(endpoint));
            endpointPageCount++;
        }
    }

    console.log(`Written: ${API_REFERENCE_DOCS_DIR} (index + ${endpointPageCount} endpoint pages)`);

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

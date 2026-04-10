import type { EndpointData, SchemaField } from '@/static/apiEndpoints.generated';

/**
 * Same resource-relative path logic as ParameterTable: strip a list/wrapper
 * prefix (e.g. `data`) so include[] enum values match nested fields.
 */
export function findExpansionRoot(
    fields: SchemaField[] | undefined,
    includeValues: string[],
): string | undefined {
    if (!fields || includeValues.length === 0) return undefined;

    if (fields.some((f) => f.name === 'data')) return 'data';

    const topLevelIncludes = new Set(includeValues.map((v) => v.split('.')[0]));

    for (const field of fields) {
        const children = field.properties;
        if (!children || children.length === 0) continue;
        if (children.some((c) => topLevelIncludes.has(c.name))) {
            return field.name;
        }
    }

    return undefined;
}

export function getIncludeValuesForEndpoint(endpoint: EndpointData): string[] {
    const includeParam = endpoint.parameters.find(
        (p) => p.in === 'query' && (p.name === 'include[]' || p.name === 'include'),
    );
    return includeParam?.enum ?? [];
}

function relativePathFromFull(fullPath: string, expansionRoot: string | undefined): string {
    if (expansionRoot && fullPath.startsWith(`${expansionRoot}.`)) {
        return fullPath.slice(expansionRoot.length + 1);
    }
    return fullPath;
}

function isIncludableForEndpoint(relativePath: string, includeValues: string[]): boolean {
    if (!relativePath) return false;
    if (includeValues.includes(relativePath)) return true;
    return includeValues.some(
        (v) => v.startsWith(`${relativePath}.`) || relativePath.startsWith(`${v}.`),
    );
}

/**
 * Aligns a response `example` payload with endpoint-specific include rules:
 * - `alwaysNull` fields (from schema generation) become null.
 * - `x-expandable` fields that are not reachable via this endpoint's include[]
 *   enum become null so the example does not imply expanded data the API will
 *   not return without an include.
 */
export function sanitizeResponseExample(
    example: unknown,
    fields: SchemaField[] | undefined,
    expansionRoot: string | undefined,
    includeValues: string[],
    pathPrefix = '',
): unknown {
    if (example === null || example === undefined) return example;
    if (!fields?.length) return example;

    if (Array.isArray(example)) {
        return example.map((item) =>
            sanitizeResponseExample(item, fields, expansionRoot, includeValues, pathPrefix),
        );
    }

    if (typeof example !== 'object') return example;

    const obj = example as Record<string, unknown>;
    const out: Record<string, unknown> = { ...obj };

    for (const field of fields) {
        const key = field.name;
        if (!Object.prototype.hasOwnProperty.call(out, key)) continue;

        const fullPath = pathPrefix ? `${pathPrefix}.${key}` : key;
        const relativePath = relativePathFromFull(fullPath, expansionRoot);

        if (field.alwaysNull === true) {
            out[key] = null;
            continue;
        }

        if (
            field.expandable === true &&
            includeValues.length > 0 &&
            !isIncludableForEndpoint(relativePath, includeValues)
        ) {
            out[key] = null;
            continue;
        }

        const child = out[key];
        if (child === null || child === undefined) continue;

        if (field.type === 'array' && field.properties?.length && Array.isArray(child)) {
            out[key] = child.map((el) =>
                sanitizeResponseExample(el, field.properties, expansionRoot, includeValues, fullPath),
            );
            continue;
        }

        if (field.properties?.length && typeof child === 'object' && !Array.isArray(child)) {
            out[key] = sanitizeResponseExample(
                child,
                field.properties,
                expansionRoot,
                includeValues,
                fullPath,
            );
        }
    }

    return out;
}

export function sanitizeResponseExampleForEndpoint(
    example: unknown,
    endpoint: EndpointData,
    responseFields: SchemaField[] | undefined,
): unknown {
    const includeValues = getIncludeValuesForEndpoint(endpoint);
    const expansionRoot = findExpansionRoot(responseFields, includeValues);
    return sanitizeResponseExample(example, responseFields, expansionRoot, includeValues);
}

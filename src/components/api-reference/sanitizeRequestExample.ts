import type { SchemaField } from '@/static/apiEndpoints.generated';

/**
 * Returns whether a null value should be kept in a request-body example.
 * - `x-nullable-clear` fields use null to mean "clear this value" (PATCH).
 * - Required + nullable fields may require the key with a null value on create.
 */
function shouldKeepNullInRequestExample(field: SchemaField): boolean {
    if (field.nullableClear === true) return true;
    // Back-compat until apiEndpoints.generated.ts is rebuilt with nullableClear.
    if (field.description.includes('Send `null` to clear')) return true;
    return field.required && field.nullable;
}

/**
 * Removes JSON keys whose value is `null` when the field would be omitted in a
 * real request (optional / unset). Keeps null only where it carries meaning.
 */
export function sanitizeRequestExample(
    example: unknown,
    fields: SchemaField[] | undefined,
): unknown {
    if (example === null || example === undefined) return example;
    if (!fields?.length) return example;

    if (Array.isArray(example)) {
        return example.map((item) => sanitizeRequestExample(item, fields));
    }

    if (typeof example !== 'object') return example;

    const obj = example as Record<string, unknown>;
    const out: Record<string, unknown> = {};

    for (const field of fields) {
        const key = field.name;
        if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

        const value = obj[key];

        if (value === null) {
            if (shouldKeepNullInRequestExample(field)) {
                out[key] = null;
            }
            continue;
        }

        if (value === undefined) continue;

        if (field.properties?.length && typeof value === 'object' && !Array.isArray(value)) {
            out[key] = sanitizeRequestExample(value, field.properties);
            continue;
        }

        if (field.type === 'array' && field.properties?.length && Array.isArray(value)) {
            out[key] = value.map((el) => sanitizeRequestExample(el, field.properties));
            continue;
        }

        out[key] = value;
    }

    return out;
}

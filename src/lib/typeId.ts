import type { ReplacementValue } from '@augno/ui';

/** Matches Augno type IDs (resource prefix + ULID), e.g. `prod_01jm4r6700e3kxb9w2nqh7g5fp`. */
export const TYPE_ID_PATTERN = /\b[a-z]{2,5}_[0-9a-z]{26}\b/g;

/**
 * Abbreviates a type ID for display, showing the resource prefix and a short
 * head/tail of the ULID (e.g. `apke_01jm...g5fp`). Returns the input unchanged
 * when it is already short enough.
 */
export function abbreviateTypeId(id: string): string {
    if (id.length <= 20) return id;

    const prefixMatch = id.match(/^([a-z]{2,5}_)/);
    const prefix = prefixMatch ? prefixMatch[1] : '';
    const remainder = id.slice(prefix.length);
    if (remainder.length <= 12) return id;

    const visibleStart = remainder.slice(0, 4);
    const visibleEnd = remainder.slice(-4);

    return `${prefix}${visibleStart}...${visibleEnd}`;
}

/** Collects unique type IDs appearing in snippet or example code. */
export function findTypeIdsInText(text: string): string[] {
    const ids = new Set<string>();
    for (const match of text.matchAll(TYPE_ID_PATTERN)) {
        ids.add(match[0]);
    }
    return [...ids];
}

/** Builds display/copy replacements for every type ID found in the given code. */
export function buildTypeIdReplacements(
    code: string,
): Record<string, { display: string; copy: string }> {
    const replacements: Record<string, { display: string; copy: string }> = {};

    for (const id of findTypeIdsInText(code)) {
        const display = abbreviateTypeId(id);
        if (display !== id) {
            replacements[id] = { display, copy: id };
        }
    }

    return replacements;
}

/** Merges auth/env snippet replacements with abbreviated type ID replacements. */
export function mergeSnippetReplacements(
    base: Record<string, ReplacementValue>,
    code: string,
): Record<string, ReplacementValue> {
    return { ...buildTypeIdReplacements(code), ...base };
}

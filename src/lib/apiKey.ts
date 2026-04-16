/**
 * Abbreviates an API key for display, showing prefix and a short head/tail of
 * the remainder (e.g. `aug_sk_test_AM4B...UWND`). Returns the input unchanged
 * if it is already short enough.
 */
export function abbreviateKey(key: string): string {
    if (key.length <= 24) return key;

    const prefixMatch = key.match(/^(aug_[a-z]+_[a-z]+_)/);
    const prefix = prefixMatch ? prefixMatch[1] : '';
    const remainder = key.slice(prefix.length);
    const visibleStart = remainder.slice(0, 4);
    const visibleEnd = remainder.slice(-4);

    return `${prefix}${visibleStart}...${visibleEnd}`;
}

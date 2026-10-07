/**
 * Archived API specs are frozen release artifacts in S3, so every version published
 * before the augno.com → openmrp.ai move still documents hosts we no longer serve.
 * Rewriting them as they are read keeps the version picker from handing readers a
 * dead domain, without editing artifacts that are already published.
 *
 * Only hosts move. augno.com still carries mail — it is the SES sender identity and
 * the inbound receiving domain — so addresses must survive this untouched, which is
 * why these are exact per-host rules rather than one augno.com → openmrp.ai sweep.
 */
const LEGACY_HOST_REPLACEMENTS: ReadonlyArray<readonly [RegExp, string]> = [
    [/\bdocs\.augno\.com\b/g, 'docs.openmrp.ai'],
    [/\bapi\.augno\.com\b/g, 'api.openmrp.ai'],
    [/\bcdn\.augno\.com\b/g, 'cdn.openmrp.ai'],
    // www 307s to the apex, so collapse rather than carrying the subdomain over.
    [/\bhttps:\/\/www\.augno\.com\b/g, 'https://openmrp.ai'],
    [/\bhttps:\/\/augno\.com\b/g, 'https://openmrp.ai'],
    // Sample users in request/response examples, not real mailboxes.
    [/\bjdoe@augno\.com\b/g, 'jdoe@openmrp.ai'],
    [/\bjohn@augno\.com\b/g, 'john@openmrp.ai'],
];

/** Rewrites retired augno.com hosts in raw spec text to the hosts we serve today. */
export function normalizeLegacyHosts(specText: string): string {
    return LEGACY_HOST_REPLACEMENTS.reduce(
        (text, [pattern, replacement]) => text.replace(pattern, replacement),
        specText,
    );
}

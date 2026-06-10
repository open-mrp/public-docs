import { LATEST_API_VERSION, isArchivedApiVersion } from '@/static/apiVersions.generated';

/**
 * Resolve which API version a pathname under /api-reference is showing.
 * The latest version lives at the canonical /api-reference; archived versions
 * live under /api-reference/<version>.
 */
export function apiVersionFromPathname(pathname: string): string {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] !== 'api-reference') return LATEST_API_VERSION;
    const candidate = segments[1];
    return candidate && isArchivedApiVersion(candidate) ? candidate : LATEST_API_VERSION;
}

/** Tag/endpoint slugs of the endpoint page a pathname is showing, if any. */
export function endpointSlugsFromPathname(
    pathname: string,
): { tagSlug: string; endpointSlug: string } | undefined {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] !== 'api-reference') return undefined;
    const rest =
        segments[1] && isArchivedApiVersion(segments[1]) ? segments.slice(2) : segments.slice(1);
    if (rest.length === 2) return { tagSlug: rest[0], endpointSlug: rest[1] };
    return undefined;
}

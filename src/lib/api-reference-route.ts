import {
    LATEST_API_VERSION,
    apiReferenceBasePath,
    isArchivedApiVersion,
} from '@/static/apiVersions.generated';

export interface ResolvedApiRoute {
    version: string;
    isArchived: boolean;
    basePath: string;
    tagSlug?: string;
    endpointSlug?: string;
    /** Set for a single object page (/api-reference/objects/<slug>). */
    objectSlug?: string;
}

/**
 * Routes handled here:
 *   []                                 → overview, latest version (canonical)
 *   [objects, slug]                    → object page, latest version
 *   [tagSlug, endpointSlug]            → endpoint, latest version (canonical)
 *   [version]                          → overview, archived version
 *   [version, objects, slug]           → object page, archived version
 *   [version, tagSlug, endpointSlug]   → endpoint, archived version
 */
export function resolveApiRoute(seg: string[]): ResolvedApiRoute | undefined {
    if (seg.length === 0) {
        return { version: LATEST_API_VERSION, isArchived: false, basePath: '/api-reference' };
    }

    // Objects (latest). Branch before the tag/endpoint case so `objects` is never
    // treated as a tag slug.
    if (seg[0] === 'objects') {
        if (seg.length === 2) {
            return {
                version: LATEST_API_VERSION,
                isArchived: false,
                basePath: '/api-reference',
                objectSlug: seg[1],
            };
        }
        return undefined;
    }

    if (isArchivedApiVersion(seg[0])) {
        const version = seg[0];
        const basePath = apiReferenceBasePath(version);
        if (seg.length === 1) return { version, isArchived: true, basePath };
        if (seg[1] === 'objects') {
            if (seg.length === 3)
                return { version, isArchived: true, basePath, objectSlug: seg[2] };
            return undefined;
        }
        if (seg.length === 3) {
            return { version, isArchived: true, basePath, tagSlug: seg[1], endpointSlug: seg[2] };
        }
        return undefined;
    }

    if (seg.length === 2) {
        return {
            version: LATEST_API_VERSION,
            isArchived: false,
            basePath: '/api-reference',
            tagSlug: seg[0],
            endpointSlug: seg[1],
        };
    }

    return undefined;
}

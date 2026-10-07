import {
    buildCompactNavEntries,
    buildCompactObjectNavEntries,
    generateEndpointData,
    type ApiNavEntry,
    type ApiObjectNavEntry,
    type ObjectData,
    type OpenAPISpec,
    type TagData,
} from '@/lib/api-reference-spec';
import { normalizeLegacyHosts } from '@/lib/legacy-hosts';
import { API_VERSIONS, apiReferenceBasePath } from '@/static/apiVersions.generated';

/**
 * Archived API versions are not generated into the repo. Each is pinned (api-versions.json
 * specTags) to its last `{version}-rev.{N}` tag in the public open-mrp/openapi-spec repo,
 * whose spec is fetched and turned into reference data the first time someone opens that
 * version. Server-only.
 */

export interface ArchivedApiVersion {
    tags: TagData[];
    objects: ObjectData[];
    navEntries: ApiNavEntry[];
    objectNavEntries: ApiObjectNavEntry[];
}

export function archivedSpecUrl(specTag: string): string {
    return `https://raw.githubusercontent.com/open-mrp/openapi-spec/${encodeURIComponent(specTag)}/preview/openapi.json`;
}

async function fetchArchivedApiVersion(
    version: string,
    specTag: string,
): Promise<ArchivedApiVersion> {
    const url = archivedSpecUrl(specTag);
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(
            `Fetching archived API spec ${url} failed: ${res.status} ${res.statusText}`,
        );
    }
    const spec = JSON.parse(normalizeLegacyHosts(await res.text())) as OpenAPISpec;
    const { tags, objects } = generateEndpointData(spec, apiReferenceBasePath(version));
    return {
        tags,
        objects,
        navEntries: buildCompactNavEntries(tags),
        objectNavEntries: buildCompactObjectNavEntries(objects),
    };
}

// Versions are immutable, so a loaded one is kept for the life of the server process.
// Failed loads are dropped so the next request retries.
const loaded = new Map<string, Promise<ArchivedApiVersion>>();

/** Reference data for an archived version, or undefined if it is not in api-versions.json. */
export function loadArchivedApiVersion(version: string): Promise<ArchivedApiVersion> | undefined {
    const specTag = API_VERSIONS.find((v) => v.version === version && !v.isLatest)?.specTag;
    if (!specTag) return undefined;
    let pending = loaded.get(version);
    if (!pending) {
        pending = fetchArchivedApiVersion(version, specTag);
        loaded.set(version, pending);
        pending.catch(() => loaded.delete(version));
    }
    return pending;
}

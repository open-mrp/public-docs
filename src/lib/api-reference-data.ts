import { loadArchivedApiVersion } from '@/lib/archived-api-versions';
import type { EndpointSnippets } from '@/lib/sdk-snippet-types';
import type { EndpointData, ObjectData, TagData } from '@/static/apiEndpoints.generated';
import { apiObjects, apiTags } from '@/static/apiEndpoints.generated';
import { getEndpointSnippets } from '@/static/apiSnippets.generated';
import { LATEST_API_VERSION } from '@/static/apiVersions.generated';

/**
 * Server-side access to any API version's reference data: the latest from the generated
 * modules, archived ones fetched on demand. Never import from client components.
 */
export interface ApiVersionData {
    version: string;
    tags: TagData[];
    objects: ObjectData[];
}

const LATEST_API_VERSION_DATA: ApiVersionData = {
    version: LATEST_API_VERSION,
    tags: apiTags,
    objects: apiObjects,
};

/** The latest version's data, available synchronously (e.g. for MDX components). */
export function getLatestApiVersionData(): ApiVersionData {
    return LATEST_API_VERSION_DATA;
}

/** Undefined when the version is neither the latest nor listed in api-versions.json. */
export async function getApiVersionData(version: string): Promise<ApiVersionData | undefined> {
    if (version === LATEST_API_VERSION) return LATEST_API_VERSION_DATA;
    const archived = await loadArchivedApiVersion(version);
    return archived && { version, tags: archived.tags, objects: archived.objects };
}

export function findEndpoint(
    data: ApiVersionData,
    tagSlug: string,
    endpointSlug: string,
): EndpointData | undefined {
    return data.tags
        .find((t) => t.slug === tagSlug)
        ?.endpoints.find((e) => e.endpointSlug === endpointSlug);
}

export function findObject(data: ApiVersionData, slug: string): ObjectData | undefined {
    return data.objects.find((o) => o.slug === slug);
}

/**
 * SDK snippets are only generated for the latest version; archived endpoint pages fall
 * back to the curl example.
 */
export function getSnippetsForVersion(
    version: string,
    operationId: string,
): EndpointSnippets | undefined {
    return version === LATEST_API_VERSION ? getEndpointSnippets(operationId) : undefined;
}

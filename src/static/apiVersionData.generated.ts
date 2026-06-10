// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.

import type { EndpointSnippets } from '@/lib/sdk-snippet-types';
import * as latestEndpoints from '@/static/apiEndpoints.generated';
import * as latestSnippets from '@/static/apiSnippets.generated';
import { LATEST_API_VERSION } from '@/static/apiVersions.generated';
import * as v_1_0_forge_preview_1_endpoints from '@/static/api-versions/1.0.forge-preview.1/apiEndpoints.generated';
import * as v_1_0_forge_preview_1_snippets from '@/static/api-versions/1.0.forge-preview.1/apiSnippets.generated';

type VersionModules = {
    endpoints: Pick<
        typeof latestEndpoints,
        'apiTags' | 'apiNavDomains' | 'getTagBySlug' | 'getEndpoint' | 'getResource' | 'getAllEndpointSlugs'
    >;
    snippets: Pick<typeof latestSnippets, 'getEndpointSnippet' | 'getEndpointSnippets' | 'hasAnySnippet'>;
};

const REGISTRY: Record<string, VersionModules> = {
    [LATEST_API_VERSION]: { endpoints: latestEndpoints, snippets: latestSnippets },
    "1.0.forge-preview.1": { endpoints: v_1_0_forge_preview_1_endpoints, snippets: v_1_0_forge_preview_1_snippets },
};

export function isKnownApiVersion(version: string): boolean {
    return version in REGISTRY;
}

export function getTagsForVersion(version: string): typeof latestEndpoints.apiTags | undefined {
    return REGISTRY[version]?.endpoints.apiTags;
}

export function getEndpointForVersion(
    version: string,
    tagSlug: string,
    endpointSlug: string,
): ReturnType<typeof latestEndpoints.getEndpoint> {
    return REGISTRY[version]?.endpoints.getEndpoint(tagSlug, endpointSlug);
}

export function getSnippetsForVersion(
    version: string,
    operationId: string,
): EndpointSnippets | undefined {
    return REGISTRY[version]?.snippets.getEndpointSnippets(operationId);
}

/** Static route params for every archived version: the overview plus each endpoint. */
export function getArchivedRouteParams(): { segments: string[] }[] {
    const params: { segments: string[] }[] = [];
    for (const [version, modules] of Object.entries(REGISTRY)) {
        if (version === LATEST_API_VERSION) continue;
        params.push({ segments: [version] });
        for (const { tagSlug, endpointSlug } of modules.endpoints.getAllEndpointSlugs()) {
            params.push({ segments: [version, tagSlug, endpointSlug] });
        }
    }
    return params;
}

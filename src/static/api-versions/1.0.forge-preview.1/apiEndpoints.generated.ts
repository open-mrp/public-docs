// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.

import type {
    EndpointData,
    ObjectData,
    ResourceData,
    TagData,
} from '@/static/apiEndpoints.generated';

import { apiObjects, apiTags } from './apiEndpoints.data.generated';

export { apiNavDomains, apiObjects, apiTags } from './apiEndpoints.data.generated';

/** Look up a tag by its slug */
export function getTagBySlug(slug: string): TagData | undefined {
    return apiTags.find(t => t.slug === slug);
}

/** Look up an endpoint by tag slug and endpoint slug */
export function getEndpoint(tagSlug: string, endpointSlug: string): EndpointData | undefined {
    const tag = getTagBySlug(tagSlug);
    return tag?.endpoints.find(e => e.endpointSlug === endpointSlug);
}

/** Look up an endpoint's resource by tag slug */
export function getResource(tagSlug: string): ResourceData | undefined {
    return getTagBySlug(tagSlug)?.resource;
}

/** Look up an object by its slug */
export function getObject(slug: string): ObjectData | undefined {
    return apiObjects.find(o => o.slug === slug);
}

/** Get all object routes for static generation */
export function getAllObjectSlugs(): string[] {
    return apiObjects.map(o => o.slug);
}

/** Get all endpoint routes for static generation */
export function getAllEndpointSlugs(): { tagSlug: string; endpointSlug: string }[] {
    const slugs: { tagSlug: string; endpointSlug: string }[] = [];
    for (const tag of apiTags) {
        for (const endpoint of tag.endpoints) {
            slugs.push({ tagSlug: tag.slug, endpointSlug: endpoint.endpointSlug });
        }
    }
    return slugs;
}

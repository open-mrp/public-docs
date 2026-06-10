import type { EndpointData, TagData } from '@/static/apiEndpoints.generated';

export interface OverviewEndpoint {
    summary: string;
    method: string;
    path: string;
    actionType: string;
    href: string;
}

export interface OverviewResource {
    name: string;
    slug: string;
    endpoints: OverviewEndpoint[];
}

export interface OverviewDomain {
    name: string;
    slug: string;
    resources: OverviewResource[];
}

function endpointToOverview(endpoint: EndpointData, basePath: string): OverviewEndpoint {
    return {
        summary: endpoint.summary,
        method: endpoint.method,
        path: endpoint.path,
        actionType: endpoint.actionType,
        href: `${basePath}/${endpoint.tagSlug}/${endpoint.endpointSlug}`,
    };
}

export function buildOverviewDomains(tags: TagData[], basePath: string): OverviewDomain[] {
    const domains = new Map<string, OverviewDomain>();

    for (const tag of tags) {
        let domain = domains.get(tag.domain);
        if (!domain) {
            domain = {
                name: tag.domainLabel,
                slug: tag.domain,
                resources: [],
            };
            domains.set(tag.domain, domain);
        }

        domain.resources.push({
            name: tag.name,
            slug: tag.slug,
            endpoints: tag.endpoints.map((e) => endpointToOverview(e, basePath)),
        });
    }

    const domainOrder = ['ai', 'auth', 'core'];
    return [...domains.values()].sort((a, b) => {
        const ai = domainOrder.indexOf(a.slug);
        const bi = domainOrder.indexOf(b.slug);
        if (ai !== -1 || bi !== -1) return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
        return a.name.localeCompare(b.name);
    });
}

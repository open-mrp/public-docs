import type { ObjectData } from '@/static/apiEndpoints.generated';

export interface OverviewObject {
    name: string;
    object: string;
    slug: string;
    description: string;
    href: string;
    fieldCount: number;
}

export interface OverviewObjectDomain {
    name: string;
    slug: string;
    objects: OverviewObject[];
}

export function buildOverviewObjectDomains(
    objects: ObjectData[],
    basePath: string,
): OverviewObjectDomain[] {
    const domains = new Map<string, OverviewObjectDomain>();

    for (const obj of objects) {
        let domain = domains.get(obj.domain);
        if (!domain) {
            domain = { name: obj.domainLabel, slug: obj.domain, objects: [] };
            domains.set(obj.domain, domain);
        }
        domain.objects.push({
            name: obj.name,
            object: obj.object,
            slug: obj.slug,
            description: obj.description,
            href: `${basePath}/objects/${obj.slug}`,
            fieldCount: obj.fields.length,
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

import { absoluteUrl, ORG_NAME, ORG_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';
import { buildBreadcrumbsFromRoute } from '@/static/breadcrumbConfig';
import { getPath } from '@/static/paths';

/**
 * Builders for JSON-LD structured data. Kept framework-agnostic (plain objects)
 * so they can be embedded via the <JsonLd> component on any server page.
 */

export function organizationJsonLd(): Record<string, unknown> {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: ORG_NAME,
        url: ORG_URL,
        logo: absoluteUrl('/android-chrome-512x512.png'),
    };
}

export function webSiteJsonLd(): Record<string, unknown> {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        publisher: { '@type': 'Organization', name: ORG_NAME, url: ORG_URL },
    };
}

export function techArticleJsonLd({
    title,
    description,
    route,
}: {
    title: string;
    description?: string;
    route: string;
}): Record<string, unknown> {
    return {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: title,
        ...(description ? { description } : {}),
        inLanguage: 'en',
        url: absoluteUrl(route),
        mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(route) },
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        publisher: {
            '@type': 'Organization',
            name: ORG_NAME,
            url: ORG_URL,
            logo: absoluteUrl('/android-chrome-512x512.png'),
        },
    };
}

/**
 * BreadcrumbList from a doc route. Resolves each breadcrumb's pathKey to a real
 * URL; items without a resolvable URL (e.g. the current page) fall back to the
 * page's own route so every position has a valid item.
 */
export function breadcrumbJsonLd(route: string, title: string): Record<string, unknown> {
    const crumbs = buildBreadcrumbsFromRoute(route, title);

    const itemListElement = crumbs.map((crumb, index) => {
        const resolved = crumb.pathKey ? getPath(crumb.pathKey, { silent: true }) : undefined;
        const path = resolved ?? (index === crumbs.length - 1 ? route : '/');
        return {
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.label,
            item: absoluteUrl(path),
        };
    });

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement,
    };
}

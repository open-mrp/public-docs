import { absoluteUrl } from '@/lib/site';
import { getAllEndpointSlugs } from '@/static/apiEndpoints.generated';
import { routeToFile } from '@/static/routeMap.generated';
import type { MetadataRoute } from 'next';

/**
 * Full sitemap of every statically-generated page: the home page, all MDX doc
 * routes, the API reference overview, and one entry per API endpoint. Crawlers
 * use this to discover the entire site rather than relying on internal links.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const home: MetadataRoute.Sitemap = [
        { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ];

    const docPages: MetadataRoute.Sitemap = Object.keys(routeToFile).map((route) => ({
        url: absoluteUrl(route),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    const apiReferenceRoot: MetadataRoute.Sitemap = [
        {
            url: absoluteUrl('/api-reference'),
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    const apiEndpoints: MetadataRoute.Sitemap = getAllEndpointSlugs().map(
        ({ tagSlug, endpointSlug }) => ({
            url: absoluteUrl(`/api-reference/${tagSlug}/${endpointSlug}`),
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.6,
        }),
    );

    return [...home, ...docPages, ...apiReferenceRoot, ...apiEndpoints];
}

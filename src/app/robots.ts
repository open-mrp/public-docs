import { absoluteUrl, SITE_URL } from '@/lib/site';
import type { MetadataRoute } from 'next';

/**
 * Allow all crawlers and point them at the sitemap. The internal API proxy
 * (used by the raw-markdown `.md` routes) is disallowed so crawlers index the
 * rendered HTML pages rather than the JSON/markdown endpoints.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/'],
            },
        ],
        sitemap: absoluteUrl('/sitemap.xml'),
        host: SITE_URL,
    };
}

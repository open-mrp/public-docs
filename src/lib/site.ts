/**
 * Canonical site metadata used across SEO surfaces: <head> metadata, sitemap,
 * robots, JSON-LD, and Open Graph images. The base URL can be overridden per
 * environment with DOCS_BASE_URL (matches scripts/generate-llms-txt.ts) so
 * preview deployments emit correct absolute URLs.
 */
export const SITE_URL = (process.env.DOCS_BASE_URL || 'https://docs.augno.com').replace(/\/$/, '');

export const SITE_NAME = 'Augno Documentation';

/** Default <title> when a page does not provide its own. */
export const SITE_TITLE = 'Augno Documentation — Inventory & Order Fulfillment API';

/** Site-wide default description and home-page meta description. */
export const SITE_DESCRIPTION =
    'Guides, workflows, and a complete API reference for Augno — the platform for inventory management, manufacturing, and order fulfillment. Learn to integrate the Augno API and ship faster.';

export const ORG_NAME = 'Augno';

export const ORG_URL = 'https://augno.com';

/** Brand accent used in generated Open Graph cards (matches --primary). */
export const BRAND_ACCENT = '#0eb981';

/** Build an absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
    if (!path.startsWith('/')) path = `/${path}`;
    return `${SITE_URL}${path}`;
}

/**
 * Site-relative URL for a dynamically-generated Open Graph card (served by the
 * /og route handler). Relative is fine — Next resolves it against metadataBase
 * into an absolute URL for the og:image/twitter:image tags.
 */
export function ogImageUrl({
    title,
    eyebrow,
    subtitle,
}: {
    title: string;
    eyebrow?: string;
    subtitle?: string;
}): string {
    const sp = new URLSearchParams({ t: title });
    if (eyebrow) sp.set('e', eyebrow);
    if (subtitle) sp.set('s', subtitle);
    return `/og?${sp.toString()}`;
}

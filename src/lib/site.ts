/**
 * Canonical site metadata used across SEO surfaces: <head> metadata, sitemap,
 * robots, JSON-LD, and Open Graph images. The base URL can be overridden per
 * environment with DOCS_BASE_URL (matches scripts/generate-llms-txt.ts) so
 * preview deployments emit correct absolute URLs.
 */
export const SITE_URL = (process.env.DOCS_BASE_URL || 'https://docs.augno.com').replace(/\/$/, '');

export const SITE_NAME = 'OpenMRP Documentation';

/** Default <title> when a page does not provide its own. */
export const SITE_TITLE = 'OpenMRP Documentation — Inventory & Order Fulfillment API';

/**
 * Site-wide default description and home-page meta description. Kept under ~120
 * chars so it works as both the SEO `description` and the social
 * `og:description` without truncation.
 */
export const SITE_DESCRIPTION =
    'Guides, workflows, and a complete API reference for the OpenMRP inventory management and order fulfillment platform.';

export const ORG_NAME = 'OpenMRP';

export const ORG_URL = 'https://openmrp.ai';

/** Brand accent used in generated Open Graph cards (matches --primary). */
export const BRAND_ACCENT = '#0eb981';

/** Dimensions of every generated Open Graph / Twitter card (single source of truth). */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/** Build an absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
    if (!path.startsWith('/')) path = `/${path}`;
    return `${SITE_URL}${path}`;
}

/**
 * Clamp a description for social cards. og:description is commonly truncated
 * around ~125 chars (Discord and mobile clients are the strictest), so we trim
 * at a word boundary and append an ellipsis rather than letting a platform cut
 * mid-word. The full text is still used for the SEO `description` meta tag,
 * where search engines allow ~155 chars.
 */
export function socialDescription(text: string, max = 120): string {
    const t = text.trim();
    if (t.length <= max) return t;
    const cut = t.slice(0, max);
    const lastSpace = cut.lastIndexOf(' ');
    const base = lastSpace > 40 ? cut.slice(0, lastSpace) : cut;
    return `${base.replace(/[\s.,;:—–-]+$/, '')}…`;
}

/**
 * Descriptor for a dynamically-generated Open Graph / Twitter card (served by
 * the /og route handler), for use in `openGraph.images` / `twitter.images`.
 *
 * Returns the full object — not just the URL — so Next emits explicit
 * `og:image:width`/`og:image:height`/`og:image:type` tags. Without those,
 * social/link scrapers must download and measure the image before rendering a
 * preview, which slows the preview and can cause it to be skipped. The URL is
 * site-relative; Next resolves it against metadataBase into an absolute URL.
 */
export function ogImage({
    title,
    eyebrow,
    subtitle,
}: {
    title: string;
    eyebrow?: string;
    subtitle?: string;
}): {
    url: string;
    width: number;
    height: number;
    type: string;
    alt: string;
} {
    const sp = new URLSearchParams({ t: title });
    if (eyebrow) sp.set('e', eyebrow);
    if (subtitle) sp.set('s', subtitle);
    return {
        url: `/og?${sp.toString()}`,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        type: 'image/png',
        alt: title,
    };
}

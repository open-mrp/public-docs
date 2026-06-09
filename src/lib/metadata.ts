import { ogImage, SITE_NAME, socialDescription } from '@/lib/site';
import type { Metadata } from 'next';

type OgCard = ReturnType<typeof ogImage>;

/**
 * Builds the `openGraph` and `twitter` portions of a page's metadata in one
 * place so every page is consistent:
 *  - `og:site_name` is always present (Discord/Slack show it above the title;
 *    each page must set it because a page's openGraph object *replaces* the
 *    layout's rather than merging into it);
 *  - the social description is clamped so it isn't truncated on mobile;
 *  - `twitter.card` is re-asserted (same replace-not-merge reason as siteName).
 *
 * Pass `card` (from ogImage) to attach a dimensioned social image; omit it to
 * fall back to the file-convention opengraph-image (e.g. the home page).
 */
export function socialMeta({
    title,
    description,
    url,
    type = 'article',
    card,
}: {
    title: string;
    description: string;
    url: string;
    type?: 'website' | 'article';
    card?: OgCard;
}): Pick<Metadata, 'openGraph' | 'twitter'> {
    const desc = socialDescription(description);
    return {
        openGraph: {
            type,
            siteName: SITE_NAME,
            title,
            description: desc,
            url,
            locale: 'en_US',
            ...(card ? { images: [card] } : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: desc,
            ...(card ? { images: [card] } : {}),
        },
    };
}

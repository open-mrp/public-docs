import { renderOgImage } from '@/lib/og';

/**
 * On-demand Open Graph image generator. Pages reference this via
 * `openGraph.images` (see ogImageUrl in lib/site) instead of a colocated
 * `opengraph-image` file, because Next.js cannot place metadata image files
 * inside catch-all route segments ("catch-all must be last").
 */
export function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('t') || 'Augno Documentation';
    const eyebrow = searchParams.get('e') || 'Augno Docs';
    const subtitle = searchParams.get('s') || undefined;
    return renderOgImage({ title, eyebrow, subtitle });
}

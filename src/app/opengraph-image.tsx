import { renderOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og';
import { SITE_DESCRIPTION } from '@/lib/site';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Augno Documentation';

export default function Image() {
    return renderOgImage({
        eyebrow: 'Augno Docs',
        title: 'Augno Documentation',
        subtitle: SITE_DESCRIPTION,
    });
}

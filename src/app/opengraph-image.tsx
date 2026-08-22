import { renderOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og';
import { SITE_DESCRIPTION } from '@/lib/site';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'OpenMRP Documentation';

export default function Image() {
    return renderOgImage({
        eyebrow: 'OpenMRP Docs',
        title: 'OpenMRP Documentation',
        subtitle: SITE_DESCRIPTION,
    });
}

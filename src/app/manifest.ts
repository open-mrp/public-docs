import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: SITE_NAME,
        short_name: 'OpenMRP Docs',
        description: SITE_DESCRIPTION,
        start_url: '/',
        display: 'standalone',
        background_color: '#0b0b0f',
        theme_color: '#0eb981',
        icons: [
            { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
            { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    };
}

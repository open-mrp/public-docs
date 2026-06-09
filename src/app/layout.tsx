import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site';
import { PreventFlicker } from '@augno/ui';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import React from 'react';
import { Providers } from './_components/Providers';
import './global.css';

const ibmPlexSans = IBM_Plex_Sans({
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-ibm-plex-sans',
    display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-ibm-plex-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_TITLE,
        template: '%s | Augno Documentation',
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    referrer: 'origin-when-cross-origin',
    keywords: [
        'Augno',
        'Augno API',
        'API documentation',
        'inventory management API',
        'order fulfillment API',
        'manufacturing software',
        'developer docs',
    ],
    authors: [{ name: 'Augno' }],
    creator: 'Augno',
    publisher: 'Augno',
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        siteName: SITE_NAME,
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
            { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
        ],
        apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
    manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
    themeColor: '#0eb981',
    colorScheme: 'dark light',
};

interface RootLayoutProps {
    children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <body
                className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} flex flex-col h-screen overflow-x-hidden`}
            >
                <Analytics />
                <PreventFlicker />
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}

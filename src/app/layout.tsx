'use client';

import { ApiKeyProvider } from '@/providers/ApiKeyProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { PreventFlicker } from '@augno/ui';
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import React from 'react';
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

interface RootLayoutProps {
    children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html suppressHydrationWarning className="dark">
            <body
                className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} flex flex-col h-screen overflow-x-hidden`}
            >
                <PreventFlicker />
                <AuthProvider>
                    <ApiKeyProvider>{children}</ApiKeyProvider>
                </AuthProvider>
            </body>
        </html>
    );
}

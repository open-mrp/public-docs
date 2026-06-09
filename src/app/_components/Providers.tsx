'use client';

import { ApiKeyProvider } from '@/providers/ApiKeyProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import React from 'react';

/**
 * Client-side context providers. Kept in a dedicated client component so the
 * root layout can remain a Server Component and export `metadata`/`viewport`
 * for SEO.
 */
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ApiKeyProvider>{children}</ApiKeyProvider>
        </AuthProvider>
    );
}

'use client';

import { useSdkLanguageStore } from '@/lib/sdk-language-store';
import { ApiKeyProvider } from '@/providers/ApiKeyProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import React, { useEffect } from 'react';

/**
 * Client-side context providers. Kept in a dedicated client component so the
 * root layout can remain a Server Component and export `metadata`/`viewport`
 * for SEO.
 */
export function Providers({ children }: { children: React.ReactNode }) {
    // The SDK language store uses skipHydration so SSR and the first client
    // render stay on the default; apply the persisted preference after mount.
    useEffect(() => {
        void useSdkLanguageStore.persist.rehydrate();
    }, []);

    return (
        <AuthProvider>
            <ApiKeyProvider>{children}</ApiKeyProvider>
        </AuthProvider>
    );
}

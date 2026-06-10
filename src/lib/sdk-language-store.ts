'use client';

import type { SdkLanguage } from '@/static/apiSnippets.generated';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * The languages a user can pick for SDK code previews, in display order.
 * Uncomment entries here (and ensure snippets are generated) to enable more.
 */
export const SDK_LANGUAGES: { id: SdkLanguage; label: string }[] = [
    { id: 'typescript', label: 'TypeScript' },
    // { id: 'python', label: 'Python' },
    // { id: 'go', label: 'Go' },
    { id: 'curl', label: 'cURL' },
];

const ENABLED = new Set(SDK_LANGUAGES.map((l) => l.id));
const DEFAULT_LANGUAGE: SdkLanguage = SDK_LANGUAGES[0]?.id ?? 'typescript';

export function isEnabledSdkLanguage(value: unknown): value is SdkLanguage {
    return typeof value === 'string' && ENABLED.has(value as SdkLanguage);
}

interface SdkLanguageState {
    language: SdkLanguage;
    /** True once the persisted preference has been read from localStorage. */
    hasHydrated: boolean;
    setLanguage: (language: SdkLanguage) => void;
    setHasHydrated: (hasHydrated: boolean) => void;
}

// SSR-safe storage: localStorage in the browser, no-op on the server.
const noopStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
};

/**
 * Global, persisted SDK preview language preference.
 *
 * This is a single source of truth shared by the API reference and the guide
 * pages, so changing the language anywhere (the API reference dropdown or a
 * synced code tab in a guide) updates every code example everywhere and
 * survives reloads.
 *
 * `skipHydration` keeps the server and first client render on DEFAULT_LANGUAGE;
 * rehydration is triggered after mount (see Providers) so the persisted value
 * is applied without causing a hydration mismatch.
 */
export const useSdkLanguageStore = create<SdkLanguageState>()(
    persist(
        (set) => ({
            language: DEFAULT_LANGUAGE,
            hasHydrated: false,
            setLanguage: (language) => {
                if (isEnabledSdkLanguage(language)) set({ language });
            },
            setHasHydrated: (hasHydrated) => set({ hasHydrated }),
        }),
        {
            name: 'augno-docs-sdk-language-store',
            storage: createJSONStorage(() =>
                typeof window !== 'undefined' ? localStorage : noopStorage,
            ),
            skipHydration: true,
            partialize: (state) => ({ language: state.language }),
            // Drop a persisted value that is no longer an enabled language.
            merge: (persisted, current) => {
                const stored = (persisted as Partial<SdkLanguageState> | undefined)?.language;
                return {
                    ...current,
                    language: isEnabledSdkLanguage(stored) ? stored : current.language,
                };
            },
            onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
        },
    ),
);

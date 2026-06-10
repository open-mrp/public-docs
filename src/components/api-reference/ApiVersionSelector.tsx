'use client';

import { apiVersionFromPathname, endpointSlugsFromPathname } from '@/lib/api-reference-version';
import { getApiNavEntries } from '@/static/apiNav.generated';
import { API_VERSIONS, apiReferenceBasePath } from '@/static/apiVersions.generated';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

/**
 * Stripe-style API version picker shown at the top of the API reference
 * sidenav. Switching versions keeps you on the current endpoint when it exists
 * in the target version, and falls back to that version's overview otherwise.
 */
export function ApiVersionSelector() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const currentVersion = apiVersionFromPathname(pathname);
    const current = API_VERSIONS.find((v) => v.version === currentVersion) ?? API_VERSIONS[0];

    if (API_VERSIONS.length <= 1) {
        return null;
    }

    const handleSelect = (version: string) => {
        setIsOpen(false);
        if (version === currentVersion) return;

        const basePath = apiReferenceBasePath(version);
        const slugs = endpointSlugsFromPathname(pathname);
        const endpointExistsInTarget =
            slugs &&
            getApiNavEntries(version).some(
                (e) => e.tagSlug === slugs.tagSlug && e.endpointSlug === slugs.endpointSlug,
            );
        router.push(
            endpointExistsInTarget && slugs
                ? `${basePath}/${slugs.tagSlug}/${slugs.endpointSlug}`
                : basePath,
        );
    };

    return (
        <div className="relative mx-2 mb-2">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between gap-1.5 rounded-md border border-[var(--sidenav-border)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--foreground)]/20 hover:text-[var(--foreground)] cursor-pointer"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label="API version"
            >
                <span className="truncate font-mono">{current.version}</span>
                <span className="flex shrink-0 items-center gap-1.5">
                    {current.isLatest && (
                        <span className="rounded-full bg-[var(--primary)]/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--primary)]">
                            latest
                        </span>
                    )}
                    <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                        aria-hidden
                    />
                    <div
                        className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-[var(--code-panel-border)] bg-[var(--code-background)] py-1 shadow-lg"
                        role="listbox"
                        aria-label="API versions"
                    >
                        {API_VERSIONS.map((v) => (
                            <button
                                key={v.version}
                                type="button"
                                role="option"
                                aria-selected={v.version === currentVersion}
                                onClick={() => handleSelect(v.version)}
                                className={`flex w-full items-center justify-between gap-2 px-3 py-1.5 text-left text-xs transition-colors cursor-pointer ${
                                    v.version === currentVersion
                                        ? 'bg-[var(--foreground)]/10 text-[var(--foreground)]'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--foreground)]/5 hover:text-[var(--foreground)]'
                                }`}
                            >
                                <span className="truncate font-mono">{v.version}</span>
                                {v.isLatest && (
                                    <span className="shrink-0 rounded-full bg-[var(--primary)]/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--primary)]">
                                        latest
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

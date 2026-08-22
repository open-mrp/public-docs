'use client';

import LinkButton from '@/components/buttons/LinkButton';
import { FrostedSurface } from '@/components/FrostedSurface';
import { ChevronRightIcon } from '@openmrp/ui';
import Link from 'next/link';

export function NotFoundContent() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center py-8 sm:py-14">
            <div
                className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--primary)_22%,transparent)] blur-3xl"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 rounded-full bg-[color-mix(in_srgb,var(--secondary)_12%,transparent)] blur-2xl opacity-80"
                aria-hidden
            />

            <FrostedSurface className="relative w-full max-w-lg rounded-2xl border border-[var(--border-color)] px-8 py-12 text-center shadow-lg shadow-black/20 sm:px-12 sm:py-14">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--primary)]">
                    Error 404
                </p>
                <h1 className="mt-3 font-bold tracking-tight text-[var(--home-title)] [font-variant-numeric:tabular-nums] text-[clamp(3.5rem,12vw,5.5rem)] leading-none">
                    Not found
                </h1>
                <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-[var(--text-secondary)]">
                    We couldn&apos;t find that page. It may have been moved, renamed, or the link
                    could be outdated.
                </p>
                <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
                    <LinkButton href="/" blur size="lg" variant="text" color="var(--home-title)">
                        <span className="mr-2">Back to home</span>
                        <ChevronRightIcon />
                    </LinkButton>
                    <Link
                        href="/get-started"
                        className="inline-flex items-center justify-center rounded-lg border border-[var(--border-color)] bg-[color-mix(in_srgb,var(--background)_60%,transparent)] px-5 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                    >
                        Browse documentation
                    </Link>
                </div>
            </FrostedSurface>
        </div>
    );
}

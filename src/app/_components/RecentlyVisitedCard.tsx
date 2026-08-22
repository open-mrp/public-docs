'use client';

import { FrostedSurface } from '@/components/FrostedSurface';
import { useRecentlyVisitedPages } from '@/hooks/useRecentlyVisitedPages';
import { ChevronRightIcon } from '@openmrp/ui';
import Link from 'next/link';

export function RecentlyVisitedCard() {
    const { pages, hasMounted } = useRecentlyVisitedPages();

    // Don't render until mounted to avoid hydration mismatch
    if (!hasMounted || pages.length === 0) {
        return null;
    }

    return (
        <FrostedSurface
            className="rounded-xl border border-[var(--text-secondary)]/20 dark:border-white/15
                       overflow-hidden"
        >
            {/* Header */}
            <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-[var(--text-secondary)]/20 dark:border-white/10 flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-cyan-500/30 to-blue-500/30 shrink-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-cyan-600 dark:text-cyan-300"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-stone-900 dark:text-white text-sm sm:text-base">
                        Recently Visited
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-white/50 truncate">
                        Pick up where you left off
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-5">
                {pages.map((page, index) => (
                    <Link
                        key={page.path}
                        href={page.path}
                        className="flex items-center justify-between gap-3 py-3 border-b border-[var(--text-secondary)]/20 dark:border-white/10 last:border-0
                                 group hover:bg-black/[0.04] dark:hover:bg-white/5 -mx-4 sm:-mx-5 px-4 sm:px-5 transition-colors duration-200"
                    >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span className="text-xs font-medium text-[var(--text-secondary)]/50 dark:text-white/40 tabular-nums w-4 shrink-0">
                                {index + 1}
                            </span>
                            <span className="text-sm text-[var(--foreground)] dark:text-white/80 truncate group-hover:text-[var(--foreground)] dark:group-hover:text-white transition-colors">
                                {page.title}
                            </span>
                        </div>
                        <ChevronRightIcon className="w-4 h-4 text-stone-400 dark:text-white/30 group-hover:text-stone-600 dark:group-hover:text-white/60 transition-colors shrink-0" />
                    </Link>
                ))}
            </div>
        </FrostedSurface>
    );
}

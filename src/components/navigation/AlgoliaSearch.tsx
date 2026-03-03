'use client';

import { cn } from '@/utils/cn';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Configure, Highlight, Snippet, useHits, useSearchBox } from 'react-instantsearch';
import { InstantSearchNext } from 'react-instantsearch-nextjs';

// Use environment variables for Algolia configuration
const APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '';
const API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY || '';
const INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || '';

// Algolia hit shape (search result record)
interface AlgoliaHit {
    objectID: string;
    url: string;
    kind?: string;
    crumbs?: string[];
    pageTitle?: string;
    name?: string;
    _snippetResult?: { content?: { matchLevel?: string }; description?: { matchLevel?: string } };
}

// Kind icons/badges
const kindConfig: Record<string, { label: string; color: string }> = {
    page: {
        label: 'Page',
        color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    },
    section: {
        label: 'Section',
        color: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
    },
    'api-endpoint': {
        label: 'API',
        color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    },
    guide: {
        label: 'Guide',
        color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    },
};

// Placeholder search bar (visible when dialog is closed)
function SearchTrigger({ color, onClick }: { color?: string; onClick: () => void }) {
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        queueMicrotask(() =>
            setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0),
        );
    }, []);

    return (
        <div
            onClick={onClick}
            className={cn('relative group w-full cursor-pointer')}
            style={{ color: color } as React.CSSProperties}
        >
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-10">
                <svg
                    className="h-4 w-4 text-current opacity-60"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <div
                className={`block w-full rounded-md border-0 bg-current/10 backdrop-blur-md py-2 pl-10 pr-12 text-current/50 sm:text-sm sm:leading-6`}
            >
                Search docs...
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-current/20 bg-current/5 text-[10px] font-medium text-current/50">
                    <span className="text-xs">{isMac ? '⌘' : 'Ctrl'}</span>K
                </kbd>
            </div>
        </div>
    );
}

// Search input inside the dialog
function DialogSearchInput({
    inputRef,
    query,
    refine,
}: {
    inputRef: React.RefObject<HTMLInputElement | null>;
    query: string;
    refine: (value: string) => void;
}) {
    return (
        <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 z-10">
                <svg
                    className="h-5 w-5 text-zinc-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <input
                ref={inputRef}
                id="algolia-search-dialog"
                name="search"
                className="block w-full border-0 bg-transparent py-4 pl-12 pr-12 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 text-base outline-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                placeholder="Search documentation..."
                type="search"
                value={query}
                onChange={(e) => refine(e.currentTarget.value)}
                autoComplete="off"
            />
            {/* Custom clear button */}
            {query && (
                <button
                    type="button"
                    onClick={() => {
                        refine('');
                        inputRef.current?.focus();
                    }}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                    <svg
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}

function Hit({
    hit,
    active,
    onClick,
}: {
    hit: AlgoliaHit;
    active?: boolean;
    onClick: () => void;
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const kind = kindConfig[hit.kind ?? 'page'] ?? kindConfig.page;

    useEffect(() => {
        if (active && ref.current) {
            ref.current.scrollIntoView({ block: 'nearest' });
        }
    }, [active]);

    // Build breadcrumb path from crumbs array (excluding the last item which is the name)
    const breadcrumbPath = hit.crumbs?.slice(0, -1).join(' › ') || '';

    // Check if content has a match (contains <mark> tags from Algolia highlighting)
    const contentHasMatch =
        hit._snippetResult?.content?.matchLevel === 'full' ||
        hit._snippetResult?.content?.matchLevel === 'partial';

    return (
        <a
            ref={ref}
            href={hit.url}
            tabIndex={-1}
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            onMouseDown={(e) => e.preventDefault()}
            className={cn(
                'block p-3 rounded-lg transition-none !text-inherit',
                active
                    ? 'bg-primary/10 dark:bg-primary/20'
                    : 'hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50',
            )}
        >
            <div className="flex items-start gap-3">
                {/* Kind badge */}
                <span
                    className={cn(
                        'shrink-0 px-1.5 py-0.5 text-[10px] font-medium rounded mt-0.5',
                        kind.color,
                    )}
                >
                    {kind.label}
                </span>

                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    {/* Breadcrumb path */}
                    {breadcrumbPath && (
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">
                            {breadcrumbPath}
                        </span>
                    )}

                    {/* Name with highlight - show "Page Title - Section Title" format */}
                    <h3
                        className={cn(
                            'text-sm font-semibold truncate',
                            active
                                ? 'text-secondary-600 dark:text-secondary-400'
                                : 'text-zinc-900 dark:text-zinc-100',
                        )}
                    >
                        {hit.pageTitle && hit.name && hit.pageTitle !== hit.name ? (
                            <>
                                <Highlight
                                    attribute="pageTitle"
                                    hit={hit as unknown as Parameters<typeof Highlight>[0]['hit']}
                                />
                                {' - '}
                                <Highlight
                                    attribute="name"
                                    hit={hit as unknown as Parameters<typeof Highlight>[0]['hit']}
                                />
                            </>
                        ) : (
                            <Highlight
                                attribute={hit.pageTitle ? 'pageTitle' : 'name'}
                                hit={hit as unknown as Parameters<typeof Highlight>[0]['hit']}
                            />
                        )}
                    </h3>

                    {/* Show content snippet if match is in content, otherwise description */}
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3">
                        {contentHasMatch ? (
                            <Snippet
                                attribute="content"
                                hit={hit as unknown as Parameters<typeof Snippet>[0]['hit']}
                            />
                        ) : (
                            <Snippet
                                attribute="description"
                                hit={hit as unknown as Parameters<typeof Snippet>[0]['hit']}
                            />
                        )}
                    </div>
                </div>
            </div>
        </a>
    );
}

function SearchResults({
    activeIndex,
    onHitClick,
    hits,
    query,
}: {
    activeIndex: number;
    onHitClick: (hit: AlgoliaHit) => void;
    hits: AlgoliaHit[];
    query: string;
}) {
    if (!query) {
        return (
            <div className="p-10 text-center flex flex-col items-center gap-3">
                <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                    <svg
                        className="w-5 h-5 text-zinc-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">
                        Search documentation
                    </p>
                    <p className="text-xs">Find pages, guides, and API references</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col max-h-[60vh] overflow-y-auto py-1 px-1">
            {hits.length > 0 ? (
                hits.map((hit, index) => (
                    <Hit
                        key={hit.objectID}
                        hit={hit}
                        active={index === activeIndex}
                        onClick={() => onHitClick(hit)}
                    />
                ))
            ) : (
                <div className="p-10 text-center text-zinc-500 text-sm">
                    No results for{' '}
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                        &quot;{query}&quot;
                    </span>
                </div>
            )}

            <div className="mt-1 pt-2 border-t border-zinc-100 dark:border-zinc-800 px-3 pb-2 flex justify-between items-center">
                <div className="flex gap-3 text-[10px] text-zinc-400 uppercase tracking-wide font-medium">
                    <span className="flex items-center gap-1">
                        <kbd className="px-1 border border-zinc-200 dark:border-zinc-700 rounded bg-zinc-50 dark:bg-zinc-800">
                            ↵
                        </kbd>
                        select
                    </span>
                    <span className="flex items-center gap-1">
                        <kbd className="px-1 border border-zinc-200 dark:border-zinc-700 rounded bg-zinc-50 dark:bg-zinc-800">
                            ↑↓
                        </kbd>
                        navigate
                    </span>
                    <span className="flex items-center gap-1">
                        <kbd className="px-1 border border-zinc-200 dark:border-zinc-700 rounded bg-zinc-50 dark:bg-zinc-800">
                            esc
                        </kbd>
                        close
                    </span>
                </div>
            </div>
        </div>
    );
}

// Search Dialog Component
function SearchDialog({
    isOpen,
    isAnimating,
    onClose,
}: {
    isOpen: boolean;
    isAnimating: boolean;
    onClose: () => void;
}) {
    const { hits } = useHits();
    const { query, refine } = useSearchBox();
    const [activeIndex, setActiveIndex] = useState(-1);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    // SSR safety - only render portal on client
    useEffect(() => {
        queueMicrotask(() => setMounted(true));
    }, []);

    useEffect(() => {
        queueMicrotask(() => setActiveIndex(-1));
    }, [query]);

    // Focus input when dialog opens
    useEffect(() => {
        if (isOpen && !isAnimating) {
            // Small delay to ensure the dialog is rendered
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen, isAnimating]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIndex((prev) => (prev < hits.length - 1 ? prev + 1 : prev));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
            } else if (e.key === 'Enter') {
                if (activeIndex >= 0 && hits[activeIndex]) {
                    e.preventDefault();
                    router.push(hits[activeIndex].url);
                    onClose();
                }
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, hits, activeIndex, router, onClose]);

    const handleHitClick = (hit: AlgoliaHit) => {
        router.push(hit.url);
        onClose();
    };

    if (!mounted || (!isOpen && !isAnimating)) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100]">
            {/* Backdrop with blur */}
            <div
                className={cn(
                    'absolute inset-0 bg-black/20 backdrop-blur-md transition-opacity duration-300',
                    isOpen && !isAnimating ? 'opacity-100' : 'opacity-0',
                )}
                onClick={onClose}
            />

            {/* Dialog */}
            <div
                className={cn(
                    'absolute left-1/2 top-[15vh] -translate-x-1/2 w-[min(640px,90vw)]',
                    'bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl backdrop-saturate-150',
                    'border border-zinc-200/50 dark:border-zinc-700/50',
                    'shadow-2xl shadow-black/20 rounded-2xl overflow-hidden',
                    'transition-all duration-300 ease-out origin-top',
                    isOpen && !isAnimating
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 -translate-y-2',
                )}
            >
                {/* Search input */}
                <div className="border-b border-zinc-200/50 dark:border-zinc-700/50">
                    <DialogSearchInput inputRef={inputRef} query={query} refine={refine} />
                </div>

                {/* Results */}
                <SearchResults
                    activeIndex={activeIndex}
                    onHitClick={handleHitClick}
                    hits={hits as unknown as AlgoliaHit[]}
                    query={query}
                />
            </div>
        </div>,
        document.body,
    );
}

const InnerSearch = React.memo(function InnerSearch({
    color,
    isOpen,
    setIsOpen,
}: {
    color?: string;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}) {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleOpen = useCallback(() => {
        setIsAnimating(true);
        setIsOpen(true);
        // Allow animation to start, then mark as not animating
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setIsAnimating(false);
            });
        });
    }, [setIsOpen]);

    const handleClose = useCallback(() => {
        setIsAnimating(true);
        // Start close animation
        requestAnimationFrame(() => {
            setIsOpen(false);
            // Wait for animation to complete
            setTimeout(() => {
                setIsAnimating(false);
            }, 300);
        });
    }, [setIsOpen]);

    // Keyboard shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                if (isOpen) {
                    handleClose();
                } else {
                    handleOpen();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleOpen, handleClose]);

    // Lock body scroll when dialog is open, compensating for scrollbar width to prevent reflow
    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isOpen]);

    return (
        <>
            <SearchTrigger color={color} onClick={handleOpen} />
            <SearchDialog isOpen={isOpen} isAnimating={isAnimating} onClose={handleClose} />
        </>
    );
});

export default function AlgoliaSearch({
    color,
    className,
}: {
    color?: string;
    className?: string;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const searchClient = useMemo(
        () => (APP_ID && API_KEY ? algoliasearch(APP_ID, API_KEY) : null),
        [],
    );
    const future = useMemo(() => ({ preserveSharedStateOnUnmount: true }), []);

    if (!APP_ID || !API_KEY || !INDEX_NAME) {
        return (
            <div className={cn('text-xs text-red-500 italic', className)}>
                Algolia configuration missing
            </div>
        );
    }

    return (
        <div className={cn('relative z-50', className)}>
            <InstantSearchNext
                searchClient={searchClient}
                indexName={INDEX_NAME}
                future={future}
                ignoreMultipleHooksWarning={true}
            >
                <Configure
                    hitsPerPage={10}
                    attributesToSnippet={['description:30', 'content:50']}
                    attributesToHighlight={['name', 'pageTitle', 'description', 'content']}
                />
                <InnerSearch color={color} isOpen={isOpen} setIsOpen={setIsOpen} />
            </InstantSearchNext>
        </div>
    );
}

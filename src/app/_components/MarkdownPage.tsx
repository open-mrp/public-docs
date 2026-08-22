'use client';

import TableOfContents from '@/components/markdown/TableOfContents';
import { DocBreadcrumbs } from '@/components/navigation/DocBreadcrumbs';
import PageFeedback from '@/components/navigation/PageFeedback';
import { useRecentlyVisitedPages } from '@/hooks/useRecentlyVisitedPages';
import { extractHeadingsFromDom } from '@/lib/mdx/extractHeadings';
import { Frontmatter } from '@/lib/mdx/fetchPageBySlug';
import { buildBreadcrumbsFromRoute } from '@/static/breadcrumbConfig';
import { TocItem } from '@/types/toc';
import { CheckIcon, ClipboardIcon, DocPageHeader } from '@augno/ui';
import copy from 'copy-to-clipboard';
import { JSXElementConstructor, ReactElement, useEffect, useRef, useState } from 'react';

interface MarkdownPageProps {
    meta: Frontmatter & { slug: string; filePath: string };
    content: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
    cleanMarkdown: string;
}

export function MarkdownPage({ meta, content, cleanMarkdown }: MarkdownPageProps) {
    const contentRootRef = useRef<HTMLDivElement | null>(null);
    const [headings, setHeadings] = useState<TocItem[]>([]);
    const [copied, setCopied] = useState(false);
    const { addPage } = useRecentlyVisitedPages();

    const handleCopy = () => {
        copy(cleanMarkdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Track page visit for recently visited pages
    useEffect(() => {
        if (meta.slug && meta.title) {
            addPage('/' + meta.slug, meta.title);
        }
    }, [meta.slug, meta.title, addPage]);

    // Extract headings from the DOM and keep them updated as more content hydrates/streams.
    useEffect(() => {
        const root = contentRootRef.current;
        if (!root) return;

        let raf: number | null = null;
        const recompute = () => {
            if (raf != null) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                setHeadings(extractHeadingsFromDom(root));
            });
        };

        // Initial compute after mount
        recompute();

        const observer = new MutationObserver(() => recompute());
        observer.observe(root, { subtree: true, childList: true });

        return () => {
            observer.disconnect();
            if (raf != null) cancelAnimationFrame(raf);
        };
    }, [content]);

    const hasToc = meta.toc !== false && headings.length > 0;

    return (
        <div
            className={`grid gap-4 lg:gap-8 grid-cols-1 ${hasToc ? 'lg:grid-cols-[minmax(0,1fr)_14rem]' : ''}`}
        >
            <div className={`max-w-none ${hasToc ? 'lg:col-start-1 lg:col-end-3' : ''}`}>
                <DocBreadcrumbs
                    crumbs={buildBreadcrumbsFromRoute('/' + meta.slug, meta.title)}
                    className="pb-4"
                />
                <div className="flex flex-col items-start">
                    <DocPageHeader title={meta.title} subtitle={meta.subtitle} className="pb-6" />
                    <button
                        className="relative flex items-center gap-2 whitespace-nowrap shrink-0 px-0 py-0 hover:bg-transparent hover:text-gray-900 dark:hover:text-gray-300 hover:cursor-pointer text-[var(--text-secondary)] overflow-hidden"
                        onClick={handleCopy}
                    >
                        <span
                            className={`
                                inline-flex items-center gap-2
                                transition-all duration-300 ease-out
                                ${copied ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}
                            `}
                        >
                            <ClipboardIcon />
                            <span className="text-xs font-medium">Copy for LLM</span>
                        </span>
                        <span
                            className={`
                                absolute inline-flex items-center gap-2
                                transition-all duration-300 ease-out
                                ${copied ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
                            `}
                        >
                            <CheckIcon />
                            <span className="text-xs font-medium">Copied!</span>
                        </span>
                    </button>
                </div>
                <hr className="mt-8 mb-0 border-t-1 border-[var(--border-color)]" />
            </div>

            <div className="min-w-0 row-start-2 max-w-4xl xl:max-w-6xl 2xl:max-w-6xl w-full lg:col-start-1">
                <div
                    ref={contentRootRef}
                    className="[&>:first-child]:!mt-0 [&>:first-child]:!pt-0 [&>:first-child>:first-child]:!mt-0 [&>:first-child>:first-child]:!pt-0"
                >
                    {content}
                </div>
                <PageFeedback title={meta.title} slug={meta.slug} filePath={meta.filePath} />
            </div>

            {hasToc && (
                <div className="hidden lg:block min-w-0 row-start-2 lg:col-start-2">
                    <TableOfContents headings={headings} />
                </div>
            )}
        </div>
    );
}

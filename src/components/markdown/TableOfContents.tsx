'use client';

import { useTocThumb } from '@/hooks/useTocThumb';
import { TocItem } from '@/types/toc';
import { cn } from '@/utils/cn';
import {
    createContext,
    useCallback,
    useContext,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import ParagraphIcon from '../icons/ParagraphIcon';

// Context for sharing active heading IDs from the thumb (can be 1 or 2 IDs)
const ActiveIdsContext = createContext<string[]>([]);

interface TableOfContentsProps {
    headings: TocItem[];
}

// Scroll Provider - scrolls container to active anchor
function ScrollProvider({
    containerRef,
    activeId,
    children,
}: {
    containerRef: React.RefObject<HTMLDivElement | null>;
    activeId: string;
    children: React.ReactNode;
}) {
    const rafRef = useRef<number | null>(null);
    const [fadeTop, setFadeTop] = useState(false);
    const [fadeBottom, setFadeBottom] = useState(false);

    const updateFades = useCallback((): void => {
        const el = containerRef.current;
        if (!el) return;
        const tolerance = 1; // account for sub-pixel rounding
        const hasOverflow = el.scrollHeight > el.clientHeight + tolerance;
        const showTop = hasOverflow && el.scrollTop > 0;
        const showBottom =
            hasOverflow && el.scrollTop + el.clientHeight < el.scrollHeight - tolerance;
        setFadeTop(showTop);
        setFadeBottom(showBottom);
    }, [containerRef]);

    // Track container scroll for fade effects and auto-scroll active item into view
    useLayoutEffect(() => {
        const container = containerRef.current;
        const onContainerScroll = () => {
            updateFades();
        };
        container?.addEventListener('scroll', onContainerScroll, {
            passive: true,
        });

        const onResize = () => updateFades();
        window.addEventListener('resize', onResize, { passive: true });

        // initial paint (defer to avoid setState-in-effect)
        queueMicrotask(() => updateFades());

        return () => {
            container?.removeEventListener('scroll', onContainerScroll);
            window.removeEventListener('resize', onResize);
        };
    }, [containerRef, updateFades]);

    // Prevent TOC scroll from affecting main page scroll
    // We use CSS overscroll-behavior: contain for most cases, and only prevent
    // propagation at boundaries to prevent scroll chaining
    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const preventScrollPropagation = (e: WheelEvent) => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const isAtTop = scrollTop <= 0;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
            const hasOverflow = scrollHeight > clientHeight + 1;

            // Only prevent at boundaries when container has overflow
            // This prevents scroll chaining while allowing normal scrolling
            if (hasOverflow && ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom))) {
                e.stopPropagation();
            }
            // Otherwise, let CSS overscroll-behavior handle it
        };

        container.addEventListener('wheel', preventScrollPropagation, {
            passive: true, // Changed to passive since we're not preventing default
        });

        return () => {
            container.removeEventListener('wheel', preventScrollPropagation);
        };
    }, [containerRef]);

    // Keep the active TOC item centered in the scroll container
    useLayoutEffect(() => {
        if (!containerRef.current || !activeId) return;
        const container = containerRef.current;
        const activeEl = container.querySelector(`a[href="#${activeId}"]`) as HTMLElement | null;
        if (!activeEl) return;

        // Scroll so the active element is roughly centered in the container
        const containerHeight = container.clientHeight;
        const elTop = activeEl.offsetTop;
        const elHeight = activeEl.offsetHeight;
        const targetScrollTop = elTop - containerHeight / 2 + elHeight / 2;

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            container.scrollTo({
                top: Math.max(0, targetScrollTop),
                behavior: 'smooth',
            });
        });
    }, [activeId, containerRef]);

    const fadeSize = 24;
    const maskStops =
        fadeTop && fadeBottom
            ? `transparent 0, black ${fadeSize}px, black calc(100% - ${fadeSize}px), transparent 100%`
            : fadeTop
              ? `transparent 0, black ${fadeSize}px, black 100%`
              : fadeBottom
                ? `black 0, black calc(100% - ${fadeSize}px), transparent 100%`
                : `black 0, black 100%`;

    return (
        <div
            ref={containerRef}
            className="min-h-0 overflow-y-auto flex-1 overscroll-none toc-scroll"
            style={{
                maskImage: `linear-gradient(to bottom, ${maskStops})`,
                WebkitMaskImage: `linear-gradient(to bottom, ${maskStops})`,
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                // Ensure scroll isolation
                overscrollBehavior: 'contain',
            }}
        >
            {children}
        </div>
    );
}

// TOC Item - individual anchor item
function TOCItem({
    item,
    primaryId,
    upper = item.level,
    baseLevel,
}: {
    item: TocItem;
    primaryId: string;
    upper?: number;
    baseLevel: number;
}): React.ReactElement {
    const groupActiveIds = useContext(ActiveIdsContext);
    const isActive = primaryId === item.id || groupActiveIds.includes(item.id);
    const offset = getLineOffsetWithBase(item.level, baseLevel),
        upperOffset = getLineOffsetWithBase(upper, baseLevel);

    // Maintain a consistent 45° descent when jumping multiple levels down by
    // inserting extra vertical space prior to the item.
    const step = LINE_STEP;
    const deltaAbs = Math.abs(offset - upperOffset);
    const levelSteps = Math.round(deltaAbs / step);
    const extraTopMargin = levelSteps > 1 ? (levelSteps - 1) * step : 0;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // Update the URL to include the hash
        const url = new URL(window.location.href);
        url.hash = item.id;
        window.history.pushState({}, '', url);

        // Find the scrollable main element (not window)
        const mainElement = document.querySelector('main.overflow-y-auto') as HTMLElement | null;

        // Smooth scroll to the target element
        const targetElement = document.getElementById(item.id);
        if (targetElement) {
            // Use requestAnimationFrame to ensure DOM is ready
            requestAnimationFrame(() => {
                if (mainElement) {
                    // For main element, calculate relative position
                    const containerRect = mainElement.getBoundingClientRect();
                    const elementRect = targetElement.getBoundingClientRect();
                    const scrollTop = mainElement.scrollTop;
                    const targetScrollTop = scrollTop + elementRect.top - containerRect.top;

                    mainElement.scrollTo({
                        top: targetScrollTop,
                        behavior: 'smooth',
                    });
                } else {
                    // Fallback to window scroll
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            });
        }
    };

    return (
        <a
            href={`#${item.id}`}
            data-active={isActive}
            onClick={handleClick}
            style={{
                paddingInlineStart: `${getItemOffsetWithBase(item.level, baseLevel)}px`,
                // Introduce spacer when jumping multiple levels down to preserve 45° path
                marginTop: extraTopMargin,
            }}
            className={cn(
                'relative py-2 transition-colors duration-300 ease-out [overflow-wrap:anywhere] first:pt-0 last:pb-0',
                isActive ? '!text-primary font-medium' : '!text-text-secondary pr-1',
            )}
        >
            {item.number ? `${item.number}. ` : ''}
            {item.text}
        </a>
    );
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingIds = useMemo(() => headings.map((h) => h.id), [headings]);
    const baseLevel = useMemo(
        () => (headings.length ? Math.min(...headings.map((h) => h.level)) : 1),
        [headings],
    );
    const { pos, activeIds, primaryId, idsInSpan } = useTocThumb(containerRef, headingIds);
    const [svg, setSvg] = useState<{
        path: string;
        width: number;
        height: number;
    }>();

    useLayoutEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        function onResize(): void {
            if (container.clientHeight === 0) return;
            let w = 0,
                h = 0;
            const d: string[] = [];
            let prevOffset: number | null = null;
            let prevBottom: number | null = null;

            for (let i = 0; i < headings.length; i++) {
                const element: HTMLElement | null = container.querySelector(
                    `a[href="#${headings[i].id}"]`,
                );
                if (!element) continue;

                const styles = getComputedStyle(element);
                const offset = getLineOffsetWithBase(headings[i].level, baseLevel),
                    top = element.offsetTop + parseFloat(styles.paddingTop),
                    bottom =
                        element.offsetTop + element.clientHeight - parseFloat(styles.paddingBottom);

                w = Math.max(offset, w);
                h = Math.max(h, bottom);

                if (i === 0) {
                    d.push(`M${offset} ${top}`);
                    d.push(`L${offset} ${bottom}`);
                } else {
                    // Connect from previous bottom to this top using 45° steps of LINE_STEP
                    if (prevOffset != null && prevBottom != null) {
                        const dx = offset - prevOffset;
                        const absDx = Math.abs(dx);
                        if (absDx === 0) {
                            // Vertical move
                            d.push(`L${offset} ${top}`);
                        } else {
                            const step = LINE_STEP * (dx > 0 ? 1 : -1);
                            const steps = Math.round(absDx / LINE_STEP);
                            let currentX: number = prevOffset as number;
                            let currentY: number = prevBottom as number;
                            for (let s = 1; s <= steps; s++) {
                                currentX += step;
                                currentY += LINE_STEP;
                                d.push(`L${currentX} ${currentY}`);
                            }
                            // Final correction to exact top in case of rounding
                            if (currentX !== offset || currentY !== top) {
                                d.push(`L${offset} ${top}`);
                            }
                        }
                    }
                    // Draw the vertical segment for this item
                    d.push(`L${offset} ${bottom}`);
                }

                prevOffset = offset;
                prevBottom = bottom;
            }

            setSvg({
                path: d.join(' '),
                width: w,
                height: h,
            });
        }

        const observer = new ResizeObserver(onResize);
        onResize();

        observer.observe(container);
        return () => {
            observer.disconnect();
        };
    }, [headings, baseLevel]);

    if (headings.length === 0) {
        return null;
    }

    return (
        <nav
            className="hidden lg:flex sticky top-[24px] max-h-[calc(100vh-48px)] min-h-0 flex-col overscroll-none"
            style={{ overscrollBehavior: 'none' }}
        >
            <span className="flex items-center gap-2 mb-4 text-text-secondary">
                <ParagraphIcon />
                <div className="text-sm font-medium text-text-secondary">On this page</div>
            </span>

            <ScrollProvider containerRef={containerRef} activeId={primaryId}>
                <div className="relative min-h-0 text-sm text-gray-600">
                    {svg ? (
                        <div
                            className="absolute left-0 top-0 z-10 pointer-events-none"
                            style={{
                                width: svg.width + 3 + 2,
                                height: svg.height,
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox={`-1 0 ${svg.width + 3 + 2} ${svg.height}`}
                                width={svg.width + 3 + 2}
                                height={svg.height}
                            >
                                <g transform="translate(0.5,0)">
                                    <path
                                        d={svg.path}
                                        className="stroke-gray-300"
                                        strokeWidth="1"
                                        strokeLinecap="square"
                                        shapeRendering="crispEdges"
                                        fill="none"
                                    />
                                </g>
                            </svg>
                        </div>
                    ) : null}
                    {svg ? (
                        <div
                            className="absolute left-0 top-0 z-20 pointer-events-none"
                            style={{
                                // Add left padding in the mask to avoid clipping on the left edge and
                                // include stroke width to avoid clipping on the right edge
                                width: svg.width + 3 + 2,
                                height: svg.height,
                                maskImage: `url("data:image/svg+xml,${
                                    // Inline SVG
                                    encodeURIComponent(
                                        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 0 ${
                                            svg.width + 3 + 2
                                        } ${svg.height}"><g transform="translate(0.5,0)"><path d="${
                                            svg.path
                                        }" stroke="black" stroke-width="3" stroke-linecap="square" shape-rendering="crispEdges" fill="none" /></g></svg>`,
                                    )
                                }")`,
                                WebkitMaskImage: `url("data:image/svg+xml,${encodeURIComponent(
                                    `<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-1 0 ${
                                        svg.width + 3 + 2
                                    } ${svg.height}\"><g transform=\"translate(0.5,0)\"><path d=\"${
                                        svg.path
                                    }\" stroke=\"black\" stroke-width=\"3\" stroke-linecap=\"square\" shape-rendering=\"crispEdges\" fill=\"none\" /></g></svg>`,
                                )}")`,
                                maskRepeat: 'no-repeat',
                                WebkitMaskRepeat: 'no-repeat',
                            }}
                        >
                            <div
                                className="bg-primary transition-all duration-300 ease-out"
                                style={{
                                    marginTop: pos[0],
                                    height: pos[1],
                                }}
                            />
                        </div>
                    ) : null}

                    <ActiveIdsContext.Provider value={idsInSpan.length ? idsInSpan : activeIds}>
                        <div className="flex flex-col">
                            {headings.map((item, i) => (
                                <TOCItem
                                    key={item.id}
                                    item={item}
                                    primaryId={primaryId}
                                    upper={headings[i - 1]?.level}
                                    baseLevel={baseLevel}
                                />
                            ))}
                        </div>
                    </ActiveIdsContext.Provider>
                </div>
            </ScrollProvider>
        </nav>
    );
}

function getItemOffsetWithBase(depth: number, baseLevel: number): number {
    // Keep a constant gap between the path and the text across levels
    return getLineOffsetWithBase(depth, baseLevel) + ITEM_GAP;
}

function getLineOffsetWithBase(depth: number, baseLevel: number): number {
    // Horizontal offset grows by LINE_STEP starting at the page's base level
    // base -> 0, base+1 -> 1*LINE_STEP, base+2 -> 2*LINE_STEP, ...
    const delta = Math.max(0, depth - baseLevel);
    return delta * LINE_STEP;
}

// Keep the line step size centralized so vertical space/diagonals align
const LINE_STEP = 16;
const ITEM_GAP = 16;

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export function useTocThumb(
    containerRef: React.RefObject<HTMLDivElement | null>,
    headingIds: string[],
) {
    const [pos, setPos] = useState<[number, number]>([0, 0]);
    const [activeIds, setActiveIds] = useState<string[]>([]);
    const [primaryId, setPrimaryId] = useState<string>('');
    const [idsInSpan, setIdsInSpan] = useState<string[]>([]);
    const headingIdsKey = useMemo(() => headingIds.join('|'), [headingIds]);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);
    const lastPrimaryRef = useRef<string>('');
    const lastPrimaryScoreRef = useRef<number>(0);

    useEffect(() => {
        if (!containerRef.current || headingIds.length === 0) return;

        const container = containerRef.current;

        // Find the main scroll container (main.overflow-y-auto) or fall back to window
        const findScrollContainer = (): HTMLElement | null => {
            const mainElement = document.querySelector(
                'main.overflow-y-auto',
            ) as HTMLElement | null;
            return mainElement;
        };

        const scrollContainer = findScrollContainer();

        // Measure anchor positions inside the TOC container
        const readAnchorMetrics = () => {
            const tops: number[] = [];
            const heights: number[] = [];
            for (let i = 0; i < headingIds.length; i++) {
                const id = headingIds[i];
                const anchor = container.querySelector(`a[href="#${id}"]`) as HTMLElement | null;
                if (!anchor) {
                    tops.push(i > 0 ? tops[i - 1] : 0);
                    heights.push(i > 0 ? heights[i - 1] : 20);
                    continue;
                }
                const styles = getComputedStyle(anchor);
                const paddingTop = parseFloat(styles.paddingTop) || 0;
                const paddingBottom = parseFloat(styles.paddingBottom) || 0;
                tops.push(anchor.offsetTop + paddingTop);
                heights.push(Math.max(0, anchor.clientHeight - paddingTop - paddingBottom));
            }
            return { tops, heights };
        };

        // Compute active sections by overlap with a focus band to avoid flicker
        const recomputeFromScroll = () => {
            if (headingIds.length === 0) return;

            const { tops: anchorTops, heights: anchorHeights } = readAnchorMetrics();

            // Determine if we're at the bottom of the scroll container
            let atBottom = false;
            if (scrollContainer) {
                const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
                atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 2;
            } else {
                const doc = document.documentElement;
                atBottom = Math.ceil(window.scrollY + window.innerHeight) >= doc.scrollHeight - 2;
            }

            if (atBottom) {
                const lastIndex = headingIds.length - 1;
                const top = anchorTops[lastIndex];
                const height = anchorHeights[lastIndex];
                setPos([top, height]);
                setActiveIds([headingIds[lastIndex]]);
                setPrimaryId(headingIds[lastIndex]);
                setIdsInSpan([headingIds[lastIndex]]);
                lastPrimaryRef.current = headingIds[lastIndex];
                lastPrimaryScoreRef.current = 1;
                return;
            }

            // Define focus band relative to the scroll container or viewport
            // Use getBoundingClientRect to get positions relative to viewport
            const viewportHeight = window.innerHeight;
            const bandTop = Math.round(viewportHeight * 0.02);
            const bandBottom = Math.round(viewportHeight * 0.95);
            const bandHeight = Math.max(1, bandBottom - bandTop);

            // Measure overlap ratio for each heading within band
            // getBoundingClientRect gives us positions relative to viewport, which works
            // correctly regardless of which element is scrolling
            const headingRects: Array<DOMRect | null> = headingIds.map((id) => {
                const el = document.getElementById(id);
                return el ? el.getBoundingClientRect() : null;
            });
            const overlaps: number[] = headingRects.map((rect) => {
                if (!rect) return 0;
                const y1 = Math.max(rect.top, bandTop);
                const y2 = Math.min(rect.bottom, bandBottom);
                const overlap = Math.max(0, y2 - y1);
                const denom = Math.max(1, Math.min(rect.height, bandHeight));
                return overlap / denom;
            });

            // Active set: those with enough overlap
            const VISIBLE_THRESHOLD = 0.12;
            const visibleIdxs = overlaps
                .map((v, i) => (v >= VISIBLE_THRESHOLD ? i : -1))
                .filter((i) => i !== -1);

            // Always include the best candidate if none cross threshold
            let bestIdx = 0;
            let bestScore = -1;
            for (let i = 0; i < overlaps.length; i++) {
                if (overlaps[i] > bestScore) {
                    bestScore = overlaps[i];
                    bestIdx = i;
                }
            }
            // activeIdxs drives highlighting; seed from visible, fall back to bestIdx
            const activeIdxs = visibleIdxs.length > 0 ? [...visibleIdxs] : [bestIdx];

            // Hysteresis: keep last primary unless a new one wins by margin
            const HYSTERESIS = 0.06;
            let primaryIdx = bestIdx;
            const lastPrimary = lastPrimaryRef.current;
            const lastIdx = lastPrimary ? headingIds.indexOf(lastPrimary) : -1;
            const lastScore = lastIdx >= 0 ? overlaps[lastIdx] : 0;

            if (lastIdx >= 0 && bestIdx !== lastIdx) {
                if (overlaps[bestIdx] < lastScore + HYSTERESIS) {
                    // Keep last primary
                    primaryIdx = lastIdx;
                }
            }

            // Update outputs
            setActiveIds(activeIdxs.map((i) => headingIds[i]));
            setPrimaryId(headingIds[primaryIdx]);
            lastPrimaryRef.current = headingIds[primaryIdx];
            lastPrimaryScoreRef.current = overlaps[primaryIdx];

            // Thumb spans multiple sections when between or when multiple are visible
            let spanStart = primaryIdx;
            let spanEnd = primaryIdx;

            if (visibleIdxs.length >= 2) {
                // Multiple headings visibly overlap the band
                spanStart = Math.min(...visibleIdxs);
                spanEnd = Math.max(...visibleIdxs);
            }
            // else: zero or one heading visible -> keep single-span at primary

            const top = anchorTops[spanStart];
            const height = anchorTops[spanEnd] + anchorHeights[spanEnd] - anchorTops[spanStart];
            setPos([top, Math.max(0, height)]);
            setIdsInSpan(headingIds.slice(spanStart, spanEnd + 1));
        };

        const onScroll = () => {
            requestAnimationFrame(recomputeFromScroll);
        };

        const onResize = () => {
            requestAnimationFrame(recomputeFromScroll);
        };

        // Also keep thumb aligned when the TOC container itself scrolls (anchors move visually)
        const onContainerScroll = () => {
            requestAnimationFrame(recomputeFromScroll);
        };

        // Observe size changes of the container and its content to keep metrics fresh
        if (!resizeObserverRef.current) {
            resizeObserverRef.current = new ResizeObserver(() => {
                requestAnimationFrame(recomputeFromScroll);
            });
        }
        resizeObserverRef.current.observe(container);

        // Initial compute
        recomputeFromScroll();

        // Listen to the main scroll container if it exists, otherwise fall back to window
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', onScroll, { passive: true });
        } else {
            window.addEventListener('scroll', onScroll, { passive: true });
        }
        window.addEventListener('resize', onResize);
        container.addEventListener('scroll', onContainerScroll, {
            passive: true,
        });

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', onScroll);
            } else {
                window.removeEventListener('scroll', onScroll);
            }
            window.removeEventListener('resize', onResize);
            container.removeEventListener('scroll', onContainerScroll);
            if (resizeObserverRef.current) {
                resizeObserverRef.current.unobserve(container);
            }
        };
    }, [containerRef, headingIds, headingIdsKey]);

    // Recompute when headingIds change (e.g., new content)
    useEffect(() => {
        if (!containerRef.current) return;

        // Trigger a layout pass next tick
        requestAnimationFrame(() => {
            const event = new Event('resize');
            window.dispatchEvent(event);
        });
    }, [headingIds, containerRef]);

    return { pos, activeIds, primaryId, idsInSpan };
}

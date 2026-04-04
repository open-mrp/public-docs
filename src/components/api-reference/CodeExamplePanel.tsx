'use client';

import { useCodeReplacements } from '@/providers/ApiKeyProvider';
import { CodeEditor } from '@augno/ui';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

type ExampleTab = {
    id: string;
    label: string;
    language: string;
    code: string;
};

interface CodeExamplePanelProps {
    title: string;
    subtitle?: string;
    tabs: ExampleTab[];
    /**
     * When true, the code area is capped at the remaining height inside the
     * panel (after the header) and scrolls via CodeEditor's maxHeight prop.
     * The panel itself should be given a height constraint by its parent
     * (e.g. via flex-initial min-h-0 in a flex container).
     */
    scrollable?: boolean;
    className?: string;
}

export function CodeExamplePanel({
    title,
    subtitle,
    tabs,
    scrollable,
    className = '',
}: CodeExamplePanelProps) {
    const replacements = useCodeReplacements();
    const replacementKey = useMemo(() => JSON.stringify(replacements), [replacements]);
    const [activeId, setActiveId] = useState(tabs[0]?.id ?? '');
    const active = useMemo(
        () => tabs.find((t) => t.id === activeId) ?? tabs[0],
        [tabs, activeId],
    );

    const panelRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [codeMaxHeight, setCodeMaxHeight] = useState<number | undefined>();

    const computeMaxHeight = useCallback(() => {
        const panel = panelRef.current;
        const header = headerRef.current;
        if (!panel || !header) return;
        const parent = panel.parentElement;
        if (!parent) return;

        const gap = parseFloat(getComputedStyle(parent).rowGap || '0') || 0;
        let siblingsHeight = 0;
        for (const child of Array.from(parent.children)) {
            if (child !== panel) siblingsHeight += (child as HTMLElement).offsetHeight;
        }
        const gapCount = parent.children.length - 1;
        const availableForPanel = parent.clientHeight - siblingsHeight - gapCount * gap;

        const panelStyle = getComputedStyle(panel);
        const panelBorder =
            parseFloat(panelStyle.borderTopWidth) + parseFloat(panelStyle.borderBottomWidth);

        const available = availableForPanel - header.offsetHeight - panelBorder;
        if (available > 0) setCodeMaxHeight(available);
    }, []);

    // Measure synchronously before first paint to avoid a flash of unconstrained content.
    useLayoutEffect(() => {
        if (!scrollable) return;
        computeMaxHeight();
    }, [scrollable, computeMaxHeight]);

    // Re-measure when the parent container resizes (e.g. viewport change).
    useEffect(() => {
        if (!scrollable) return;
        const parent = panelRef.current?.parentElement;
        if (!parent) return;

        const observer = new ResizeObserver(computeMaxHeight);
        observer.observe(parent);
        return () => observer.disconnect();
    }, [scrollable, computeMaxHeight]);

    if (!active) return null;

    return (
        <div
            ref={panelRef}
            className={`rounded-xl border border-[#2a2a2a] bg-[#0f0f0f] overflow-hidden ${
                scrollable ? 'min-h-0' : ''
            } ${className}`}
        >
            <div ref={headerRef}>
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#2a2a2a]">
                    <div className="flex items-center gap-3 min-w-0">
                        <span className="text-sm font-medium text-gray-200 truncate">
                            {title}
                        </span>
                        {tabs.length > 1 && (
                            <div className="flex items-center gap-1 shrink-0">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveId(tab.id)}
                                        className={`px-2 py-0.5 text-xs rounded transition-colors cursor-pointer ${
                                            tab.id === activeId
                                                ? 'bg-white/10 text-gray-200'
                                                : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {subtitle && (
                    <div className="px-4 py-1.5 border-b border-[#2a2a2a]">
                        <span className="text-xs text-gray-500">{subtitle}</span>
                    </div>
                )}
            </div>
            <CodeEditor
                maxHeight={scrollable ? codeMaxHeight : undefined}
                className="!mt-0 !rounded-none !p-0"
                key={`${active.id}-${replacementKey}`}
                replacements={replacements}
                showLanguageLabel={false}
            >
                <code className={`language-${active.language}`}>{active.code}</code>
            </CodeEditor>
        </div>
    );
}

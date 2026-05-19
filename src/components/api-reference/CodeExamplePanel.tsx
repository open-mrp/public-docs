'use client';

import { useCodeReplacements } from '@/providers/ApiKeyProvider';
import { CodeEditor } from '@augno/ui';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';

type ExampleTab = {
    id: string;
    label: string;
    language: string;
    code: string;
};

interface CodeExamplePanelProps {
    title: string;
    subtitle?: string;
    /** Rendered on the right side of the panel header (e.g. SDK language picker). */
    headerActions?: ReactNode;
    tabs: ExampleTab[];
    /**
     * When true, the panel participates in its parent's flex layout with
     * min-h-0 so the embedded CodeEditor can shrink and scroll inside the
     * height the parent grants it.
     */
    scrollable?: boolean;
    className?: string;
}

export function CodeExamplePanel({
    title,
    subtitle,
    headerActions,
    tabs,
    scrollable,
    className = '',
}: CodeExamplePanelProps) {
    const replacements = useCodeReplacements();
    const replacementKey = useMemo(() => JSON.stringify(replacements), [replacements]);
    const [activeId, setActiveId] = useState(tabs[0]?.id ?? '');
    const active = useMemo(() => tabs.find((t) => t.id === activeId) ?? tabs[0], [tabs, activeId]);
    const tabIds = useMemo(() => tabs.map((t) => t.id).join('\0'), [tabs]);

    useEffect(() => {
        setActiveId((current) => {
            if (tabs.some((t) => t.id === current)) return current;
            return tabs[0]?.id ?? '';
        });
    }, [tabIds, tabs]);

    if (!active) return null;

    return (
        <div
            className={`rounded-xl border border-[#2a2a2a] bg-[#0f0f0f] overflow-hidden flex flex-col ${
                scrollable ? 'min-h-0' : ''
            } ${className}`}
        >
            <div className="flex-none">
                <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-[#2a2a2a]">
                    <span className="text-sm font-medium text-gray-200 truncate min-w-0 flex-1">
                        {title}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                        {tabs.length > 1 && (
                            <div className="flex items-center gap-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
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
                        {headerActions}
                    </div>
                </div>
                {subtitle && (
                    <div className="px-4 py-1.5 border-b border-[#2a2a2a]">
                        <span className="text-xs text-gray-500">{subtitle}</span>
                    </div>
                )}
            </div>
            <CodeEditor
                className="!mt-0 !rounded-none !p-0 min-h-0"
                key={`${active.id}-${active.language}-${replacementKey}`}
                replacements={replacements}
                showLanguageLabel={false}
            >
                <code className={`language-${active.language}`}>{active.code}</code>
            </CodeEditor>
        </div>
    );
}

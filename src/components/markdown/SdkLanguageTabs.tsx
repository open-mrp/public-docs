'use client';

import { useSdkLanguage } from '@/components/api-reference/SdkSelector';
import { SDK_LANGUAGES } from '@/lib/sdk-language-store';
import type { SdkLanguage } from '@/static/apiSnippets.generated';
import { cn } from '@/utils/cn';
import React, { ReactNode, useMemo } from 'react';

export interface SdkLanguageTabProps {
    /** Which SDK language this tab represents (drives the global preference). */
    language: SdkLanguage;
    /** Override the tab label. Defaults to the language's display name. */
    label?: string;
    children: ReactNode;
}

/**
 * A single language tab. Rendering is fully controlled by SdkLanguageTabs; this
 * component only carries props and never renders on its own.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- props are read by the parent SdkLanguageTabs
export function SdkLanguageTab(props: SdkLanguageTabProps): null {
    return null;
}
SdkLanguageTab.displayName = 'SdkLanguageTab';

function isSdkLanguageTab(
    child: ReactNode,
): child is React.ReactElement<SdkLanguageTabProps> {
    if (!React.isValidElement(child)) return false;
    const type = child.type as { displayName?: string };
    if (type?.displayName === 'SdkLanguageTab') return true;
    // Fallback for MDX, which can wrap component types: match on the language prop.
    return typeof (child.props as Partial<SdkLanguageTabProps>)?.language === 'string';
}

const LABELS = new Map(SDK_LANGUAGES.map((l) => [l.id, l.label]));

/**
 * Guide-page code tabs that stay in sync with the global SDK language
 * preference. Switching a tab here updates every code example across the docs
 * site (including the API reference dropdown) and is persisted.
 *
 * Use for language tabs only (e.g. cURL vs TypeScript). For non-language tabs
 * such as package managers (npm/pnpm/yarn/bun), keep using DocTabs.
 */
export function SdkLanguageTabs({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    const { language, setLanguage } = useSdkLanguage();

    const tabs = useMemo(
        () =>
            React.Children.toArray(children)
                .filter(isSdkLanguageTab)
                .map((child) => ({
                    language: child.props.language,
                    label: child.props.label ?? LABELS.get(child.props.language) ?? child.props.language,
                    content: child.props.children,
                })),
        [children],
    );

    if (tabs.length === 0) return null;

    // Show the globally-selected language if this block offers it; otherwise
    // fall back to the first tab without mutating the global preference.
    const active = tabs.find((t) => t.language === language) ?? tabs[0];

    return (
        <div className={cn('w-full', className)}>
            <div className="border-b border-[var(--text-primary)]/20">
                <nav className="flex space-x-0" aria-label="Tabs">
                    {tabs.map((tab) => {
                        const isActive = tab.language === active.language;
                        return (
                            <button
                                key={tab.language}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => setLanguage(tab.language)}
                                className={cn(
                                    'py-4 px-4 border-b-2 font-medium text-sm transition-colors cursor-pointer',
                                    isActive
                                        ? 'border-primary-500 text-primary-500'
                                        : 'border-transparent text-text-secondary hover:text-text-primary hover:border-text-primary/50',
                                )}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>
            <div className="mt-4" role="tabpanel">
                {active.content}
            </div>
        </div>
    );
}

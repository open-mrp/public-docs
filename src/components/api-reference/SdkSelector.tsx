'use client';

import { SDK_LANGUAGES, useSdkLanguageStore } from '@/lib/sdk-language-store';
import { useState } from 'react';

/**
 * Read/write the global SDK preview language. Backed by a persisted zustand
 * store (see sdk-language-store), so the preference is shared across the entire
 * docs site and survives reloads — no provider required.
 */
export function useSdkLanguage() {
    const language = useSdkLanguageStore((s) => s.language);
    const setLanguage = useSdkLanguageStore((s) => s.setLanguage);
    return { language, setLanguage };
}

const languages = SDK_LANGUAGES;

export function SdkSelectorDropdown() {
    const { language, setLanguage } = useSdkLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const current = languages.find((l) => l.id === language) ?? languages[0];

    if (languages.length <= 1) {
        return null;
    }

    return (
        <div className="relative shrink-0">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] px-2 py-1 rounded transition-colors cursor-pointer border border-transparent hover:border-[var(--foreground)]/10"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <span>{current.label}</span>
                <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                        aria-hidden
                    />
                    <div
                        className="absolute right-0 top-full mt-1 z-50 bg-[var(--code-background)] border border-[var(--code-panel-border)] rounded-lg shadow-lg py-1 min-w-[140px]"
                        role="listbox"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.id}
                                type="button"
                                role="option"
                                aria-selected={lang.id === language}
                                onClick={() => {
                                    setLanguage(lang.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                                    lang.id === language
                                        ? 'text-[var(--foreground)] bg-[var(--foreground)]/10'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--foreground)]/5 hover:text-[var(--foreground)]'
                                }`}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export type RequestExampleMode = 'example' | 'body';

function segmentButtonClass(active: boolean) {
    return `px-2 py-0.5 text-xs rounded transition-colors cursor-pointer ${
        active
            ? 'bg-[var(--foreground)]/10 text-[var(--foreground)]'
            : 'text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5'
    }`;
}

export function RequestExampleHeader({
    mode,
    onModeChange,
    showBody,
}: {
    mode: RequestExampleMode;
    onModeChange: (mode: RequestExampleMode) => void;
    showBody: boolean;
}) {
    return (
        <div className="flex items-center gap-2 shrink-0">
            <div
                className="flex items-center gap-0.5 rounded-md border border-[var(--code-panel-border)] p-0.5"
                role="tablist"
                aria-label="Request example type"
            >
                <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'example'}
                    onClick={() => onModeChange('example')}
                    className={segmentButtonClass(mode === 'example')}
                >
                    Example
                </button>
                {showBody && (
                    <button
                        type="button"
                        role="tab"
                        aria-selected={mode === 'body'}
                        onClick={() => onModeChange('body')}
                        className={segmentButtonClass(mode === 'body')}
                    >
                        Body
                    </button>
                )}
            </div>
        </div>
    );
}

'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

export type SdkLanguage = 'curl' | 'node' | 'python' | 'go';

interface SdkSelectorContextValue {
    language: SdkLanguage;
    setLanguage: (lang: SdkLanguage) => void;
}

const SdkSelectorContext = createContext<SdkSelectorContextValue>({
    language: 'curl',
    setLanguage: () => {},
});

export function SdkSelectorProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<SdkLanguage>('curl');
    return (
        <SdkSelectorContext.Provider value={{ language, setLanguage }}>
            {children}
        </SdkSelectorContext.Provider>
    );
}

export function useSdkLanguage() {
    return useContext(SdkSelectorContext);
}

const languages: { id: SdkLanguage; label: string; icon: string }[] = [
    { id: 'curl', label: 'cURL', icon: '//' },
    // Future SDKs:
    // { id: 'node', label: 'Node.js', icon: 'JS' },
    // { id: 'python', label: 'Python', icon: 'Py' },
    // { id: 'go', label: 'Go', icon: 'Go' },
];

export function SdkSelectorDropdown() {
    const { language, setLanguage } = useSdkLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const current = languages.find((l) => l.id === language) || languages[0];

    // If only one language, just show the label
    if (languages.length === 1) {
        return (
            <span className="text-xs font-medium text-[var(--text-secondary)] px-2 py-1">
                {current.label}
            </span>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] px-2 py-1 rounded transition-colors cursor-pointer"
            >
                <span className="font-mono">{current.icon}</span>
                <span>{current.label}</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 z-20 bg-[var(--card-background)] border border-[var(--border-color)] rounded-lg shadow-lg py-1 min-w-[120px]">
                        {languages.map((lang) => (
                            <button
                                key={lang.id}
                                onClick={() => {
                                    setLanguage(lang.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                                    lang.id === language
                                        ? 'text-[var(--foreground)] bg-[var(--sidenav-active-bg)]'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--sidenav-hover)]'
                                }`}
                            >
                                <span className="font-mono">{lang.icon}</span>
                                <span>{lang.label}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

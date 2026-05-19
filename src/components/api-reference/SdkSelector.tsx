'use client';

import type { SdkLanguage } from '@/static/apiSnippets.generated';
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

const STORAGE_KEY = 'augno-docs-sdk-language';

interface SdkSelectorContextValue {
    language: SdkLanguage;
    setLanguage: (lang: SdkLanguage) => void;
}

const SdkSelectorContext = createContext<SdkSelectorContextValue>({
    language: 'typescript',
    setLanguage: () => {},
});

function isSdkLanguage(value: string | null): value is SdkLanguage {
    return value === 'typescript' || value === 'curl' || value === 'python' || value === 'go';
}

export function SdkSelectorProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<SdkLanguage>('typescript');

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (isSdkLanguage(stored)) {
                // Applying after mount avoids SSR markup differing from client localStorage.
                // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional persisted preference restore
                setLanguageState(stored);
            }
        } catch {
            /* ignore private mode / SSR guard */
        }
    }, []);

    const setLanguage = useCallback((lang: SdkLanguage) => {
        setLanguageState(lang);
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch {
            /* ignore */
        }
    }, []);

    const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

    return <SdkSelectorContext.Provider value={value}>{children}</SdkSelectorContext.Provider>;
}

export function useSdkLanguage() {
    return useContext(SdkSelectorContext);
}

const languages: { id: SdkLanguage; label: string }[] = [
    { id: 'typescript', label: 'TypeScript' },
    { id: 'python', label: 'Python' },
    { id: 'go', label: 'Go' },
    { id: 'curl', label: 'cURL' },
];

export function SdkSelectorDropdown() {
    const { language, setLanguage } = useSdkLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const current = languages.find((l) => l.id === language) ?? languages[0];

    return (
        <div className="relative shrink-0">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-200 px-2 py-1 rounded transition-colors cursor-pointer border border-transparent hover:border-white/10"
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
                        className="absolute right-0 top-full mt-1 z-50 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg shadow-lg py-1 min-w-[140px]"
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
                                        ? 'text-gray-100 bg-white/10'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
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

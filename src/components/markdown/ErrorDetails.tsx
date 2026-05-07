'use client';

import { useEffect, useState, type ReactNode } from 'react';

type ErrorDetailsProps = {
    code: string;
    meta: string;
    children: ReactNode;
};

export function ErrorDetails({ code, meta, children }: ErrorDetailsProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const openIfHashMatches = () => {
            if (window.location.hash === `#${code}`) {
                setIsOpen(true);
            }
        };

        openIfHashMatches();
        window.addEventListener('hashchange', openIfHashMatches);

        return () => {
            window.removeEventListener('hashchange', openIfHashMatches);
        };
    }, [code]);

    return (
        <section
            id={code}
            className="mt-3 overflow-hidden rounded-lg border border-gray-200 transition-colors duration-200 first-of-type:mt-4 hover:border-gray-400 hover:shadow-sm dark:border-gray-800 dark:hover:border-gray-600"
        >
            <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${code}-content`}
                className="group flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left transition-colors duration-150 select-none hover:bg-gray-50 dark:hover:bg-gray-900/60"
                onClick={() => setIsOpen((open) => !open)}
            >
                <span className="flex flex-wrap items-baseline gap-2">
                    <code>{code}</code>
                    <span className="text-sm text-gray-500">{meta}</span>
                </span>
                <span
                    aria-hidden="true"
                    className={`h-2 w-2 shrink-0 rotate-45 border-r border-b border-current opacity-70 transition duration-200 group-hover:opacity-100 ${
                        isOpen ? 'rotate-[225deg]' : ''
                    }`}
                />
            </button>
            <div
                id={`${code}-content`}
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <div className="px-4 pb-4">{children}</div>
                </div>
            </div>
        </section>
    );
}

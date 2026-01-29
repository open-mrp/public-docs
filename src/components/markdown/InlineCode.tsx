'use client';

import React from 'react';

export interface InlineCodeProps {
    children: React.ReactNode;
    className?: string;
}

export default function InlineCode({ children, className }: InlineCodeProps) {
    return (
        <code
            className={`text-foreground dark:text-gray-200 text-sm px-2 py-0.25 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-primary/15 dark:border-primary/25 ${className}`}
            style={{ background: 'var(--inline-code-gradient)' }}
        >
            {children}
        </code>
    );
}

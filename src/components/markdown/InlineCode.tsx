'use client';

import React from 'react';

export interface InlineCodeProps {
    children: React.ReactNode;
    className?: string;
}

export default function InlineCode({ children, className }: InlineCodeProps) {
    return (
        <code
            className={`bg-primary-500 text-black text-sm px-2 py-0.25 rounded-md relative group select-none pointer-events-none ${className}`}
        >
            {children}
        </code>
    );
}

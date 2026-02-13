'use client';

import React from 'react';

export interface InlineCodeProps {
    children: React.ReactNode;
    className?: string;
}

const glassGradient =
    'linear-gradient(135deg, color-mix(in srgb, var(--primary) 22%, transparent) 0%, color-mix(in srgb, var(--primary) 6%, transparent) 45%, color-mix(in srgb, var(--primary) 14%, transparent) 100%)';

export default function InlineCode({ children, className }: InlineCodeProps) {
    return (
        <code
            className={`backdrop-blur-sm text-foreground text-sm px-2 py-0.25 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.05)] relative group select-none pointer-events-none ${className}`}
            style={{ background: glassGradient }}
        >
            {children}
        </code>
    );
}

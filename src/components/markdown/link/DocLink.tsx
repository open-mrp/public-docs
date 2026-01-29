'use client';

import { getPath } from '@/static/paths';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { ReactNode } from 'react';
import { LinkPreviewTooltip } from './LinkPreviewTooltip';

interface DocLinkProps {
    pathKey: string;
    children: ReactNode;
    className?: string;
}

export default function DocLink({ pathKey, children, className }: DocLinkProps) {
    const path = getPath(pathKey);
    if (!path) return null;

    const isExternal = path.startsWith('http');
    const linkClass = cn('text-secondary-500 hover:text-secondary-700', className);

    if (isExternal) {
        return (
            <a href={path} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {children}
            </a>
        );
    }

    return (
        <LinkPreviewTooltip path={path}>
            <Link href={path} className={linkClass}>
                {children}
            </Link>
        </LinkPreviewTooltip>
    );
}

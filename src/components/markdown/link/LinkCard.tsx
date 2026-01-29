'use client';

import { getPath } from '@/static/paths';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { LinkPreviewTooltip } from './LinkPreviewTooltip';

export interface LinkCardProps {
    pathKey: string;
    title: string;
    description: string;
    className?: string;
}

export default function LinkCard({ pathKey, title, description, className }: LinkCardProps) {
    const path = getPath(pathKey);

    if (!path) {
        return null;
    }

    const isExternal = path.startsWith('http');

    const card = (
        <Link
            href={path}
            target={isExternal ? '_blank' : undefined}
            className={cn(
                'bg-background border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300',
                className,
            )}
            style={
                {
                    borderColor: 'var(--border-color)',
                    '--tw-shadow-color': 'var(--border-color)',
                } as React.CSSProperties
            }
        >
            <div>
                <h5 className="text-md font-bold !pt-0 pb-2 text-primary">{title}</h5>
                <p className="text-text-secondary font-light">{description}</p>
            </div>
        </Link>
    );

    if (isExternal) {
        return card;
    }

    return <LinkPreviewTooltip path={path}>{card}</LinkPreviewTooltip>;
}

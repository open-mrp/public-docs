'use client';

import { getPath } from '@/static/paths';
import { cn } from '@/utils/cn';
import { ArrowRightIcon, Chip } from '@augno/ui';
import Link from 'next/link';
import { LinkPreviewTooltip } from './LinkPreviewTooltip';

interface InternalLinkProps {
    pathKey: string;
    text: string;
    className?: string;
    includeArrow?: boolean;
}

export default function InternalLink({
    pathKey,
    text,
    className,
    includeArrow = false,
}: InternalLinkProps) {
    const path = getPath(pathKey);

    if (!path) {
        return null;
    }

    const isExternal = path.startsWith('http');
    const isApiLink = path.startsWith('/api');

    const linkContent = (
        <Link
            href={path}
            className={cn(className, 'inline-flex items-center')}
            target={isExternal ? '_blank' : undefined}
        >
            {text}
            {isApiLink && (
                <Chip size="sm" className="ml-1 align-middle inline">
                    API
                </Chip>
            )}
            {includeArrow && <ArrowRightIcon className="ml-2 align-middle inline" />}
        </Link>
    );

    // Only show preview tooltip for internal links
    if (isExternal) {
        return linkContent;
    }

    return <LinkPreviewTooltip path={path}>{linkContent}</LinkPreviewTooltip>;
}

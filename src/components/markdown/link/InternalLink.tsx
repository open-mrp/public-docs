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
    const hashIndex = pathKey.indexOf('#');
    const pathKeyOnly = hashIndex === -1 ? pathKey : pathKey.slice(0, hashIndex);
    const hash = hashIndex === -1 ? undefined : pathKey.slice(hashIndex + 1);
    const pathResolved = getPath(pathKeyOnly);
    const path = pathResolved && hash ? `${pathResolved}#${hash}` : pathResolved;

    if (!path) {
        // Show visible error in development, hide in production
        if (process.env.NODE_ENV === 'development') {
            return (
                <span
                    className="bg-red-100 text-red-800 px-1 rounded"
                    title={`Invalid pathKey: ${pathKey}`}
                >
                    {text} [BROKEN: {pathKey}]
                </span>
            );
        }
        return <span>{text}</span>;
    }

    const isExternal = path.startsWith('http');
    const isApiLink = path.startsWith('/api-reference');

    const linkContent = (
        <Link
            href={path}
            className={cn(className, 'inline-flex items-center')}
            target={isExternal ? '_blank' : undefined}
        >
            {text}
            {isApiLink && (
                <Chip
                    size="sm"
                    className="ml-1 align-middle inline text-[var(--background)] bg-primary-500"
                >
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

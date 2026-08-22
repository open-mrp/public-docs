'use client';

import { getPagePreview } from '@/static/pagePreview.generated';
import { cn } from '@/utils/cn';
import { Chip, Tooltip, TooltipContent, TooltipTrigger } from '@openmrp/ui';
import Link from 'next/link';
import { ReactNode } from 'react';

interface LinkPreviewTooltipProps {
    path: string;
    children: ReactNode;
}

export function LinkPreviewTooltip({ path, children }: LinkPreviewTooltipProps) {
    const preview = getPagePreview(path);

    const isApiLink = path.startsWith('/api-reference');

    if (!preview) {
        return <>{children}</>;
    }

    return (
        <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent
                sideOffset={8}
                showArrow={false}
                className={cn(
                    'shadow-none p-0',
                    'w-64 rounded-lg overflow-hidden',
                    'backdrop-blur-md',
                    'bg-white/70 dark:bg-gray-900/70',
                    'ring-1 ring-gray-200/50 dark:ring-gray-700/50',
                    'shadow-lg',
                )}
            >
                <Link
                    href={path}
                    className="block p-3 space-y-1.5 no-underline hover:no-underline transition-colors hover:bg-white/50 dark:hover:bg-white/5"
                >
                    {/* Title */}
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white inline-flex items-center">
                        {preview.title}
                        {isApiLink && (
                            <Chip
                                size="sm"
                                className="ml-1 align-middle inline text-[var(--background)] bg-primary-500"
                            >
                                API
                            </Chip>
                        )}
                    </h4>

                    {/* Subtitle */}
                    {preview.subtitle && (
                        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                            {preview.subtitle}
                        </p>
                    )}

                    {/* Click hint */}
                    <div className="flex items-center gap-1 pt-1 text-[var(--primary)]">
                        <span className="text-[10px] font-medium uppercase tracking-wide">
                            Visit page →
                        </span>
                    </div>
                </Link>
            </TooltipContent>
        </Tooltip>
    );
}

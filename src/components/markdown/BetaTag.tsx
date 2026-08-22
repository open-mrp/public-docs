'use client';

import { Chip } from '@/components/api-reference/Chip';
import { cn } from '@/utils/cn';
import { Tooltip, TooltipContent, TooltipTrigger } from '@openmrp/ui';

export interface BetaTagProps {
    className?: string;
}

export default function BetaTag({ className }: BetaTagProps) {
    return (
        <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
                <Chip
                    variant="primary"
                    className={cn('text-sm px-2 select-none', className)}
                >
                    Beta
                </Chip>
            </TooltipTrigger>
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
                <div className="p-3 space-y-1.5">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        Beta Feature
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                        This feature is in beta. You should expect some breaking changes as we
                        continue to develop and update functionality.
                    </p>
                </div>
            </TooltipContent>
        </Tooltip>
    );
}

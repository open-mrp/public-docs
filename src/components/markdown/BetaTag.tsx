'use client';

import { Chip } from '@/components/api-reference/Chip';
import { cn } from '@/utils/cn';
import { Tooltip } from '@openmrp/ui';

export interface BetaTagProps {
    className?: string;
}

export default function BetaTag({ className }: BetaTagProps) {
    return (
        <Tooltip
            enterDelay={300}
            tooltipClassName={cn(
                'm-0 max-w-none font-sans text-inherit',
                'shadow-none p-0',
                'w-64 rounded-lg overflow-hidden',
                'backdrop-blur-md',
                'bg-white/70 dark:bg-gray-900/70',
                'ring-1 ring-gray-200/50 dark:ring-gray-700/50',
                'shadow-lg',
            )}
            title={
                <>
                    <div className="p-3 space-y-1.5">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Beta Feature
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                            This feature is in beta. You should expect some breaking changes as we
                            continue to develop and update functionality.
                        </p>
                    </div>
                </>
            }
        >
            <Chip variant="primary" className={cn('text-sm px-2 select-none', className)}>
                Beta
            </Chip>
        </Tooltip>
    );
}

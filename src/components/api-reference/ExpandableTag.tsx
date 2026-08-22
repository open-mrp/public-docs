'use client';

import { cn } from '@/utils/cn';
import { Tooltip, TooltipContent, TooltipTrigger } from '@openmrp/ui';
import { Chip } from './Chip';

export interface ExpandableTagProps {
    className?: string;
    /** Query parameter name used to request expansions, e.g. `include[]` */
    paramName: string;
    /** Values of that query parameter that expand the field */
    values: string[];
}

export default function ExpandableTag({ className, paramName, values }: ExpandableTagProps) {
    const safeValues = values.filter(Boolean);

    return (
        <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
                <Chip
                    variant="primary"
                    className={cn('select-none', className)}
                >
                    Expandable
                </Chip>
            </TooltipTrigger>
            <TooltipContent
                sideOffset={8}
                showArrow={false}
                className={cn(
                    'shadow-none p-0',
                    'w-72 rounded-lg overflow-hidden',
                    'backdrop-blur-md',
                    'bg-white/70 dark:bg-gray-900/70',
                    'ring-1 ring-gray-200/50 dark:ring-gray-700/50',
                    'shadow-lg',
                )}
            >
                <div className="p-3 space-y-1.5">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Expandable field</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                        This field is only expanded when you include the corresponding value(s) in{' '}
                        <code className="font-mono">{paramName}</code>.
                    </p>

                    {safeValues.length > 0 && (
                        <div className="flex flex-row items-center gap-1 mt-1 pt-2 border-t border-[var(--border-color)]">
                            <p className="text-[11px] font-medium text-[var(--text-secondary)]">
                                Use:
                            </p>
                            <div className="space-y-1">
                                {safeValues.map((v, idx) => (
                                    <div key={`${v}-${idx}`} className="text-[11px] text-gray-800 dark:text-gray-100">
                                        <Chip mono>
                                            {paramName}={v}
                                        </Chip>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </TooltipContent>
        </Tooltip>
    );
}


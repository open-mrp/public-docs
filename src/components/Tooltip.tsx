'use client';

import { cn } from '@/utils/cn';
import { Tooltip as TooltipRoot, TooltipContent, TooltipTrigger } from '@openmrp/ui';
import { ReactNode } from 'react';

interface SimpleTooltipProps {
    /** Plain text tooltip */
    content: string;
    children: ReactNode;
    className?: string;
    /** Delay before showing in ms (default 300) */
    delayDuration?: number;
}

interface RichTooltipProps {
    /** Bold heading */
    title: string;
    /** Optional body text */
    description?: string;
    content?: never;
    children: ReactNode;
    className?: string;
    delayDuration?: number;
}

type TooltipProps = SimpleTooltipProps | RichTooltipProps;

const tooltipContentClass = cn(
    'shadow-none p-0',
    'max-w-64 rounded-lg overflow-hidden',
    'backdrop-blur-md',
    'bg-white/70 dark:bg-gray-900/70',
    'ring-1 ring-gray-200/50 dark:ring-gray-700/50',
    'shadow-lg',
);

export function Tooltip({ children, className, delayDuration = 300, ...props }: TooltipProps) {
    const isSimple = 'content' in props && typeof props.content === 'string';

    return (
        <TooltipRoot delayDuration={delayDuration}>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent
                sideOffset={8}
                showArrow={false}
                className={cn(tooltipContentClass, className)}
            >
                {isSimple ? (
                    <p className="px-3 py-2 text-xs text-gray-600 dark:text-gray-300">
                        {props.content}
                    </p>
                ) : (
                    <div className="p-3 space-y-1.5">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            {(props as RichTooltipProps).title}
                        </h4>
                        {(props as RichTooltipProps).description && (
                            <p className="text-xs text-gray-600 dark:text-gray-300">
                                {(props as RichTooltipProps).description}
                            </p>
                        )}
                    </div>
                )}
            </TooltipContent>
        </TooltipRoot>
    );
}

import { cn } from '@/utils/cn';
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';

type ChipVariant = 'default' | 'primary';

const variantStyles: Record<ChipVariant, string> = {
    default: 'bg-[var(--foreground)]/5 text-[var(--foreground)]',
    primary: 'bg-[var(--primary)] text-[var(--background)] font-semibold',
};

type ChipProps = ComponentPropsWithoutRef<'span'> & {
    children: ReactNode;
    variant?: ChipVariant;
    /** Render in monospace font (for code-like values). */
    mono?: boolean;
};

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(function Chip(
    { children, variant = 'default', mono, className, ...props },
    ref,
) {
    return (
        <span
            ref={ref}
            className={cn(
                'text-[10px] px-1.5 py-0.5 rounded leading-tight inline-flex items-center shrink-0',
                variantStyles[variant],
                mono && 'font-mono',
                className,
            )}
            {...props}
        >
            {children}
        </span>
    );
});

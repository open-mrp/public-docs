'use client';

/**
 * A small toggle link used for "show more / show less" and
 * "Show N properties / Hide N properties" in the API reference.
 */
export function ToggleLink({
    children,
    onClick,
    className,
}: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`text-[var(--primary)] hover:underline cursor-pointer text-[11px] font-medium whitespace-nowrap${className ? ` ${className}` : ''}`}
        >
            {children}
        </button>
    );
}

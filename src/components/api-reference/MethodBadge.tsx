'use client';

const methodConfig: Record<string, { bg: string; text: string }> = {
    GET: { bg: 'var(--api-method-get, #22c55e)', text: '#fff' },
    POST: { bg: 'var(--api-method-post, #f59e0b)', text: '#fff' },
    PUT: { bg: 'var(--api-method-put, #3b82f6)', text: '#fff' },
    PATCH: { bg: 'var(--api-method-patch, #8b5cf6)', text: '#fff' },
    DELETE: { bg: 'var(--api-method-delete, #ef4444)', text: '#fff' },
};

interface MethodBadgeProps {
    method: string;
    className?: string;
}

export function MethodBadge({ method, className = '' }: MethodBadgeProps) {
    const m = method.toUpperCase();
    const config = methodConfig[m] || { bg: '#6b7280', text: '#fff' };

    return (
        <span
            className={`inline-flex items-center justify-center rounded font-mono font-semibold leading-none shrink-0 ${className}`}
            style={{
                backgroundColor: config.bg,
                color: config.text,
                fontSize: '10px',
                padding: '3px 6px',
            }}
        >
            {m}
        </span>
    );
}

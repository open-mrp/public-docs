'use client';

import type { ApiNavEndpoint, EndpointData } from '@/static/apiEndpoints.generated';

type ActionKind = 'list' | 'create' | 'delete' | 'retrieve' | 'update' | 'other';

const actionConfig: Record<ActionKind, { color: string }> = {
    list: { color: 'var(--api-action-list, #22c55e)' },
    retrieve: { color: 'var(--api-action-retrieve, #22c55e)' },
    create: { color: 'var(--api-action-create, #00a3ff)' },
    delete: { color: 'var(--api-action-delete, #ff2d2d)' },
    update: { color: 'var(--api-action-update, #f59e0b)' },
    other: { color: 'var(--api-action-other, #6b7280)' },
};

function actionKindFromActionType(actionType: string): ActionKind {
    const s = actionType.trim().toLowerCase();
    if (s === 'list') return 'list';
    if (s === 'create') return 'create';
    if (s === 'delete') return 'delete';
    if (s === 'retrieve') return 'retrieve';
    if (s === 'update') return 'update';
    if (s === 'action') return 'other';
    return 'other';
}

function IconArrowUpRight({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
            <path
                d="M7 17L17 7M17 7H10M17 7V14"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function IconArrowDownLeft({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
            <path
                d="M17 7L7 17M7 17H14M7 17V10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function IconX({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
            <path
                d="M7 7L17 17M17 7L7 17"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function ActionMethodBadge({
    endpoint,
}: {
    endpoint: Pick<ApiNavEndpoint | EndpointData, 'method' | 'actionType'>;
}) {
    const kind = actionKindFromActionType(endpoint.actionType);
    const { color } = actionConfig[kind];
    const icon =
        kind === 'delete' ? (
            <IconX className="w-3 h-3" />
        ) : kind === 'list' || kind === 'retrieve' ? (
            <IconArrowDownLeft className="w-3 h-3" />
        ) : kind === 'create' || kind === 'update' ? (
            <IconArrowUpRight className="w-3 h-3" />
        ) : (
            <IconArrowUpRight className="w-3 h-3 opacity-70" />
        );

    const method = endpoint.method.toUpperCase();

    return (
        <span
            className="inline-flex items-center justify-center gap-1 rounded font-mono font-semibold leading-none shrink-0"
            style={{
                backgroundColor: color,
                color: '#fff',
                fontSize: '10px',
                padding: '3px 6px',
            }}
        >
            <span className="inline-flex items-center justify-center shrink-0" aria-hidden="true">
                {icon}
            </span>
            {method}
        </span>
    );
}


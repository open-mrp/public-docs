'use client';

import { useSandboxAccountId } from '@/providers/ApiKeyProvider';

interface SandboxAccountIdProps {
    className?: string;
}

/**
 * Displays the sandbox account ID.
 * Shows the user's actual sandbox account ID when logged in,
 * or a placeholder when not authenticated.
 */
export function SandboxAccountId({ className }: SandboxAccountIdProps) {
    const sandboxAccountId = useSandboxAccountId();

    return <span className={className}>{sandboxAccountId}</span>;
}

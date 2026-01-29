'use client';

import { useSandboxAccountName } from '@/providers/ApiKeyProvider';

interface SandboxAccountNameProps {
    className?: string;
}

/**
 * Displays the sandbox account name.
 * Shows the user's actual sandbox account name when logged in,
 * or a placeholder when not authenticated.
 */
export function SandboxAccountName({ className }: SandboxAccountNameProps) {
    const sandboxAccountName = useSandboxAccountName();

    return <span className={className}>{sandboxAccountName}</span>;
}

'use client';

import { useAccountId } from '@/providers/ApiKeyProvider';

interface AccountIdProps {
    className?: string;
}

/**
 * Displays the current account ID.
 * Shows the user's actual account ID when logged in,
 * or a placeholder when not authenticated.
 */
export function AccountId({ className }: AccountIdProps) {
    const accountId = useAccountId();

    return <span className={className}>{accountId}</span>;
}

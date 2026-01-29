'use client';

import { useAccountName } from '@/providers/ApiKeyProvider';

interface AccountNameProps {
    className?: string;
}

/**
 * Displays the current account name.
 * Shows the user's actual account name when logged in,
 * or a placeholder when not authenticated.
 */
export function AccountName({ className }: AccountNameProps) {
    const accountName = useAccountName();

    return <span className={className}>{accountName}</span>;
}

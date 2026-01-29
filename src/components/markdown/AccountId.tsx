'use client';

import { useAccountId } from '@/providers/ApiKeyProvider';
import { CopyableText } from './CopyableText';

interface AccountIdProps {
    className?: string;
}

/**
 * Displays the current account ID.
 * Shows the user's actual account ID when logged in,
 * or a placeholder when not authenticated.
 * Clicking copies the account ID to clipboard.
 */
export function AccountId({ className }: AccountIdProps) {
    const accountId = useAccountId();

    return <CopyableText value={accountId} className={className} />;
}

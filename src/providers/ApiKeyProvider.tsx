'use client';

import { API_VERSION } from '@/static/apiVersion.generated';
import { useCurrentAccount, useDocApiKeySecret, useOwnerAccount } from '@/lib/auth-store';
import { createContext, ReactNode, useContext } from 'react';

interface ApiKeyContextValue {
    /** The sandbox API key for code examples */
    sandboxApiKey: string;
    /** The current account name */
    accountName: string;
    /** The current (production) account ID */
    accountId: string;
    /** The sandbox account ID */
    sandboxAccountId: string;
    /** Map of placeholder strings to their replacement values */
    codeReplacements: Record<string, string>;
}

const ApiKeyContext = createContext<ApiKeyContextValue | null>(null);

// Fake API key shown in ApiKeySnippet when user is not logged in (looks realistic)
const FAKE_API_KEY =
    'aug_sk_test_AM4Bjb7xBLrmM0EZ3ADvlv_hMpF1c5rhvfRkHF7gww5CtZuFzczEImt0WXP5CwilIS6bUWNXD';

// Placeholder values shown in code snippets when user is not logged in
const PLACEHOLDER_API_KEY = '{{YOUR_API_KEY}}';
const PLACEHOLDER_ACCOUNT_NAME = 'your account';
const PLACEHOLDER_ACCOUNT_ID = '{{YOUR_ACCOUNT_ID}}';
const PLACEHOLDER_SANDBOX_ACCOUNT_ID = '{{YOUR_SANDBOX_ACCOUNT_ID}}';

interface ApiKeyProviderProps {
    children: ReactNode;
}

/**
 * Provider that supplies the sandbox API key and account info for code examples.
 * When users are logged in, their personal data will be displayed.
 * When not logged in, shows placeholder values.
 */
export function ApiKeyProvider({ children }: ApiKeyProviderProps) {
    const currentAccount = useCurrentAccount();
    const ownerAccount = useOwnerAccount();
    const docApiKeySecret = useDocApiKeySecret();

    // Show the user's real sandbox API key when available, otherwise a realistic-looking fake
    const sandboxApiKey = docApiKeySecret ?? FAKE_API_KEY;

    // Use the current account name if logged in, otherwise show placeholder
    const accountName = currentAccount?.name ?? PLACEHOLDER_ACCOUNT_NAME;

    // Use the owner (production) account ID if available, otherwise show placeholder
    const accountId = ownerAccount?.id ?? PLACEHOLDER_ACCOUNT_ID;

    // currentAccount is the sandbox account
    const sandboxAccountId = currentAccount?.id ?? PLACEHOLDER_SANDBOX_ACCOUNT_ID;

    // For code snippets, use the real key when available, otherwise a templated placeholder
    const codeReplacements: Record<string, string> = {
        YOUR_API_KEY: docApiKeySecret ?? PLACEHOLDER_API_KEY,
        YOUR_ACCOUNT_NAME: accountName,
        YOUR_ACCOUNT_ID: accountId,
        YOUR_SANDBOX_ACCOUNT_ID: sandboxAccountId,
        CURRENT_API_VERSION: API_VERSION.current,
    };

    return (
        <ApiKeyContext.Provider
            value={{ sandboxApiKey, accountName, accountId, sandboxAccountId, codeReplacements }}
        >
            {children}
        </ApiKeyContext.Provider>
    );
}

/**
 * Hook to access the API key context
 */
export function useApiKey() {
    const context = useContext(ApiKeyContext);
    if (!context) {
        throw new Error('useApiKey must be used within an ApiKeyProvider');
    }
    return context;
}

/**
 * Hook to get just the code replacements map
 */
export function useCodeReplacements() {
    const { codeReplacements } = useApiKey();
    return codeReplacements;
}

/**
 * Hook to get the account name
 */
export function useAccountName() {
    const { accountName } = useApiKey();
    return accountName;
}

/**
 * Hook to get the account ID
 */
export function useAccountId() {
    const { accountId } = useApiKey();
    return accountId;
}

/**
 * Hook to get the sandbox account ID
 */
export function useSandboxAccountId() {
    const { sandboxAccountId } = useApiKey();
    return sandboxAccountId;
}

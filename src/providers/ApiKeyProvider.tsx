'use client';

import { useCurrentAccount } from '@/lib/auth-store';
import { createContext, ReactNode, useContext } from 'react';

interface ApiKeyContextValue {
    /** The sandbox API key for code examples */
    sandboxApiKey: string;
    /** The current account name */
    accountName: string;
    /** Map of placeholder strings to their replacement values */
    codeReplacements: Record<string, string>;
}

const ApiKeyContext = createContext<ApiKeyContextValue | null>(null);

// Fake API key shown in ApiKeySnippet when user is not logged in (looks realistic)
const FAKE_API_KEY =
    'aug_sk_test_AM4Bjb7xBLrmM0EZ3ADvlv_hMpF1c5rhvfRkHF7gww5CtZuFzczEImt0WXP5CwilIS6bUWNXD';

// Placeholder values shown in code snippets when user is not logged in
const PLACEHOLDER_API_KEY = '{{ACCOUNT_API_KEY}}';
const PLACEHOLDER_ACCOUNT_NAME = 'your account';

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

    // TODO: In the future, fetch the user's actual sandbox API key from the API
    // For ApiKeySnippet component, show a realistic-looking fake key when not logged in
    const sandboxApiKey = FAKE_API_KEY;

    // Use the current account name if logged in, otherwise show placeholder
    const accountName = currentAccount?.name ?? PLACEHOLDER_ACCOUNT_NAME;

    // For code snippets, use templated placeholder when not logged in
    const codeReplacements: Record<string, string> = {
        YOUR_API_KEY: PLACEHOLDER_API_KEY,
        YOUR_ACCOUNT_NAME: accountName,
    };

    return (
        <ApiKeyContext.Provider value={{ sandboxApiKey, accountName, codeReplacements }}>
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

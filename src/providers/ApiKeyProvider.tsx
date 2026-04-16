'use client';

import { API_VERSION } from '@/static/apiVersion.generated';
import { abbreviateKey } from '@/lib/apiKey';
import { Env } from '@/lib/env';
import {
    useDocApiKeySecret,
    useOwnerAccount,
    useSelectedSandboxId,
    useSandboxes,
} from '@/lib/auth-store';
import type { ReplacementValue } from '@augno/ui';
import { createContext, ReactNode, useContext } from 'react';

interface ApiKeyContextValue {
    /** The sandbox API key for code examples */
    sandboxApiKey: string;
    /** Whether the user has a real API key (false when logged in but no test key exists) */
    hasApiKey: boolean;
    /** The production (owner) account name */
    accountName: string;
    /** The current (production) account ID */
    accountId: string;
    /** The sandbox account ID */
    sandboxAccountId: string;
    /** The sandbox account name */
    sandboxAccountName: string;
    /** Map of placeholder strings to their replacement values */
    codeReplacements: Record<string, ReplacementValue>;
}

const ApiKeyContext = createContext<ApiKeyContextValue | null>(null);

// Fake API key shown in ApiKeySnippet when user is not logged in (looks realistic)
const FAKE_API_KEY = 'aug_sk_test_AM4Bjfakeapikey_fakeapikeyUWNXD';

// Placeholder values shown in code snippets when user is not logged in
const PLACEHOLDER_API_KEY = '{{YOUR_API_KEY}}';
const PLACEHOLDER_ACCOUNT_NAME = 'your account';
const PLACEHOLDER_ACCOUNT_ID = '{{YOUR_ACCOUNT_ID}}';
const PLACEHOLDER_SANDBOX_ACCOUNT_ID = '{{YOUR_SANDBOX_ACCOUNT_ID}}';
const PLACEHOLDER_SANDBOX_ACCOUNT_NAME = 'your sandbox account';

interface ApiKeyProviderProps {
    children: ReactNode;
}

/**
 * Provider that supplies the sandbox API key and account info for code examples.
 * When users are logged in, their personal data will be displayed.
 * When not logged in, shows placeholder values.
 */
export function ApiKeyProvider({ children }: ApiKeyProviderProps) {
    const ownerAccount = useOwnerAccount();
    const sandboxes = useSandboxes();
    const docApiKeySecret = useDocApiKeySecret();

    // Show the user's real sandbox API key when available, otherwise a realistic-looking fake
    const sandboxApiKey = docApiKeySecret ?? FAKE_API_KEY;
    const hasApiKey = docApiKeySecret !== null;

    // Use the production (owner) account name if logged in, otherwise show placeholder
    const accountName = ownerAccount?.name ?? PLACEHOLDER_ACCOUNT_NAME;

    // Use the owner (production) account ID if available, otherwise show placeholder
    const accountId = ownerAccount?.id ?? PLACEHOLDER_ACCOUNT_ID;

    // Use the selected sandbox account, falling back to the first sandbox.
    // Use selectedSandboxId directly as a fallback when the sandbox isn't found in the array
    // (e.g., sandboxes array is empty because tenancy hasn't loaded yet).
    const selectedSandboxId = useSelectedSandboxId();
    const selectedSandbox = sandboxes.find((s) => s.id === selectedSandboxId) ?? sandboxes[0];
    const sandboxAccountId =
        selectedSandbox?.id ?? selectedSandboxId ?? PLACEHOLDER_SANDBOX_ACCOUNT_ID;
    const sandboxAccountName = selectedSandbox?.name ?? PLACEHOLDER_SANDBOX_ACCOUNT_NAME;

    // Render the abbreviated key (same format as the ApiKeySnippet button on
    // the landing page) while the copy button hands back the full secret.
    // When logged out, copy gives the placeholder so users know to substitute.
    const codeReplacements: Record<string, ReplacementValue> = {
        YOUR_API_KEY: {
            display: abbreviateKey(sandboxApiKey),
            copy: docApiKeySecret ?? PLACEHOLDER_API_KEY,
        },
        YOUR_ACCOUNT_NAME: accountName,
        YOUR_ACCOUNT_ID: accountId,
        YOUR_SANDBOX_ACCOUNT_ID: sandboxAccountId,
        YOUR_SANDBOX_ACCOUNT_NAME: sandboxAccountName,
        CURRENT_API_VERSION: API_VERSION.current,
        API_HOST: Env.apiHost,
    };

    return (
        <ApiKeyContext.Provider
            value={{
                sandboxApiKey,
                hasApiKey,
                accountName,
                accountId,
                sandboxAccountId,
                sandboxAccountName,
                codeReplacements,
            }}
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

/**
 * Hook to get the sandbox account name
 */
export function useSandboxAccountName() {
    const { sandboxAccountName } = useApiKey();
    return sandboxAccountName;
}

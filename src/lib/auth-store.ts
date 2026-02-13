'use client';

import { createV2Client } from '@augno/internal-sdk';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Env } from './env';

// Create V2 client for auth operations
const v2Client = createV2Client({
    baseUrl: Env.apiV2BaseUrl,
    credentials: 'include',
});

// In-memory flag to track if we've checked auth this page load
// This resets on page refresh but persists during SPA navigations
let hasCheckedAuthThisPageLoad = false;

// Types for V1 API responses (not in internal-sdk)
export interface User {
    id: string;
    name: string | null;
    email: string | null;
    username: string | null;
    imageUrl: string | null;
    emailVerified: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface Role {
    id: string;
    name: string;
}

export interface AccountMembership {
    id: string;
    name: string;
}

export interface CurrentAccount {
    id: string;
    name: string;
    role: Role | null;
    type: string;
    onboardingStatus: string;
    plan: string;
    slug: string | null;
}

export interface OwnerAccount {
    id: string;
    name: string;
}

export interface TenancyResponse {
    currentAccount: CurrentAccount;
    ownerAccount: OwnerAccount | null;
    availableAccounts: AccountMembership[];
}

// V1 API helpers (these endpoints aren't in the internal-sdk)
async function fetchCurrentUser(): Promise<User | null> {
    try {
        const response = await fetch(`${Env.apiV1BaseUrl}/v1/me`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 401) {
            // Try to refresh using V2 client (cookie sent automatically via credentials: 'include')
            const { error } = await v2Client.POST('/v1/auth/access-tokens', {
                params: { cookie: { '__Secure-augno.refresh-token': '' } },
            });
            if (error) return null;

            // Retry
            const retryResponse = await fetch(`${Env.apiV1BaseUrl}/v1/me`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!retryResponse.ok) return null;
            return retryResponse.json();
        }

        if (!response.ok) return null;
        return response.json();
    } catch (error) {
        console.error('Unable to connect to the API');
        return null;
    }
}

async function fetchTenancy(): Promise<TenancyResponse | null> {
    try {
        const response = await fetch(`${Env.apiV1BaseUrl}/v1/me/tenancy`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 401) {
            const { error } = await v2Client.POST('/v1/auth/access-tokens', {
                params: { cookie: { '__Secure-augno.refresh-token': '' } },
            });
            if (error) return null;

            const retryResponse = await fetch(`${Env.apiV1BaseUrl}/v1/me/tenancy`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!retryResponse.ok) return null;
            return retryResponse.json();
        }

        if (!response.ok) return null;
        return response.json();
    } catch (error) {
        console.error('Unable to connect to the API');
        return null;
    }
}

async function fetchDocApiKey(accountId: string): Promise<string | null> {
    try {
        const { data, error } = await v2Client.POST(
            '/v1/auth/api-keys/actions/fetch-doc-api-key',
            {
                headers: { 'Augno-Account-ID': accountId },
            },
        );
        if (error || !data) return null;
        return (data as { api_key_secret: string }).api_key_secret;
    } catch {
        return null;
    }
}

export interface AuthState {
    // User data
    user: User | null;

    // Current account selection
    currentAccount: CurrentAccount | null;

    // Account memberships (accounts user can switch to)
    accountMemberships: AccountMembership[];

    // Owner (production) account
    ownerAccount: OwnerAccount | null;

    // Doc API key (not persisted to localStorage)
    docApiKeySecret: string | null;

    // Loading states
    isLoading: boolean;
    isInitialized: boolean;
    isRestoring: boolean;
    hasHydrated: boolean;

    // Actions
    setUser: (user: User | null) => void;
    setCurrentAccount: (account: CurrentAccount | null) => void;
    setAccountMemberships: (memberships: AccountMembership[]) => void;
    setOwnerAccount: (ownerAccount: OwnerAccount | null) => void;
    setDocApiKeySecret: (secret: string | null) => void;
    setLoading: (loading: boolean) => void;
    setInitialized: (initialized: boolean) => void;
    setRestoring: (restoring: boolean) => void;
    setHasHydrated: (hasHydrated: boolean) => void;

    // Combined actions
    logout: () => Promise<void>;
    logoutSilent: () => void;
    restoreAuthState: () => Promise<void>;
    recheckAuth: () => Promise<void>;
    switchAccount: (account: AccountMembership) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            // Initial state
            user: null,
            currentAccount: null,
            accountMemberships: [],
            ownerAccount: null,
            docApiKeySecret: null,
            isLoading: false,
            isInitialized: false,
            isRestoring: false,
            hasHydrated: false,

            // Actions
            setUser: (user) => set({ user }),
            setCurrentAccount: (currentAccount) => set({ currentAccount }),
            setAccountMemberships: (accountMemberships) => set({ accountMemberships }),
            setOwnerAccount: (ownerAccount) => set({ ownerAccount }),
            setDocApiKeySecret: (docApiKeySecret) => set({ docApiKeySecret }),
            setLoading: (isLoading) => set({ isLoading }),
            setInitialized: (isInitialized) => set({ isInitialized }),
            setRestoring: (isRestoring) => set({ isRestoring }),
            setHasHydrated: (hasHydrated) => set({ hasHydrated }),

            // Switch account (updates current account from available memberships)
            switchAccount: (account: AccountMembership) => {
                const state = get();
                const currentAccount = state.currentAccount;
                if (currentAccount) {
                    set({
                        currentAccount: {
                            ...currentAccount,
                            id: account.id,
                            name: account.name,
                        },
                    });
                }
            },

            // Logout using V2 client
            logout: async () => {
                try {
                    await v2Client.DELETE('/v1/auth/refresh-tokens', {
                        params: { cookie: { '__Secure-augno.refresh-token': '' } },
                    });
                } catch (error) {
                    console.error('Logout error:', error);
                }
                // Reset the in-memory flag so navigating back triggers fresh check
                hasCheckedAuthThisPageLoad = false;
                set({
                    user: null,
                    currentAccount: null,
                    accountMemberships: [],
                    ownerAccount: null,
                    docApiKeySecret: null,
                    isLoading: false,
                    isInitialized: true,
                    isRestoring: false,
                });
            },

            // Logout without API call (just clear local state)
            logoutSilent: () => {
                // Reset the in-memory flag so navigating back triggers fresh check
                hasCheckedAuthThisPageLoad = false;
                set({
                    user: null,
                    currentAccount: null,
                    accountMemberships: [],
                    ownerAccount: null,
                    docApiKeySecret: null,
                    isLoading: false,
                    isInitialized: true,
                    isRestoring: false,
                });
            },

            // Restore auth state from cookies
            // Uses an in-memory flag to prevent API spam during SPA navigations
            // The flag resets on page refresh, ensuring cookies are validated on each page load
            restoreAuthState: async () => {
                const state = get();

                // Prevent concurrent restoration attempts
                if (state.isRestoring) {
                    return;
                }

                // Skip if already initialized this render cycle
                if (state.isInitialized) {
                    return;
                }

                // Wait for hydration to complete before making decisions
                // This ensures we have the cached user data from localStorage
                if (!state.hasHydrated) {
                    // Hydration not complete yet - will be called again after hydration
                    return;
                }

                // If we've already checked auth this page load AND have cached user data, use it
                // This prevents API spam during SPA navigations
                if (hasCheckedAuthThisPageLoad && state.user !== null) {
                    set({ isInitialized: true });
                    return;
                }

                set({ isLoading: true, isRestoring: true });

                try {
                    const [user, tenancy] = await Promise.all([
                        fetchCurrentUser(),
                        fetchTenancy(),
                    ]);

                    // Mark that we've checked auth this page load
                    hasCheckedAuthThisPageLoad = true;

                    if (user) {
                        // Fetch doc API key using the production (owner) account ID
                        const ownerAccountId = tenancy?.ownerAccount?.id;
                        const docApiKeySecret = ownerAccountId
                            ? await fetchDocApiKey(ownerAccountId)
                            : null;

                        set({
                            user,
                            currentAccount: tenancy?.currentAccount ?? null,
                            accountMemberships: tenancy?.availableAccounts ?? [],
                            ownerAccount: tenancy?.ownerAccount ?? null,
                            docApiKeySecret,
                            isLoading: false,
                            isInitialized: true,
                            isRestoring: false,
                        });
                    } else {
                        set({
                            user: null,
                            currentAccount: null,
                            accountMemberships: [],
                            ownerAccount: null,
                            docApiKeySecret: null,
                            isLoading: false,
                            isInitialized: true,
                            isRestoring: false,
                        });
                    }
                } catch (error) {
                    console.error('Failed to restore auth state:', error);
                    set({
                        user: null,
                        currentAccount: null,
                        accountMemberships: [],
                        ownerAccount: null,
                        docApiKeySecret: null,
                        isLoading: false,
                        isInitialized: true,
                        isRestoring: false,
                    });
                }
            },

            // Force recheck auth (used when tab becomes visible again)
            // Resets the in-memory flag and re-validates with the server
            recheckAuth: async () => {
                const state = get();

                // Prevent concurrent restoration attempts
                if (state.isRestoring) {
                    return;
                }

                // Reset the flag and isInitialized to force a fresh check
                hasCheckedAuthThisPageLoad = false;
                set({ isInitialized: false });

                // Now call restoreAuthState which will make the API call
                await state.restoreAuthState();
            },
        }),
        {
            name: 'docs-auth-store',
            // Use createJSONStorage to handle SSR gracefully (localStorage doesn't exist on server)
            storage: createJSONStorage(() =>
                typeof window !== 'undefined'
                    ? localStorage
                    : {
                          getItem: () => null,
                          setItem: () => {},
                          removeItem: () => {},
                      },
            ),
            // Only persist user data, not loading/initialization states
            // Note: isInitialized is NOT persisted - we always need to validate cookies on load
            partialize: (state) => ({
                user: state.user,
                currentAccount: state.currentAccount,
                accountMemberships: state.accountMemberships,
                ownerAccount: state.ownerAccount,
            }),
            // Called when hydration from localStorage completes
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.setHasHydrated(true);
                }
            },
        },
    ),
);

// Selector hooks for better performance
export const useUser = () => useAuthStore((state) => state.user);
export const useCurrentAccount = () => useAuthStore((state) => state.currentAccount);
export const useAccountMemberships = () => useAuthStore((state) => state.accountMemberships);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthInitialized = () => useAuthStore((state) => state.isInitialized);
export const useAuthRestoring = () => useAuthStore((state) => state.isRestoring);
export const useAuthHydrated = () => useAuthStore((state) => state.hasHydrated);
export const useOwnerAccount = () => useAuthStore((state) => state.ownerAccount);
export const useDocApiKeySecret = () => useAuthStore((state) => state.docApiKeySecret);
export const useIsAuthenticated = () =>
    useAuthStore((state) => state.isInitialized && state.user !== null);

// Action hooks
export const useAuthActions = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const setCurrentAccount = useAuthStore((state) => state.setCurrentAccount);
    const setAccountMemberships = useAuthStore((state) => state.setAccountMemberships);
    const setLoading = useAuthStore((state) => state.setLoading);
    const setInitialized = useAuthStore((state) => state.setInitialized);
    const setRestoring = useAuthStore((state) => state.setRestoring);
    const logout = useAuthStore((state) => state.logout);
    const logoutSilent = useAuthStore((state) => state.logoutSilent);
    const restoreAuthState = useAuthStore((state) => state.restoreAuthState);
    const recheckAuth = useAuthStore((state) => state.recheckAuth);
    const switchAccount = useAuthStore((state) => state.switchAccount);

    return {
        setUser,
        setCurrentAccount,
        setAccountMemberships,
        setLoading,
        setInitialized,
        setRestoring,
        logout,
        logoutSilent,
        restoreAuthState,
        recheckAuth,
        switchAccount,
    };
};

/**
 * Hook to get auth state and actions in one call
 */
export function useAuth() {
    const user = useAuthStore((state) => state.user);
    const currentAccount = useAuthStore((state) => state.currentAccount);
    const accountMemberships = useAuthStore((state) => state.accountMemberships);
    const isLoading = useAuthStore((state) => state.isLoading);
    const isInitialized = useAuthStore((state) => state.isInitialized);
    const isRestoring = useAuthStore((state) => state.isRestoring);
    const hasHydrated = useAuthStore((state) => state.hasHydrated);
    const actions = useAuthActions();

    return {
        // State
        user,
        currentAccount,
        accountMemberships,
        isLoading,
        isInitialized,
        isRestoring,
        hasHydrated,

        // Computed state
        isAuthenticated: isInitialized && user !== null,
        hasMultipleAccounts: accountMemberships.length > 1,

        // Actions
        ...actions,
    };
}

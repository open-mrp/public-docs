'use client';

import {
    useAuthActions,
    useAuthHydrated,
    useAuthInitialized,
    useAuthRestoring,
    useDocApiKeySecret,
    useUser,
} from '@/lib/auth-store';
import { useCallback, useEffect, useRef } from 'react';

interface AuthProviderProps {
    children: React.ReactNode;
}

/**
 * Auth Provider that manages authentication state for the docs site.
 * Attempts to restore auth state on mount by checking for valid cookies.
 *
 * Flow:
 * 1. Wait for zustand to hydrate from localStorage
 * 2. Check if we've already validated this page load
 * 3. If we have cached user data AND already checked this page load, use cache
 * 4. Otherwise, call API to validate cookies
 * 5. When tab becomes visible again, recheck auth to detect login/logout from other tabs
 * 6. If authenticated but API key is missing, retry fetching it
 */
export function AuthProvider({ children }: AuthProviderProps) {
    const { restoreAuthState, recheckAuth, refetchDocApiKey, setHasHydrated } = useAuthActions();
    const isInitialized = useAuthInitialized();
    const isRestoring = useAuthRestoring();
    const hasHydrated = useAuthHydrated();
    const user = useUser();
    const docApiKeySecret = useDocApiKeySecret();
    const apiKeyRetryCount = useRef(0);

    // Nothing flips `hasHydrated` when zustand can't read the persisted cache: an
    // unparseable blob reaches its rehydrate callback with no state to mark, and
    // unavailable storage (private mode, blocked site data) skips hydration outright.
    // The gate below would then never open, leaving every auth-dependent view stuck on
    // its skeleton, so settle the flag here and carry on without the cache.
    useEffect(() => {
        if (hasHydrated) return;
        setHasHydrated(true);
    }, [hasHydrated, setHasHydrated]);

    // Initial auth restoration on mount
    useEffect(() => {
        // Wait for zustand to hydrate from localStorage first
        if (!hasHydrated) {
            return;
        }

        // Skip if already initialized or currently restoring
        if (isInitialized || isRestoring) {
            return;
        }

        // Try to restore auth state (will use cache or call API based on session state)
        restoreAuthState();
    }, [hasHydrated, isInitialized, isRestoring, restoreAuthState]);

    // Retry API key fetch if user is authenticated but key is missing.
    // This handles cases where the initial fetchDocApiKey failed or was skipped.
    useEffect(() => {
        if (!isInitialized || !user || docApiKeySecret) {
            apiKeyRetryCount.current = 0;
            return;
        }

        if (apiKeyRetryCount.current >= 3) return;

        const timer = setTimeout(() => {
            apiKeyRetryCount.current += 1;
            refetchDocApiKey();
        }, 2000);
        return () => clearTimeout(timer);
    }, [isInitialized, user, docApiKeySecret, refetchDocApiKey]);

    // Handle visibility change to detect auth changes from other tabs
    const handleVisibilityChange = useCallback(() => {
        if (document.visibilityState === 'visible') {
            // Tab became visible - recheck auth to detect login/logout from other tabs
            // Also reset API key retry count so it can retry if needed
            apiKeyRetryCount.current = 0;
            recheckAuth();
        }
    }, [recheckAuth]);

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [handleVisibilityChange]);

    return <>{children}</>;
}

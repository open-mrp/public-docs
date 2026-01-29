'use client';

import {
    useAuthActions,
    useAuthHydrated,
    useAuthInitialized,
    useAuthRestoring,
} from '@/lib/auth-store';
import { useCallback, useEffect } from 'react';

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
 */
export function AuthProvider({ children }: AuthProviderProps) {
    const { restoreAuthState, recheckAuth } = useAuthActions();
    const isInitialized = useAuthInitialized();
    const isRestoring = useAuthRestoring();
    const hasHydrated = useAuthHydrated();

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

    // Handle visibility change to detect auth changes from other tabs
    const handleVisibilityChange = useCallback(() => {
        if (document.visibilityState === 'visible') {
            // Tab became visible - recheck auth to detect login/logout from other tabs
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

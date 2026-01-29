'use client';

import { useIsAuthenticated } from '@/lib/auth-store';
import { ReactNode } from 'react';

interface AuthConditionalProps {
    children: ReactNode;
}

/**
 * Renders children only when the user is authenticated.
 *
 * @example
 * ```mdx
 * <IfAuthenticated>
 *   Welcome back! Here's your personalized dashboard.
 * </IfAuthenticated>
 * ```
 */
export function IfAuthenticated({ children }: AuthConditionalProps) {
    const isAuthenticated = useIsAuthenticated();

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}

/**
 * Renders children only when the user is NOT authenticated.
 *
 * @example
 * ```mdx
 * <IfUnauthenticated>
 *   Please log in to access your API keys.
 * </IfUnauthenticated>
 * ```
 */
export function IfUnauthenticated({ children }: AuthConditionalProps) {
    const isAuthenticated = useIsAuthenticated();

    if (isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}


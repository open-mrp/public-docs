'use client';

import { useIsAuthenticated } from '@/lib/auth-store';
import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

interface AuthConditionalProps {
    children: ReactNode;
    className?: string;
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
export function IfAuthenticated({ children, className }: AuthConditionalProps) {
    const isAuthenticated = useIsAuthenticated();

    if (!isAuthenticated) {
        return null;
    }

    return <div className={cn('pt-2', className)}>{children}</div>;
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
export function IfUnauthenticated({ children, className }: AuthConditionalProps) {
    const isAuthenticated = useIsAuthenticated();

    if (isAuthenticated) {
        return null;
    }

    return <div className={cn('pt-2', className)}>{children}</div>;
}

'use client';

import { useDarkMode } from '@openmrp/ui';
import { cn } from '@/utils/cn';

interface FrostedSurfaceProps {
    className?: string;
    children: React.ReactNode;
}

/**
 * A reusable frosted glass surface with backdrop blur and theme-aware opacity.
 * Use for cards, footer strips, or any content that sits over animated or busy backgrounds.
 */
export function FrostedSurface({ className, children }: FrostedSurfaceProps) {
    const { isDark, hasMounted } = useDarkMode();

    const backgroundColor =
        hasMounted && !isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(15, 14, 24, 0.85)';

    return (
        <div className={cn('backdrop-blur-md', className)} style={{ backgroundColor }}>
            {children}
        </div>
    );
}

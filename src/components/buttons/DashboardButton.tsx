'use client';

import { Env } from '@/lib/env';
import { GlassButton, GlassButtonProps } from '@openmrp/ui';

export default function DashboardButton({ children, ...props }: GlassButtonProps) {
    return (
        <GlassButton
            onClick={() => (window.location.href = Env.frontendHref('/dashboard'))}
            {...props}
        >
            {children || 'Dashboard'}
        </GlassButton>
    );
}

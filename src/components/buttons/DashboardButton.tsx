'use client';

import { GlassButton, GlassButtonProps } from '@openmrp/ui';

export default function DashboardButton({ children, ...props }: GlassButtonProps) {
    return (
        <GlassButton
            onClick={() =>
                (window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`)
            }
            {...props}
        >
            {children || 'Dashboard'}
        </GlassButton>
    );
}

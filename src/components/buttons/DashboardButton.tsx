'use client';

import { Button, ButtonProps } from '@augno/ui';

export default function DashboardButton({ children, ...props }: ButtonProps) {
    return (
        <Button
            onClick={() =>
                (window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`)
            }
            {...props}
        >
            {children || 'Dashboard'}
        </Button>
    );
}

'use client';

import { Env } from '@/lib/env';
import { Button, ButtonProps } from '@openmrp/ui';

export default function DashboardButton({ children, ...props }: ButtonProps) {
    return (
        <Button onClick={() => (window.location.href = Env.frontendHref('/dashboard'))} {...props}>
            {children || 'Dashboard'}
        </Button>
    );
}

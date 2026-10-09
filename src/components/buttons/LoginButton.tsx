import { Env } from '@/lib/env';
import { GlassButton, GlassButtonProps } from '@openmrp/ui';

export default function LoginButton({ ...props }: GlassButtonProps) {
    return (
        <GlassButton
            onClick={() => (window.location.href = Env.frontendHref('/auth/login'))}
            {...props}
        >
            Log in
        </GlassButton>
    );
}

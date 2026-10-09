import { Env } from '@/lib/env';
import { GlassButton, GlassButtonProps } from '@openmrp/ui';

export default function RegisterButton({ ...props }: GlassButtonProps) {
    return (
        <GlassButton
            onClick={() => (window.location.href = Env.frontendHref('/auth/register'))}
            {...props}
        >
            Sign up
        </GlassButton>
    );
}

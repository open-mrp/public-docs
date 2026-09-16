import { Env } from '@/lib/env';
import { Button, ButtonProps } from '@openmrp/ui';

export default function RegisterButton({ ...props }: ButtonProps) {
    return (
        <Button
            onClick={() => (window.location.href = Env.frontendHref('/auth/register'))}
            {...props}
        >
            Sign up
        </Button>
    );
}

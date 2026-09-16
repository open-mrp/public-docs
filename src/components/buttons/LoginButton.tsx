import { Env } from '@/lib/env';
import { Button, ButtonProps } from '@openmrp/ui';

export default function LoginButton({ ...props }: ButtonProps) {
    return (
        <Button onClick={() => (window.location.href = Env.frontendHref('/auth/login'))} {...props}>
            Log in
        </Button>
    );
}

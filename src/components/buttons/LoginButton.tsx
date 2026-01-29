import { Button, ButtonProps } from '@augno/ui';

export default function LoginButton({ ...props }: ButtonProps) {
    return (
        <Button
            onClick={() =>
                (window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/login`)
            }
            {...props}
        >
            Log in
        </Button>
    );
}

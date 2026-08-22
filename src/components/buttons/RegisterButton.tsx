import { Button, ButtonProps } from '@openmrp/ui';

export default function RegisterButton({ ...props }: ButtonProps) {
    return (
        <Button
            onClick={() =>
                (window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/register`)
            }
            {...props}
        >
            Sign up
        </Button>
    );
}

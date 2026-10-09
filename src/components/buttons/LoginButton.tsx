import { GlassButton, GlassButtonProps } from '@openmrp/ui';

export default function LoginButton({ ...props }: GlassButtonProps) {
    return (
        <GlassButton
            onClick={() =>
                (window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/login`)
            }
            {...props}
        >
            Log in
        </GlassButton>
    );
}

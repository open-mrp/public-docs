import { GlassButton, GlassButtonProps } from '@openmrp/ui';

export default function RegisterButton({ ...props }: GlassButtonProps) {
    return (
        <GlassButton
            onClick={() =>
                (window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/register`)
            }
            {...props}
        >
            Sign up
        </GlassButton>
    );
}

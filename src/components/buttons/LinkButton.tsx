import { GlassButton, GlassButtonProps } from '@openmrp/ui';
import Link from 'next/link';

interface LinkButtonProps extends GlassButtonProps {
    href: string;
}

export default function LinkButton({ href, children, ...props }: LinkButtonProps) {
    return (
        <Link href={href} className="w-fit">
            <GlassButton {...props}>{children}</GlassButton>
        </Link>
    );
}

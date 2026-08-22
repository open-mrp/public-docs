import { Button, ButtonProps } from '@openmrp/ui';
import Link from 'next/link';

interface LinkButtonProps extends ButtonProps {
    href: string;
}

export default function LinkButton({ href, children, ...props }: LinkButtonProps) {
    return (
        <Link href={href} className="w-fit">
            <Button {...props}>{children}</Button>
        </Link>
    );
}

import { paths } from '@/static/paths';
import { OpenMRPLogo } from '@openmrp/ui';
import Link from 'next/link';

export default function HomeLogo({ color = 'white' }) {
    return (
        <div className="flex">
            <Link href={paths.home} className="flex items-center gap-2">
                <span className="sr-only">OpenMRP</span>
                <OpenMRPLogo color={color} />
                <span
                    className={`text-xl uppercase`}
                    style={{ letterSpacing: '0.08em', fontWeight: 500, color }}
                >
                    Docs
                </span>
            </Link>
        </div>
    );
}

'use client';

import { getPath } from '@/static/paths';
import { Breadcrumbs, type Breadcrumb as GenericBreadcrumb } from '@augno/ui';
import Link from 'next/link';

interface DocBreadcrumb {
    pathKey?: string;
    label: string;
}

interface DocBreadcrumbsProps {
    crumbs: DocBreadcrumb[];
    className?: string;
    useNextRouter?: boolean;
}

export function DocBreadcrumbs({ crumbs, className, useNextRouter = true }: DocBreadcrumbsProps) {
    const genericCrumbs: GenericBreadcrumb[] = crumbs.map((crumb) => ({
        label: crumb.label,
        href: crumb.pathKey ? getPath(crumb.pathKey) : undefined,
    }));

    return (
        <Breadcrumbs
            crumbs={genericCrumbs}
            className={className}
            renderLink={(crumb) => {
                if (useNextRouter && crumb.href) {
                    return (
                        <Link className="text-sm" href={crumb.href}>
                            {crumb.label}
                        </Link>
                    );
                }
                return (
                    <a className="text-sm" href={crumb.href}>
                        {crumb.label}
                    </a>
                );
            }}
        />
    );
}

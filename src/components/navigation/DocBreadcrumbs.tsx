'use client';

import { getPath } from '@/static/paths';
import { Breadcrumbs, type Breadcrumb as GenericBreadcrumb } from '@openmrp/ui';
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

    const renderLink = (crumb: GenericBreadcrumb) => {
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
    };

    if (crumbs.length < 3) {
        return <Breadcrumbs crumbs={genericCrumbs} className={className} renderLink={renderLink} />;
    }

    const collapsedCrumbs: GenericBreadcrumb[] = [
        genericCrumbs[0],
        { label: '...' },
        genericCrumbs[genericCrumbs.length - 1],
    ];

    return (
        <>
            <Breadcrumbs
                crumbs={genericCrumbs}
                className={`hidden md:flex ${className ?? ''}`}
                renderLink={renderLink}
            />
            <Breadcrumbs
                crumbs={collapsedCrumbs}
                className={`flex md:hidden ${className ?? ''}`}
                renderLink={renderLink}
            />
        </>
    );
}

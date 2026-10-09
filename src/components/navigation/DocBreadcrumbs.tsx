'use client';

import { getPath } from '@/static/paths';
import { Breadcrumbs } from '@openmrp/ui';
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
    const items = crumbs.map((crumb, index) => {
        const href = crumb.pathKey ? getPath(crumb.pathKey) : undefined;
        if (!href) {
            return (
                <span key={index} className="text-sm">
                    {crumb.label}
                </span>
            );
        }
        if (useNextRouter) {
            return (
                <Link key={index} className="text-sm" href={href}>
                    {crumb.label}
                </Link>
            );
        }
        return (
            <a key={index} className="text-sm" href={href}>
                {crumb.label}
            </a>
        );
    });

    if (crumbs.length < 3) {
        return <Breadcrumbs className={className}>{items}</Breadcrumbs>;
    }

    return (
        <>
            <Breadcrumbs className={`hidden md:flex ${className ?? ''}`}>{items}</Breadcrumbs>
            <Breadcrumbs
                className={`flex md:hidden ${className ?? ''}`}
                maxItems={2}
                itemsBeforeCollapse={1}
                itemsAfterCollapse={1}
            >
                {items}
            </Breadcrumbs>
        </>
    );
}

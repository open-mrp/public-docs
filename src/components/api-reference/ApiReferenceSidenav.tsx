'use client';

import { apiTags, type EndpointData } from '@/static/apiEndpoints.generated';
import { NavItem, NavLink, NavSubSection, NavSubSectionData, Sidenav } from '@augno/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type ActionKind = 'list' | 'create' | 'delete' | 'retrieve' | 'update' | 'other';

const actionConfig: Record<ActionKind, { color: string }> = {
    list: { color: 'var(--api-action-list, #22c55e)' },
    retrieve: { color: 'var(--api-action-retrieve, #22c55e)' },
    create: { color: 'var(--api-action-create, #00a3ff)' },
    delete: { color: 'var(--api-action-delete, #ff2d2d)' },
    update: { color: 'var(--api-action-update, #f59e0b)' },
    other: { color: 'var(--api-action-other, #6b7280)' },
};

function actionKindFromLabel(label: string): ActionKind {
    const s = label.trim().toLowerCase();
    if (s === 'list') return 'list';
    if (s === 'create') return 'create';
    if (s === 'delete') return 'delete';
    if (s === 'retrieve') return 'retrieve';
    if (s === 'update' || s.startsWith('update ')) return 'update';
    return 'other';
}

function IconArrowUpRight({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
            <path
                d="M7 17L17 7M17 7H10M17 7V14"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function IconArrowDownLeft({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
            <path
                d="M17 7L7 17M7 17H14M7 17V10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function IconX({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
            <path
                d="M7 7L17 17M17 7L7 17"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ActionIcon({ label, active }: { label: string; active: boolean }) {
    const kind = actionKindFromLabel(label);
    const { color } = actionConfig[kind];

    const icon =
        kind === 'delete' ? (
            <IconX className="w-3 h-3" />
        ) : kind === 'list' || kind === 'retrieve' ? (
            <IconArrowDownLeft className="w-3 h-3" />
        ) : kind === 'create' || kind === 'update' ? (
            <IconArrowUpRight className="w-3 h-3" />
        ) : (
            <IconArrowUpRight className="w-3 h-3 opacity-70" />
        );

    // Keep inactive borders subtler in light mode, and hide the border entirely when active
    const inactiveBorderColor = `color-mix(in oklab, ${color} 35%, var(--background))`;
    const inactiveBg = `color-mix(in oklab, ${color} 16%, transparent)`;
    const borderColor = active ? color : inactiveBorderColor;

    return (
        <span
            className="inline-flex items-center justify-center w-5 h-5 rounded shrink-0 border transition-[background-color,border-color,color] duration-200 ease-out"
            style={{
                backgroundColor: active ? color : inactiveBg,
                borderColor,
                color: active ? '#fff' : color,
            }}
            aria-hidden="true"
            title={label}
        >
            {icon}
        </span>
    );
}

function titleize(segment: string) {
    if (segment.startsWith('{') && segment.endsWith('}')) return segment;
    const cleaned = segment.replaceAll('-', ' ').replaceAll('_', ' ').trim();
    if (!cleaned) return segment;
    return cleaned
        .split(/\s+/)
        .map((w) => {
            const lower = w.toLowerCase();
            if (lower === 'api') return 'API';
            if (lower === 'edi') return 'EDI';
            return w.charAt(0).toUpperCase() + w.slice(1);
        })
        .join(' ');
}

function actionLabel(endpoint: EndpointData): string {
    if (endpoint.actionType === 'list') return 'List';
    if (endpoint.actionType === 'retrieve') return 'Retrieve';
    if (endpoint.actionType === 'create') return 'Create';
    if (endpoint.actionType === 'update') return 'Update';
    if (endpoint.actionType === 'delete') return 'Delete';

    const s = endpoint.summary.trim();
    const lower = s.toLowerCase();
    if (lower.startsWith('list ')) return 'List';
    if (lower.startsWith('search ')) return 'List';
    if (lower.startsWith('get ') || lower.startsWith('retrieve ')) return 'Retrieve';
    if (lower.startsWith('create ') || lower.startsWith('trigger ')) return 'Create';
    if (lower.startsWith('update ') || lower.startsWith('upsert ')) return 'Update';
    if (lower.startsWith('delete ') || lower.startsWith('revoke ')) return 'Delete';
    return s;
}

function staticSegments(endpointPath: string): string[] {
    const parts = endpointPath.split('/').filter(Boolean);
    const segments = parts.slice(2).filter((s) => !s.startsWith('{'));
    const actionsIdx = segments.indexOf('actions');
    return actionsIdx !== -1 ? segments.slice(0, actionsIdx) : segments;
}

type TreeNode = {
    segment: string;
    title: string;
    links: NavLink[];
    children: Map<string, TreeNode>;
};

function makeTreeNode(segment: string): TreeNode {
    return { segment, title: titleize(segment), links: [], children: new Map() };
}

function insertIntoTree(root: Map<string, TreeNode>, segments: string[], link: NavLink) {
    if (segments.length === 0) return;
    const [first, ...rest] = segments;
    let node = root.get(first!);
    if (!node) {
        node = makeTreeNode(first!);
        root.set(first!, node);
    }
    if (rest.length === 0) {
        node.links.push(link);
    } else {
        insertIntoTree(node.children, rest, link);
    }
}

function treeNodeToSubSection(node: TreeNode): NavSubSectionData {
    const childSubSections = [...node.children.values()]
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(treeNodeToSubSection);
    return { title: node.title, items: [...node.links, ...childSubSections] };
}

export default function ApiReferenceSidenav() {
    const pathname = usePathname();
    const isPathActive = (path: string) => pathname === path;

    const sections = useMemo(() => {
        const byDomain = new Map<string, Map<string, TreeNode>>();

        for (const tag of apiTags) {
            for (const e of tag.endpoints) {
                let domainTree = byDomain.get(e.domain);
                if (!domainTree) {
                    domainTree = new Map();
                    byDomain.set(e.domain, domainTree);
                }

                const href = `/api-reference/${e.tagSlug}/${e.endpointSlug}`;
                const segments = staticSegments(e.path);
                const link: NavLink = { href, children: actionLabel(e) };
                insertIntoTree(domainTree, segments, link);
            }
        }

        const domainOrder = ['ai', 'auth', 'core'];
        const domainEntries = [...byDomain.entries()].sort((a, b) => {
            const ai = domainOrder.indexOf(a[0]);
            const bi = domainOrder.indexOf(b[0]);
            if (ai !== -1 || bi !== -1) return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
            return a[0].localeCompare(b[0]);
        });

        return domainEntries.map(([domain, tree]) => ({
            title: domain,
            links: [...tree.values()]
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(treeNodeToSubSection),
        }));
    }, []);

    const renderNavItem = (item: NavLink | NavSubSectionData) => {
        if ('items' in item) {
            return (
                <NavSubSection
                    key={item.title}
                    subSection={item}
                    isPathActive={isPathActive}
                    renderNavItem={renderNavItem}
                />
            );
        }

        const active = isPathActive(item.href);
        const label = String(item.children);

        return (
            <NavItem
                key={item.href}
                href={item.href}
                active={active}
                renderLink={({ href, children, className, style }) => (
                    <Link
                        href={href}
                        className={className}
                        style={{
                            ...style,
                            ...(active ? { color: 'var(--foreground)' } : {}),
                        }}
                    >
                        <span className="flex items-center gap-2 min-w-0">
                            <ActionIcon label={label} active={active} />
                            <span className={`truncate${active ? ' !text-[var(--foreground)]' : ''}`}>
                                {children}
                            </span>
                        </span>
                    </Link>
                )}
            >
                {item.children}
            </NavItem>
        );
    };

    return (
        <Sidenav
            sections={[
                {
                    title: 'API Reference',
                    links: [{ href: '/api-reference', children: 'Overview' }],
                },
                ...sections,
            ]}
            renderNavItem={renderNavItem}
            className="api-reference-sidenav border-r border-[var(--sidenav-border)] h-full!"
        />
    );
}

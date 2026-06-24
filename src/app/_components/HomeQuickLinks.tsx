import { FrostedSurface } from '@/components/FrostedSurface';
import { ChevronRightIcon } from '@augno/ui';
import Link from 'next/link';

/**
 * Grouped quick-link panel shown on the home page beneath the cards, giving
 * visitors a one-click jump into the highest-traffic guides (mirrors the
 * grouped link columns on Stripe's docs landing page). Rendered inside a
 * FrostedSurface so it reads cleanly over the animated wave background, like
 * the API-keys and recently-visited cards above it.
 */
interface QuickLink {
    label: string;
    href: string;
}

interface QuickLinkColumn {
    /** Plain section heading (the section overview is reachable from "Browse by workflow"). */
    title: string;
    links: QuickLink[];
}

const QUICK_LINK_COLUMNS: QuickLinkColumn[] = [
    {
        title: 'Build products',
        links: [
            { label: 'Set up your items', href: '/build-products/items/overview' },
            { label: 'Create purchase orders', href: '/build-products/purchasing/purchase-orders' },
            { label: 'Run production', href: '/build-products/production/production-runs' },
        ],
    },
    {
        title: 'Generate sales',
        links: [
            { label: 'Create a customer', href: '/generate-sales/customer/create' },
            { label: 'Create a sales order', href: '/generate-sales/sales-order/create' },
            { label: 'Set up the customer portal', href: '/generate-sales/customer-portal' },
        ],
    },
    {
        title: 'Developers',
        links: [
            { label: 'Send your first API request', href: '/api-request' },
            { label: 'Explore the SDKs', href: '/api/typescript-sdk' },
            { label: 'API reference', href: '/api-reference' },
        ],
    },
];

interface ProductLink {
    label: string;
    href: string;
    description: string;
}

const BROWSE_BY_WORKFLOW: ProductLink[] = [
    {
        label: 'Build products',
        href: '/build-products/overview',
        description: 'Items, purchasing, production & inventory',
    },
    {
        label: 'Generate sales',
        href: '/generate-sales/overview',
        description: 'Customers, pricing & sales orders',
    },
    {
        label: 'Ship products',
        href: '/ship-products/overview',
        description: 'Picking, packing & shipping',
    },
    {
        label: 'Collect payments',
        href: '/collect-payments/overview',
        description: 'Invoicing & accounts receivable',
    },
    {
        label: 'Dashboards',
        href: '/dashboards/overview',
        description: 'Sales, operations & financial analytics',
    },
    {
        label: 'Manage your account',
        href: '/manage-account/overview',
        description: 'Team, API keys & billing',
    },
];

const headingClass = 'text-base font-semibold text-stone-900 dark:text-white';
// Color lives on the child <span>/<svg>, never the <a>: a global
// `a:not(.code-editor-link)` rule (global.css) paints anchors green and
// outranks Tailwind text utilities set directly on the anchor.
const linkLabelClass =
    'text-sm text-[var(--foreground)] dark:text-white/80 transition-colors group-hover:text-stone-900 dark:group-hover:text-white';
// Arrow slides in + fades on hover (matches the old column-heading affordance).
const arrowClass =
    'h-3.5 w-3.5 shrink-0 text-stone-500 dark:text-white/50 opacity-0 -translate-x-1 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100';

export function HomeQuickLinks() {
    return (
        <FrostedSurface
            className="rounded-xl border border-[var(--text-secondary)]/20 dark:border-white/15
                       px-5 py-6 sm:px-7 sm:py-8 flex flex-col gap-8"
        >
            {/* Grouped quick-link columns */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
                {QUICK_LINK_COLUMNS.map((column) => (
                    <div key={column.title} className="flex flex-col gap-3">
                        <h2 className={headingClass}>{column.title}</h2>
                        <div className="flex flex-col gap-2">
                            {column.links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="group inline-flex w-fit items-center gap-1.5"
                                >
                                    <span className={linkLabelClass}>{link.label}</span>
                                    <ChevronRightIcon className={arrowClass} />
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Browse by workflow */}
            <div className="flex flex-col gap-5 border-t border-[var(--text-secondary)]/20 dark:border-white/10 pt-7">
                <h2 className={headingClass}>Browse by workflow</h2>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                    {BROWSE_BY_WORKFLOW.map((product) => (
                        <Link key={product.href} href={product.href} className="group flex flex-col gap-0.5">
                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 dark:text-white">
                                {product.label}
                                <ChevronRightIcon className={arrowClass} />
                            </span>
                            <span className="text-sm text-stone-600 dark:text-white/50">
                                {product.description}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </FrostedSurface>
    );
}

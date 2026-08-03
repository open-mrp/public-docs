import { getPath } from '@/static/paths';
import { routeToTab } from '@/static/routeMap.generated';

/**
 * Display labels for route segments used in breadcrumbs.
 * When a new section is added, add an entry here.
 */
export const segmentLabels: Record<string, string> = {
    // Workflow sections
    'build-products': 'Build Products',
    'generate-sales': 'Generate Sales',
    'ship-products': 'Ship Products',
    'collect-payments': 'Collect Payments',
    communicate: 'Communicate',
    'automate-with-agents': 'Automate with agents',
    // Workflow subsections
    items: 'Items',
    bom: 'BOMs',
    production: 'Production',
    'production-planning': 'Production planning',
    plant: 'Plant & equipment',
    inventory: 'Inventory',
    purchasing: 'Purchasing',
    receiving: 'Receiving',
    scanning: 'Scanning',
    customer: 'Customer',
    'customer-group': 'Customer group',
    'sales-order': 'Sales order',
    picking: 'Picking',
    packing: 'Packing',
    shipping: 'Shipping',
    invoicing: 'Invoicing',
    'accounts-receivable': 'Accounts receivable',
    collecting: 'Collecting',
    // Get started sections
    account: 'Account',
    // Developer resources sections
    api: 'API',
    'api-reference': 'API Reference',
    monitoring: 'Monitoring',
};

/**
 * Tab display labels and pathKeys for breadcrumbs.
 */
export const tabLabels: Record<string, { label: string; pathKey: string }> = {
    'get-started': { label: 'Get started', pathKey: 'getStarted' },
    workflows: { label: 'Workflows', pathKey: 'workflows' },
    'developer-resources': { label: 'Developer resources', pathKey: 'development' },
};

/**
 * Extra ancestor breadcrumbs for specific route prefixes.
 * These are inserted between the tab crumb and the route segment crumbs.
 */
const routeAncestors: Record<string, { label: string; pathKey: string }[]> = {
    '/api-reference': [{ label: 'API', pathKey: 'api.overview' }],
};

interface Breadcrumb {
    label: string;
    pathKey?: string;
}

function kebabToCamelCase(s: string): string {
    return s.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Try to resolve a pathKey for an intermediate breadcrumb segment.
 * Attempts .overview, .root, and bare path in order.
 */
function tryResolvePathKey(basePath: string): string | undefined {
    if (getPath(basePath + '.overview', { silent: true })) return basePath + '.overview';
    if (getPath(basePath + '.root', { silent: true })) return basePath + '.root';
    const bare = getPath(basePath, { silent: true });
    if (bare && typeof bare === 'string') return basePath;
    return undefined;
}

/**
 * Build breadcrumbs automatically from a route path and page title.
 *
 * Pattern:
 *   Home → Tab → [ancestors] → [intermediate segments] → current page
 *
 * For overview pages (last segment is "overview"), the final breadcrumb uses
 * the parent segment's label rather than the page title.
 */
export function buildBreadcrumbsFromRoute(route: string, pageTitle: string): Breadcrumb[] {
    const crumbs: Breadcrumb[] = [{ label: 'Home', pathKey: 'home' }];

    // Add tab breadcrumb
    const tabId = routeToTab[route];
    if (tabId && tabLabels[tabId]) {
        const { label, pathKey } = tabLabels[tabId];
        crumbs.push({ label, pathKey });
    }

    // Add route ancestors (e.g., api-reference routes get an "API" ancestor)
    for (const [prefix, ancestors] of Object.entries(routeAncestors)) {
        if (route.startsWith(prefix)) {
            crumbs.push(...ancestors);
            break;
        }
    }

    const segments = route.replace(/^\//, '').split('/');
    const isOverview = segments[segments.length - 1] === 'overview';

    // Build intermediate segment crumbs (all segments except the last)
    const camelCaseParts: string[] = [];
    for (let i = 0; i < segments.length - 1; i++) {
        const segment = segments[i];
        camelCaseParts.push(kebabToCamelCase(segment));

        const label = segmentLabels[segment];
        if (!label) continue;

        const basePath = camelCaseParts.join('.');
        const pathKey = tryResolvePathKey(basePath);

        crumbs.push({ label, pathKey });
    }

    // Add final breadcrumb (non-linked)
    if (isOverview && segments.length >= 2) {
        // For overview pages, use the parent segment's label
        const parentSegment = segments[segments.length - 2];
        const label = segmentLabels[parentSegment] || pageTitle;
        crumbs.push({ label });
    } else {
        crumbs.push({ label: pageTitle });
    }

    // Dedup: if last two crumbs have the same label, remove the linked one
    if (crumbs.length >= 2) {
        const last = crumbs[crumbs.length - 1];
        const prev = crumbs[crumbs.length - 2];
        if (last.label === prev.label) {
            crumbs.splice(crumbs.length - 2, 1);
        }
    }

    return crumbs;
}

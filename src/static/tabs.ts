export interface Tab {
    id: string;
    label: string;
    rootPath: string;
    defaultPage: string;
}

export const tabs: Tab[] = [
    {
        id: 'get-started',
        label: 'Get started',
        rootPath: '/get-started',
        defaultPage: '/get-started',
    },
    {
        id: 'workflows',
        label: 'Workflows',
        rootPath: '/workflows',
        defaultPage: '/workflows',
    },
    {
        id: 'developer-resources',
        label: 'Developer resources',
        rootPath: '/developer-resources',
        defaultPage: '/development',
    },
    {
        id: 'api-reference',
        label: 'API Reference',
        rootPath: '/api-reference',
        defaultPage: '/api-reference',
    },
];

/**
 * Determine the active tab from a URL path.
 * This version only uses path prefix matching.
 * For route-based tab lookup, use getTabFromRoute with routeToTab.
 */
export function getTabFromPath(path: string): Tab | undefined {
    // Normalize path to ensure it starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    // Find the tab whose rootPath matches the start of the path
    return tabs.find((tab) => normalizedPath.startsWith(tab.rootPath));
}

/**
 * Look up a tab by route using path prefix matching first,
 * then falling back to the generated routeToTab mapping.
 */
export function getTabFromRoute(path: string, routeToTab: Record<string, string>): Tab | undefined {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    const pathTab = getTabFromPath(normalizedPath);
    if (pathTab) return pathTab;

    const tabId = routeToTab[normalizedPath];
    if (tabId) {
        return tabs.find((tab) => tab.id === tabId);
    }

    return undefined;
}

/**
 * Look up a tab by its ID
 */
export function getTabById(id: string): Tab | undefined {
    return tabs.find((tab) => tab.id === id);
}

/**
 * Get the default tab (first in the list)
 */
export function getDefaultTab(): Tab {
    return tabs[0];
}

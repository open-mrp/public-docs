/**
 * Navigation ordering configuration.
 *
 * This file defines the order of sections and subsections in the navigation.
 * - Sections are ordered by their position in the array
 * - Subsections within each section are ordered by their position in the subsections array
 * - Use `null` to represent pages without a subsection (root pages in a section)
 * - Items not listed here will appear at the end in alphabetical order
 */

export interface SectionOrder {
    section: string;
    subsections: (string | null)[];
}

export interface TabNavOrder {
    tabId: string;
    sections: SectionOrder[];
}

export const navOrder: TabNavOrder[] = [
    {
        tabId: 'get-started',
        sections: [
            {
                section: 'Get Started',
                subsections: ['Overview', 'About the APIs'],
            },
            {
                section: 'Start Building',
                subsections: ['Create an account', 'Start developing'],
            },
        ],
    },
    {
        tabId: 'workflows',
        sections: [
            { section: 'Workflows', subsections: ['Overview'] },
            {
                section: 'Build products',
                subsections: [
                    'Overview',
                    'Items',
                    'Purchasing',
                    'BOMs',
                    'Production',
                    'Production planning',
                    'Plant & equipment',
                    'Scanning',
                    'Inventory',
                ],
            },
            {
                section: 'Generate sales',
                subsections: [
                    'Overview',
                    'Customer setup',
                    'Customer',
                    'Customer pricing',
                    'Sales order',
                    'Sales team',
                    'Customer portal',
                ],
            },
            {
                section: 'Ship products',
                subsections: ['Overview', 'Picking', 'Packing', 'Shipping'],
            },
            {
                section: 'Collect payments',
                subsections: ['Overview', 'Invoicing', 'Accounts receivable', 'Collecting'],
            },
            {
                section: 'Communicate',
                subsections: [
                    'Overview',
                    'Messages',
                    'Inbox',
                    'Notifications',
                    'Email',
                    'Retention & compliance',
                ],
            },
            {
                section: 'Dashboards',
                subsections: [
                    'Overview',
                    'Sales',
                    'Operations',
                    'Financial',
                    'Forecasting & targets',
                ],
            },
            {
                section: 'Manage your account',
                subsections: [
                    'Overview',
                    'Account settings',
                    'Customer portal',
                    'Support',
                    'Team',
                    'Integrations',
                    'API keys',
                    'Sandboxes',
                    'Security',
                    'Plans & billing',
                ],
            },
            {
                section: 'Automate with agents',
                subsections: [
                    'Overview',
                    'Agents',
                    'Runs',
                    'Tools & approvals',
                    'Memories',
                    'Agents in chat',
                ],
            },
        ],
    },
    {
        tabId: 'developer-resources',
        sections: [
            {
                section: 'Developer resources',
                subsections: [null],
            },
            {
                section: 'API',
                subsections: [
                    'Overview',
                    'SDKs',
                    'MCP',
                    'Authentication',
                    'Make Requests',
                    'Handling Errors',
                    'Monitoring',
                    'Testing',
                    'API Reference',
                ],
            },
            {
                section: 'Start Building',
                subsections: ['About the APIs'],
            },
        ],
    },
];

/**
 * Get the order index for a section within a tab.
 * Returns a high number (999) if not found.
 */
export function getSectionOrder(tabId: string, section: string): number {
    const tab = navOrder.find((t) => t.tabId === tabId);
    if (!tab) return 999;

    const index = tab.sections.findIndex((s) => s.section.toLowerCase() === section.toLowerCase());
    return index === -1 ? 999 : index;
}

/**
 * Get the order index for a subsection within a section.
 * Use `null` for pages without a subsection.
 * Returns a high number (999) if not found.
 */
export function getSubsectionOrder(
    tabId: string,
    section: string,
    subsection: string | null,
): number {
    const tab = navOrder.find((t) => t.tabId === tabId);
    if (!tab) return 999;

    const sectionConfig = tab.sections.find(
        (s) => s.section.toLowerCase() === section.toLowerCase(),
    );
    if (!sectionConfig) return 999;

    const index = sectionConfig.subsections.findIndex((sub) =>
        sub === null
            ? subsection === null
            : subsection !== null && sub.toLowerCase() === subsection.toLowerCase(),
    );
    return index === -1 ? 999 : index;
}

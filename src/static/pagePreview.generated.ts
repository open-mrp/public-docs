// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.

export interface PagePreview {
    title: string;
    subtitle?: string;
}

export const pagePreviewData: Record<string, PagePreview> = {
    '/development': {
        title: 'Developer resources',
        subtitle: 'Technical documentation, API references, and guides for developers.',
    },
    '/get-started': {
        title: 'Get started',
        subtitle: 'Create an account and learn how to build on Augno.',
    },
    '/api/overview': {
        title: "Augno's APIs",
        subtitle: "Learn more about Augno's APIs.",
    },
    '/api-tour': {
        title: 'Tour of the Augno API',
        subtitle:
            'See how Augno API objects fit together and learn best practices for combining them effectively.',
    },
    '/account/activate': {
        title: 'Activate your account',
        subtitle: 'Learn how to activate and manage your Augno account.',
    },
    '/account/checklist': {
        title: 'Account activation checklist',
        subtitle: 'Complete this checklist before putting your Augno account into production.',
    },
    '/account': {
        title: 'Create an Augno account',
        subtitle:
            'Learn how to activate and manage your Augno account, from initial setup to advanced configurations.',
    },
    '/api-request': {
        title: 'Send your first Augno API request',
        subtitle: 'Get started with the Augno API.',
    },
    '/release-phases': {
        title: 'Product Release Phases',
        subtitle: 'Learn how Augno describes product release phases and what to expect from each.',
    },
    '/go-live': {
        title: 'Go live checklist',
        subtitle:
            'Use this checklist to ensure a smooth transition putting your integration into production.',
    },
    '/test-integration': {
        title: 'Build and test your integration',
        subtitle: 'Build and test your integration using the Augno developer tools.',
    },
    '/api/api-keys': {
        title: 'API Keys',
        subtitle: 'Learn how to authenticate requests with API keys.',
    },
    '/api/managing-api-keys': {
        title: 'Managing API Keys',
        subtitle: 'Learn the best practices for managing secret API keys.',
    },
    '/api/errors': {
        title: 'API Errors',
        subtitle: 'Standard error envelope format for consistent error handling.',
    },
    '/api/idempotency': {
        title: 'Idempotency',
        subtitle: 'Safely retry requests without duplicating work.',
    },
    '/api/request-ids': {
        title: 'Request IDs',
        subtitle: 'Use request IDs to debug issues and get support.',
    },
    '/api/uris': {
        title: 'Augno API URIs',
        subtitle: 'Learn the general format of Augno API URIs.',
    },
    '/api/account-context': {
        title: 'Account Context',
        subtitle: 'Specify which account context to use for API requests.',
    },
    '/api/versioning': {
        title: 'API Versioning',
        subtitle: 'Understand how Augno versions its API and manage version upgrades.',
    },
    '/api/pagination': {
        title: 'Pagination',
        subtitle: 'Iterating through paginated list results.',
    },
    '/api/rate-limiting': {
        title: 'Rate Limiting',
        subtitle: 'Understand rate limits and implement retry strategies.',
    },
};

export function getPagePreview(path: string): PagePreview | undefined {
    return pagePreviewData[path];
}

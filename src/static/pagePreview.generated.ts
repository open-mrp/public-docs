// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.

export interface PagePreview {
    title: string;
    subtitle?: string;
}

export const pagePreviewData: Record<string, PagePreview> = {
    "/get-started": {
        "title": "Get started",
        "subtitle": "Create an account and learn how to build on Augno."
    },
    "/get-started/api-request": {
        "title": "Send your first Augno API request",
        "subtitle": "Get started with the Augno API."
    },
    "/get-started/go-live": {
        "title": "Go live checklist",
        "subtitle": "Use this checklist to ensure a smooth transition putting your integration into production."
    },
    "/get-started/test-integration": {
        "title": "Build and test your integration",
        "subtitle": "Build and test your integration using the Augno developer tools."
    },
    "/get-started/account": {
        "title": "Create an Augno account",
        "subtitle": "Learn how to activate and manage your Augno account, from initial setup to advanced configurations."
    },
    "/get-started/account/activate": {
        "title": "Activate your account",
        "subtitle": "Learn how to activate and manage your Augno account."
    },
    "/get-started/account/checklist": {
        "title": "Account activation checklist",
        "subtitle": "Complete this checklist before putting your Augno account into production."
    },
    "/get-started/api/release-phases": {
        "title": "Product Release Phases",
        "subtitle": "Learn how Augno describes product release phases and what to expect from each."
    },
    "/get-started/api/idempotency-and-eventual-consistency": {
        "title": "Idempotency and Eventual Consistency",
        "subtitle": "Learn how the Augno API ensures eventual consistency."
    },
    "/get-started/api/api-uris": {
        "title": "Augno API URIs",
        "subtitle": "Learn the general format of Augno API URIs."
    },
    "/get-started/api/api-tour": {
        "title": "Tour of the Augno API",
        "subtitle": "See how Augno API objects fit together and learn best practices for combining them effectively."
    }
};

export function getPagePreview(path: string): PagePreview | undefined {
    return pagePreviewData[path];
}

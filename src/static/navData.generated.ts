// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.

import { NavSection } from '@augno/ui';

export interface TabbedNavData {
    [tabId: string]: NavSection[];
}

export const navData: TabbedNavData = {
    "get-started": [
        {
            "title": "Get Started",
            "links": [
                {
                    "href": "/get-started",
                    "children": "Overview"
                },
                {
                    "title": "About the APIs",
                    "items": [
                        {
                            "href": "/api-tour",
                            "children": "API tour"
                        }
                    ]
                }
            ]
        },
        {
            "title": "Start Building",
            "links": [
                {
                    "title": "Create an account",
                    "items": [
                        {
                            "href": "/account",
                            "children": "Overview"
                        },
                        {
                            "href": "/account/activate",
                            "children": "Activate your account"
                        },
                        {
                            "href": "/account/checklist",
                            "children": "Checklist"
                        }
                    ]
                },
                {
                    "title": "Start developing",
                    "items": [
                        {
                            "href": "/api-request",
                            "children": "Send your first API request"
                        },
                        {
                            "href": "/test-integration",
                            "children": "Build & test your integration"
                        },
                        {
                            "href": "/go-live",
                            "children": "Go live checklist"
                        },
                        {
                            "href": "/release-phases",
                            "children": "Release phases"
                        }
                    ]
                }
            ]
        }
    ],
    "developer-resources": [
        {
            "title": "Developer resources",
            "links": [
                {
                    "href": "/development",
                    "children": "Overview"
                }
            ]
        },
        {
            "title": "API",
            "links": [
                {
                    "href": "/api/overview",
                    "children": "Overview"
                },
                {
                    "title": "Authentication",
                    "items": [
                        {
                            "href": "/api/api-keys",
                            "children": "API Keys"
                        },
                        {
                            "href": "/api/managing-api-keys",
                            "children": "Managing API Keys"
                        }
                    ]
                },
                {
                    "title": "Make Requests",
                    "items": [
                        {
                            "href": "/api/account-context",
                            "children": "Account context"
                        },
                        {
                            "href": "/api/uris",
                            "children": "API URIs"
                        },
                        {
                            "href": "/api/idempotency",
                            "children": "Idempotency"
                        },
                        {
                            "href": "/api/rate-limiting",
                            "children": "Rate limiting"
                        },
                        {
                            "href": "/api/versioning",
                            "children": "API versioning"
                        },
                        {
                            "href": "/api/pagination",
                            "children": "Pagination"
                        },
                        {
                            "href": "/api/request-ids",
                            "children": "Request IDs"
                        }
                    ]
                },
                {
                    "title": "Handling Errors",
                    "items": [
                        {
                            "href": "/api/errors",
                            "children": "API errors"
                        }
                    ]
                }
            ]
        }
    ]
};

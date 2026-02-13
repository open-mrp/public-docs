// THIS FILE IS AUTO-GENERATED FROM specs/api_public_spec.json
// Run 'bun run build:docs' to regenerate.

export interface ApiEndpoint {
    name: string;
    slug: string;
    href: string;
    description: string;
}

export interface ApiSection {
    name: string;
    slug: string;
    description: string;
    endpoints: ApiEndpoint[];
}

export interface ApiReferenceData {
    title: string;
    description: string;
    version: string;
    sections: ApiSection[];
}

export const apiReferenceData: ApiReferenceData = {
    title: 'Augno',
    description: 'The Augno REST API. Please see https://docs.augno.com/api for more details.',
    version: '2.0.0',
    sections: [
        {
            name: 'Health',
            slug: 'health',
            description:
                'API health monitoring endpoints for service status and environment information.',
            endpoints: [
                {
                    name: 'Health',
                    slug: 'health',
                    href: '/api/health',
                    description:
                        'API health monitoring endpoints for service status and environment information.',
                },
            ],
        },
        {
            name: 'Authentication',
            slug: 'authentication',
            description:
                'User authentication and authorization endpoints for login and token management.',
            endpoints: [
                {
                    name: 'Authentication',
                    slug: 'authentication',
                    href: '/api/authentication',
                    description:
                        'User authentication and authorization endpoints for login and token management.',
                },
            ],
        },
    ],
};

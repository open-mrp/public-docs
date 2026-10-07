// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.
//
// Client-safe index of every API version the reference is built for,
// latest first. Archived versions come from api-versions.json.

export interface ApiVersionInfo {
    version: string;
    codename: string;
    isLatest: boolean;
    /** Archived versions only: open-mrp/openapi-spec tag their spec is fetched from. */
    specTag?: string;
}

export const API_VERSIONS: ApiVersionInfo[] = [
    {
        "version": "1.0.forge-preview.7",
        "codename": "forge",
        "isLatest": true
    },
    {
        "version": "1.0.forge-preview.6",
        "codename": "forge",
        "isLatest": false,
        "specTag": "1.0.forge-preview.6-rev.2"
    },
    {
        "version": "1.0.forge-preview.5",
        "codename": "forge",
        "isLatest": false,
        "specTag": "1.0.forge-preview.5-rev.8"
    },
    {
        "version": "1.0.forge-preview.4",
        "codename": "forge",
        "isLatest": false,
        "specTag": "1.0.forge-preview.4-rev.11"
    },
    {
        "version": "1.0.forge-preview.3",
        "codename": "forge",
        "isLatest": false,
        "specTag": "1.0.forge-preview.3-rev.18"
    },
    {
        "version": "1.0.forge-preview.2",
        "codename": "forge",
        "isLatest": false,
        "specTag": "1.0.forge-preview.2-rev.41"
    },
    {
        "version": "1.0.forge-preview.1",
        "codename": "forge",
        "isLatest": false,
        "specTag": "1.0.forge-preview.1-rev.38"
    }
];

export const LATEST_API_VERSION = "1.0.forge-preview.7";

export function isArchivedApiVersion(version: string): boolean {
    return API_VERSIONS.some((v) => v.version === version && !v.isLatest);
}

/**
 * Route prefix for a version's API reference. The latest version lives at the
 * canonical /api-reference; archived versions live under /api-reference/<version>.
 */
export function apiReferenceBasePath(version: string): string {
    return version === LATEST_API_VERSION ? '/api-reference' : `/api-reference/${version}`;
}

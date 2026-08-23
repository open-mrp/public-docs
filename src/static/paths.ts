// External paths (manually maintained for non-doc URLs)
const openMRPFrontend = process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://openmrp.ai';
const openMRPDashboard = openMRPFrontend + '/dashboard';

export const externalPaths = {
    discord: 'https://discord.gg/f2xnd8djd',
    github: {
        openapiSpec: 'https://github.com/open-mrp/openapi-spec',
        typescriptSdk: 'https://github.com/open-mrp/typescript-sdk',
        goSdk: 'https://github.com/open-mrp/openmrp-go',
    },
    npm: {
        typescriptSdk: 'https://www.npmjs.com/package/@openmrp/sdk',
    },
    pkgGoDev: {
        goSdk: 'https://pkg.go.dev/github.com/open-mrp/openmrp-go',
    },
    frontend: {
        root: openMRPFrontend,
        login: openMRPFrontend + '/auth/login',
        signup: openMRPFrontend + '/auth/register',

        dashboard: openMRPDashboard,
        requestLogs: openMRPDashboard + '/request-logs',
        events: openMRPDashboard + '/audit-events',
        apiKeys: openMRPDashboard + '/account?tab=apiKeys',
        team: openMRPDashboard + '/team',
        account: openMRPDashboard + '/account?tab=account',
        integrations: openMRPDashboard + '/account?tab=integrations',
        roles: openMRPDashboard + '/roles',
        security: openMRPDashboard + '/account?tab=security',
        billing: openMRPDashboard + '/account?tab=billing',
        general: openMRPDashboard + '/account?tab=general',
        sandboxes: openMRPDashboard + '/sandboxes',
        units: openMRPDashboard + '/units-of-measure?tab=units',
        unitGroups: openMRPDashboard + '/units-of-measure',
        createUnit: openMRPDashboard + '/units-of-measure/units/create',
        createUnitGroup: openMRPDashboard + '/units-of-measure/groups/create',
    },
};

// Combined paths object for backwards compatibility
// Import docPaths at runtime to allow for code splitting
import { docPaths } from './docPaths.generated';

export const paths = {
    home: '/',
    ...docPaths,
    ...externalPaths,
} as const;

// Path lookup helper
type PathValue = string | { [key: string]: PathValue };

// Track invalid pathKeys to avoid duplicate warnings
const warnedPathKeys = new Set<string>();

export function getPath(pathKey: string, { silent = false } = {}): string | undefined {
    const keys = pathKey.split('.');
    let current: PathValue = paths as unknown as PathValue;

    for (const key of keys) {
        if (current === undefined || current === null || typeof current !== 'object') {
            if (!silent && !warnedPathKeys.has(pathKey)) {
                warnedPathKeys.add(pathKey);
                console.error(`[Invalid pathKey] "${pathKey}" does not resolve to a valid path`);
            }
            return undefined;
        }
        current = (current as { [key: string]: PathValue })[key];
    }

    if (typeof current !== 'string') {
        if (!silent && !warnedPathKeys.has(pathKey)) {
            warnedPathKeys.add(pathKey);
            console.error(
                `[Invalid pathKey] "${pathKey}" resolves to an object, not a path. Did you mean "${pathKey}.root"?`,
            );
        }
        return undefined;
    }

    return current;
}

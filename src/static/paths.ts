// External paths (manually maintained for non-doc URLs)
const augnoFrontend = process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://augno.com';
const augnoDashboard = augnoFrontend + '/dashboard';

export const externalPaths = {
    github: {
        openapiSpec: 'https://github.com/Augno/openapi-spec',
    },
    frontend: {
        root: augnoFrontend,
        login: augnoFrontend + '/auth/login',
        signup: augnoFrontend + '/auth/register',

        dashboard: augnoDashboard,
        requestLogs: augnoDashboard + '/request-logs',
        events: augnoDashboard + '/events',
        apiKeys: augnoDashboard + '/account?tab=apiKeys',
        team: augnoDashboard + '/account?tab=team',
        account: augnoDashboard + '/account?tab=account',
        integrations: augnoDashboard + '/account?tab=integrations',
        roles: augnoDashboard + '/account?tab=roles',
        security: augnoDashboard + '/account?tab=security',
        billing: augnoDashboard + '/account?tab=planAndBilling',
        general: augnoDashboard + '/account?tab=general',
        sandboxes: augnoDashboard + '/sandboxes',
        units: augnoDashboard + '/units-of-measure?tab=units',
        unitGroups: augnoDashboard + '/units-of-measure',
        createUnit: augnoDashboard + '/units-of-measure/units/create',
        createUnitGroup: augnoDashboard + '/units-of-measure/groups/create',
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

// External paths (manually maintained for non-doc URLs)
const augnoFrontend = process.env.NEXT_PUBLIC_FRONTEND_URL;
const augnoDashboard = augnoFrontend + '/dashboard';

export const externalPaths = {
    frontend: {
        root: augnoFrontend,
        dashboard: augnoDashboard,
        logs: augnoDashboard + '/logs',
        events: augnoDashboard + '/events',
        signup: augnoFrontend + '/auth/register',
        apiKeys: augnoDashboard + '/api-keys',
    },
};

// Re-export generated doc paths
export { docPaths } from './docPaths.generated';

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

export function getPath(pathKey: string): string | undefined {
    const keys = pathKey.split('.');
    let current: PathValue = paths as unknown as PathValue;

    for (const key of keys) {
        if (current === undefined || current === null || typeof current !== 'object') {
            return undefined;
        }
        current = (current as { [key: string]: PathValue })[key];
    }

    return typeof current === 'string' ? current : undefined;
}

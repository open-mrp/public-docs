'use client';

import {
    latestApiNavEntries,
    latestApiObjectNavEntries,
    type ApiNavEntry,
    type ApiObjectNavEntry,
} from '@/static/apiNav.generated';
import { LATEST_API_VERSION } from '@/static/apiVersions.generated';
import { useEffect, useState } from 'react';

export interface ApiNavEntries {
    endpoints: ApiNavEntry[];
    objects: ApiObjectNavEntry[];
}

const LATEST: ApiNavEntries = {
    endpoints: latestApiNavEntries,
    objects: latestApiObjectNavEntries,
};
const EMPTY: ApiNavEntries = { endpoints: [], objects: [] };

// One request per archived version per page load; failures are dropped so a later
// render retries.
const archivedRequests = new Map<string, Promise<ApiNavEntries>>();

function fetchArchivedNavEntries(version: string): Promise<ApiNavEntries> {
    let pending = archivedRequests.get(version);
    if (!pending) {
        pending = fetch(`/api/api-reference-nav/${encodeURIComponent(version)}`).then((res) => {
            if (!res.ok)
                throw new Error(`Loading sidenav for API ${version} failed: ${res.status}`);
            return res.json() as Promise<ApiNavEntries>;
        });
        archivedRequests.set(version, pending);
        pending.catch(() => archivedRequests.delete(version));
    }
    return pending;
}

/**
 * Sidenav entries for an API version. The latest version's are bundled; an archived
 * version's are fetched from the server (which loads its spec on demand), so they are
 * empty until that request resolves.
 */
export function useApiNavEntries(version: string): ApiNavEntries {
    const [archived, setArchived] = useState<{ version: string; entries: ApiNavEntries }>();

    useEffect(() => {
        if (version === LATEST_API_VERSION) return;
        let cancelled = false;
        fetchArchivedNavEntries(version)
            .then((entries) => {
                if (!cancelled) setArchived({ version, entries });
            })
            .catch((error: unknown) => console.error(error));
        return () => {
            cancelled = true;
        };
    }, [version]);

    if (version === LATEST_API_VERSION) return LATEST;
    return archived?.version === version ? archived.entries : EMPTY;
}

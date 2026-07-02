import { EndpointPage } from '@/components/api-reference/EndpointPage';
import {
    getEndpointForVersion,
    getObjectsForVersion,
    getSnippetsForVersion,
} from '@/static/apiVersionData.generated';
import { LATEST_API_VERSION, apiReferenceBasePath } from '@/static/apiVersions.generated';

export function ApiEndpoint({
    version = LATEST_API_VERSION,
    tagSlug,
    endpointSlug,
}: {
    version?: string;
    tagSlug: string;
    endpointSlug: string;
}) {
    const endpoint = getEndpointForVersion(version, tagSlug, endpointSlug);

    if (!endpoint) {
        return (
            <div className="rounded-xl border border-[var(--border-color)] p-4">
                <p className="text-sm text-[var(--text-secondary)]">
                    Endpoint not found: <code className="font-mono">{tagSlug}</code> /{' '}
                    <code className="font-mono">{endpointSlug}</code>
                </p>
            </div>
        );
    }

    return (
        <EndpointPage
            endpoint={endpoint}
            snippets={getSnippetsForVersion(version, endpoint.operationId)}
            basePath={apiReferenceBasePath(version)}
            objectSlugs={(getObjectsForVersion(version) ?? []).map((o) => o.slug)}
        />
    );
}

import { EndpointPage } from '@/components/api-reference/EndpointPage';
import {
    findEndpoint,
    getLatestApiVersionData,
    getSnippetsForVersion,
    type ApiVersionData,
} from '@/lib/api-reference-data';
import { apiReferenceBasePath } from '@/static/apiVersions.generated';

/**
 * Also registered as an MDX component, where it renders the latest version; the API
 * reference route passes the (possibly archived) version's data it already loaded.
 */
export function ApiEndpoint({
    data = getLatestApiVersionData(),
    tagSlug,
    endpointSlug,
}: {
    data?: ApiVersionData;
    tagSlug: string;
    endpointSlug: string;
}) {
    const endpoint = findEndpoint(data, tagSlug, endpointSlug);

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
            snippets={getSnippetsForVersion(data.version, endpoint.operationId)}
            basePath={apiReferenceBasePath(data.version)}
            objectSlugs={data.objects.map((o) => o.slug)}
        />
    );
}

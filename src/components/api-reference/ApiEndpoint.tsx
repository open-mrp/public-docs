import { EndpointPage } from '@/components/api-reference/EndpointPage';
import { getEndpoint } from '@/static/apiEndpoints.generated';

export function ApiEndpoint({ tagSlug, endpointSlug }: { tagSlug: string; endpointSlug: string }) {
    const endpoint = getEndpoint(tagSlug, endpointSlug);

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

    return <EndpointPage endpoint={endpoint} />;
}


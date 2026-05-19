import { ApiEndpoint } from '@/components/api-reference/ApiEndpoint';
import { ApiReferenceOverview } from '@/components/api-reference/ApiReferenceOverview';
import { getEndpoint, getAllEndpointSlugs } from '@/static/apiEndpoints.generated';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const API_REFERENCE_PAGE_TITLE = 'API Reference';

export function generateStaticParams(): { segments?: string[] }[] {
    const endpointParams = getAllEndpointSlugs().map(({ tagSlug, endpointSlug }) => ({
        segments: [tagSlug, endpointSlug],
    }));
    // Root `/api-reference` for optional catch-all `[[...segments]]`
    return [{ segments: [] }, ...endpointParams];
}

export const dynamicParams = false;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ segments?: string[] }>;
}): Promise<Metadata> {
    const { segments } = await params;
    const seg = segments ?? [];

    if (seg.length === 0) {
        return { title: `${API_REFERENCE_PAGE_TITLE} | Augno Documentation` };
    }

    if (seg.length === 2) {
        const endpoint = getEndpoint(seg[0], seg[1]);
        if (!endpoint) {
            return { title: 'Not found | Augno Documentation' };
        }
        return { title: `${endpoint.summary} | Augno Documentation` };
    }

    return { title: 'Not found | Augno Documentation' };
}

export default async function ApiReferencePage({
    params,
}: {
    params: Promise<{ segments?: string[] }>;
}) {
    const { segments } = await params;
    const seg = segments ?? [];

    if (seg.length === 0) {
        return <ApiReferenceOverview />;
    }

    if (seg.length !== 2) {
        notFound();
    }

    const [tagSlug, endpointSlug] = seg;
    if (!getEndpoint(tagSlug, endpointSlug)) {
        notFound();
    }

    return <ApiEndpoint tagSlug={tagSlug} endpointSlug={endpointSlug} />;
}

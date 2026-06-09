import { ApiEndpoint } from '@/components/api-reference/ApiEndpoint';
import { ApiReferenceOverview } from '@/components/api-reference/ApiReferenceOverview';
import { JsonLd } from '@/components/seo/JsonLd';
import { techArticleJsonLd } from '@/lib/jsonLd';
import { ogImageUrl } from '@/lib/site';
import { getEndpoint, getAllEndpointSlugs } from '@/static/apiEndpoints.generated';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const API_REFERENCE_PAGE_TITLE = 'API Reference';
const API_REFERENCE_DESCRIPTION =
    'Complete reference for the Augno API: every endpoint, parameter, request body, and response, with examples.';

/** First sentence of an endpoint description, capped for use as a meta description. */
function toMetaDescription(text: string, fallback: string): string {
    const trimmed = (text || '').trim();
    if (!trimmed) return fallback;
    const firstSentence = trimmed.split(/(?<=[.!?])\s/)[0];
    const out = firstSentence.length > 160 ? `${firstSentence.slice(0, 157)}…` : firstSentence;
    return out;
}

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
        const ogImage = ogImageUrl({
            title: 'API Reference',
            eyebrow: 'Augno Docs',
            subtitle: 'Every Augno API endpoint',
        });
        return {
            title: API_REFERENCE_PAGE_TITLE,
            description: API_REFERENCE_DESCRIPTION,
            alternates: { canonical: '/api-reference' },
            openGraph: {
                type: 'article',
                title: API_REFERENCE_PAGE_TITLE,
                description: API_REFERENCE_DESCRIPTION,
                url: '/api-reference',
                images: [ogImage],
            },
            twitter: {
                title: API_REFERENCE_PAGE_TITLE,
                description: API_REFERENCE_DESCRIPTION,
                images: [ogImage],
            },
        };
    }

    if (seg.length === 2) {
        const endpoint = getEndpoint(seg[0], seg[1]);
        if (!endpoint) {
            return { title: 'Not found' };
        }
        const route = `/api-reference/${seg[0]}/${seg[1]}`;
        const description = toMetaDescription(
            endpoint.description,
            `${endpoint.method.toUpperCase()} ${endpoint.path} — Augno API reference.`,
        );
        const title = `${endpoint.summary} — ${endpoint.tag}`;
        const ogImage = ogImageUrl({
            title: endpoint.summary,
            eyebrow: 'API Reference',
            subtitle: `${endpoint.method.toUpperCase()} ${endpoint.path}`,
        });
        return {
            title,
            description,
            alternates: { canonical: route },
            openGraph: { type: 'article', title, description, url: route, images: [ogImage] },
            twitter: { title, description, images: [ogImage] },
        };
    }

    return { title: 'Not found' };
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
    const endpoint = getEndpoint(tagSlug, endpointSlug);
    if (!endpoint) {
        notFound();
    }

    const route = `/api-reference/${tagSlug}/${endpointSlug}`;
    return (
        <>
            <JsonLd
                data={techArticleJsonLd({
                    title: `${endpoint.summary} — ${endpoint.tag}`,
                    description: toMetaDescription(
                        endpoint.description,
                        `${endpoint.method.toUpperCase()} ${endpoint.path}`,
                    ),
                    route,
                })}
            />
            <ApiEndpoint tagSlug={tagSlug} endpointSlug={endpointSlug} />
        </>
    );
}

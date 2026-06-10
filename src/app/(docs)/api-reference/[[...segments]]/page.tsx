import { ApiEndpoint } from '@/components/api-reference/ApiEndpoint';
import { ApiReferenceOverviewContent } from '@/components/api-reference/ApiReferenceOverview';
import { ApiVersionBanner } from '@/components/api-reference/ApiVersionBanner';
import { buildOverviewDomains } from '@/lib/api-reference-overview';
import { JsonLd } from '@/components/seo/JsonLd';
import { techArticleJsonLd } from '@/lib/jsonLd';
import { socialMeta } from '@/lib/metadata';
import { ogImage } from '@/lib/site';
import { getEndpoint, getAllEndpointSlugs } from '@/static/apiEndpoints.generated';
import {
    getArchivedRouteParams,
    getEndpointForVersion,
    getTagsForVersion,
} from '@/static/apiVersionData.generated';
import {
    LATEST_API_VERSION,
    apiReferenceBasePath,
    isArchivedApiVersion,
} from '@/static/apiVersions.generated';
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

interface ResolvedApiRoute {
    version: string;
    isArchived: boolean;
    basePath: string;
    tagSlug?: string;
    endpointSlug?: string;
}

/**
 * Routes handled here:
 *   []                              → overview, latest version (canonical)
 *   [tagSlug, endpointSlug]         → endpoint, latest version (canonical)
 *   [version]                       → overview, archived version
 *   [version, tagSlug, endpointSlug] → endpoint, archived version
 */
function resolveApiRoute(seg: string[]): ResolvedApiRoute | undefined {
    if (seg.length === 0) {
        return { version: LATEST_API_VERSION, isArchived: false, basePath: '/api-reference' };
    }

    if (isArchivedApiVersion(seg[0])) {
        const version = seg[0];
        const basePath = apiReferenceBasePath(version);
        if (seg.length === 1) return { version, isArchived: true, basePath };
        if (seg.length === 3) {
            return { version, isArchived: true, basePath, tagSlug: seg[1], endpointSlug: seg[2] };
        }
        return undefined;
    }

    if (seg.length === 2) {
        return {
            version: LATEST_API_VERSION,
            isArchived: false,
            basePath: '/api-reference',
            tagSlug: seg[0],
            endpointSlug: seg[1],
        };
    }

    return undefined;
}

/** Where the "switch to latest" banner should send you from an archived page. */
function latestCounterpartRoute(route: ResolvedApiRoute): string {
    if (route.tagSlug && route.endpointSlug && getEndpoint(route.tagSlug, route.endpointSlug)) {
        return `/api-reference/${route.tagSlug}/${route.endpointSlug}`;
    }
    return '/api-reference';
}

export function generateStaticParams(): { segments?: string[] }[] {
    const endpointParams = getAllEndpointSlugs().map(({ tagSlug, endpointSlug }) => ({
        segments: [tagSlug, endpointSlug],
    }));
    // Root `/api-reference` for optional catch-all `[[...segments]]`,
    // latest endpoints at canonical unversioned routes, then every archived
    // version's overview and endpoints under /api-reference/<version>/.
    return [{ segments: [] }, ...endpointParams, ...getArchivedRouteParams()];
}

export const dynamicParams = false;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ segments?: string[] }>;
}): Promise<Metadata> {
    const { segments } = await params;
    const route = resolveApiRoute(segments ?? []);
    if (!route) return { title: 'Not found' };

    if (!route.tagSlug || !route.endpointSlug) {
        if (route.isArchived) {
            return {
                title: `${API_REFERENCE_PAGE_TITLE} (${route.version})`,
                description: API_REFERENCE_DESCRIPTION,
                // Archived versions point search engines at the canonical latest docs.
                alternates: { canonical: '/api-reference' },
                robots: { index: false },
            };
        }
        const card = ogImage({
            title: 'API Reference',
            eyebrow: 'Augno Docs',
            subtitle: 'Every Augno API endpoint',
        });
        return {
            title: API_REFERENCE_PAGE_TITLE,
            description: API_REFERENCE_DESCRIPTION,
            alternates: { canonical: '/api-reference' },
            ...socialMeta({
                title: API_REFERENCE_PAGE_TITLE,
                description: API_REFERENCE_DESCRIPTION,
                url: '/api-reference',
                card,
            }),
        };
    }

    const endpoint = getEndpointForVersion(route.version, route.tagSlug, route.endpointSlug);
    if (!endpoint) {
        return { title: 'Not found' };
    }

    const description = toMetaDescription(
        endpoint.description,
        `${endpoint.method.toUpperCase()} ${endpoint.path} — Augno API reference.`,
    );

    if (route.isArchived) {
        return {
            title: `${endpoint.summary} — ${endpoint.tag} (${route.version})`,
            description,
            alternates: { canonical: latestCounterpartRoute(route) },
            robots: { index: false },
        };
    }

    const canonicalRoute = `/api-reference/${route.tagSlug}/${route.endpointSlug}`;
    const title = `${endpoint.summary} — ${endpoint.tag}`;
    const card = ogImage({
        title: endpoint.summary,
        eyebrow: 'API Reference',
        subtitle: `${endpoint.method.toUpperCase()} ${endpoint.path}`,
    });
    return {
        title,
        description,
        alternates: { canonical: canonicalRoute },
        ...socialMeta({ title, description, url: canonicalRoute, card }),
    };
}

export default async function ApiReferencePage({
    params,
}: {
    params: Promise<{ segments?: string[] }>;
}) {
    const { segments } = await params;
    const route = resolveApiRoute(segments ?? []);
    if (!route) {
        notFound();
    }

    const banner = route.isArchived ? (
        <ApiVersionBanner
            version={route.version}
            latestVersion={LATEST_API_VERSION}
            latestHref={latestCounterpartRoute(route)}
        />
    ) : null;

    if (!route.tagSlug || !route.endpointSlug) {
        const tags = getTagsForVersion(route.version);
        if (!tags) {
            notFound();
        }
        return (
            <>
                {banner}
                <ApiReferenceOverviewContent domains={buildOverviewDomains(tags, route.basePath)} />
            </>
        );
    }

    const endpoint = getEndpointForVersion(route.version, route.tagSlug, route.endpointSlug);
    if (!endpoint) {
        notFound();
    }

    return (
        <>
            {!route.isArchived && (
                <JsonLd
                    data={techArticleJsonLd({
                        title: `${endpoint.summary} — ${endpoint.tag}`,
                        description: toMetaDescription(
                            endpoint.description,
                            `${endpoint.method.toUpperCase()} ${endpoint.path}`,
                        ),
                        route: `${route.basePath}/${route.tagSlug}/${route.endpointSlug}`,
                    })}
                />
            )}
            {banner}
            <ApiEndpoint
                version={route.version}
                tagSlug={route.tagSlug}
                endpointSlug={route.endpointSlug}
            />
        </>
    );
}

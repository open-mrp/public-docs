import { ApiEndpoint } from '@/components/api-reference/ApiEndpoint';
import { ApiObject } from '@/components/api-reference/ApiObject';
import { ApiReferenceOverviewContent } from '@/components/api-reference/ApiReferenceOverview';
import { ApiVersionBanner } from '@/components/api-reference/ApiVersionBanner';
import { buildOverviewDomains } from '@/lib/api-reference-overview';
import { buildOverviewObjectDomains } from '@/lib/api-reference-objects-overview';
import { JsonLd } from '@/components/seo/JsonLd';
import { techArticleJsonLd } from '@/lib/jsonLd';
import { socialMeta } from '@/lib/metadata';
import { ogImage } from '@/lib/site';
import { findEndpoint, findObject, getApiVersionData } from '@/lib/api-reference-data';
import { resolveApiRoute, type ResolvedApiRoute } from '@/lib/api-reference-route';
import {
    getAllEndpointSlugs,
    getAllObjectSlugs,
    getEndpoint,
    getObject,
} from '@/static/apiEndpoints.generated';
import { LATEST_API_VERSION } from '@/static/apiVersions.generated';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

const API_REFERENCE_PAGE_TITLE = 'API Reference';
const API_REFERENCE_DESCRIPTION =
    'Complete reference for the OpenMRP API: every endpoint, parameter, request body, and response, with examples.';

/** First sentence of an endpoint description, capped for use as a meta description. */
function toMetaDescription(text: string, fallback: string): string {
    const trimmed = (text || '').trim();
    if (!trimmed) return fallback;
    const firstSentence = trimmed.split(/(?<=[.!?])\s/)[0];
    const out = firstSentence.length > 160 ? `${firstSentence.slice(0, 157)}…` : firstSentence;
    return out;
}

/** Where the "switch to latest" banner should send you from an archived page. */
function latestCounterpartRoute(route: ResolvedApiRoute): string {
    if (route.tagSlug && route.endpointSlug && getEndpoint(route.tagSlug, route.endpointSlug)) {
        return `/api-reference/${route.tagSlug}/${route.endpointSlug}`;
    }
    if (route.objectSlug && getObject(route.objectSlug)) {
        return `/api-reference/objects/${route.objectSlug}`;
    }
    return '/api-reference';
}

export function generateStaticParams(): { segments?: string[] }[] {
    const endpointParams = getAllEndpointSlugs().map(({ tagSlug, endpointSlug }) => ({
        segments: [tagSlug, endpointSlug],
    }));
    const objectParams = getAllObjectSlugs().map((slug) => ({ segments: ['objects', slug] }));
    // Root `/api-reference` for optional catch-all `[[...segments]]`, each object
    // page, and latest endpoints at canonical unversioned routes. Archived versions are
    // not prebuilt: their pages render on first request from the spec fetched on demand
    // (src/lib/archived-api-versions.ts) and are cached from then on.
    return [{ segments: [] }, ...objectParams, ...endpointParams];
}

// Needed for archived-version pages, which are not in generateStaticParams. Unknown
// paths still 404 through resolveApiRoute / the data lookups.
export const dynamicParams = true;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ segments?: string[] }>;
}): Promise<Metadata> {
    const { segments } = await params;
    const route = resolveApiRoute(segments ?? []);
    if (!route) return { title: 'Not found' };
    const data = await getApiVersionData(route.version);
    if (!data) return { title: 'Not found' };

    if (route.objectSlug) {
        const object = findObject(data, route.objectSlug);
        if (!object) return { title: 'Not found' };
        const title = `${object.name} object — ${API_REFERENCE_PAGE_TITLE}`;
        const description = toMetaDescription(
            object.description,
            `The ${object.object} object in the OpenMRP API.`,
        );
        const canonical = `/api-reference/objects/${object.slug}`;
        if (route.isArchived) {
            return {
                title: `${object.name} object (${route.version})`,
                description,
                alternates: { canonical },
                robots: { index: false },
            };
        }
        return {
            title,
            description,
            alternates: { canonical },
            ...socialMeta({
                title,
                description,
                url: canonical,
                card: ogImage({
                    title: `${object.name} object`,
                    eyebrow: 'API Reference',
                    subtitle: object.object,
                }),
            }),
        };
    }

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
            eyebrow: 'OpenMRP Docs',
            subtitle: 'Every OpenMRP API endpoint',
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

    const endpoint = findEndpoint(data, route.tagSlug, route.endpointSlug);
    if (!endpoint) {
        return { title: 'Not found' };
    }

    const description = toMetaDescription(
        endpoint.description,
        `${endpoint.method.toUpperCase()} ${endpoint.path} — OpenMRP API reference.`,
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
    const data = await getApiVersionData(route.version);
    if (!data) {
        notFound();
    }

    const banner = route.isArchived ? (
        <ApiVersionBanner
            version={route.version}
            latestVersion={LATEST_API_VERSION}
            latestHref={latestCounterpartRoute(route)}
        />
    ) : null;

    if (route.objectSlug) {
        if (!findObject(data, route.objectSlug)) {
            // The version picker keeps you on the same page when switching versions;
            // land on that version's overview when it doesn't have this object.
            if (route.isArchived) redirect(route.basePath);
            notFound();
        }
        return (
            <>
                {banner}
                <ApiObject data={data} slug={route.objectSlug} />
            </>
        );
    }

    if (!route.tagSlug || !route.endpointSlug) {
        return (
            <>
                {banner}
                <ApiReferenceOverviewContent
                    domains={buildOverviewDomains(data.tags, route.basePath)}
                    objectDomains={buildOverviewObjectDomains(data.objects, route.basePath)}
                />
            </>
        );
    }

    const endpoint = findEndpoint(data, route.tagSlug, route.endpointSlug);
    if (!endpoint) {
        if (route.isArchived) redirect(route.basePath);
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
                data={data}
                tagSlug={route.tagSlug}
                endpointSlug={route.endpointSlug}
            />
        </>
    );
}

'use client';

import type { OverviewObjectDomain } from '@/lib/api-reference-objects-overview';
import type { OverviewDomain } from '@/lib/api-reference-overview';
import Link from 'next/link';
import { ActionMethodBadge } from './ActionMethodBadge';
import { ObjectCardsByDomain } from './ObjectsOverview';

function endpointCountLabel(count: number) {
    return `${count} endpoint${count === 1 ? '' : 's'}`;
}

export function ApiReferenceOverviewContent({
    domains,
    objectDomains,
}: {
    domains: OverviewDomain[];
    objectDomains?: OverviewObjectDomain[];
}) {
    return (
        <div className="pb-8">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                API Reference
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
                Endpoints
            </h1>
            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[var(--text-secondary)]">
                Browse every API endpoint by domain and resource. Open any endpoint for parameters,
                request and response schemas, and code examples.
            </p>

            <div className="mt-10 space-y-12">
                {domains.map((domain) => (
                    <section key={domain.slug} aria-labelledby={`api-domain-${domain.slug}`}>
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                            <span className="h-px bg-[color:color-mix(in_srgb,var(--border-color)_75%,transparent)]" />
                            <h2
                                id={`api-domain-${domain.slug}`}
                                className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]"
                            >
                                {domain.name}
                            </h2>
                            <span className="h-px bg-[color:color-mix(in_srgb,var(--border-color)_75%,transparent)]" />
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {domain.resources.map((resource) => (
                                <div
                                    key={resource.slug}
                                    className="bg-background border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
                                    style={
                                        {
                                            borderColor: 'var(--border-color)',
                                            '--tw-shadow-color': 'var(--border-color)',
                                        } as React.CSSProperties
                                    }
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <p className="text-base font-semibold text-[var(--foreground)]">
                                            {resource.name}
                                        </p>
                                        <span className="shrink-0 rounded-full border border-[color:color-mix(in_srgb,var(--border-color)_85%,transparent)] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                                            {endpointCountLabel(resource.endpoints.length)}
                                        </span>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        {resource.endpoints.slice(0, 6).map((endpoint) => (
                                            <Link
                                                key={endpoint.href}
                                                href={endpoint.href}
                                                className="block rounded-xl border border-transparent px-3 py-3 transition-colors duration-150 hover:border-[color:color-mix(in_srgb,var(--border-color)_90%,transparent)] hover:bg-[color:color-mix(in_srgb,var(--background)_70%,var(--foreground)_3%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/35"
                                            >
                                                <div className="space-y-1.5">
                                                    <div className="flex items-center gap-3">
                                                        <ActionMethodBadge endpoint={endpoint} />
                                                        <p className="min-w-0 flex-1 text-sm font-medium leading-6 text-[var(--foreground)]">
                                                            {endpoint.summary}
                                                        </p>
                                                    </div>
                                                    <p className="truncate font-mono text-[12px] text-[var(--text-secondary)]">
                                                        {endpoint.path}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                        {resource.endpoints.length > 6 && (
                                            <p className="pl-3 text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                                                +{resource.endpoints.length - 6} more
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {objectDomains && objectDomains.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl">
                        Objects
                    </h2>
                    <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[var(--text-secondary)]">
                        The resources the API returns. Open an object for its attributes, an example,
                        and the endpoints that use it.
                    </p>
                    <div className="mt-8">
                        <ObjectCardsByDomain domains={objectDomains} />
                    </div>
                </div>
            )}
        </div>
    );
}

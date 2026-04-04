'use client';

import { apiNavDomains } from '@/static/apiEndpoints.generated';
import Link from 'next/link';
import { ActionMethodBadge } from './ActionMethodBadge';

export function ApiReferenceOverview() {
    return (
        <div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">API Reference</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                Endpoints
            </h1>
            <p className="mt-3 text-[15px] leading-7 text-[var(--text-secondary)] max-w-2xl">
                Browse all API endpoints organized by domain and resource. Each endpoint has its own
                page with parameters, request/response schemas, and code examples.
            </p>

            <div className="mt-10 space-y-10">
                {apiNavDomains.map((domain) => (
                    <div key={domain.slug}>
                        <h2 className="text-lg font-semibold text-[var(--foreground)]">
                            {domain.name}
                        </h2>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {domain.resources.map((resource) => (
                                <div
                                    key={resource.slug}
                                    className="rounded-xl border border-[var(--border-color)] bg-[var(--background)] p-4"
                                >
                                    <p className="font-medium text-[var(--foreground)]">
                                        {resource.name}
                                    </p>
                                    <div className="mt-3 space-y-1.5">
                                        {resource.endpoints.slice(0, 6).map((endpoint) => (
                                            <Link
                                                key={endpoint.href}
                                                href={endpoint.href}
                                                className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
                                            >
                                                <ActionMethodBadge endpoint={endpoint} />
                                                <span className="truncate">{endpoint.name}</span>
                                            </Link>
                                        ))}
                                        {resource.endpoints.length > 6 && (
                                            <p className="text-xs text-[var(--text-secondary)] pl-1">
                                                +{resource.endpoints.length - 6} more
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

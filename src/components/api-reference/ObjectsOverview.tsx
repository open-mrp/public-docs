'use client';

import type { OverviewObjectDomain } from '@/lib/api-reference-objects-overview';
import Link from 'next/link';

function firstSentence(text: string): string {
    const trimmed = text.trim();
    if (!trimmed) return '';
    const end = trimmed.split(/(?<=[.!?])\s/)[0];
    return end.length > 160 ? `${end.slice(0, 157)}…` : end;
}

export function ObjectCardsByDomain({ domains }: { domains: OverviewObjectDomain[] }) {
    return (
        <div className="space-y-12">
            {domains.map((domain) => (
                <section key={domain.slug} aria-labelledby={`api-object-domain-${domain.slug}`}>
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                        <span className="h-px bg-[color:color-mix(in_srgb,var(--border-color)_75%,transparent)]" />
                        <h2
                            id={`api-object-domain-${domain.slug}`}
                            className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]"
                        >
                            {domain.name}
                        </h2>
                        <span className="h-px bg-[color:color-mix(in_srgb,var(--border-color)_75%,transparent)]" />
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {domain.objects.map((obj) => (
                            <Link
                                key={obj.slug}
                                href={obj.href}
                                className="block bg-background border rounded-lg p-4 transition-shadow duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/35"
                                style={
                                    {
                                        borderColor: 'var(--border-color)',
                                        '--tw-shadow-color': 'var(--border-color)',
                                    } as React.CSSProperties
                                }
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-base font-semibold text-[var(--foreground)]">
                                        {obj.name}
                                    </p>
                                    <code className="shrink-0 rounded bg-[var(--foreground)]/5 px-1.5 py-0.5 font-mono text-[11px] text-[var(--text-secondary)]">
                                        {obj.object}
                                    </code>
                                </div>
                                {obj.description && (
                                    <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                                        {firstSentence(obj.description)}
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}


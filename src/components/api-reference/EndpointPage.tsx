'use client';

import BetaTag from '@/components/markdown/BetaTag';
import { useRecentlyVisitedPages } from '@/hooks/useRecentlyVisitedPages';
import type { EndpointData, Parameter, SchemaField } from '@/static/apiEndpoints.generated';
import { CheckIcon, ClipboardIcon } from '@augno/ui';
import copy from 'copy-to-clipboard';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { buildCurlExample } from './buildCurlExample';
import { CodeExamplePanel } from './CodeExamplePanel';
import { MarkdownBlock } from './MarkdownText';
import { ParameterTable, SchemaFieldTable } from './ParameterTable';

function stringifyJson(value: unknown) {
    return JSON.stringify(value ?? {}, null, 2);
}

type ActionKind = 'list' | 'create' | 'delete' | 'retrieve' | 'update' | 'other';

const actionConfig: Record<ActionKind, { color: string }> = {
    list: { color: 'var(--api-action-list, var(--primary))' },
    retrieve: { color: 'var(--api-action-retrieve, var(--primary))' },
    create: { color: 'var(--api-action-create, var(--secondary))' },
    delete: { color: 'var(--api-action-delete, #ff2d2d)' },
    update: { color: 'var(--api-action-update, #f59e0b)' },
    other: { color: 'var(--api-action-other, #6b7280)' },
};

function actionKindFromLabel(label: string): ActionKind {
    const s = label.trim().toLowerCase();
    if (s === 'list') return 'list';
    if (s === 'create') return 'create';
    if (s === 'delete') return 'delete';
    if (s === 'retrieve') return 'retrieve';
    if (s === 'update' || s.startsWith('update ')) return 'update';
    return 'other';
}

function IconArrowUpRight({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
            <path
                d="M7 17L17 7M17 7H10M17 7V14"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function IconArrowDownLeft({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
            <path
                d="M17 7L7 17M7 17H14M7 17V10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function IconX({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
            <path
                d="M7 7L17 17M17 7L7 17"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function actionLabel(endpoint: EndpointData): string {
    const s = endpoint.summary.trim();
    const lower = s.toLowerCase();
    if (lower.startsWith('list ')) return 'List';
    if (lower.startsWith('search ')) return 'List';
    if (lower.startsWith('get ') || lower.startsWith('retrieve ')) return 'Retrieve';
    if (lower.startsWith('create ') || lower.startsWith('trigger ')) return 'Create';
    if (lower.startsWith('update ') || lower.startsWith('upsert ')) return 'Update';
    if (lower.startsWith('delete ') || lower.startsWith('revoke ')) return 'Delete';
    return s;
}

const domainLabels: Record<string, string> = {
    ai: 'AI',
    auth: 'Auth',
    core: 'Core',
};

function getDomainLabel(domain: string): string {
    return domainLabels[domain] || domain.charAt(0).toUpperCase() + domain.slice(1);
}

function fieldsToMarkdown(fields: SchemaField[], indent = 0): string {
    const prefix = '  '.repeat(indent);
    return fields
        .map((f) => {
            const typeParts = [f.required ? f.type : `optional ${f.type}`];
            if (f.nullable) typeParts.push('nullable');
            if (f.enum) typeParts.push(`enum: ${f.enum.join(', ')}`);
            const desc = f.description ? ` — ${f.description}` : '';
            let line = `${prefix}- \`${f.name}\` (${typeParts.join(', ')})${desc}`;
            if (f.properties && f.properties.length > 0) {
                line += '\n' + fieldsToMarkdown(f.properties, indent + 1);
            }
            return line;
        })
        .join('\n');
}

function paramsToMarkdown(params: Parameter[]): string {
    return params
        .map((p) => {
            const typeParts = [p.required ? p.type : `optional ${p.type}`];
            if (p.enum) typeParts.push(`enum: ${p.enum.join(', ')}`);
            const desc = p.description ? ` — ${p.description}` : '';
            return `- \`${p.name}\` (${typeParts.join(', ')})${desc}`;
        })
        .join('\n');
}

function endpointToMarkdown(ep: EndpointData): string {
    const lines: string[] = [];
    lines.push(`# ${ep.summary}`);
    lines.push(`\`${ep.method.toUpperCase()} ${ep.path}\``);
    if (ep.description) lines.push('', ep.description);

    const pathParams = ep.parameters.filter((p) => p.in === 'path');
    const queryParams = ep.parameters.filter((p) => p.in === 'query');
    const headerParams = ep.parameters.filter((p) => p.in === 'header');

    if (pathParams.length > 0) {
        lines.push('', '## Path Parameters', paramsToMarkdown(pathParams));
    }
    if (queryParams.length > 0) {
        lines.push('', '## Query Parameters', paramsToMarkdown(queryParams));
    }
    if (headerParams.length > 0) {
        lines.push('', '## Header Parameters', paramsToMarkdown(headerParams));
    }

    if (ep.requestBody && ep.requestBody.fields.length > 0) {
        lines.push('', '## Request Body', fieldsToMarkdown(ep.requestBody.fields));
        if (ep.requestBody.example != null) {
            lines.push('', '### Example', '```json', stringifyJson(ep.requestBody.example), '```');
        }
    }

    const responseFields = ep.responses.find((r) => r.fields && r.fields.length > 0)?.fields;
    if (responseFields && responseFields.length > 0) {
        lines.push('', '## Response Fields', fieldsToMarkdown(responseFields));
    }

    const responseWithExample = ep.responses.find((r) => r.example != null);
    if (responseWithExample) {
        lines.push(
            '',
            `### ${responseWithExample.statusCode} Example`,
            '```json',
            stringifyJson(responseWithExample.example),
            '```',
        );
    }

    return lines.join('\n');
}

export function EndpointPage({ endpoint }: { endpoint: EndpointData }) {
    const pathParams = endpoint.parameters.filter((p) => p.in === 'path');
    const queryParams = endpoint.parameters.filter((p) => p.in === 'query');
    const headerParams = endpoint.parameters.filter((p) => p.in === 'header');

    const includeParam =
        endpoint.parameters.find(
            (p) => p.in === 'query' && (p.name === 'include[]' || p.name === 'include'),
        ) ?? null;
    const expandableIncludeValues = includeParam?.enum ?? [];
    const expandableIncludes =
        expandableIncludeValues.length > 0
            ? { paramName: includeParam?.name ?? 'include[]', values: expandableIncludeValues }
            : undefined;

    const responseWithExample = endpoint.responses.find((r) => r.example != null);
    const responseFields = endpoint.responses.find((r) => r.fields && r.fields.length > 0)?.fields;

    const expansionRoot = responseFields?.some((f) => f.name === 'data') ? 'data' : undefined;

    const cleanMarkdown = useMemo(() => endpointToMarkdown(endpoint), [endpoint]);
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        copy(cleanMarkdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const { addPage } = useRecentlyVisitedPages();
    useEffect(() => {
        const path = `/api-reference/${endpoint.tagSlug}/${endpoint.endpointSlug}`;
        addPage(path, endpoint.summary);
    }, [endpoint.tagSlug, endpoint.endpointSlug, endpoint.summary, addPage]);

    return (
        <div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <div className="min-w-0">
                    <nav className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] mb-6">
                        <Link
                            href="/api-reference"
                            className="hover:text-[var(--foreground)] transition-colors"
                        >
                            API Reference
                        </Link>
                        <span className="text-[var(--text-secondary)]/50">&gt;</span>
                        <span>{getDomainLabel(endpoint.domain)}</span>
                        <span className="text-[var(--text-secondary)]/50">&gt;</span>
                        <span className="text-[var(--foreground)]">{endpoint.tag}</span>
                        <button
                            className="relative ml-auto flex items-center gap-2 whitespace-nowrap shrink-0 px-0 py-0 hover:bg-transparent hover:text-gray-900 dark:hover:text-gray-300 hover:cursor-pointer text-[var(--text-secondary)] overflow-hidden"
                            onClick={handleCopy}
                        >
                            <span
                                className={`inline-flex items-center gap-2 transition-all duration-300 ease-out ${copied ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
                            >
                                <ClipboardIcon />
                                <span className="text-xs font-medium">Copy for LLM</span>
                            </span>
                            <span
                                className={`absolute inline-flex items-center gap-2 transition-all duration-300 ease-out ${copied ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                            >
                                <CheckIcon />
                                <span className="text-xs font-medium">Copied!</span>
                            </span>
                        </button>
                    </nav>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                            {endpoint.summary}
                        </h1>
                        {endpoint.isPreview && <BetaTag />}
                    </div>

                    <div className="mt-3 flex items-center gap-2.5">
                        {(() => {
                            const label = actionLabel(endpoint);
                            const kind = actionKindFromLabel(label);
                            const { color } = actionConfig[kind];
                            const icon =
                                kind === 'delete' ? (
                                    <IconX className="w-3 h-3" />
                                ) : kind === 'list' || kind === 'retrieve' ? (
                                    <IconArrowDownLeft className="w-3 h-3" />
                                ) : kind === 'create' || kind === 'update' ? (
                                    <IconArrowUpRight className="w-3 h-3" />
                                ) : (
                                    <IconArrowUpRight className="w-3 h-3 opacity-70" />
                                );

                            const method = endpoint.method.toUpperCase();

                            return (
                                <span
                                    className="inline-flex items-center justify-center gap-1 rounded font-mono font-semibold leading-none shrink-0 text-[var(--background)]"
                                    style={{
                                        backgroundColor: color,
                                        fontSize: '10px',
                                        padding: '3px 6px',
                                    }}
                                >
                                    <span
                                        className="inline-flex items-center justify-center shrink-0"
                                        aria-hidden="true"
                                    >
                                        {icon}
                                    </span>
                                    {method}
                                </span>
                            );
                        })()}
                        <code className="text-sm font-mono text-[var(--primary)]">
                            {endpoint.path}
                        </code>
                    </div>

                    <p className="mt-2 text-[13px] text-[var(--text-secondary)]">
                        {['POST', 'PATCH'].includes(endpoint.method.toUpperCase()) ? (
                            <>
                                Idempotent with{' '}
                                <code
                                    className="text-[12px] px-1 py-0.5 rounded"
                                    style={{
                                        color: 'var(--foreground)',
                                        background: 'color-mix(in oklab, var(--foreground) 5%, transparent)'
                                    }}
                                >
                                    Idempotency-Key
                                </code>{' '}
                                header.{' '}
                                <Link
                                    href="/api/idempotency"
                                    className="text-[var(--primary)] hover:underline"
                                >
                                    Learn more
                                </Link>
                            </>
                        ) : (
                            <>
                                This endpoint is idempotent.{' '}
                                <Link
                                    href="/api/idempotency"
                                    className="text-[var(--primary)] hover:underline"
                                >
                                    Learn more
                                </Link>
                            </>
                        )}
                    </p>

                    {endpoint.description && (
                        <MarkdownBlock
                            text={endpoint.description}
                            className="api-description mt-5 text-[15px] leading-7 text-[var(--text-secondary)]"
                        />
                    )}

                    <div className="mt-10 space-y-8">
                        {pathParams.length > 0 && (
                            <ParameterTable
                                title="Path Parameters"
                                rows={pathParams.map((p) => ({
                                    name: p.name,
                                    type: p.type + (p.format ? ` (${p.format})` : ''),
                                    required: p.required,
                                    description: p.description,
                                    enum: p.enum,
                                }))}
                            />
                        )}

                        {queryParams.length > 0 && (
                            <ParameterTable
                                title="Query Parameters"
                                rows={queryParams.map((p) => ({
                                    name: p.name,
                                    type: p.type + (p.format ? ` (${p.format})` : ''),
                                    required: p.required,
                                    description: p.description,
                                    enum: p.enum,
                                }))}
                            />
                        )}

                        {headerParams.length > 0 && (
                            <ParameterTable
                                title="Header Parameters"
                                rows={headerParams.map((p) => ({
                                    name: p.name,
                                    type: p.type + (p.format ? ` (${p.format})` : ''),
                                    required: p.required,
                                    description: p.description,
                                    enum: p.enum,
                                }))}
                            />
                        )}

                        {endpoint.requestBody && endpoint.requestBody.fields.length > 0 && (
                            <SchemaFieldTable
                                title="Request Body"
                                fields={endpoint.requestBody.fields}
                            />
                        )}

                        {responseFields && responseFields.length > 0 && (
                            <SchemaFieldTable
                                title="Returns"
                                fields={responseFields}
                                expandableIncludes={expandableIncludes}
                                expansionRoot={expansionRoot}
                            />
                        )}

                        {endpoint.responses.length > 0 && (
                            <section>
                                <h2 className="text-base font-semibold text-[var(--foreground)]">
                                    Responses
                                </h2>
                                <div className="mt-3 space-y-2">
                                    {endpoint.responses.map((r) => (
                                        <div
                                            key={r.statusCode}
                                            className="flex items-center gap-3 rounded-lg border border-[var(--border-color)] px-4 py-2.5"
                                        >
                                            <span
                                                className={`text-sm font-semibold font-mono ${
                                                    r.statusCode.startsWith('2')
                                                        ? 'text-green-500'
                                                        : r.statusCode.startsWith('4')
                                                          ? 'text-yellow-500'
                                                          : 'text-red-500'
                                                }`}
                                            >
                                                {r.statusCode}
                                            </span>
                                            <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                                <MarkdownBlock
                                                    text={r.description}
                                                    className="api-md-inline"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                <aside className="hidden xl:block">
                    <div className="sticky top-6 h-[calc(100vh-172px)] overflow-hidden pr-1 flex flex-col min-h-0 gap-4">
                        <CodeExamplePanel
                            title={endpoint.summary}
                            className="flex-none max-h-[50%]"
                            scrollable
                            tabs={[
                                {
                                    id: 'curl',
                                    label: 'cURL',
                                    language: 'bash',
                                    code: buildCurlExample(endpoint),
                                },
                                ...(endpoint.requestBody?.example != null
                                    ? [
                                          {
                                              id: 'request-body',
                                              label: 'Body',
                                              language: 'json',
                                              code: stringifyJson(endpoint.requestBody.example),
                                          },
                                      ]
                                    : []),
                            ]}
                        />

                        {responseWithExample && (
                            <CodeExamplePanel
                                title={`${responseWithExample.statusCode} example`}
                                className="flex-initial min-h-0"
                                scrollable
                                tabs={[
                                    {
                                        id: 'json',
                                        label: 'JSON',
                                        language: 'json',
                                        code: stringifyJson(responseWithExample.example),
                                    },
                                ]}
                            />
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
}

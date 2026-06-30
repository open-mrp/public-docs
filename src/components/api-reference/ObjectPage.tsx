'use client';

import { useRecentlyVisitedPages } from '@/hooks/useRecentlyVisitedPages';
import type { ObjectData, SchemaField } from '@/static/apiEndpoints.generated';
import { CheckIcon, ClipboardIcon } from '@augno/ui';
import copy from 'copy-to-clipboard';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ActionMethodBadge } from './ActionMethodBadge';
import { Chip } from './Chip';
import { CodeExamplePanel } from './CodeExamplePanel';
import { MarkdownBlock } from './MarkdownText';
import { makeObjectHref } from './objectHref';
import { SchemaFieldTable } from './ParameterTable';

function stringifyJson(value: unknown) {
    return JSON.stringify(value ?? {}, null, 2);
}

function fieldsToMarkdown(fields: SchemaField[], indent = 0): string {
    const prefix = '  '.repeat(indent);
    return fields
        .map((f) => {
            const typeName = f.objectType
                ? f.type === 'array'
                    ? `array of ${f.objectType}`
                    : f.objectType
                : f.type === 'array' && f.itemType
                    ? `array of ${f.itemType}`
                    : f.type;
            const typeParts = [f.required ? typeName : `optional ${typeName}`];
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

function objectToMarkdown(obj: ObjectData): string {
    const lines: string[] = [];
    lines.push(`# ${obj.name} object`);
    lines.push(`\`${obj.object}\``);
    if (obj.description) lines.push('', obj.description);
    if (obj.fields.length > 0) {
        lines.push('', '## Attributes', fieldsToMarkdown(obj.fields));
    }
    if (obj.example != null) {
        lines.push('', '### Example', '```json', stringifyJson(obj.example), '```');
    }
    if (obj.usedBy.length > 0) {
        lines.push('', '## Used by');
        for (const u of obj.usedBy) {
            lines.push(`- ${u.method.toUpperCase()} ${u.summary} (${u.tag})`);
        }
    }
    return lines.join('\n');
}

export function ObjectPage({
    object,
    basePath = '/api-reference',
    objectSlugs,
}: {
    object: ObjectData;
    /** Route prefix of the API version being viewed, e.g. /api-reference or /api-reference/<version>. */
    basePath?: string;
    /** Slugs of objects that have a page in this version, used to link field types. */
    objectSlugs?: string[];
}) {
    const objectHref = useMemo(
        () => makeObjectHref(basePath, objectSlugs),
        [basePath, objectSlugs],
    );

    const cleanMarkdown = useMemo(() => objectToMarkdown(object), [object]);
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        copy(cleanMarkdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const { addPage } = useRecentlyVisitedPages();
    useEffect(() => {
        addPage(`${basePath}/objects/${object.slug}`, `${object.name} object`);
    }, [basePath, object.slug, object.name, addPage]);

    return (
        <div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <div className="min-w-0">
                    <nav className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] mb-6">
                        <Link
                            href={basePath}
                            className="hover:text-[var(--foreground)] transition-colors"
                        >
                            API Reference
                        </Link>
                        <span className="text-[var(--text-secondary)]/50">&gt;</span>
                        <span>Objects</span>
                        <span className="text-[var(--text-secondary)]/50">&gt;</span>
                        <span className="text-[var(--foreground)]">{object.name}</span>
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
                            {object.name}
                        </h1>
                    </div>

                    <div className="mt-3 flex items-center gap-2.5">
                        <span className="text-xs text-[var(--text-secondary)]">
                            The{' '}
                            <code className="font-mono text-[var(--primary)]">{object.object}</code>{' '}
                            object
                        </span>
                    </div>

                    {object.description && (
                        <MarkdownBlock
                            text={object.description}
                            className="api-description mt-5 text-[15px] leading-7 text-[var(--text-secondary)]"
                        />
                    )}

                    <div className="mt-10 space-y-8">
                        {object.fields.length > 0 && (
                            <SchemaFieldTable
                                title="Attributes"
                                fields={object.fields}
                                objectHref={objectHref}
                            />
                        )}

                        {object.usedBy.length > 0 && (
                            <section>
                                <h2 className="text-base font-semibold text-[var(--foreground)]">
                                    Used by
                                </h2>
                                <div className="mt-3 space-y-2">
                                    {object.usedBy.map((u) => (
                                        <Link
                                            key={`${u.tagSlug}/${u.endpointSlug}`}
                                            href={`${basePath}/${u.tagSlug}/${u.endpointSlug}`}
                                            className="flex items-center gap-3 rounded-lg border border-[var(--border-color)] px-4 py-2.5 transition-colors hover:border-[color:color-mix(in_srgb,var(--border-color)_60%,var(--foreground))]"
                                        >
                                            <ActionMethodBadge endpoint={u} />
                                            <span className="min-w-0 flex-1 text-sm font-medium text-[var(--foreground)] truncate">
                                                {u.summary}
                                            </span>
                                            <Chip>{u.tag}</Chip>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                <aside className="hidden xl:block">
                    <div className="sticky top-6 h-[calc(100vh-172px)] overflow-hidden pr-1 flex flex-col min-h-0 gap-4">
                        {object.example != null && (
                            <CodeExamplePanel
                                title={`${object.object} example`}
                                className="flex-initial min-h-0"
                                scrollable
                                tabs={[
                                    {
                                        id: 'json',
                                        label: 'JSON',
                                        language: 'json',
                                        code: stringifyJson(object.example),
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

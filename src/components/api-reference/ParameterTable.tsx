'use client';

import type { SchemaField } from '@/static/apiEndpoints.generated';
import { useState } from 'react';
import { Chip } from './Chip';
import { EnumChips } from './EnumChips';
import ExpandableTag from './ExpandableTag';
import { MarkdownBlock } from './MarkdownText';
import { ToggleLink } from './ToggleLink';

export interface ParameterRow {
    name: string;
    type: string;
    required?: boolean;
    description: string;
    location?: string;
    enum?: string[];
}

export interface ExpandableIncludes {
    /** Query parameter name used to request expansions, e.g. `include[]` */
    paramName: string;
    /** Values of that query parameter that expand response fields */
    values: string[];
}

function FieldRow({
    field,
    depth = 0,
    pathPrefix,
    expandableIncludes,
    expansionRoot,
}: {
    field: SchemaField;
    depth?: number;
    pathPrefix?: string;
    expandableIncludes?: ExpandableIncludes;
    expansionRoot?: string;
}) {
    const hasChildren = field.properties && field.properties.length > 0;
    const [childrenOpen, setChildrenOpen] = useState(true);
    const childrenCount = field.properties?.length ?? 0;
    const baseTypeLabel =
        field.type === 'array' && field.itemType
            ? `array of ${field.itemType}`
            : field.type + (field.format ? ` (${field.format})` : '');

    const typeLabel = field.required ? baseTypeLabel : `optional ${baseTypeLabel}`;
    const fullPath = pathPrefix ? `${pathPrefix}.${field.name}` : field.name;
    const relativePath =
        expansionRoot && fullPath.startsWith(`${expansionRoot}.`)
            ? fullPath.slice(expansionRoot.length + 1)
            : fullPath;
    const isExpandableField = field.expandable === true;
    const expandableMatch =
        expandableIncludes?.values.filter((v) => v === relativePath) ?? [];
    const isAlwaysNull = field.alwaysNull === true;
    const shouldRenderDescription = !!field.description;

    return (
        <>
            <div
                className="py-2 border-b border-[var(--border-color)] last:border-b-0"
                style={{ paddingLeft: depth > 0 ? `${depth * 16}px` : undefined }}
            >
                <div className="flex items-center gap-3 flex-wrap">
                    <code className="text-sm font-mono font-medium text-[var(--foreground)]">
                        {field.name}
                    </code>
                    <span className="text-xs text-[var(--text-secondary)]">{typeLabel}</span>
                    {expandableMatch.length > 0 && (
                        <ExpandableTag
                            paramName={expandableIncludes!.paramName}
                            values={expandableMatch}
                        />
                    )}
                    {field.nullable && <Chip>nullable</Chip>}
                    {field.enum && <Chip>enum</Chip>}
                    {field.enum && <EnumChips values={field.enum} />}
                    {hasChildren && !isAlwaysNull && (
                        <ToggleLink onClick={() => setChildrenOpen(!childrenOpen)}>
                            {childrenOpen
                                ? `Hide ${childrenCount} properties`
                                : `Show ${childrenCount} properties`}
                        </ToggleLink>
                    )}
                </div>
                {(shouldRenderDescription || isAlwaysNull) && (
                    <div className="mt-0.5 text-sm text-[var(--text-secondary)] leading-relaxed">
                        {shouldRenderDescription && (
                            <MarkdownBlock text={field.description} className="api-md-inline" />
                        )}
                        {isAlwaysNull && (
                            <span className="api-md-inline">
                                {shouldRenderDescription ? ' ' : ''}
                                Always returned as <code>null</code> in this endpoint.
                            </span>
                        )}
                    </div>
                )}
            </div>
            {hasChildren && !isAlwaysNull && (
                <div
                    className="grid transition-[grid-template-rows,opacity] duration-200 ease-out"
                    style={{
                        gridTemplateRows: childrenOpen ? '1fr' : '0fr',
                        opacity: childrenOpen ? 1 : 0,
                        pointerEvents: childrenOpen ? 'auto' : 'none',
                    }}
                >
                    <div className="overflow-hidden">
                        <div className="border-l-2 border-[var(--border-color)] ml-2">
                            {field.properties!.map((child, i) => (
                                <FieldRow
                                    key={`${child.name}-${i}`}
                                    field={child}
                                    depth={depth + 1}
                                    pathPrefix={fullPath}
                                    expandableIncludes={expandableIncludes}
                                    expansionRoot={expansionRoot}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

interface SchemaFieldTableProps {
    title: string;
    fields: SchemaField[];
    defaultExpanded?: boolean;
    expandableIncludes?: ExpandableIncludes;
    expansionRoot?: string;
}

export function SchemaFieldTable({
    title,
    fields,
    defaultExpanded = true,
    expandableIncludes,
    expansionRoot,
}: SchemaFieldTableProps) {
    const [expanded, setExpanded] = useState(defaultExpanded);

    if (fields.length === 0) return null;

    return (
        <section>
            <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center justify-between w-full group cursor-pointer"
                aria-expanded={expanded}
            >
                <h2 className="text-base font-semibold text-[var(--foreground)]">{title}</h2>
                <span className="relative h-4 w-[64px] text-[10px] text-[var(--text-secondary)] group-hover:text-[var(--foreground)] transition-colors shrink-0">
                    <span
                        className={`absolute inset-0 transition-opacity duration-200 ${expanded ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        Collapse
                    </span>
                    <span
                        className={`absolute inset-0 transition-opacity duration-200 ${expanded ? 'opacity-0' : 'opacity-100'
                            }`}
                    >
                        Expand
                    </span>
                </span>
            </button>
            <div
                className="grid transition-[grid-template-rows,opacity] duration-200 ease-out"
                style={{
                    gridTemplateRows: expanded ? '1fr' : '0fr',
                    opacity: expanded ? 1 : 0,
                    pointerEvents: expanded ? 'auto' : 'none',
                }}
            >
                <div className="overflow-hidden">
                    <div className="mt-2">
                        {fields.map((field, i) => (
                            <FieldRow
                                key={`${field.name}-${i}`}
                                field={field}
                                expandableIncludes={expandableIncludes}
                                expansionRoot={expansionRoot}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

interface ParameterTableProps {
    title: string;
    rows: ParameterRow[];
    defaultExpanded?: boolean;
}

export function ParameterTable({ title, rows, defaultExpanded = true }: ParameterTableProps) {
    const [expanded, setExpanded] = useState(defaultExpanded);

    if (rows.length === 0) return null;

    return (
        <section>
            <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center justify-between w-full group cursor-pointer"
                aria-expanded={expanded}
            >
                <h2 className="text-base font-semibold text-[var(--foreground)]">{title}</h2>
                <span className="relative h-4 w-[64px] text-[10px] text-[var(--text-secondary)] group-hover:text-[var(--foreground)] transition-colors shrink-0">
                    <span
                        className={`absolute inset-0 transition-opacity duration-200 ${expanded ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        Collapse
                    </span>
                    <span
                        className={`absolute inset-0 transition-opacity duration-200 ${expanded ? 'opacity-0' : 'opacity-100'
                            }`}
                    >
                        Expand
                    </span>
                </span>
            </button>
            <div
                className="grid transition-[grid-template-rows,opacity] duration-200 ease-out"
                style={{
                    gridTemplateRows: expanded ? '1fr' : '0fr',
                    opacity: expanded ? 1 : 0,
                    pointerEvents: expanded ? 'auto' : 'none',
                }}
            >
                <div className="overflow-hidden">
                    <div className="mt-2 divide-y divide-[var(--border-color)]">
                        {rows.map((row, i) => (
                            <div key={`${row.name}-${i}`} className="py-2 first:pt-0">
                                <div className="flex items-baseline gap-3 flex-wrap">
                                    <code className="text-sm font-mono font-medium text-[var(--foreground)]">
                                        {row.name}
                                    </code>
                                    <span className="text-xs text-[var(--text-secondary)]">
                                        {row.required ? row.type : `optional ${row.type}`}
                                    </span>
                                    {row.location && <Chip>{row.location}</Chip>}
                                    {row.enum && row.enum.length > 0 && <Chip>enum</Chip>}
                                    {row.enum && row.enum.length > 0 && <EnumChips values={row.enum} />}
                                </div>
                                {row.description && (
                                    <div className="mt-0.5 text-sm text-[var(--text-secondary)] leading-relaxed">
                                        <MarkdownBlock
                                            text={row.description}
                                            className="api-md-inline"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

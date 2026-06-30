'use client';

import { useState } from 'react';
import { EnumChips } from './EnumChips';
import type { EndpointAuthorization } from './extractPermissions';

function AuthRow({
    name,
    description,
    values,
}: {
    name: string;
    description: string;
    values: string[];
}) {
    return (
        <div className="py-2 border-b border-[var(--border-color)] last:border-b-0">
            <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-medium text-[var(--foreground)]">{name}</span>
                <EnumChips values={values} />
            </div>
            <div className="mt-0.5 text-sm text-[var(--text-secondary)] leading-relaxed">
                {description}
            </div>
        </div>
    );
}

export function AuthorizationSection({
    authorization,
    defaultExpanded = true,
}: {
    authorization: EndpointAuthorization;
    defaultExpanded?: boolean;
}) {
    const [expanded, setExpanded] = useState(defaultExpanded);
    const { permissions, roleType } = authorization;

    if (permissions.length === 0 && !roleType) return null;

    return (
        <section>
            <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center justify-between w-full group cursor-pointer"
                aria-expanded={expanded}
            >
                <h2 className="text-base font-semibold text-[var(--foreground)]">Authorization</h2>
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
                        {permissions.length > 0 && (
                            <AuthRow
                                name="Permissions required"
                                description="The role behind your API key or agent must grant every one of these permissions."
                                values={permissions}
                            />
                        )}
                        {roleType && (
                            <AuthRow
                                name="Role type required"
                                description="Only API keys or agents whose role has this type can call this endpoint."
                                values={[roleType]}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

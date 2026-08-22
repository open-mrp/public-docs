'use client';

import { apiNavDomains } from '@/static/apiEndpoints.generated';
import { navData } from '@/static/navData.generated';
import { routeToTab } from '@/static/routeMap.generated';
import { getDefaultTab, getTabFromRoute, tabs } from '@/static/tabs';
import type { NavLink, NavSubSectionData } from '@openmrp/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface MobileDocNavProps {
    onNavigate?: () => void;
}

function isSubSection(item: NavLink | NavSubSectionData): item is NavSubSectionData {
    return 'items' in item;
}

function containsActivePath(items: (NavLink | NavSubSectionData)[], pathname: string): boolean {
    for (const item of items) {
        if (isSubSection(item)) {
            if (containsActivePath(item.items, pathname)) return true;
        } else if (item.href === pathname) {
            return true;
        }
    }
    return false;
}

function SubSection({
    subSection,
    pathname,
    onNavigate,
}: {
    subSection: NavSubSectionData;
    pathname: string;
    onNavigate?: () => void;
}) {
    const hasActive = containsActivePath(subSection.items, pathname);
    const [isOpen, setIsOpen] = useState(hasActive);

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between py-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
            >
                <span>{subSection.title}</span>
                <svg
                    className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
            {isOpen && (
                <div className="ml-3 border-l border-[var(--border-color)] pl-3">
                    {subSection.items.map((item) =>
                        isSubSection(item) ? (
                            <SubSection
                                key={item.title}
                                subSection={item}
                                pathname={pathname}
                                onNavigate={onNavigate}
                            />
                        ) : (
                            <NavLinkItem
                                key={item.href}
                                item={item}
                                active={pathname === item.href}
                                onNavigate={onNavigate}
                            />
                        ),
                    )}
                </div>
            )}
        </div>
    );
}

function NavLinkItem({
    item,
    active,
    onNavigate,
}: {
    item: NavLink;
    active: boolean;
    onNavigate?: () => void;
}) {
    return (
        <Link
            href={item.href}
            onClick={onNavigate}
            className={`block py-1.5 text-sm transition-colors ${
                active
                    ? 'font-medium text-[var(--primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
            }`}
        >
            {item.children}
        </Link>
    );
}

export default function MobileDocNav({ onNavigate }: MobileDocNavProps) {
    const pathname = usePathname();
    const activeTab = getTabFromRoute(pathname, routeToTab) || getDefaultTab();
    const [selectedTabId, setSelectedTabId] = useState(activeTab.id);
    const sections = navData[selectedTabId] || [];

    return (
        <nav>
            <div className="flex border-b border-[var(--border-color)] mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setSelectedTabId(tab.id)}
                        className={`px-3 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                            selectedTabId === tab.id
                                ? 'border-[var(--primary)] text-[var(--foreground)]'
                                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--foreground)]'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="space-y-4">
                {selectedTabId === 'api-reference' ? (
                    <>
                        <Link
                            href="/api-reference"
                            onClick={onNavigate}
                            className={`block py-1.5 text-sm transition-colors ${
                                pathname === '/api-reference'
                                    ? 'font-medium text-[var(--primary)]'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
                            }`}
                        >
                            Overview
                        </Link>
                        {apiNavDomains.map((domain) => (
                            <div key={domain.slug}>
                                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                                    {domain.name}
                                </p>
                                <div className="space-y-0.5">
                                    {domain.resources.map((resource) => (
                                        <div key={resource.slug} className="space-y-0.5">
                                            <p className="py-1.5 text-sm font-medium text-[var(--text-secondary)]">
                                                {resource.name}
                                            </p>
                                            <div className="ml-3 border-l border-[var(--border-color)] pl-3">
                                                {resource.endpoints.map((ep) => (
                                                    <Link
                                                        key={ep.href}
                                                        href={ep.href}
                                                        onClick={onNavigate}
                                                        className={`block py-1 text-sm transition-colors ${
                                                            pathname === ep.href
                                                                ? 'font-medium text-[var(--primary)]'
                                                                : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
                                                        }`}
                                                    >
                                                        {ep.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    sections.map((section) => (
                        <div key={section.title}>
                            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                                {section.title}
                            </p>
                            <div className="space-y-0.5">
                                {section.links.map((item) =>
                                    isSubSection(item) ? (
                                        <SubSection
                                            key={item.title}
                                            subSection={item}
                                            pathname={pathname}
                                            onNavigate={onNavigate}
                                        />
                                    ) : (
                                        <NavLinkItem
                                            key={item.href}
                                            item={item}
                                            active={pathname === item.href}
                                            onNavigate={onNavigate}
                                        />
                                    ),
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </nav>
    );
}

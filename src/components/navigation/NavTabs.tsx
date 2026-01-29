'use client';

import { routeToTab } from '@/static/routeMap.generated';
import { getTabFromRoute, tabs } from '@/static/tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavTabsProps {
    color?: string;
    className?: string;
}

export default function NavTabs({ color, className = '' }: NavTabsProps) {
    const pathname = usePathname();
    const activeTab = getTabFromRoute(pathname, routeToTab);

    return (
        <nav className={`flex items-center gap-1 ${className}`}>
            {tabs.map((tab) => {
                const isActive = activeTab?.id === tab.id;
                return (
                    <Link
                        key={tab.id}
                        href={tab.defaultPage}
                        className={`
                            px-3 py-2 text-[15px] font-medium transition-colors border-b-4
                            ${
                                isActive
                                    ? 'border-[var(--primary)] text-[var(--foreground)]'
                                    : 'border-transparent text-[var(--foreground)]/50 hover:text-[var(--foreground)]/80'
                            }
                        `}
                        style={{ color: isActive ? color : undefined }}
                    >
                        {tab.label}
                    </Link>
                );
            })}
        </nav>
    );
}

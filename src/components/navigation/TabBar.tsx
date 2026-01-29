'use client';

import { routeToTab } from '@/static/routeMap.generated';
import { getTabFromRoute, tabs } from '@/static/tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function TabBar() {
    const pathname = usePathname();
    const activeTab = getTabFromRoute(pathname, routeToTab);
    const tabRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
    const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number } | null>(
        null,
    );

    useEffect(() => {
        if (activeTab) {
            const activeElement = tabRefs.current.get(activeTab.id);
            if (activeElement) {
                const { offsetLeft, offsetWidth } = activeElement;
                setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
            }
        }
    }, [activeTab]);

    return (
        <div
            className="hidden lg:block h-12 border-b"
            style={{
                backgroundColor: 'var(--navbar-background)',
                borderColor: 'var(--border-color)',
            }}
        >
            <div className="max-w-7xl mx-auto px-4 h-full">
                <nav className="relative flex items-center gap-6 h-full">
                    {tabs.map((tab) => {
                        const isActive = activeTab?.id === tab.id;
                        return (
                            <Link
                                key={tab.id}
                                ref={(el) => {
                                    if (el) tabRefs.current.set(tab.id, el);
                                }}
                                href={tab.defaultPage}
                                className="relative h-full flex items-center text-[15px] font-medium transition-colors duration-200"
                                style={{
                                    color: isActive ? 'var(--foreground)' : 'var(--text-secondary)',
                                }}
                            >
                                {tab.label}
                            </Link>
                        );
                    })}
                    {indicatorStyle && (
                        <span
                            className="absolute bottom-0 h-0.5 transition-all duration-300 ease-out"
                            style={{
                                left: indicatorStyle.left,
                                width: indicatorStyle.width,
                                backgroundColor: 'var(--primary)',
                            }}
                        />
                    )}
                </nav>
            </div>
        </div>
    );
}

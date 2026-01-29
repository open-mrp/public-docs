import { items } from '@/static/navData';
import { NavItem, NavLink, NavSubSection, NavSubSectionData, Sidenav } from '@augno/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DocSidenav() {
    const pathname = usePathname();
    const isPathActive = (path: string) => pathname === path;

    const renderNavItem = (item: NavLink | NavSubSectionData) => {
        if ('items' in item) {
            return (
                <NavSubSection
                    key={item.title}
                    subSection={item}
                    isPathActive={isPathActive}
                    renderNavItem={renderNavItem}
                />
            );
        }

        const active = isPathActive(item.href);
        return (
            <NavItem
                key={item.href}
                href={item.href}
                active={active}
                renderLink={({ href, children, className, style }) => (
                    <Link href={href} className={className} style={style}>
                        {children}
                    </Link>
                )}
            >
                {item.children}
            </NavItem>
        );
    };

    return (
        <Sidenav
            sections={items}
            renderNavItem={renderNavItem}
            className="bg-[var(--sidenav-background)] border-r border-gray-200 dark:border-gray-700"
        />
    );
}

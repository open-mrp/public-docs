'use client';

import DocFooter from '@/components/navigation/DocFooter';
import DocSidenav from '@/components/navigation/DocSidenav';
import NavbarContents from '@/components/navigation/NavbarContents';
import TabBar from '@/components/navigation/TabBar';
import { Navbar } from '@augno/ui';
import { usePathname } from 'next/navigation';
import ApiReferenceSidenav from '@/components/api-reference/ApiReferenceSidenav';

interface RootLayoutProps {
    children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
    const pathname = usePathname();
    const isApiReference = pathname.startsWith('/api-reference');

    return (
        <>
            <Navbar className="bg-[var(--navbar-background)] pr-[11px]">
                <NavbarContents />
            </Navbar>
            <TabBar />

            <div className="flex flex-1 overflow-hidden">
                <div className="hidden lg:block">
                    {isApiReference ? <ApiReferenceSidenav /> : <DocSidenav />}
                </div>
                <main
                    className={`main-scroll flex-1 overflow-y-auto ${isApiReference ? '' : 'pt-4'}`}
                >
                    <div
                        className={`px-4 mx-auto py-10 lg:px-8 flex flex-col min-h-full ${isApiReference ? 'max-w-[1400px]' : 'max-w-7xl'}`}
                    >
                        {children}
                        {!isApiReference && <DocFooter />}
                    </div>
                </main>
            </div>
        </>
    );
}

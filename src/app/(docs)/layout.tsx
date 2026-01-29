'use client';

import DocFooter from '@/components/navigation/DocFooter';
import DocSidenav from '@/components/navigation/DocSidenav';
import NavbarContents from '@/components/navigation/NavbarContents';
import { Navbar } from '@augno/ui';

interface RootLayoutProps {
    children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <>
            <Navbar className="bg-[var(--navbar-background)] pr-[11px]">
                <NavbarContents />
            </Navbar>

            <div className="flex flex-1 overflow-hidden">
                <DocSidenav />
                <main className="main-scroll flex-1 overflow-y-auto pt-4">
                    <div className="max-w-7xl px-4 mx-auto py-10 lg:px-8 flex flex-col min-h-full">
                        {children}
                        <DocFooter />
                    </div>
                </main>
            </div>
        </>
    );
}

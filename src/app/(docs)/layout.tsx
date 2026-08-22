'use client';

import DocFooter from '@/components/navigation/DocFooter';
import DocSidenav from '@/components/navigation/DocSidenav';
import NavbarContents from '@/components/navigation/NavbarContents';
import PageFeedback from '@/components/navigation/PageFeedback';
import TabBar from '@/components/navigation/TabBar';
import { Navbar } from '@openmrp/ui';
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
                        {isApiReference ? (
                            // The reference is generated from the OpenAPI spec, so there is no
                            // MDX to edit — readers get the issue link only.
                            <PageFeedback
                                title="API Reference"
                                slug={pathname.replace(/^\//, '')}
                                className="mt-auto pt-12"
                            />
                        ) : (
                            <DocFooter />
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}

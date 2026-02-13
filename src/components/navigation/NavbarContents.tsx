'use client';

import { useAuth } from '@/lib/auth-store';
import { paths } from '@/static/paths';
import {
    ArrowRightIcon,
    AugnoLogo,
    Button,
    CloseIcon,
    DarkModeButton,
    MenuIcon,
    useDarkMode,
} from '@augno/ui';
import Link from 'next/link';
import { useState } from 'react';
import DashboardButton from '../buttons/DashboardButton';
import LoginButton from '../buttons/LoginButton';
import RegisterButton from '../buttons/RegisterButton';
import { UserAvatar } from '../user/UserAvatar';
import { UserDropdownMenu } from '../user/UserDropdownMenu';
import AlgoliaSearch from './AlgoliaSearch';
import HomeLogo from './HomeLogo';
import NavTabs from './NavTabs';

export default function NavbarContents({ hideThemeToggle = false }) {
    const { hasMounted } = useDarkMode();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, user, currentAccount, logout, isInitialized } = useAuth();

    const color = hasMounted ? 'var(--foreground)' : undefined;

    return (
        <>
            <div className="lg:flex-shrink-0 flex items-center gap-4">
                <HomeLogo color={color} />
            </div>

            <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:min-w-0">
                <AlgoliaSearch className="w-full max-w-lg" color={color} />
            </div>

            <div className="hidden lg:flex lg:flex-shrink-0 lg:items-center lg:justify-end lg:gap-x-4 !bg-transparent">
                {!hideThemeToggle && <DarkModeButton color={color} />}
                {!isInitialized ? (
                    <div className="h-8 w-8 rounded-full bg-[var(--foreground)]/10 animate-pulse" />
                ) : isAuthenticated ? (
                    <UserDropdownMenu color={color} />
                ) : (
                    <>
                        <LoginButton variant="text" color={color} blur>
                            Log in
                        </LoginButton>
                        <RegisterButton variant="outlined" color={color} blur>
                            Sign up
                        </RegisterButton>
                    </>
                )}
            </div>

            <div className="flex lg:hidden">
                <Button color={color} variant="icon" onClick={() => setIsMenuOpen(true)}>
                    <MenuIcon />
                </Button>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="lg:hidden" role="dialog" aria-modal="true">
                    <div
                        className="fixed inset-0 z-10 bg-black/20"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[var(--background)] text-[var(--foreground)] p-4 sm:max-w-sm sm:ring-1 sm:ring-[var(--foreground)]/10 shadow-xl">
                        <div className="flex items-center justify-between">
                            <Link href={paths.home} className="-m-1.5 p-1.5">
                                <AugnoLogo color={color} />
                            </Link>
                            <Button
                                variant="icon"
                                color={color}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <CloseIcon />
                            </Button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-[var(--foreground)]/10">
                                <div className="py-6">
                                    <NavTabs color={color} className="flex flex-col gap-1 mb-4" />
                                    <AlgoliaSearch className="w-full" color={color} />
                                </div>
                                <div className="flex flex-col gap-4 py-6">
                                    {!isInitialized ? (
                                        <>
                                            {/* Skeleton for user info section */}
                                            <div className="flex items-center gap-3 px-2 py-2">
                                                <div className="h-10 w-10 rounded-full bg-[var(--foreground)]/10 animate-pulse" />
                                                <div className="flex-1 min-w-0 space-y-2">
                                                    <div className="h-4 w-24 rounded bg-[var(--foreground)]/10 animate-pulse" />
                                                    <div className="h-3 w-32 rounded bg-[var(--foreground)]/10 animate-pulse" />
                                                </div>
                                            </div>
                                            {/* Skeleton for buttons */}
                                            <div className="h-10 w-full rounded-md bg-[var(--foreground)]/10 animate-pulse" />
                                            <div className="h-10 w-full rounded-md bg-[var(--foreground)]/10 animate-pulse" />
                                        </>
                                    ) : isAuthenticated ? (
                                        <>
                                            {/* User info section */}
                                            <div className="flex items-center gap-3 px-2 py-2">
                                                <UserAvatar
                                                    src={user?.imageUrl}
                                                    name={user?.name}
                                                    size="lg"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">
                                                        {user?.name}
                                                    </p>
                                                    {user?.email && (
                                                        <p className="text-xs text-[var(--foreground)]/60 truncate">
                                                            {user.email}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Current account info */}
                                            {currentAccount && (
                                                <div className="px-3 py-3 rounded-lg bg-[var(--foreground)]/5 border border-[var(--foreground)]/10">
                                                    <p className="text-xs text-[var(--foreground)]/50 mb-1">
                                                        Current Account
                                                    </p>
                                                    <p className="text-sm font-medium">
                                                        {currentAccount.name}
                                                    </p>
                                                    {currentAccount.role && (
                                                        <p className="text-xs text-[var(--foreground)]/60 mt-0.5">
                                                            {currentAccount.role.name}
                                                        </p>
                                                    )}
                                                    <p className="text-xs text-[var(--foreground)]/50 mt-1">
                                                        Plan: {currentAccount.plan}
                                                    </p>
                                                </div>
                                            )}

                                            <DashboardButton
                                                variant="contained"
                                                color={'primary'}
                                                className="w-full"
                                            >
                                                <div className="flex w-full items-center justify-between">
                                                    <span>Open Dashboard</span>
                                                    <ArrowRightIcon className="h-4 w-4" />
                                                </div>
                                            </DashboardButton>
                                            <Button
                                                variant="outlined"
                                                color={color}
                                                className="w-full"
                                                onClick={() => {
                                                    logout();
                                                    setIsMenuOpen(false);
                                                }}
                                            >
                                                Log out
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <LoginButton
                                                variant="contained"
                                                color={color}
                                                className="w-full"
                                            >
                                                Log in
                                            </LoginButton>
                                            <RegisterButton
                                                variant="contained"
                                                color={color}
                                                className="w-full"
                                            >
                                                Sign up
                                            </RegisterButton>
                                        </>
                                    )}
                                    <DarkModeButton variant="outlined" color={color} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

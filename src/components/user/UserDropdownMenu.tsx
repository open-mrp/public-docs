'use client';

import { useAuth } from '@/lib/auth-store';
import {
    ArrowRightIcon,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@augno/ui';
import { Check, Loader2, LogOut, Server, Users } from 'lucide-react';
import { UserAvatar } from './UserAvatar';

interface UserDropdownMenuProps {
    color?: string;
}

export function UserDropdownMenu({ color }: UserDropdownMenuProps) {
    const {
        user,
        currentAccount,
        accountMemberships,
        sandboxes,
        selectedSandboxId,
        isSwitchingAccount,
        hasMultipleAccounts,
        logout,
        switchAccount,
    } = useAuth();

    if (!user) {
        return null;
    }

    const handleLogout = async () => {
        await logout();
    };

    const handleDashboardClick = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`;
    };

    const handleSandboxSwitch = async (sandboxId: string) => {
        if (sandboxId !== selectedSandboxId) {
            await switchAccount(sandboxId);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="flex items-center gap-2 rounded-full focus:outline-none border border-transparent hover:cursor-pointer hover:border-[var(--text-secondary)]"
                    style={{ color }}
                >
                    <UserAvatar src={user.imageUrl} name={user.name} size="md" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 border border-[var(--border-color)]">
                {/* User info */}
                <div className="px-2 py-1.5">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        {user.email && (
                            <p className="text-xs leading-none text-zinc-500">{user.email}</p>
                        )}
                        {currentAccount?.role && (
                            <p className="text-xs leading-none text-zinc-500">
                                Role: {currentAccount.role.name}
                            </p>
                        )}
                    </div>
                </div>

                {/* Current account info */}
                {currentAccount && (
                    <>
                        <DropdownMenuSeparator />
                        <div className="px-2 py-1.5">
                            <p className="text-xs text-zinc-500 mb-1">Current Account</p>
                            <p className="text-sm font-medium">{currentAccount.name}</p>

                            <p className="text-xs text-zinc-400 mt-0.5">
                                Plan: {currentAccount.plan}{' '}
                            </p>
                        </div>
                    </>
                )}

                <DropdownMenuSeparator />

                {/* Sandbox switcher */}
                {sandboxes.length > 0 && (
                    <>
                        <div className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-semibold text-zinc-500">
                            <Server className="h-3.5 w-3.5" />
                            Sandbox
                            {isSwitchingAccount && <Loader2 className="h-3 w-3 animate-spin" />}
                        </div>
                        {sandboxes.map((sandbox) => (
                            <DropdownMenuItem
                                key={sandbox.id}
                                onClick={() => handleSandboxSwitch(sandbox.id)}
                                className="cursor-pointer"
                            >
                                <div className="flex w-full items-center justify-between">
                                    <span>{sandbox.name}</span>
                                    {sandbox.id === selectedSandboxId && (
                                        <Check className="h-4 w-4 text-green-500" />
                                    )}
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </>
                )}

                {/* Account switcher (only show if multiple accounts) */}
                {hasMultipleAccounts && (
                    <>
                        <DropdownMenuSeparator />
                        <div className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-semibold text-zinc-500">
                            <Users className="h-3.5 w-3.5" />
                            Switch Account
                        </div>
                        {accountMemberships.map((account) => (
                            <DropdownMenuItem key={account.id} className="cursor-pointer">
                                <div className="flex w-full items-center justify-between">
                                    <span>{account.name}</span>
                                    {account.id === currentAccount?.id && (
                                        <Check className="h-4 w-4 text-green-500" />
                                    )}
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </>
                )}

                <DropdownMenuItem onClick={handleDashboardClick} className="cursor-pointer">
                    <div className="flex w-full items-center justify-between">
                        <span>Open Dashboard</span>
                        <ArrowRightIcon className="h-4 w-4" />
                    </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

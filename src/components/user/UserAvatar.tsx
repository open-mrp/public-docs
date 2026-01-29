'use client';

import { cn } from '@/utils/cn';
import { User } from 'lucide-react';

interface UserAvatarProps {
    src?: string | null;
    name?: string | null;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
};

const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
};

export function UserAvatar({ src, name, size = 'md', className }: UserAvatarProps) {
    const initials = name
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div
            className={cn(
                'relative flex items-center justify-center rounded-full bg-zinc-700 text-white overflow-hidden',
                sizeClasses[size],
                className,
            )}
        >
            {src ? (
                <img src={src} alt={name || 'User avatar'} className="h-full w-full object-cover" />
            ) : initials ? (
                <span className="text-xs font-medium">{initials}</span>
            ) : (
                <User size={iconSizes[size]} className="text-zinc-400" />
            )}
        </div>
    );
}

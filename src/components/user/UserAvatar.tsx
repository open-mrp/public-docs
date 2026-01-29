'use client';

import { cn } from '@/utils/cn';
import { useMemo, useState } from 'react';
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

function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
}

function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function generateGradientColors(name: string): [string, string] {
    const hash = hashString(name);
    const hue1 = hash % 360;
    const hue2 = (hue1 + 40 + (hash % 80)) % 360;
    return [hslToHex(hue1, 70, 55), hslToHex(hue2, 70, 45)];
}

export function UserAvatar({ src, name, size = 'md', className }: UserAvatarProps) {
    const [imgError, setImgError] = useState(false);

    const initials = name
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const gradientColors = useMemo(() => (name ? generateGradientColors(name) : null), [name]);

    const gradientId = useMemo(() => (name ? `avatar-gradient-${hashString(name)}` : ''), [name]);

    return (
        <div
            className={cn(
                'relative flex items-center justify-center rounded-full bg-zinc-700 text-white overflow-hidden',
                sizeClasses[size],
                className,
            )}
        >
            {src && !imgError ? (
                <img
                    src={src}
                    alt={name || 'User avatar'}
                    className="h-full w-full object-cover"
                    onError={() => setImgError(true)}
                />
            ) : gradientColors ? (
                <>
                    <svg
                        className="absolute inset-0 h-full w-full"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor={gradientColors[0]} />
                                <stop offset="100%" stopColor={gradientColors[1]} />
                            </linearGradient>
                        </defs>
                        <rect width="32" height="32" fill={`url(#${gradientId})`} />
                    </svg>
                    {initials && (
                        <span className="relative text-xs font-semibold text-white drop-shadow-sm">
                            {initials}
                        </span>
                    )}
                </>
            ) : (
                <User size={iconSizes[size]} className="text-zinc-400" />
            )}
        </div>
    );
}

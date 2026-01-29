'use client';

import { CheckIcon, CopyIcon } from '@augno/ui';
import copy from 'copy-to-clipboard';
import { useState } from 'react';

interface CopyableTextProps {
    value: string;
    className?: string;
}

export function CopyableText({ value, className }: CopyableTextProps) {
    const [copied, setCopied] = useState(false);
    const [hovered, setHovered] = useState(false);

    const handleCopy = () => {
        copy(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const active = hovered || copied;

    return (
        <button
            onClick={handleCopy}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`
                group relative inline
                cursor-pointer
                ${className}
            `}
            title={copied ? 'Copied!' : 'Click to copy'}
        >
            <span className="relative z-10">{value}</span>
            {/* Gradient backdrop blur */}
            <span
                className={`
                    absolute -inset-y-0.5 -right-7 -left-1.5
                    rounded-r-md
                    backdrop-blur-[6px]
                    transition-opacity duration-300 ease-out
                    ${copied ? 'bg-foreground/30' : 'bg-foreground/20'}
                    ${active ? 'opacity-100' : 'opacity-0'}
                `}
                style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
                }}
            />
            {/* Icons — both rendered, crossfade between them */}
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-1.5">
                <span
                    className={`
                        absolute inset-0 flex items-center justify-center
                        transition-all duration-200 ease-out
                        text-foreground
                        ${!copied && hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
                    `}
                >
                    <CopyIcon />
                </span>
                <span
                    className={`
                        absolute inset-0 flex items-center justify-center
                        transition-all duration-200 ease-out
                        text-green-800 dark:text-green-500
                        ${copied ? 'opacity-100 scale-110' : 'opacity-0 scale-75'}
                    `}
                >
                    <CheckIcon />
                </span>
                {/* Invisible spacer to give the container size */}
                <span className="invisible">
                    <CopyIcon />
                </span>
            </span>
        </button>
    );
}

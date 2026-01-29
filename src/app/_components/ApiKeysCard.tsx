'use client';

import { useApiKey } from '@/providers/ApiKeyProvider';
import { Button, CheckIcon, CopyIcon } from '@augno/ui';
import copy from 'copy-to-clipboard';
import { useState } from 'react';

/**
 * Abbreviates an API key for display, showing prefix and suffix.
 */
function abbreviateKey(key: string): string {
    if (key.length <= 24) return key;

    const prefixMatch = key.match(/^(aug_[a-z]+_[a-z]+_)/);
    const prefix = prefixMatch ? prefixMatch[1] : '';
    const remainder = key.slice(prefix.length);
    const visibleStart = remainder.slice(0, 4);
    const visibleEnd = remainder.slice(-4);

    return `${prefix}${visibleStart}...${visibleEnd}`;
}

interface ApiKeyRowProps {
    label: string;
    apiKey: string;
    variant: 'sandbox' | 'production';
}

function ApiKeyRow({ label, apiKey, variant }: ApiKeyRowProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        copy(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const envBadgeClass =
        variant === 'production'
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 py-3 border-b border-white/10 last:border-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <span
                    className={`text-xs font-medium px-2 py-0.5 rounded border ${envBadgeClass} shrink-0`}
                >
                    {label}
                </span>
                <code className="font-mono text-xs sm:text-sm text-white/80 break-all sm:truncate">
                    {abbreviateKey(apiKey)}
                </code>
            </div>
            <Button
                onClick={handleCopy}
                title={copied ? 'Copied!' : 'Copy to clipboard'}
                blur
                className="flex items-center gap-2"
            >
                {copied ? (
                    <>
                        <CheckIcon />
                        <span className="w-[40px]">Copied</span>
                    </>
                ) : (
                    <>
                        <CopyIcon />
                        <span className="w-[40px]">Copy</span>
                    </>
                )}
            </Button>
        </div>
    );
}

export function ApiKeysCard() {
    const { sandboxApiKey, accountName } = useApiKey();

    return (
        <div
            className="rounded-xl border border-white/15 bg-black/30 backdrop-blur-md
                       shadow-lg shadow-black/20 overflow-hidden"
        >
            {/* Header */}
            <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-white/10 flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-500/30 shrink-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-indigo-300"
                    >
                        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                    </svg>
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-white text-sm sm:text-base">Your API Keys</h3>
                    <p className="text-xs sm:text-sm text-white/50 truncate">
                        Test keys for <span className="text-white/70">{accountName}</span>
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-5 py-2">
                <ApiKeyRow label="Sandbox" apiKey={sandboxApiKey} variant="sandbox" />
            </div>
        </div>
    );
}

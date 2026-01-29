'use client';

import { useIsAuthenticated } from '@/lib/auth-store';
import { useApiKey } from '@/providers/ApiKeyProvider';
import copy from 'copy-to-clipboard';
import { useState } from 'react';

/**
 * Abbreviates an API key for display, showing prefix and suffix.
 * e.g., "aug_sk_test_AM4Bjb7xBLrmM0EZ3ADvlv_hMpF1c5rhvfRkHF7gww5CtZuFzczEImt0WXP5CwilIS6bUWNXD"
 * becomes "aug_sk_test_AM4B...WNXD"
 */
function abbreviateKey(key: string): string {
    if (key.length <= 24) return key;

    // Find the prefix pattern (aug_sk_test_ or similar)
    const prefixMatch = key.match(/^(aug_[a-z]+_[a-z]+_)/);
    const prefix = prefixMatch ? prefixMatch[1] : '';

    // Get remaining part after prefix
    const remainder = key.slice(prefix.length);

    // Show first 4 and last 4 characters of the remainder
    const visibleStart = remainder.slice(0, 4);
    const visibleEnd = remainder.slice(-4);

    return `${prefix}${visibleStart}...${visibleEnd}`;
}

interface ApiKeySnippetProps {
    className?: string;
}

/**
 * A small, copyable API key snippet that shows an abbreviated key.
 * Clicking copies the full key to clipboard when authenticated.
 * When not authenticated, displays as a non-interactive placeholder.
 */
export function ApiKeySnippet({ className }: ApiKeySnippetProps) {
    const { sandboxApiKey } = useApiKey();
    const isAuthenticated = useIsAuthenticated();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!isAuthenticated) return;
        copy(sandboxApiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const abbreviated = abbreviateKey(sandboxApiKey);

    // When not authenticated, show a non-interactive display
    if (!isAuthenticated) {
        return (
            <span
                className={`
                    inline-flex items-center
                    bg-gray-500 text-primary-50 text-sm px-2 py-0.5 rounded-md
                    font-mono opacity-75
                    ${className}
                `}
                title="Log in to see your API key"
            >
                {abbreviated}
            </span>
        );
    }

    return (
        <button
            onClick={handleCopy}
            className={`
                inline-flex items-center gap-1.5 
                bg-blue-500 text-primary-50 text-sm px-2 py-0.5 rounded-md 
                hover:bg-gray-600 transition-colors cursor-pointer
                font-mono
                ${className}
            `}
            title={copied ? 'Copied!' : 'Click to copy full key'}
        >
            <span>{abbreviated}</span>
            {copied ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-3.5 h-3.5 text-green-400"
                >
                    <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-3.5 h-3.5 opacity-60"
                >
                    <path
                        fillRule="evenodd"
                        d="M10.986 3H12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1.014A2.25 2.25 0 0 1 7.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM9.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4h3Z"
                        clipRule="evenodd"
                    />
                </svg>
            )}
        </button>
    );
}

'use client';

import { Tooltip } from '@/components/Tooltip';
import { abbreviateKey } from '@/lib/apiKey';
import { useIsAuthenticated } from '@/lib/auth-store';
import { useApiKey } from '@/providers/ApiKeyProvider';
import copy from 'copy-to-clipboard';
import { useState } from 'react';

interface ApiKeySnippetProps {
    className?: string;
}

/**
 * A small, copyable API key snippet that shows an abbreviated key.
 * Clicking copies the full key to clipboard when authenticated.
 * When not authenticated, displays as a non-interactive placeholder.
 */
export function ApiKeySnippet({ className }: ApiKeySnippetProps) {
    const { sandboxApiKey, hasApiKey } = useApiKey();
    const isAuthenticated = useIsAuthenticated();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!isAuthenticated || !hasApiKey) return;
        copy(sandboxApiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    // When not authenticated, show a non-interactive placeholder with tooltip
    if (!isAuthenticated) {
        return (
            <Tooltip
                title="Placeholder API key"
                description="This is not a real API key. Log in to see your actual key."
            >
                <span
                    className={`
                        inline-flex items-center
                        bg-gray-500 text-primary-50 text-sm px-2 py-0.5 rounded-md
                        font-mono opacity-75
                        ${className}
                    `}
                >
                    {abbreviateKey(sandboxApiKey)}
                </span>
            </Tooltip>
        );
    }

    // Authenticated but no test API key available
    if (!hasApiKey) {
        return (
            <Tooltip
                title="No test API key"
                description="Your documentation API key has been revoked. Rotate it in your Dashboard to display it here."
            >
                <span
                    className={`
                        inline-flex items-center whitespace-nowrap
                        bg-gray-500/50 text-primary-50/60 text-sm px-2 py-0.5 rounded-md
                        font-mono
                        ${className}
                    `}
                >
                    No test API key
                </span>
            </Tooltip>
        );
    }

    const abbreviated = abbreviateKey(sandboxApiKey);

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

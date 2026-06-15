// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Placeholder written by generate-api-reference.ts; overwritten by generate-sdk-snippets.ts.

import type { EndpointSnippets, SdkLanguage, SdkSnippetHighlightLanguage } from '@/lib/sdk-snippet-types';
import { SNIPPET_HIGHLIGHT_MAP } from '@/lib/sdk-snippet-types';

const RAW_SNIPPETS: Record<string, EndpointSnippets> = {};

export function getEndpointSnippet(
    operationId: string,
    language: SdkLanguage,
): { code: string; highlightLanguage: SdkSnippetHighlightLanguage } | undefined {
    const raw = RAW_SNIPPETS[operationId]?.[language];
    if (raw === undefined || raw === '') return undefined;
    return { code: raw, highlightLanguage: SNIPPET_HIGHLIGHT_MAP[language] };
}

export function getEndpointSnippets(operationId: string): EndpointSnippets | undefined {
    return RAW_SNIPPETS[operationId];
}

export function hasAnySnippet(operationId: string): boolean {
    return false;
}

/**
 * Shared SDK snippet types used by the generated snippet module
 * (src/static/apiSnippets.generated.ts) and by components that render snippets.
 */
export type SdkLanguage = 'typescript' | 'python' | 'go' | 'curl';

export type SdkSnippetHighlightLanguage = 'typescript' | 'bash' | 'python' | 'go';

/** Map an endpoint snippet map keyed by SDK language to display data. */
export type EndpointSnippets = Partial<Record<SdkLanguage, string>>;

export const SNIPPET_HIGHLIGHT_MAP: Record<SdkLanguage, SdkSnippetHighlightLanguage> = {
    typescript: 'typescript',
    curl: 'bash',
    python: 'python',
    go: 'go',
};

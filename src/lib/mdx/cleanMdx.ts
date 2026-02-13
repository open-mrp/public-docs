/**
 * Converts MDX content to clean markdown suitable for LLM consumption.
 * Removes JSX components while preserving meaningful text content.
 */
export function cleanMdx(content: string): string {
    let cleaned = content;

    // 1. Remove frontmatter
    cleaned = cleaned.replace(/^---[\s\S]*?---/, '');

    // 2. Extract and protect code blocks from subsequent processing
    const codeBlocks: string[] = [];
    cleaned = cleaned.replace(/```[\s\S]*?```/g, (match) => {
        codeBlocks.push(match);
        return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
    });

    // 3. Handle JSX whitespace expressions like {' '} - convert to space
    cleaned = cleaned.replace(/\{'\s*'\}/g, ' ');
    cleaned = cleaned.replace(/\{"\s*"\}/g, ' ');

    // 4. Extract text from specific component props before general tag removal
    // Using [\s\S]*? for multiline matching

    // InternalLink text="..." (handles multi-line tags)
    cleaned = cleaned.replace(/<InternalLink[\s\S]*?text="([^"]+)"[\s\S]*?\/>/g, '$1');

    // DocNumberedSection title="..." (keep content, replace opening tag with heading)
    cleaned = cleaned.replace(/<DocNumberedSection[\s\S]*?title="([^"]+)"[\s\S]*?>/g, '### $1');

    // LinkCard with title and description (handles any attribute order)
    cleaned = cleaned.replace(/<LinkCard[\s\S]*?\/>/g, (match) => {
        const titleMatch = match.match(/title="([^"]+)"/);
        const descMatch = match.match(/description="([^"]+)"/);
        if (titleMatch && descMatch) {
            return `### ${titleMatch[1]}\n${descMatch[1]}`;
        } else if (titleMatch) {
            return `### ${titleMatch[1]}`;
        }
        return '';
    });

    // 5. Handle components that render dynamic/user-specific content with placeholders
    cleaned = cleaned.replace(/<AccountName\s*\/>/g, '[Account Name]');
    cleaned = cleaned.replace(/<SandboxAccountId\s*\/>/g, '[Sandbox Account ID]');
    cleaned = cleaned.replace(/<ApiKeySnippet\s*\/>/g, '[API Key]');

    // 6. Remove all other JSX/MDX components (starting with uppercase)
    // Keep content inside paired tags like <DocTabs>...</DocTabs>

    // Remove self-closing tags (handles multi-line attributes)
    cleaned = cleaned.replace(/<[A-Z][a-zA-Z0-9]*[\s\S]*?\/>/g, '');

    // Remove opening and closing tags (preserves content between them)
    cleaned = cleaned.replace(/<\/?[A-Z][a-zA-Z0-9]*[\s\S]*?>/g, '');

    // 7. Remove remaining JSX expressions like {variableName} or {expression}
    // Code blocks are protected, so this won't affect them
    cleaned = cleaned.replace(/\{[^}]*\}/g, '');

    // 8. Restore code blocks
    cleaned = cleaned.replace(/__CODE_BLOCK_(\d+)__/g, (_, index) => {
        return codeBlocks[parseInt(index, 10)];
    });

    // 9. Cleanup whitespace
    // Remove lines that are only whitespace
    cleaned = cleaned
        .split('\n')
        .map((line) => line.trimEnd())
        .join('\n');

    // Collapse multiple blank lines into at most two
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

    return cleaned.trim();
}

'use client';

import { CodeEditor } from '@openmrp/ui';
import { marked } from 'marked';
import { Fragment, type ReactNode, useMemo } from 'react';

marked.setOptions({
    gfm: true,
    breaks: false,
});

/**
 * OpenAPI field descriptions are often sourced from Go doc-comments, where
 * every line is prefixed with `// `. When a fenced code block is embedded,
 * that yields invalid markdown like `// ```json` instead of ```json.
 *
 * If we detect a Go-comment-style code fence, strip leading `// ` prefixes so
 * the markdown parser can recognize the fence and render a proper code block.
 */
function normalizeApiDescriptionMarkdown(text: string) {
    // Break the boilerplate "Encoded as a JSON value …" note onto its own line.
    let result = text.replace(/[ \t]+(Encoded as a JSON value)/g, '\n\n$1');

    // Strip Go-comment `// ` prefixes around embedded code fences so the markdown
    // parser can recognize the fence and render a proper code block.
    if (/^\s*\/\/\s*(```|~~~)/m.test(result)) {
        result = result.replace(/^[ \t]*\/\/[ \t]?/gm, '');
    }

    return result;
}

/**
 * Renders a markdown string as inline HTML. Uses `parseInline` so the output
 * stays within a <span> (no block-level wrappers like <p>). Suitable for
 * parameter descriptions, field descriptions, and other short text.
 */
export function MarkdownText({ text, className }: { text: string; className?: string }) {
    const normalizedText = useMemo(() => normalizeApiDescriptionMarkdown(text), [text]);
    const html = useMemo(() => marked.parseInline(normalizedText) as string, [normalizedText]);
    return (
        <span
            className={`api-md-inline${className ? ` ${className}` : ''}`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

function renderMarkedInlineText(text: string) {
    return <span dangerouslySetInnerHTML={{ __html: marked.parseInline(text) as string }} />;
}

type MarkedListItem = {
    tokens?: MarkedToken[];
};

type MarkedToken = {
    type: string;
    text?: string;
    lang?: string;
    depth?: number;
    ordered?: boolean;
    tokens?: MarkedToken[];
    items?: MarkedListItem[];
};

function renderMarkedTokens(tokens: MarkedToken[], keyPrefix: string): ReactNode {
    return tokens.map((token, idx) => {
        const key = `${keyPrefix}-${idx}`;

        if (token.type === 'space') return null;

        if (token.type === 'paragraph') {
            return (
                <p key={key}>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: marked.parseInline(token.text ?? '') as string,
                        }}
                    />
                </p>
            );
        }

        if (token.type === 'heading') {
            const content = renderMarkedInlineText(token.text ?? '');
            switch (token.depth) {
                case 1:
                    return <h1 key={key}>{content}</h1>;
                case 2:
                    return <h2 key={key}>{content}</h2>;
                case 3:
                    return <h3 key={key}>{content}</h3>;
                case 4:
                    return <h4 key={key}>{content}</h4>;
                case 5:
                    return <h5 key={key}>{content}</h5>;
                case 6:
                default:
                    return <h6 key={key}>{content}</h6>;
            }
        }

        if (token.type === 'blockquote') {
            return <blockquote key={key}>{renderMarkedTokens(token.tokens ?? [], key)}</blockquote>;
        }

        if (token.type === 'list') {
            const ListTag = token.ordered ? 'ol' : 'ul';
            return (
                <ListTag key={key}>
                    {(token.items ?? []).map((item, i) => (
                        <li key={`${key}-${i}`}>{renderMarkedTokens(item.tokens ?? [], `${key}-${i}`)}</li>
                    ))}
                </ListTag>
            );
        }

        if (token.type === 'code') {
            const language = (token.lang ?? '').trim() || 'text';
            return (
                <CodeEditor
                    key={key}
                    showLanguageLabel={false}
                >
                    <code className={`language-${language}`}>{token.text ?? ''}</code>
                </CodeEditor>
            );
        }

        // Fallback: let marked handle any unknown/rare block type.
        if (token.type === 'html') {
            return <div key={key} dangerouslySetInnerHTML={{ __html: token.text ?? '' }} />;
        }

        if (typeof token.text === 'string') {
            return <div key={key}>{renderMarkedInlineText(token.text)}</div>;
        }

        return null;
    });
}

/**
 * Renders a markdown string as block HTML (with <p>, <ul>, etc.).
 * Suitable for longer endpoint descriptions that may contain paragraphs or lists.
 */
export function MarkdownBlock({ text, className }: { text: string; className?: string }) {
    const normalizedText = useMemo(() => normalizeApiDescriptionMarkdown(text), [text]);
    const tokens = useMemo(
        () => marked.lexer(normalizedText) as unknown as MarkedToken[],
        [normalizedText],
    );

    // Code blocks render via `CodeEditor`, which already produces its own
    // wrapper DOM. Avoid wrapping code blocks again with a parent div that
    // can interfere with layout/styling.
    if (className && tokens.some((t) => t.type === 'code')) {
        return (
            <>
                {tokens.map((token, i) => {
                    if (token.type === 'code') {
                        return (
                            <Fragment key={`code-${i}`}>
                                {renderMarkedTokens([token], `md-code-${i}`)}
                            </Fragment>
                        );
                    }

                    return (
                        <div key={`md-${i}`} className={className}>
                            {renderMarkedTokens([token], `md-${i}`)}
                        </div>
                    );
                })}
            </>
        );
    }

    return <div className={className}>{renderMarkedTokens(tokens, 'md')}</div>;
}

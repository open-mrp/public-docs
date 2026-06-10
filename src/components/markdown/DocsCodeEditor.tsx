'use client';

import { mergeSnippetReplacements } from '@/lib/typeId';
import { useCodeReplacements } from '@/providers/ApiKeyProvider';
import { CodeEditor } from '@augno/ui';
import { Children, isValidElement, ReactNode, useMemo } from 'react';

interface DocsCodeEditorProps {
    children: ReactNode;
    className?: string;
}

function extractCodeText(children: ReactNode): string {
    let text = '';
    Children.forEach(children, (child) => {
        if (typeof child === 'string' || typeof child === 'number') {
            text += String(child);
        } else if (isValidElement<{ children?: ReactNode }>(child)) {
            if (child.props.children != null) {
                text += extractCodeText(child.props.children);
            }
        }
    });
    return text;
}

/**
 * Wrapper around CodeEditor that automatically injects API key replacements.
 * Replaces placeholders like YOUR_API_KEY with the user's actual sandbox key.
 *
 * Uses a key derived from replacements to force CodeEditor to remount when
 * values change (e.g. after auth loads). This prevents the CodeEditor from
 * re-reading its own replaced DOM output and applying replacements twice.
 */
export function DocsCodeEditor({ children, className }: DocsCodeEditorProps) {
    const baseReplacements = useCodeReplacements();
    const code = useMemo(() => extractCodeText(children), [children]);
    const replacements = useMemo(
        () => mergeSnippetReplacements(baseReplacements, code),
        [baseReplacements, code],
    );
    const key = useMemo(() => JSON.stringify(replacements), [replacements]);

    return (
        <CodeEditor key={key} className={className} replacements={replacements}>
            {children}
        </CodeEditor>
    );
}

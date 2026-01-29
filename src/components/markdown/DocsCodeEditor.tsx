'use client';

import { useCodeReplacements } from '@/providers/ApiKeyProvider';
import { CodeEditor } from '@augno/ui';
import { ReactNode, useMemo } from 'react';

interface DocsCodeEditorProps {
    children: ReactNode;
    className?: string;
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
    const replacements = useCodeReplacements();
    const key = useMemo(() => JSON.stringify(replacements), [replacements]);

    return (
        <CodeEditor key={key} className={className} replacements={replacements}>
            {children}
        </CodeEditor>
    );
}

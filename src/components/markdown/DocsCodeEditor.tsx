'use client';

import { useCodeReplacements } from '@/providers/ApiKeyProvider';
import { CodeEditor } from '@augno/ui';
import { ReactNode } from 'react';

interface DocsCodeEditorProps {
    children: ReactNode;
    className?: string;
}

/**
 * Wrapper around CodeEditor that automatically injects API key replacements.
 * Replaces placeholders like YOUR_API_KEY with the user's actual sandbox key.
 */
export function DocsCodeEditor({ children, className }: DocsCodeEditorProps) {
    const replacements = useCodeReplacements();

    return (
        <CodeEditor className={className} replacements={replacements}>
            {children}
        </CodeEditor>
    );
}

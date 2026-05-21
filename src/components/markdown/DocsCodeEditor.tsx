'use client';

import { mergeSnippetReplacements } from '@/lib/typeId';
import { useCodeReplacements } from '@/providers/ApiKeyProvider';
import { CodeEditor } from '@augno/ui';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

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
    const baseReplacements = useCodeReplacements();
    const codeRef = useRef<HTMLDivElement>(null);
    const [code, setCode] = useState('');

    useEffect(() => {
        const codeElement = codeRef.current?.querySelector('code');
        setCode(codeElement?.textContent ?? '');
    }, [children]);

    const replacements = useMemo(
        () => mergeSnippetReplacements(baseReplacements, code),
        [baseReplacements, code],
    );
    const key = useMemo(() => JSON.stringify(replacements), [replacements]);

    return (
        <>
            <div ref={codeRef} hidden>
                {children}
            </div>
            <CodeEditor key={key} className={className} replacements={replacements}>
                {children}
            </CodeEditor>
        </>
    );
}

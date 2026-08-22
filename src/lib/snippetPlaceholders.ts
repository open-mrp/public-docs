/**
 * Synthetic single-resource layouts are **legacy**. Docs snippets now use `api/stainless/public/stainless.yml`
 * merged with [`scripts/generate-sdk-snippets.ts`](../scripts/generate-sdk-snippets.ts). These symbols remain
 * for tests / any code that still flattens old snippet output.
 */
export const DOCS_SYNTHETIC_STAINLESS_RESOURCE = 'augno_public_api';

/** TypeScript client property Stainless emits for {@link DOCS_SYNTHETIC_STAINLESS_RESOURCE}. */
export const DOCS_SYNTHETIC_TS_CLIENT_PROP = 'augnoPublicAPI';

/** Python attribute Stainless emits for {@link DOCS_SYNTHETIC_STAINLESS_RESOURCE}. */
export const DOCS_SYNTHETIC_PY_CLIENT_PROP = 'augno_public_api';

/** Go client field Stainless emits for {@link DOCS_SYNTHETIC_STAINLESS_RESOURCE}. */
export const DOCS_SYNTHETIC_GO_CLIENT_PROP = 'AugnoPublicAPI';

export type SyntheticFlattenLanguage = 'typescript' | 'python' | 'go';

/**
 * Removes the synthetic single-resource namespace so docs read `client.createProduct(...)`
 * instead of `client.augnoPublicAPI.createProduct(...)`.
 *
 * Does not rename Go parameter types (`augno.AugnoPublicAPIFooParams`); those stay as Stainless emitted them.
 */
export function flattenSyntheticSdkNamespace(code: string, lang: SyntheticFlattenLanguage): string {
    switch (lang) {
        case 'typescript':
            return code.replace(
                new RegExp(`\\b(\\w+)\\.${DOCS_SYNTHETIC_TS_CLIENT_PROP}\\.`, 'g'),
                '$1.',
            );
        case 'python':
            return code.replace(
                new RegExp(`\\b(\\w+)\\.${DOCS_SYNTHETIC_PY_CLIENT_PROP}\\.`, 'g'),
                '$1.',
            );
        case 'go':
            return code.replace(
                new RegExp(`\\b(\\w+)\\.${DOCS_SYNTHETIC_GO_CLIENT_PROP}\\.`, 'g'),
                '$1.',
            );
        default:
            return code;
    }
}

/**
 * Normalize Stainless / SDK codegen snippets so they use the same placeholder tokens as
 * [`ApiKeyProvider`](./providers/ApiKeyProvider.tsx) (`YOUR_API_KEY`, `API_HOST`, etc.).
 */
export function normalizeSnippetPlaceholders(code: string): string {
    let s = code;

    const literalReplacements: Array<[RegExp, string]> = [
        // Stainless readme stubs often emit bearer tokens; default public auth is AugnoApiKey (+ optional Bearer).
        [/bearerToken:\s*'My Bearer Token'/g, "augnoAPIKey: 'YOUR_API_KEY'"],
        [/bearer_token="My Bearer Token"/g, 'augno_api_key="YOUR_API_KEY"'],
        [/Bearer\s+'My Bearer Token'/gi, "Bearer 'YOUR_API_KEY'"],
        [/https:\/\/api\.augno\.com\b/g, 'API_HOST'],
        [/https:\/\/sandbox\.api\.augno\.com\b/g, 'API_HOST'],
        [/\$\{\s*process\.env\.NEXT_PUBLIC_V2_API_URL[^}]*\}/g, 'API_HOST'],
        // Match real STLC TS client naming (`opts.augno_api_key` → `augnoAPIKey`)
        [
            /augnoAPIKey:\s*readEnv\(\s*['"]AUGNO_API_KEY['"]\s*\)(?:\s*\?\?\s*null)?/g,
            "augnoAPIKey: 'YOUR_API_KEY'",
        ],
        [
            /augnoAPIKey:\s*process\.env\[\s*['"]AUGNO_API_KEY['"]\s*\](?:\s*\?\?\s*null|\s*\?\?\s*undefined)?/g,
            "augnoAPIKey: 'YOUR_API_KEY'",
        ],
        [
            /augnoAPIKey:\s*process\.env\.AUGNO_API_KEY\b(?:\s*\?\?\s*null|\s*\?\?\s*undefined)?/g,
            "augnoAPIKey: 'YOUR_API_KEY'",
        ],
        // TS / JS — produce a string literal so examples remain valid syntax after substitution
        [/\$\{\s*process\.env\[\s*['"]AUGNO_API_KEY['"]\s*\]\s*\}/g, "'YOUR_API_KEY'"],
        [/process\.env\[\s*['"]AUGNO_API_KEY['"]\s*\]/g, "'YOUR_API_KEY'"],
        [/process\.env\.AUGNO_API_KEY\b/g, "'YOUR_API_KEY'"],
        [/option\.WithAPIKey\(\s*"My API Key"\s*\)/g, 'option.WithAPIKey("YOUR_API_KEY")'],
        [/option\.WithAPIKey\(\s*'My API Key'\s*\)/g, `option.WithAPIKey('YOUR_API_KEY')`],
        [/api_key=os\.environ\.get\(\s*["']AUGNO_API_KEY["']\s*\)/g, `api_key='YOUR_API_KEY'`],
        [/api_key=os\.environ\[["']AUGNO_API_KEY["']\]/g, `api_key='YOUR_API_KEY'`],
        [/\bos\.getenv\(\s*["']AUGNO_API_KEY["']\s*\)/g, "'YOUR_API_KEY'"],
        [/\bos\.environ\[["']AUGNO_API_KEY["']\]/g, "'YOUR_API_KEY'"],
        [
            /augno_api_key=os\.getenv\(\s*["']AUGNO_API_KEY["']\s*\)/gi,
            `augno_api_key='YOUR_API_KEY'`,
        ],
        [
            /augno_api_key=os\.environ\.get\(\s*["']AUGNO_API_KEY["']\s*\)/gi,
            `augno_api_key='YOUR_API_KEY'`,
        ],
        [/\$AUGNO_API_KEY\b/g, 'YOUR_API_KEY'],
    ];

    for (const [pattern, replacement] of literalReplacements) {
        s = s.replace(pattern, replacement);
    }

    // Bearer tokens that are clearly placeholders / examples → doc placeholder
    s = s.replace(/Bearer\s+\$AUGNO_API_KEY\b/gi, 'Bearer YOUR_API_KEY');
    s = s.replace(/Bearer\s+aug_sk_\w+/gi, 'Bearer YOUR_API_KEY');
    s = s.replace(/Bearer\s+sk_\w+/gi, 'Bearer YOUR_API_KEY');
    s = s.replace(/Bearer\s+<[^>]+>/g, 'Bearer YOUR_API_KEY');

    // Common Stainless readme-style env reads
    s = s.replace(/\$\{\s*apiKey\s*\?\?\s*[^}]+\}/g, "'YOUR_API_KEY'");

    // Stainless' stock comment explains an env-var default. Docs snippets substitute a real
    // key into that slot, so the comment has to say what the value is instead.
    s = s.replace(
        /(YOUR_API_KEY|AUGNO_API_KEY)([^\n]*?)(\/\/|#)\s*This is the default and can be omitted/g,
        '$1$2$3 Your API key goes here',
    );

    return s;
}

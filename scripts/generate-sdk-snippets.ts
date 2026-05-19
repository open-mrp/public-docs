/**
 * Builds Stainless sdk-json snippets for API reference code panels.
 *
 * Reads specs/stainless.yml (minus generated resources) + specs/public_openapi_spec.json,
 * merges auto-generated `resources` methods from OpenAPI, runs vendored sdk-json
 * (`packages/stainless-sdk-json`),
 * and emits src/static/apiSnippets.generated.ts.
 */
import fs from 'fs';
import path from 'path';
import type { Method, Resource, Spec } from '../packages/stainless-sdk-json';
import { generateSpecFromStrings } from '../packages/stainless-sdk-json/dist/index.js';

import {
    DOCS_SYNTHETIC_STAINLESS_RESOURCE,
    flattenSyntheticSdkNamespace,
    normalizeSnippetPlaceholders,
} from '../src/lib/snippetPlaceholders';

const ROOT = process.cwd();
const OPENAPI_PATH = path.join(ROOT, 'specs/public_openapi_spec.json');
const STAINLESS_PATH = path.join(ROOT, 'specs/stainless.yml');
const OUTPUT_PATH = path.join(ROOT, 'src/static/apiSnippets.generated.ts');

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head', 'trace'] as const;

type SdkLanguage = 'typescript' | 'curl' | 'python' | 'go';

const SNIPPET_LANG: Record<SdkLanguage, string> = {
    typescript: 'typescript.default',
    curl: 'http.curl',
    python: 'python.default',
    go: 'go.default',
};

interface OpenAPIOperation {
    operationId?: string;
}

interface OpenAPIPathItem {
    parameters?: unknown;
    get?: OpenAPIOperation;
    put?: OpenAPIOperation;
    post?: OpenAPIOperation;
    patch?: OpenAPIOperation;
    delete?: OpenAPIOperation;
    options?: OpenAPIOperation;
    head?: OpenAPIOperation;
    trace?: OpenAPIOperation;
}

interface OpenAPISpec {
    paths: Record<string, OpenAPIPathItem>;
}

function yamlQuoteEndpoint(httpMethod: string, endpointPath: string): string {
    const endpoint = `${httpMethod.toLowerCase()} ${endpointPath}`;
    const escaped = endpoint.replace(/'/g, "''");
    return `'${escaped}'`;
}

function uniqueYamlMethodKey(operationId: string, seen: Set<string>): string {
    let base = operationId.replace(/-/g, '_').replace(/[^a-zA-Z0-9_]/g, '_');
    if (/^[0-9]/.test(base)) base = `_${base}`;
    if (!base) base = 'unnamed_operation';

    let key = base;
    let i = 2;
    while (seen.has(key)) {
        key = `${base}_${i}`;
        i++;
    }
    seen.add(key);
    return key;
}

function openapiEndpointKey(httpMethod: string, endpointPath: string): string {
    return `${httpMethod.toLowerCase()} ${endpointPath}`;
}

function stainlessEndpointKey(method: Method): string {
    return method.endpoint.trim().toLowerCase();
}

function generateResourcesYaml(spec: OpenAPISpec): {
    yamlBlock: string;
    lookup: Map<string, string>;
} {
    const lookup = new Map<string, string>();
    const seenKeys = new Set<string>();
    const lines: string[] = [
        'resources:',
        `    ${DOCS_SYNTHETIC_STAINLESS_RESOURCE}:`,
        '        methods:',
    ];

    for (const [pathTemplate, pathItem] of Object.entries(spec.paths)) {
        if (!pathItem || typeof pathItem !== 'object') continue;

        for (const verb of HTTP_METHODS) {
            const op = pathItem[verb];
            if (!op || typeof op !== 'object') continue;

            const operationId =
                op.operationId?.trim() ||
                `${verb}_${pathTemplate.replace(/\//g, '_').replace(/^_+|_+$/g, '')}`;

            const yamlKey = uniqueYamlMethodKey(operationId, seenKeys);
            const lk = openapiEndpointKey(verb, pathTemplate);
            lookup.set(lk, operationId.trim());

            lines.push(`            ${yamlKey}: ${yamlQuoteEndpoint(verb, pathTemplate)}`);
        }
    }

    return { yamlBlock: lines.join('\n'), lookup };
}

function* walkResourceMethods(resource: Resource): Generator<Method> {
    for (const m of Object.values(resource.methods ?? {})) {
        yield m;
    }
    for (const sub of Object.values(resource.subresources ?? {})) {
        yield* walkResourceMethods(sub);
    }
}

function* walkAllMethods(spec: Spec): Generator<Method> {
    for (const resource of Object.values(spec.resources ?? {})) {
        yield* walkResourceMethods(resource);
    }
}

function getSnippetRaw(
    snippets: Spec['snippets'],
    snippetLanguageKey: string,
    stainlessPath: string,
): string | undefined {
    const bucket = snippets?.[snippetLanguageKey as keyof Spec['snippets']];
    if (!bucket || typeof bucket !== 'object') return undefined;
    const entry = bucket[stainlessPath];
    const content = entry?.default?.content;
    return typeof content === 'string' ? content : undefined;
}

function emitGeneratedTs(data: Record<string, Partial<Record<SdkLanguage, string>>>): void {
    const serialized = JSON.stringify(data, null, 4);
    const contents = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run scripts/generate-sdk-snippets.ts' (via build:docs) to regenerate.

export type SdkLanguage = 'typescript' | 'python' | 'go' | 'curl';

export type SdkSnippetHighlightLanguage = 'typescript' | 'bash' | 'python' | 'go';

const HIGHLIGHT_MAP: Record<SdkLanguage, SdkSnippetHighlightLanguage> = {
    typescript: 'typescript',
    curl: 'bash',
    python: 'python',
    go: 'go',
};

/**
 * Snippets keyed by OpenAPI operationId (matches EndpointData.operationId).
 * Values are normalized at generation time for ApiKeyProvider placeholders.
 */
const RAW_SNIPPETS: Record<string, Partial<Record<SdkLanguage, string>>> = ${serialized};

export function getEndpointSnippet(
    operationId: string,
    language: SdkLanguage,
): { code: string; highlightLanguage: SdkSnippetHighlightLanguage } | undefined {
    const raw = RAW_SNIPPETS[operationId]?.[language];
    if (raw === undefined || raw === '') return undefined;
    return {
        code: raw,
        highlightLanguage: HIGHLIGHT_MAP[language],
    };
}

export function hasAnySnippet(operationId: string): boolean {
    const row = RAW_SNIPPETS[operationId];
    if (!row) return false;
    return (
        Boolean(row.typescript?.trim()) ||
        Boolean(row.curl?.trim()) ||
        Boolean(row.python?.trim()) ||
        Boolean(row.go?.trim())
    );
}
`;
    fs.writeFileSync(OUTPUT_PATH, contents, 'utf8');
}

async function main(): Promise<void> {
    if (!fs.existsSync(STAINLESS_PATH)) {
        console.warn(
            `[generate-sdk-snippets] Missing ${path.relative(ROOT, STAINLESS_PATH)} — emitting empty snippets.`,
        );
        emitGeneratedTs({});
        return;
    }

    const stainlessTemplate = fs.readFileSync(STAINLESS_PATH, 'utf8');
    if (!stainlessTemplate.includes('__GENERATED_RESOURCES__')) {
        console.warn(
            `[generate-sdk-snippets] specs/stainless.yml must contain __GENERATED_RESOURCES__ placeholder.`,
        );
        emitGeneratedTs({});
        return;
    }

    if (!fs.existsSync(OPENAPI_PATH)) {
        console.warn(`[generate-sdk-snippets] Missing OpenAPI spec — emitting empty snippets.`);
        emitGeneratedTs({});
        return;
    }

    const openapiJson = fs.readFileSync(OPENAPI_PATH, 'utf8');
    const openapiSpec = JSON.parse(openapiJson) as OpenAPISpec;

    const { yamlBlock, lookup } = generateResourcesYaml(openapiSpec);
    const mergedConfig = stainlessTemplate.replace('__GENERATED_RESOURCES__', yamlBlock);

    console.log('[generate-sdk-snippets] Running Stainless sdk-json codegen…');

    let sdkJson: Spec;
    try {
        const result = await generateSpecFromStrings({
            oasStr: openapiJson,
            configStr: mergedConfig,
            stainlessProject: 'augno-public-docs',
            languageOverrides: {
                mode: 'only',
                list: ['typescript', 'http', 'python', 'go'],
            },
            versionInfo: null,
        });
        sdkJson = result.sdkJson;
    } catch (err) {
        console.error('[generate-sdk-snippets] Stainless generation failed:', err);
        console.warn(
            '[generate-sdk-snippets] Emitting empty snippets so the docs build can continue.',
        );
        emitGeneratedTs({});
        process.exitCode = 0;
        return;
    }

    const out: Record<string, Partial<Record<SdkLanguage, string>>> = {};

    for (const method of walkAllMethods(sdkJson)) {
        const key = stainlessEndpointKey(method);
        const operationId = lookup.get(key);
        if (!operationId) continue;

        const row = (out[operationId] ??= {});

        for (const lang of Object.keys(SNIPPET_LANG) as SdkLanguage[]) {
            const snippetKey = SNIPPET_LANG[lang];
            const raw = getSnippetRaw(sdkJson.snippets, snippetKey, method.stainlessPath);
            if (raw !== undefined && raw.trim() !== '') {
                let code = normalizeSnippetPlaceholders(raw);
                if (lang === 'typescript' || lang === 'python' || lang === 'go') {
                    code = flattenSyntheticSdkNamespace(code, lang);
                }
                row[lang] = code;
            }
        }
    }

    emitGeneratedTs(out);
    console.log(
        `[generate-sdk-snippets] Wrote ${path.relative(ROOT, OUTPUT_PATH)} (${Object.keys(out).length} operations).`,
    );
}

await main();

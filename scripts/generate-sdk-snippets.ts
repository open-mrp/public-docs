/**
 * Prerequisite: STLC `packages/stlc` built so `dist/docs.mjs` exists
 * (typically `pnpm turbo build --filter=@pkg/stlc` in stlc-main).
 * Override: `STLC_DOCS_MJS=/abs/path/to/docs.mjs`.
 */
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'node:url';
import { parse, stringify } from 'yaml';
import type { Method, Resource, Spec } from '../packages/stainless-sdk-json/dist/index.js';
import { normalizeSnippetPlaceholders } from '../src/lib/snippetPlaceholders';

const ROOT = process.cwd();
const OPENAPI_PATH = path.join(ROOT, 'specs/public_openapi_spec.json');
const CANONICAL_STAINLESS_REL = path.join(ROOT, '..', 'api', 'stainless', 'public', 'stainless.yml');
const OUTPUT_PATH = path.join(ROOT, 'src/static/apiSnippets.generated.ts');

const SNIPPET_BUILD_LANGUAGES = ['typescript', 'python', 'go', 'http'] as const;
type SdkJsonSnippetLanguage = (typeof SNIPPET_BUILD_LANGUAGES)[number];

/** Per-method language keys merged across targets (narrow superset used by snippets) */
const MERGE_LANG_KEYS = new Set<string>([
    'typescript',
    'python',
    'go',
    'http',
    'node',
    'kotlin',
    'java',
]);

/** Docs-only fields merged onto the canonical SDK stainless config */
const DOCS_OVERLAY_YAML = `
docs:
  languages:
    - typescript
    - http
    - python
    - go

openapi:
  code_samples: stainless
  code_sample_languages:
    curl: true

settings:
  disable_mock_tests: true
  license: Apache-2.0

targets:
  python:
    package_name: augno_sdk
    production_repo: null
    publish:
      pypi: false
  go:
    package_name: augno
    production_repo: null
`;

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

function deepMerge(
    base: Record<string, unknown>,
    overlay: Record<string, unknown>,
): Record<string, unknown> {
    const result: Record<string, unknown> = { ...base };
    for (const [key, val] of Object.entries(overlay)) {
        const baseVal = result[key];
        if (
            val !== null &&
            typeof val === 'object' &&
            !Array.isArray(val) &&
            baseVal !== null &&
            typeof baseVal === 'object' &&
            !Array.isArray(baseVal)
        ) {
            result[key] = deepMerge(
                baseVal as Record<string, unknown>,
                val as Record<string, unknown>,
            );
        } else {
            result[key] = val;
        }
    }
    return result;
}

function resolveCanonicalStainlessPath(): string | undefined {
    const env = process.env.PUBLIC_DOCS_STAINLESS_YML?.trim();
    if (env && fs.existsSync(env)) return path.resolve(env);
    if (fs.existsSync(CANONICAL_STAINLESS_REL)) return CANONICAL_STAINLESS_REL;
    return undefined;
}

function openapiEndpointKey(httpMethod: string, endpointPath: string): string {
    return `${httpMethod.toLowerCase()} ${endpointPath}`;
}

function stainlessEndpointKey(method: Method): string {
    return method.endpoint.trim().toLowerCase();
}

function buildEndpointToOperationIdLookup(spec: OpenAPISpec): Map<string, string> {
    const lookup = new Map<string, string>();
    for (const [pathTemplate, pathItem] of Object.entries(spec.paths)) {
        if (!pathItem || typeof pathItem !== 'object') continue;

        for (const verb of HTTP_METHODS) {
            const op = pathItem[verb];
            if (!op || typeof op !== 'object') continue;

            const operationId =
                op.operationId?.trim() ||
                `${verb}_${pathTemplate.replace(/\//g, '_').replace(/^_+|_+$/g, '')}`;

            const lk = openapiEndpointKey(verb, pathTemplate);
            lookup.set(lk, operationId.trim());
        }
    }
    return lookup;
}

function buildMergedStainlessConfig(canonicalYaml: string): string {
    const base = parse(canonicalYaml) as Record<string, unknown>;
    const overlay = parse(DOCS_OVERLAY_YAML) as Record<string, unknown>;
    return stringify(deepMerge(base, overlay));
}

function mergeResources(target: Record<string, Resource>, source: Record<string, Resource>): void {
    for (const [name, srcResource] of Object.entries(source)) {
        const tgtResource = target[name];

        if (!tgtResource) {
            target[name] = srcResource;
            continue;
        }

        assignLangKeys(tgtResource, srcResource);

        for (const [methodName, srcMethod] of Object.entries(srcResource.methods)) {
            const tgtMethod = tgtResource.methods[methodName];

            if (!tgtMethod) {
                tgtResource.methods[methodName] = srcMethod;
            } else {
                assignLangKeys(tgtMethod, srcMethod);
            }
        }

        if (srcResource.subresources) {
            tgtResource.subresources ??= {};
            mergeResources(tgtResource.subresources, srcResource.subresources);
        }
    }
}

function assignLangKeys<T extends Partial<Record<string, unknown>>>(target: T, source: T): void {
    for (const lang of MERGE_LANG_KEYS) {
        const value = source[lang];
        if (value !== undefined) target[lang] = value;
    }
}

function mergeSpecs(specs: Spec[]): Spec {
    const [base, ...rest] = specs;

    if (!base) {
        throw new Error('mergeSpecs: expected at least one spec');
    }

    base.metadata ??= {};
    base.readme ??= {};
    base.decls ??= {};
    base.snippets ??= {};
    base.resources ??= {};

    for (const spec of rest) {
        Object.assign(base.metadata, spec.metadata);
        Object.assign(base.readme, spec.readme);
        Object.assign(base.decls, spec.decls ?? {});
        Object.assign(base.snippets, spec.snippets ?? {});
        mergeResources(base.resources, spec.resources ?? {});
    }

    return base;
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
    const canonicalPath = resolveCanonicalStainlessPath();
    if (!canonicalPath) {
        console.warn(
            `[generate-sdk-snippets] No canonical stainless config found. Expected:\n` +
                `  - ${path.relative(ROOT, CANONICAL_STAINLESS_REL)}, or\n` +
                `  - PUBLIC_DOCS_STAINLESS_YML pointing at api/stainless/public/stainless.yml\n` +
                `Emitting empty snippets.`,
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
    const lookup = buildEndpointToOperationIdLookup(openapiSpec);

    let configStr: string;
    try {
        configStr = buildMergedStainlessConfig(fs.readFileSync(canonicalPath, 'utf8'));
    } catch (e) {
        console.error('[generate-sdk-snippets] Failed to merge stainless YAML:', e);
        emitGeneratedTs({});
        return;
    }

    console.log(
        `[generate-sdk-snippets] canonical stainless ${path.relative(ROOT, canonicalPath)} + docs overlay`,
    );

    console.log('[generate-sdk-snippets] Running STLC generateSDKJSON (per language) …');

    const collected: Spec[] = [];
    try {
        for (const lang of SNIPPET_BUILD_LANGUAGES) {
            console.log(`  … ${lang}`);
            const { spec } = await generateSDKJSON({
                spec: openapiJson,
                config: configStr,
                language: lang,
            });
            collected.push(spec);
        }
    } catch (err) {
        console.error('[generate-sdk-snippets] STLC generateSDKJSON failed:', err);
        console.warn(
            '[generate-sdk-snippets] Emitting empty snippets. Ensure `@pkg/stlc` resolves and stlc/dist/docs.mjs exists.',
        );
        emitGeneratedTs({});
        process.exitCode = 0;
        return;
    }

    const sdkJson = mergeSpecs(collected);
    sdkJson.docs = {
        ...(sdkJson.docs ?? {}),
        languages: [...SNIPPET_BUILD_LANGUAGES],
    };

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
                row[lang] = normalizeSnippetPlaceholders(raw);
            }
        }
    }

    emitGeneratedTs(out);
    console.log(
        `[generate-sdk-snippets] Wrote ${path.relative(ROOT, OUTPUT_PATH)} (${Object.keys(out).length} operations).`,
    );
}

await main();

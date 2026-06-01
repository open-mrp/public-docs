/**
 * Builds SDK snippets via vendored `@stainless/sdk-json` (`packages/stainless-sdk-json`).
 */
import fs from 'fs';
import path from 'path';
import { parse, stringify } from 'yaml';
import type { Method, Resource, Spec } from '../packages/stainless-sdk-json';
import { generateSpecFromStrings } from '../packages/stainless-sdk-json/dist/index.js';
import { normalizeSnippetPlaceholders } from '../src/lib/snippetPlaceholders';

const ROOT = process.cwd();
const OPENAPI_PATH = path.join(ROOT, 'specs/public_openapi_spec.json');
const CANONICAL_STAINLESS_REL = path.join(ROOT, '..', 'api', 'stainless', 'public', 'stainless.yml');
/** Downloaded from S3 (`augno-public-openapi-specs/stainless.yml`) in CI / sync workflows. */
const REPO_STAINLESS_PATH = path.join(ROOT, 'specs', 'stainless.yml');
/** Fallback resource map — public stainless often keeps `resources: {}` until scoped; codegen needs mappings. */
const INTERNAL_STAINLESS_REL = path.join(ROOT, '..', 'api', 'stainless', 'internal', 'stainless.yml');
const OUTPUT_PATH = path.join(ROOT, 'src/static/apiSnippets.generated.ts');

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
    if (fs.existsSync(REPO_STAINLESS_PATH)) return REPO_STAINLESS_PATH;
    return undefined;
}

function stainlessResourcesLookEmpty(resources: unknown): boolean {
    if (resources === undefined || resources === null) return true;
    if (typeof resources !== 'object' || Array.isArray(resources)) return false;
    return Object.keys(resources as Record<string, unknown>).length === 0;
}

/**
 * Hydrate missing `resources` from internal stainless.yml (monorepo sibling package).
 * Extra mappings are ignored by codegen for endpoints not present in the public OpenAPI spec.
 */
function hydrateResourcesFromInternal(base: Record<string, unknown>): void {
    if (!stainlessResourcesLookEmpty(base.resources)) return;
    if (!fs.existsSync(INTERNAL_STAINLESS_REL)) return;
    try {
        const internalYaml = fs.readFileSync(INTERNAL_STAINLESS_REL, 'utf8');
        const internalDoc = parse(internalYaml) as Record<string, unknown>;
        const rr = internalDoc.resources;
        if (rr !== null && typeof rr === 'object' && !Array.isArray(rr)) {
            base.resources = rr as Record<string, unknown>;
            console.log(
                `[generate-sdk-snippets] public stainless has empty resources — using resource map from ${path.relative(ROOT, INTERNAL_STAINLESS_REL)}`,
            );
        }
    } catch {
        console.warn('[generate-sdk-snippets] Could not parse internal stainless for resource hydration.');
    }
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
    hydrateResourcesFromInternal(base);
    const overlay = parse(DOCS_OVERLAY_YAML) as Record<string, unknown>;
    return stringify(deepMerge(base, overlay));
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
                `  - ${path.relative(ROOT, CANONICAL_STAINLESS_REL)} (monorepo dev),\n` +
                `  - ${path.relative(ROOT, REPO_STAINLESS_PATH)} (from S3 via scripts/fetch-public-release-artifacts.sh), or\n` +
                `  - PUBLIC_DOCS_STAINLESS_YML\n` +
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

    console.log('[generate-sdk-snippets] Running Stainless sdk-json codegen …');

    let sdkJson: Spec;
    try {
        const result = await generateSpecFromStrings({
            oasStr: openapiJson,
            configStr,
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
        console.warn('[generate-sdk-snippets] Emitting empty snippets so the docs build can continue.');
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

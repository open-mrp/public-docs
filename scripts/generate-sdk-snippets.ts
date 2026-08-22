/**
 * Builds SDK snippets via `@stainless/sdk-json`.
 */
import fs from 'fs';
import path from 'path';
import { parse, stringify } from 'yaml';
import type { Method, Resource, Spec } from '@stainless/sdk-json';
import { generateSpecFromStrings } from '@stainless/sdk-json/spec';
import { normalizeSnippetPlaceholders } from '../src/lib/snippetPlaceholders';

const ROOT = process.cwd();
const OPENAPI_PATH = path.join(ROOT, 'specs/public_openapi_spec.json');
const VERSIONS_MANIFEST_PATH = path.join(ROOT, 'api-versions.json');
const ARCHIVED_SPECS_DIR = path.join(ROOT, 'specs/versions');
const VERSIONED_OUTPUT_DIR = path.join(ROOT, 'src/static/api-versions');
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

function emitGeneratedTs(
    data: Record<string, Partial<Record<SdkLanguage, string>>>,
    outputPath: string,
): void {
    const serialized = JSON.stringify(data, null, 4);
    const contents = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run scripts/generate-sdk-snippets.ts' (via build:docs) to regenerate.

import type { EndpointSnippets, SdkLanguage, SdkSnippetHighlightLanguage } from '@/lib/sdk-snippet-types';
import { SNIPPET_HIGHLIGHT_MAP } from '@/lib/sdk-snippet-types';

export type { SdkLanguage, SdkSnippetHighlightLanguage };

/**
 * Snippets keyed by OpenAPI operationId (matches EndpointData.operationId).
 * Values are normalized at generation time for ApiKeyProvider placeholders.
 */
const RAW_SNIPPETS: Record<string, EndpointSnippets> = ${serialized};

export function getEndpointSnippet(
    operationId: string,
    language: SdkLanguage,
): { code: string; highlightLanguage: SdkSnippetHighlightLanguage } | undefined {
    const raw = RAW_SNIPPETS[operationId]?.[language];
    if (raw === undefined || raw === '') return undefined;
    return {
        code: raw,
        highlightLanguage: SNIPPET_HIGHLIGHT_MAP[language],
    };
}

/** All snippets for an endpoint, keyed by SDK language. */
export function getEndpointSnippets(operationId: string): EndpointSnippets | undefined {
    return RAW_SNIPPETS[operationId];
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
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, contents, 'utf8');
}

interface SnippetTarget {
    /** Display label for logs, e.g. "latest" or an archived version string. */
    label: string;
    openapiPath: string;
    stainlessPath: string | undefined;
    outputPath: string;
}

async function generateForTarget(target: SnippetTarget): Promise<void> {
    const logPrefix = `[generate-sdk-snippets] [${target.label}]`;

    if (!target.stainlessPath) {
        const expected =
            target.label === 'latest'
                ? `Expected:\n` +
                  `  - ${path.relative(ROOT, CANONICAL_STAINLESS_REL)} (monorepo dev),\n` +
                  `  - ${path.relative(ROOT, REPO_STAINLESS_PATH)} (from S3 via scripts/fetch-public-release-artifacts.sh), or\n` +
                  `  - PUBLIC_DOCS_STAINLESS_YML`
                : `Expected specs/versions/${target.label}-stainless.yml (from S3 via scripts/fetch-public-release-artifacts.sh).`;
        console.warn(`${logPrefix} No stainless config found. ${expected}\nEmitting empty snippets.`);
        emitGeneratedTs({}, target.outputPath);
        return;
    }

    if (!fs.existsSync(target.openapiPath)) {
        console.warn(`${logPrefix} Missing OpenAPI spec — emitting empty snippets.`);
        emitGeneratedTs({}, target.outputPath);
        return;
    }

    const openapiJson = fs.readFileSync(target.openapiPath, 'utf8');
    const openapiSpec = JSON.parse(openapiJson) as OpenAPISpec;
    const lookup = buildEndpointToOperationIdLookup(openapiSpec);

    let configStr: string;
    try {
        configStr = buildMergedStainlessConfig(fs.readFileSync(target.stainlessPath, 'utf8'));
    } catch (e) {
        console.error(`${logPrefix} Failed to merge stainless YAML:`, e);
        emitGeneratedTs({}, target.outputPath);
        return;
    }

    console.log(
        `${logPrefix} canonical stainless ${path.relative(ROOT, target.stainlessPath)} + docs overlay`,
    );

    console.log(`${logPrefix} Running Stainless sdk-json codegen …`);

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
        console.error(`${logPrefix} Stainless generation failed:`, err);
        console.warn(`${logPrefix} Emitting empty snippets so the docs build can continue.`);
        emitGeneratedTs({}, target.outputPath);
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

    emitGeneratedTs(out, target.outputPath);
    console.log(
        `${logPrefix} Wrote ${path.relative(ROOT, target.outputPath)} (${Object.keys(out).length} operations).`,
    );
}

function readArchivedVersionsManifest(): string[] {
    if (!fs.existsSync(VERSIONS_MANIFEST_PATH)) return [];
    try {
        const manifest = JSON.parse(fs.readFileSync(VERSIONS_MANIFEST_PATH, 'utf8')) as {
            archived?: string[];
        };
        return manifest.archived ?? [];
    } catch (e) {
        console.warn(`[generate-sdk-snippets] Could not parse ${VERSIONS_MANIFEST_PATH}:`, e);
        return [];
    }
}

async function main(): Promise<void> {
    await generateForTarget({
        label: 'latest',
        openapiPath: OPENAPI_PATH,
        stainlessPath: resolveCanonicalStainlessPath(),
        outputPath: OUTPUT_PATH,
    });

    // Archived versions only get snippets for the per-version output dirs that
    // generate-api-reference.ts created (it skips manifest versions with no spec
    // on disk, and the version that equals latest).
    for (const version of readArchivedVersionsManifest()) {
        const outputDir = path.join(VERSIONED_OUTPUT_DIR, version);
        if (!fs.existsSync(outputDir)) continue;

        const openapiPath = path.join(ARCHIVED_SPECS_DIR, `${version}.json`);
        const outputPath = path.join(outputDir, 'apiSnippets.generated.ts');
        if (!fs.existsSync(openapiPath) && fs.existsSync(outputPath)) {
            // Spec not on disk (e.g. local build without S3 access) — keep the
            // committed snippets rather than overwriting them with empties.
            console.log(`[generate-sdk-snippets] [${version}] No spec on disk — keeping existing snippets.`);
            continue;
        }

        const stainlessPath = path.join(ARCHIVED_SPECS_DIR, `${version}-stainless.yml`);
        await generateForTarget({
            label: version,
            openapiPath,
            // Archived versions must use their own pinned stainless config; the
            // monorepo-HEAD fallbacks would describe the wrong API surface.
            stainlessPath: fs.existsSync(stainlessPath) ? stainlessPath : undefined,
            outputPath,
        });
    }
}

await main();

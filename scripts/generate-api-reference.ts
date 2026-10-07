import fs from 'fs';
import path from 'path';
import {
    buildCompactNavEntries,
    buildCompactObjectNavEntries,
    generateEndpointData,
    type ApiNavDomain,
    type ObjectData,
    type OpenAPISpec,
    type TagData,
} from '../src/lib/api-reference-spec';
import { normalizeLegacyHosts } from '../src/lib/legacy-hosts';

const SPEC_PATH = path.join(process.cwd(), 'specs/public_openapi_spec.json');
const VERSIONS_MANIFEST_PATH = path.join(process.cwd(), 'api-versions.json');
const API_VERSION_PATH = path.join(process.cwd(), 'src/static/apiVersion.generated.ts');
const API_VERSIONS_OUTPUT_PATH = path.join(process.cwd(), 'src/static/apiVersions.generated.ts');
const API_NAV_OUTPUT_PATH = path.join(process.cwd(), 'src/static/apiNav.generated.ts');
const ENDPOINTS_OUTPUT_PATH = path.join(process.cwd(), 'src/static/apiEndpoints.generated.ts');
// Basename of the .js + .d.ts pair holding the endpoint data; see writeEndpointDataModule.
const ENDPOINT_DATA_MODULE = 'apiEndpoints.data.generated';
const LEGACY_API_REFERENCE_DIR = path.join(process.cwd(), 'src/docs/developer-resources/api-reference');
const LEGACY_API_REFERENCE_OVERVIEW = path.join(process.cwd(), 'src/docs/developer-resources/api-reference.mdx');
// Archived versions used to be generated into the repo; they are now fetched on demand
// (src/lib/archived-api-versions.ts). Removed if a stale checkout still has them.
const LEGACY_VERSIONED_OUTPUT_DIR = path.join(process.cwd(), 'src/static/api-versions');
const LEGACY_VERSION_REGISTRY_PATH = path.join(process.cwd(), 'src/static/apiVersionData.generated.ts');

/**
 * Writes the endpoint data as a plain .js module with a .d.ts beside it, imported by
 * the apiEndpoints.generated.ts in the same directory. As typed TS object literals,
 * ~45MB of data per API version exhausted the 4GB heap in the `next build` type check,
 * since tsc contextually types every node of a literal.
 * With a .d.ts next to the .js, tsc resolves the import to the declarations and never
 * parses the data, while the bundler loads the same object literals as before.
 */
function writeEndpointDataModule(
    dir: string,
    tags: TagData[],
    nav: ApiNavDomain[],
    objects: ObjectData[],
): void {
    const header = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.
`;
    fs.writeFileSync(
        path.join(dir, `${ENDPOINT_DATA_MODULE}.js`),
        `${header}
export const apiTags = ${JSON.stringify(tags, null, 4)};

export const apiNavDomains = ${JSON.stringify(nav, null, 4)};

export const apiObjects = ${JSON.stringify(objects, null, 4)};
`,
    );
    fs.writeFileSync(
        path.join(dir, `${ENDPOINT_DATA_MODULE}.d.ts`),
        `${header}
import type { ApiNavDomain, ObjectData, TagData } from '@/static/apiEndpoints.generated';

export declare const apiTags: TagData[];

export declare const apiNavDomains: ApiNavDomain[];

export declare const apiObjects: ObjectData[];
`,
    );
}

function generateEndpointsFile(): string {
    return `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.

import { apiObjects, apiTags } from './${ENDPOINT_DATA_MODULE}';

export { apiNavDomains, apiObjects, apiTags } from './${ENDPOINT_DATA_MODULE}';

export interface SchemaField {
    name: string;
    type: string;
    description: string;
    required: boolean;
    nullable: boolean;
    alwaysNull?: boolean;
    expandable?: boolean;
    enum?: string[];
    format?: string;
    properties?: SchemaField[];
    itemType?: string;
    /** Discriminator of the API object this field holds, e.g. \`customer\`. */
    objectType?: string;
}

export interface Parameter {
    name: string;
    in: 'query' | 'path' | 'header';
    type: string;
    required: boolean;
    description: string;
    enum?: string[];
    format?: string;
}

export interface EndpointResponse {
    statusCode: string;
    description: string;
    fields?: SchemaField[];
    example?: unknown;
}

export interface EndpointRequestBody {
    description: string;
    fields: SchemaField[];
    example?: unknown;
}

export interface EndpointData {
    operationId: string;
    summary: string;
    description: string;
    method: string;
    path: string;
    domain: string;
    tag: string;
    tagSlug: string;
    endpointSlug: string;
    actionType: string;
    isPreview: boolean;
    parameters: Parameter[];
    requestBody?: EndpointRequestBody;
    responses: EndpointResponse[];
}

export interface ResourceData {
    name: string;
    description: string;
    fields: SchemaField[];
    example?: unknown;
    object?: string;
}

export interface ObjectUsage {
    tag: string;
    tagSlug: string;
    endpointSlug: string;
    method: string;
    actionType: string;
    summary: string;
}

export interface ObjectData {
    name: string;
    object: string;
    slug: string;
    domain: string;
    domainLabel: string;
    description: string;
    fields: SchemaField[];
    example?: unknown;
    usedBy: ObjectUsage[];
}

export interface TagData {
    name: string;
    slug: string;
    description: string;
    domain: string;
    domainLabel: string;
    resource?: ResourceData;
    endpoints: EndpointData[];
}

export interface ApiNavEndpoint {
    name: string;
    slug: string;
    method: string;
    actionType: string;
    href: string;
}

export interface ApiNavResource {
    name: string;
    slug: string;
    endpoints: ApiNavEndpoint[];
}

export interface ApiNavDomain {
    name: string;
    slug: string;
    resources: ApiNavResource[];
}

/** Look up a tag by its slug */
export function getTagBySlug(slug: string): TagData | undefined {
    return apiTags.find(t => t.slug === slug);
}

/** Look up an endpoint by tag slug and endpoint slug */
export function getEndpoint(tagSlug: string, endpointSlug: string): EndpointData | undefined {
    const tag = getTagBySlug(tagSlug);
    return tag?.endpoints.find(e => e.endpointSlug === endpointSlug);
}

/** Look up an endpoint's resource by tag slug */
export function getResource(tagSlug: string): ResourceData | undefined {
    return getTagBySlug(tagSlug)?.resource;
}

/** Look up an object by its slug */
export function getObject(slug: string): ObjectData | undefined {
    return apiObjects.find(o => o.slug === slug);
}

/** Get all object routes for static generation */
export function getAllObjectSlugs(): string[] {
    return apiObjects.map(o => o.slug);
}

/** Get all endpoint routes for static generation */
export function getAllEndpointSlugs(): { tagSlug: string; endpointSlug: string }[] {
    const slugs: { tagSlug: string; endpointSlug: string }[] = [];
    for (const tag of apiTags) {
        for (const endpoint of tag.endpoints) {
            slugs.push({ tagSlug: tag.slug, endpointSlug: endpoint.endpointSlug });
        }
    }
    return slugs;
}
`;
}

// ─── Version index and nav emitters ──────────────────────────────

function generateApiVersionsFile(latestVersion: string, archived: ArchivedVersion[]): string {
    const versions = [
        { version: latestVersion, codename: parseCodename(latestVersion), isLatest: true },
        ...archived.map(({ version, specTag }) => ({
            version,
            codename: parseCodename(version),
            isLatest: false,
            specTag,
        })),
    ];
    return `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.
//
// Client-safe index of every API version the reference is built for,
// latest first. Archived versions come from api-versions.json.

export interface ApiVersionInfo {
    version: string;
    codename: string;
    isLatest: boolean;
    /** Archived versions only: open-mrp/openapi-spec tag their spec is fetched from. */
    specTag?: string;
}

export const API_VERSIONS: ApiVersionInfo[] = ${JSON.stringify(versions, null, 4)};

export const LATEST_API_VERSION = ${JSON.stringify(latestVersion)};

export function isArchivedApiVersion(version: string): boolean {
    return API_VERSIONS.some((v) => v.version === version && !v.isLatest);
}

/**
 * Route prefix for a version's API reference. The latest version lives at the
 * canonical /api-reference; archived versions live under /api-reference/<version>.
 */
export function apiReferenceBasePath(version: string): string {
    return version === LATEST_API_VERSION ? '/api-reference' : \`/api-reference/\${version}\`;
}
`;
}

function generateApiNavFile(tags: TagData[], objects: ObjectData[]): string {
    return `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.
//
// Compact endpoint listing of the latest API version for the API reference sidenav
// and version selector. Deliberately small so it is safe to ship to the client.
// Archived versions serve the same shape from /api/api-reference-nav/<version>.

export interface ApiNavEntry {
    domain: string;
    /** Static URL segments of the endpoint path, used to build the nested sidenav tree. */
    segments: string[];
    tagSlug: string;
    endpointSlug: string;
    /** Short action label shown in the sidenav, e.g. "List", "Create". */
    label: string;
}

export interface ApiObjectNavEntry {
    domain: string;
    domainLabel: string;
    slug: string;
    label: string;
}

export const latestApiNavEntries: ApiNavEntry[] = ${JSON.stringify(buildCompactNavEntries(tags), null, 4)};

export const latestApiObjectNavEntries: ApiObjectNavEntry[] = ${JSON.stringify(buildCompactObjectNavEntries(objects), null, 4)};
`;
}

interface ArchivedVersion {
    version: string;
    specTag: string;
}

function readArchivedVersionsManifest(): ArchivedVersion[] {
    if (!fs.existsSync(VERSIONS_MANIFEST_PATH)) return [];
    let manifest: { archived?: string[]; specTags?: Record<string, string> };
    try {
        manifest = JSON.parse(fs.readFileSync(VERSIONS_MANIFEST_PATH, 'utf-8'));
    } catch (e) {
        console.warn(`Could not parse ${VERSIONS_MANIFEST_PATH}:`, e);
        return [];
    }
    const archived: ArchivedVersion[] = [];
    for (const version of manifest.archived ?? []) {
        const specTag = manifest.specTags?.[version];
        if (!specTag) {
            // Without a tag the server has nowhere to fetch the spec from.
            console.warn(`Skipping archived version ${version}: no specTags entry in api-versions.json`);
            continue;
        }
        archived.push({ version, specTag });
    }
    return archived;
}

function parseCodename(version: string): string {
    const parts = version.split('.');
    for (const part of parts) {
        if (isNaN(Number(part))) {
            return part.split('-')[0];
        }
    }
    return '';
}

function generateApiVersion(version: string): void {
    const codename = parseCodename(version);
    const content = `export const API_VERSION = {
    current: '${version}',
    currentCodename: '${codename}',
};
`;
    fs.writeFileSync(API_VERSION_PATH, content);
    console.log(`Written: ${API_VERSION_PATH}`);
}

// ─── Main ────────────────────────────────────────────────────────

async function main() {
    if (!fs.existsSync(SPEC_PATH)) {
        console.log('No OpenAPI spec found, skipping API reference generation');
        return;
    }

    console.log('Reading OpenAPI spec...');
    const specContent = normalizeLegacyHosts(fs.readFileSync(SPEC_PATH, 'utf-8'));
    const spec: OpenAPISpec = JSON.parse(specContent);

    console.log(
        `Found ${spec.tags?.length || 0} tags and ${Object.keys(spec.paths).length} paths`,
    );

    // Generate API version file
    const latestVersion = spec.info.version;
    generateApiVersion(latestVersion);

    // Generate structured endpoint data
    console.log('Generating structured endpoint data...');
    const { tags, nav, objects } = generateEndpointData(spec, '/api-reference');
    fs.writeFileSync(ENDPOINTS_OUTPUT_PATH, generateEndpointsFile());
    writeEndpointDataModule(path.dirname(ENDPOINTS_OUTPUT_PATH), tags, nav, objects);
    console.log(`Written: ${ENDPOINTS_OUTPUT_PATH}`);

    // Archived versions are only listed here, for the version picker and routing. Their
    // spec is fetched from open-mrp/openapi-spec when someone opens one (see
    // src/lib/archived-api-versions.ts), so nothing per-version is generated.
    const archivedVersions = readArchivedVersionsManifest().filter(
        (v) => v.version !== latestVersion,
    );
    fs.writeFileSync(API_VERSIONS_OUTPUT_PATH, generateApiVersionsFile(latestVersion, archivedVersions));
    console.log(`Written: ${API_VERSIONS_OUTPUT_PATH}`);
    fs.writeFileSync(API_NAV_OUTPUT_PATH, generateApiNavFile(tags, objects));
    console.log(`Written: ${API_NAV_OUTPUT_PATH}`);

    fs.rmSync(LEGACY_VERSIONED_OUTPUT_DIR, { recursive: true, force: true });
    fs.rmSync(LEGACY_VERSION_REGISTRY_PATH, { force: true });

    // Remove legacy generated developer-resources api-reference docs
    fs.rmSync(LEGACY_API_REFERENCE_DIR, { recursive: true, force: true });
    fs.rmSync(LEGACY_API_REFERENCE_OVERVIEW, { force: true });

    // Log stats
    let totalEndpoints = 0;
    for (const tag of tags) {
        totalEndpoints += tag.endpoints.length;
    }
    console.log(`Generated data for ${tags.length} tags, ${totalEndpoints} endpoints`);
    console.log(`Navigation: ${nav.length} domains`);
    for (const domain of nav) {
        console.log(
            `  ${domain.name}: ${domain.resources.length} resources, ${domain.resources.reduce((sum, r) => sum + r.endpoints.length, 0)} endpoints`,
        );
    }
}

main().catch(console.error);

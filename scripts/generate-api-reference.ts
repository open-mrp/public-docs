import fs from 'fs';
import path from 'path';

const SPEC_PATH = path.join(process.cwd(), 'specs/public_openapi_spec.json');
const OUTPUT_PATH = path.join(process.cwd(), 'src/docs/developer-resources/api-reference.mdx');
const API_VERSION_PATH = path.join(process.cwd(), 'src/static/apiVersion.generated.ts');

interface OpenAPITag {
    name: string;
    description?: string;
}

interface OpenAPIPathItem {
    summary?: string;
    description?: string;
    operationId?: string;
    tags?: string[];
    'x-preview'?: boolean;
}

interface OpenAPISpec {
    info: {
        title: string;
        description?: string;
        version: string;
    };
    tags?: OpenAPITag[];
    paths: Record<string, Record<string, OpenAPIPathItem>>;
}

interface EndpointInfo {
    path: string;
    method: string;
    summary?: string;
    description?: string;
    operationId?: string;
    tag: string;
    docPath?: string;
    isPreview: boolean;
}

function tagToSlug(tag: string): string {
    return tag.toLowerCase().replace(/\s+/g, '-');
}

function summaryToAnchor(summary: string): string {
    return summary.toLowerCase().replace(/\s+/g, '-');
}

function pathSortWeight(p: string): number {
    const segments = p.split('/');
    let hasParam = false;
    let segmentsAfterParam = 0;
    for (const s of segments) {
        if (s.startsWith('{')) {
            hasParam = true;
            continue;
        }
        if (hasParam) {
            segmentsAfterParam++;
        }
    }
    if (!hasParam) return 0; // collection (LIST)
    if (segmentsAfterParam === 0) return 1; // detail (GET by ID)
    return 2; // action paths
}

function methodToOrder(method: string): number {
    const order: Record<string, number> = {
        get: 1,
        post: 2,
        put: 3,
        patch: 4,
        delete: 5,
    };
    return order[method.toLowerCase()] || 99;
}

function checkTagDocExists(tagSlug: string): boolean {
    const mdxPath = path.join(
        process.cwd(),
        'src/docs/developer-resources/api-reference',
        tagSlug + '.mdx',
    );
    return fs.existsSync(mdxPath);
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

function generateApiReference(spec: OpenAPISpec): string {
    const { info, tags = [], paths } = spec;

    // Group endpoints by tag
    const endpointsByTag = new Map<string, EndpointInfo[]>();

    // Initialize with all tags (even if they have no endpoints)
    for (const tag of tags) {
        endpointsByTag.set(tag.name, []);
    }

    // Group endpoints by their tags
    for (const [apiPath, methods] of Object.entries(paths)) {
        for (const [method, operation] of Object.entries(methods)) {
            if (method === 'parameters') continue; // Skip path-level parameters

            const opTags = operation.tags || ['Other'];

            for (const tag of opTags) {
                if (!endpointsByTag.has(tag)) {
                    endpointsByTag.set(tag, []);
                }

                const tagSlug = tagToSlug(tag);
                const anchor = operation.summary ? '#' + summaryToAnchor(operation.summary) : '';
                const docPath = `/api-reference/${tagSlug}${anchor}`;

                endpointsByTag.get(tag)!.push({
                    path: apiPath,
                    method: method.toUpperCase(),
                    summary: operation.summary,
                    description: operation.description,
                    operationId: operation.operationId,
                    tag,
                    docPath: checkTagDocExists(tagSlug) ? docPath : undefined,
                    isPreview: operation['x-preview'] === true,
                });
            }
        }
    }

    // Sort endpoints within each tag: collection paths first, then detail, then actions
    for (const endpoints of endpointsByTag.values()) {
        endpoints.sort((a, b) => {
            const weightDiff = pathSortWeight(a.path) - pathSortWeight(b.path);
            if (weightDiff !== 0) return weightDiff;
            const methodDiff = methodToOrder(a.method) - methodToOrder(b.method);
            if (methodDiff !== 0) return methodDiff;
            return a.path.localeCompare(b.path);
        });
    }

    // Clean description - remove "Please see ... for more details" suffix
    const cleanDescription = (info.description || `The ${info.title} REST API.`)
        .replace(/\.\s*Please see.*for more details\.?/i, '.')
        .trim();

    // Generate MDX content
    let mdx = `---
title: 'API Reference'
subtitle: 'Complete API documentation for all endpoints'
route: '/api-reference'
nav:
    title: 'Overview'
    section: 'API'
    subsection: 'API Reference'
    order: 1
---

{/* THIS FILE IS AUTO-GENERATED FROM specs/public_openapi_spec.json */}
{/* Run 'bun run build:docs' to regenerate. */}

The Augno API is organized around REST. It accepts JSON request bodies, returns JSON responses, and uses standard HTTP methods and status codes. All requests require an \`Augno-Version\` header and are [authenticated](/api/api-keys) with bearer tokens via your API key.

Each account has a sandbox API key, and you can create a production API key. Use your sandbox key to test API requests without affecting live data - the key you authenticate with determines which environment your request runs against.

For details on error responses and status codes, see [API Errors](/api/errors).

**API Version:** \`${info.version}\`

## Available Endpoints

`;

    // Generate sections for each tag
    for (const tag of tags) {
        const endpoints = endpointsByTag.get(tag.name) || [];

        mdx += `### ${tag.name}\n\n`;

        if (tag.description) {
            mdx += `${tag.description}\n\n`;
        }

        if (endpoints.length === 0) {
            mdx += `_No endpoints documented yet._\n\n`;
        } else {
            for (const endpoint of endpoints) {
                const displayName = endpoint.summary || `${endpoint.method} ${endpoint.path}`;
                const betaSuffix = endpoint.isPreview ? ' <BetaTag />' : '';

                if (endpoint.docPath) {
                    mdx += `- [${displayName}](${endpoint.docPath})${betaSuffix}\n`;
                } else {
                    mdx += `- \`${endpoint.method}\` ${endpoint.path}${endpoint.summary ? ` - ${endpoint.summary}` : ''}${betaSuffix}\n`;
                }
            }
            mdx += '\n';
        }
    }

    // Add any untagged endpoints
    const otherEndpoints = endpointsByTag.get('Other') || [];
    if (otherEndpoints.length > 0 && !tags.some((t) => t.name === 'Other')) {
        mdx += `### Other\n\n`;
        for (const endpoint of otherEndpoints) {
            const displayName = endpoint.summary || `${endpoint.method} ${endpoint.path}`;
            const betaSuffix = endpoint.isPreview ? ' <BetaTag />' : '';
            if (endpoint.docPath) {
                mdx += `- [${displayName}](${endpoint.docPath})${betaSuffix}\n`;
            } else {
                mdx += `- \`${endpoint.method}\` ${endpoint.path}${endpoint.summary ? ` - ${endpoint.summary}` : ''}${betaSuffix}\n`;
            }
        }
        mdx += '\n';
    }

    return mdx;
}

async function main() {
    if (!fs.existsSync(SPEC_PATH)) {
        console.log('No OpenAPI spec found, skipping API reference generation');
        return;
    }

    console.log('Reading OpenAPI spec...');
    const specContent = fs.readFileSync(SPEC_PATH, 'utf-8');
    const spec: OpenAPISpec = JSON.parse(specContent);

    console.log(`Found ${spec.tags?.length || 0} tags and ${Object.keys(spec.paths).length} paths`);

    // Generate API version file
    generateApiVersion(spec.info.version);

    console.log('Generating API reference page...');
    const mdxContent = generateApiReference(spec);

    fs.writeFileSync(OUTPUT_PATH, mdxContent);
    console.log(`Written: ${OUTPUT_PATH}`);
}

main().catch(console.error);

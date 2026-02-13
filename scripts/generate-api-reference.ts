import fs from 'fs';
import path from 'path';

const SPEC_PATH = path.join(process.cwd(), 'specs/api_public_spec.json');
const OUTPUT_PATH = path.join(process.cwd(), 'src/docs/api-reference.mdx');

interface OpenAPITag {
    name: string;
    description?: string;
}

interface OpenAPIPathItem {
    summary?: string;
    description?: string;
    operationId?: string;
    tags?: string[];
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
    docPath?: string; // Path to the MDX doc if it exists
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

function pathToDocPath(apiPath: string, method: string): string {
    // Convert /v2/auth/login to api/authentication/login
    // This is a simplified mapping - adjust based on your conventions
    const cleanPath = apiPath
        .replace(/^\/v\d+\//, '/') // Remove version prefix
        .replace(/^\//, '') // Remove leading slash
        .replace(/\//g, '/'); // Keep slashes

    return `/api-reference/${cleanPath}`;
}

function pathToPathKey(docPath: string): string {
    // Convert /api/authentication/v2 to api.authentication.v2
    return docPath
        .replace(/^\//, '') // Remove leading slash
        .replace(/\//g, '.') // Replace slashes with dots
        .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()); // kebab to camel
}

function checkDocExists(docPath: string): boolean {
    const mdxPath = path.join(process.cwd(), 'src/docs', docPath.replace(/^\//, '') + '.mdx');
    return fs.existsSync(mdxPath);
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
            const docPath = pathToDocPath(apiPath, method);

            for (const tag of opTags) {
                if (!endpointsByTag.has(tag)) {
                    endpointsByTag.set(tag, []);
                }
                endpointsByTag.get(tag)!.push({
                    path: apiPath,
                    method: method.toUpperCase(),
                    summary: operation.summary,
                    description: operation.description,
                    operationId: operation.operationId,
                    docPath: checkDocExists(docPath) ? docPath : undefined,
                });
            }
        }
    }

    // Sort endpoints within each tag by method then path
    for (const endpoints of endpointsByTag.values()) {
        endpoints.sort((a, b) => {
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
description: '${cleanDescription}'
breadcrumbs:
    - label: 'Documentation'
      pathKey: 'docs'
    - label: 'API Reference'
header:
    title: 'API Reference'
    subtitle: 'Complete API documentation for all endpoints'
nav:
    title: 'API Reference'
    section: 'API'
    sectionOrder: 100
    order: 1
---

{/* THIS FILE IS AUTO-GENERATED FROM specs/api_public_spec.json */}
{/* Run 'bun run build:docs' to regenerate. */}

# API Reference

${cleanDescription}

**API Version:** ${info.version}

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

                if (endpoint.docPath) {
                    const pathKey = pathToPathKey(endpoint.docPath);
                    mdx += `- <DocLink pathKey="${pathKey}">${displayName}</DocLink>\n`;
                } else {
                    mdx += `- \`${endpoint.method}\` ${endpoint.path}${endpoint.summary ? ` - ${endpoint.summary}` : ''}\n`;
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
            if (endpoint.docPath) {
                const pathKey = pathToPathKey(endpoint.docPath);
                mdx += `- <DocLink pathKey="${pathKey}">${displayName}</DocLink>\n`;
            } else {
                mdx += `- \`${endpoint.method}\` ${endpoint.path}${endpoint.summary ? ` - ${endpoint.summary}` : ''}\n`;
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

    console.log('Generating API reference page...');
    const mdxContent = generateApiReference(spec);

    fs.writeFileSync(OUTPUT_PATH, mdxContent);
    console.log(`Written: ${OUTPUT_PATH}`);
}

main().catch(console.error);

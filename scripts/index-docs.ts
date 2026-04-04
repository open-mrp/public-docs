import { algoliasearch } from 'algoliasearch';
import dotenv from 'dotenv';
import fs from 'fs';
import { glob } from 'glob';
import matter from 'gray-matter';
import path from 'path';
import { routeToFile, routeToTab } from '../src/static/routeMap.generated';
import { segmentLabels, tabLabels } from '../src/static/breadcrumbConfig';
import { apiTags, type EndpointData, type SchemaField } from '../src/static/apiEndpoints.generated';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '';
const ADMIN_KEY = process.env.ALGOLIA_SEARCH_ADMIN_KEY || '';
const INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || '';

if (!APP_ID || !ADMIN_KEY || !INDEX_NAME) {
    console.error('Missing Algolia configuration. Please check your .env.local file.');
    console.error(
        'Required: NEXT_PUBLIC_ALGOLIA_APP_ID, ALGOLIA_SEARCH_ADMIN_KEY, NEXT_PUBLIC_ALGOLIA_INDEX_NAME',
    );
    process.exit(1);
}

const client = algoliasearch(APP_ID, ADMIN_KEY);

const DOCS_DIR = path.join(process.cwd(), 'src/docs');

// Build reverse lookup: file path (relative to src/docs/) → route
const fileToRoute: Record<string, string> = {};
for (const [route, file] of Object.entries(routeToFile)) {
    fileToRoute[file] = route;
}

// Build lookup from tagSlug/endpointSlug → EndpointData
const endpointLookup: Record<string, EndpointData> = {};
for (const tag of apiTags) {
    for (const endpoint of tag.endpoints) {
        endpointLookup[`${endpoint.tagSlug}/${endpoint.endpointSlug}`] = endpoint;
    }
}

/**
 * Builds searchable plain text from API endpoint data
 */
function endpointToPlainText(endpoint: EndpointData): string {
    const parts: string[] = [];

    parts.push(`${endpoint.method} ${endpoint.path}`);
    if (endpoint.description) parts.push(endpoint.description);

    // Parameter descriptions
    for (const param of endpoint.parameters) {
        if (param.description) {
            parts.push(`${param.name}: ${param.description}`);
        }
    }

    // Request body field descriptions
    if (endpoint.requestBody) {
        collectFieldDescriptions(endpoint.requestBody.fields, parts);
    }

    // Response field descriptions
    for (const response of endpoint.responses) {
        if (response.fields) {
            collectFieldDescriptions(response.fields, parts);
        }
    }

    return parts.join(' ');
}

function collectFieldDescriptions(fields: SchemaField[], parts: string[]) {
    for (const field of fields) {
        if (field.description) {
            parts.push(`${field.name}: ${field.description}`);
        }
        if (field.properties) {
            collectFieldDescriptions(field.properties, parts);
        }
    }
}

// Content kind types for filtering/display
type ContentKind = 'page' | 'section' | 'api-endpoint' | 'guide';

/**
 * Determines the kind of content based on the file path
 */
function getContentKind(slug: string): ContentKind {
    if (slug.startsWith('api-reference/')) return 'api-endpoint';
    if (slug.startsWith('get-started/')) return 'guide';
    return 'page';
}

/**
 * Converts MDX content to plain text by removing all markup
 */
function mdxToPlainText(mdxContent: string): string {
    let text = mdxContent;

    // Remove import/export statements
    text = text.replace(/^import\s+.*$/gm, '');
    text = text.replace(/^export\s+.*$/gm, '');

    // Remove JSX/MDX components
    text = text.replace(/<[A-Z][A-Za-z0-9]*(?:\s+[\s\S]*?)?\/>/g, '');
    text = text.replace(/<[A-Z][A-Za-z0-9]*(?:\s+[\s\S]*?)?>/g, '');
    text = text.replace(/<\/[A-Z][A-Za-z0-9]*>/g, '');
    text = text.replace(/<\/?[a-z][a-z0-9]*(?:\s+[\s\S]*?)?>/gi, '');

    // Remove JSX expressions
    text = text.replace(/\{[^}]+\}/g, '');

    // Remove code blocks and inline code
    text = text.replace(/```[\s\S]*?```/g, '');
    text = text.replace(/`([^`\n]+)`/g, '$1');

    // Remove images and convert links to text
    text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, '');
    text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');

    // Remove tables
    text = text.replace(/^\|[\s-:]+\|[\s-:|]*$/gm, '');
    text = text.replace(/^\|(.+)\|$/gm, (_, content) =>
        content
            .split('|')
            .map((cell: string) => cell.trim())
            .filter((cell: string) => cell.length > 0)
            .join(' '),
    );

    // Remove markdown formatting
    text = text.replace(/^(?:>\s*)*#{1,6}\s+/gm, '');
    text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
    text = text.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '$1');
    text = text.replace(/__([^_]+)__/g, '$1');
    text = text.replace(/(?<!_)_([^_\n]+)_(?!_)/g, '$1');
    text = text.replace(/^(?:>\s*)+/gm, '');
    text = text.replace(/^[-*_]{3,}$/gm, '');
    text = text.replace(/^(\s*)[-*+]\s+/gm, '$1');
    text = text.replace(/^(\s*)\d+\.\s+/gm, '$1');
    text = text.replace(/<!--[\s\S]*?-->/g, '');

    // Clean up whitespace
    text = text
        .replace(/\n{3,}/g, '\n\n')
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join(' ')
        .replace(/\s{2,}/g, ' ')
        .trim();

    return text;
}

/**
 * Extracts sections from MDX content
 */
function extractSections(content: string): Array<{ heading: string | null; content: string }> {
    const sections = content.split(/\n(?=#{2,3}\s)/);

    return sections
        .map((section) => {
            const headingMatch = section.match(/^#{2,3}\s+(.*)/);
            let heading: string | null = null;
            let sectionContent = section;

            if (headingMatch) {
                heading = headingMatch[1].trim();
                sectionContent = section.replace(/^#{2,3}\s+.*\n/, '');
            }

            const plainText = mdxToPlainText(sectionContent);
            return { heading, content: plainText };
        })
        .filter((section) => section.content.length > 0);
}

/**
 * Derives crumbs from the route path and segment labels
 */
function extractCrumbs(route: string, currentName: string): string[] {
    const segments = route.replace(/^\//, '').split('/');
    const crumbs: string[] = [];

    // Add tab label
    const tabId = routeToTab[route];
    if (tabId && tabLabels[tabId]) {
        crumbs.push(tabLabels[tabId].label);
    }

    // Add ancestor labels for special route prefixes (e.g., api-reference → API)
    if (route.startsWith('/api-reference')) {
        crumbs.push('API');
    }

    // Add intermediate segment labels (skip last segment — it's the current page)
    for (let i = 0; i < segments.length - 1; i++) {
        const label = segmentLabels[segments[i]];
        if (label) {
            crumbs.push(label);
        }
    }

    // For overview pages, use the parent segment label as the final crumb
    const isOverview = segments[segments.length - 1] === 'overview';
    if (isOverview && segments.length >= 2) {
        const parentLabel = segmentLabels[segments[segments.length - 2]];
        if (parentLabel && crumbs[crumbs.length - 1] !== parentLabel) {
            crumbs.push(parentLabel);
        }
    } else {
        // Add the current item name if it's different from the last crumb
        if (crumbs.length === 0 || crumbs[crumbs.length - 1] !== currentName) {
            crumbs.push(currentName);
        }
    }

    return crumbs;
}

interface IndexedDoc {
    objectID: string;
    [key: string]: unknown;
}

async function indexDocs() {
    console.log('Searching for MDX files in:', DOCS_DIR);
    const files = await glob('**/*.mdx', { cwd: DOCS_DIR });
    const objects: IndexedDoc[] = [];

    for (const file of files) {
        const fullPath = path.join(DOCS_DIR, file);
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const { data: frontmatter, content } = matter(fileContent);

        const route = fileToRoute[file];
        if (!route) {
            console.warn(`No route found for file: ${file}, skipping.`);
            continue;
        }
        const slug = route.replace(/^\//, '');
        const url = route;
        const baseKind = getContentKind(slug);

        // For API reference endpoint pages, index from generated endpoint data
        if (baseKind === 'api-endpoint' && file !== 'api-reference/index.mdx') {
            // Extract tagSlug/endpointSlug from file path: api-reference/{tagSlug}/{endpointSlug}.mdx
            const parts = file.replace('api-reference/', '').replace('.mdx', '').split('/');
            if (parts.length === 2) {
                const endpointKey = `${parts[0]}/${parts[1]}`;
                const endpoint = endpointLookup[endpointKey];
                if (endpoint) {
                    const endpointContent = endpointToPlainText(endpoint);
                    const crumbs = extractCrumbs(url, endpoint.summary);

                    objects.push({
                        objectID: slug,
                        kind: 'api-endpoint' as ContentKind,
                        name: endpoint.summary,
                        crumbs,
                        url,
                        description: endpoint.description || `${endpoint.method} ${endpoint.path}`,
                        content: endpointContent.substring(0, 5000),
                        priority: 10,
                        pageTitle: frontmatter.title,
                        slug,
                        method: endpoint.method,
                        path: endpoint.path,
                    });
                    continue;
                }
            }
        }

        // Extract sections from the content
        const sections = extractSections(content);

        for (let i = 0; i < sections.length; i++) {
            const { heading, content: sectionContent } = sections[i];
            const isMainSection = i === 0 && !heading;

            // Determine the name and kind
            const name = heading || frontmatter.title;
            const kind: ContentKind | 'section' = isMainSection ? baseKind : 'section';

            // Build the URL
            let sectionUrl = url;
            if (heading) {
                sectionUrl = `${url}#${heading.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            }

            // Build crumbs - simple array of strings
            const crumbs = extractCrumbs(url, name);

            // Priority: pages get higher priority than sections
            const priority = isMainSection ? 10 : 5;

            // Create a short description (first 150 chars of content)
            const description =
                sectionContent.length > 150
                    ? sectionContent.substring(0, 150) + '...'
                    : sectionContent;

            objects.push({
                objectID: `${slug}-${i}`,
                kind,
                name,
                crumbs,
                url: sectionUrl,
                description,
                content: sectionContent.substring(0, 5000), // Full content for search (capped at 5KB)
                priority,
                // Additional metadata
                pageTitle: frontmatter.title,
                slug,
            });
        }
    }

    console.log(`Found ${files.length} files. Generated ${objects.length} records.`);

    try {
        // Clear existing index contents before adding new records
        console.log(`Clearing existing records from index: ${INDEX_NAME}...`);
        await client.clearObjects({ indexName: INDEX_NAME });

        console.log(`Sending records to Algolia index: ${INDEX_NAME}...`);
        const BATCH_SIZE = 100;
        for (let i = 0; i < objects.length; i += BATCH_SIZE) {
            const batch = objects.slice(i, i + BATCH_SIZE);
            await client.saveObjects({
                indexName: INDEX_NAME,
                objects: batch,
            });
            console.log(`  Indexed ${Math.min(i + BATCH_SIZE, objects.length)}/${objects.length} records`);
        }

        // Configure index settings optimized for this structure
        await client.setSettings({
            indexName: INDEX_NAME,
            indexSettings: {
                searchableAttributes: ['name', 'pageTitle', 'description', 'content', 'crumbs'],
                attributesToHighlight: ['name', 'pageTitle', 'description', 'content'],
                attributesToSnippet: ['description:30', 'content:50'],
                attributeForDistinct: 'slug',
                distinct: 1,
                customRanking: ['desc(priority)'],
                attributesForFaceting: ['kind'],
            },
        });

        console.log('Successfully indexed documentation!');
    } catch (error) {
        console.error('Error indexing documentation:', error);
        process.exit(1);
    }
}

indexDocs().catch(console.error);

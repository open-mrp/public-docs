import fs from 'fs';
import { glob } from 'glob';
import matter from 'gray-matter';
import path from 'path';

const DOCS_DIR = path.join(process.cwd(), 'src/docs');
const GENERATED_FILE = path.join(process.cwd(), 'src/static/apiEndpoints.generated.ts');
const OUTPUT_FILE = path.join(process.cwd(), 'public/llms.txt');
const BASE_URL = process.env.DOCS_BASE_URL || 'https://docs.augno.com';

interface PageFrontmatter {
    title: string;
    subtitle?: string;
    nav?: {
        title?: string;
        order?: number;
        sectionOrder?: number;
        section?: string;
        subsection?: string;
        hidden?: boolean;
    };
}

interface ParsedPage {
    href: string;
    title: string;
    subtitle?: string;
    section?: string;
    subsection?: string;
    order: number;
    sectionOrder: number;
}

async function parseAllMdxFiles(): Promise<ParsedPage[]> {
    const files = (await glob('**/*.mdx', { cwd: DOCS_DIR })).sort();
    const pages: ParsedPage[] = [];

    for (const file of files) {
        const fullPath = path.join(DOCS_DIR, file);
        const content = fs.readFileSync(fullPath, 'utf-8');
        const { data } = matter(content);

        const frontmatter = data as PageFrontmatter;
        const nav = frontmatter.nav || {};

        // Skip hidden pages
        if (nav.hidden) {
            continue;
        }

        const href = '/' + file.replace(/\.mdx$/, '');

        pages.push({
            href,
            title: nav.title || frontmatter.title,
            subtitle: frontmatter.subtitle,
            section: nav.section,
            subsection: nav.subsection,
            order: nav.order ?? 999,
            sectionOrder: nav.sectionOrder ?? 999,
        });
    }

    return pages;
}

function groupBySection(pages: ParsedPage[]): Map<string, ParsedPage[]> {
    const sectionMap = new Map<string, ParsedPage[]>();
    const sectionOrder = new Map<string, number>();

    for (const page of pages) {
        const section = page.section || 'Documentation';

        if (!sectionMap.has(section)) {
            sectionMap.set(section, []);
        }
        sectionMap.get(section)!.push(page);

        // Track section order
        if (page.sectionOrder < (sectionOrder.get(section) ?? Infinity)) {
            sectionOrder.set(section, page.sectionOrder);
        }
    }

    // Sort pages within each section
    for (const [, sectionPages] of sectionMap) {
        sectionPages.sort((a, b) => a.order - b.order);
    }

    // Return sorted by section order
    const sortedMap = new Map<string, ParsedPage[]>();
    const sortedSections = Array.from(sectionMap.keys()).sort(
        (a, b) => (sectionOrder.get(a) ?? 999) - (sectionOrder.get(b) ?? 999),
    );

    for (const section of sortedSections) {
        sortedMap.set(section, sectionMap.get(section)!);
    }

    return sortedMap;
}

interface ApiNavEndpoint {
    name: string;
    slug: string;
    method: string;
    href: string;
}

interface ApiNavResource {
    name: string;
    slug: string;
    endpoints: ApiNavEndpoint[];
}

interface ApiNavDomain {
    name: string;
    slug: string;
    resources: ApiNavResource[];
}

async function loadApiNavDomains(): Promise<ApiNavDomain[]> {
    const mod = await import(GENERATED_FILE);
    return mod.apiNavDomains ?? [];
}

interface ApiObjectLite {
    name: string;
    object: string;
    slug: string;
    domain: string;
    domainLabel: string;
    description: string;
}

async function loadApiObjects(): Promise<ApiObjectLite[]> {
    const mod = await import(GENERATED_FILE);
    return mod.apiObjects ?? [];
}

function firstSentence(text: string): string {
    const trimmed = (text || '').trim();
    if (!trimmed) return '';
    return trimmed.split(/(?<=[.!?])\s/)[0];
}

function groupObjectsByDomain(objects: ApiObjectLite[]): [string, ApiObjectLite[]][] {
    const byDomain = new Map<string, ApiObjectLite[]>();
    const labels = new Map<string, string>();
    for (const obj of objects) {
        if (!byDomain.has(obj.domain)) byDomain.set(obj.domain, []);
        byDomain.get(obj.domain)!.push(obj);
        labels.set(obj.domain, obj.domainLabel);
    }
    const domainOrder = ['ai', 'auth', 'core'];
    return [...byDomain.entries()]
        .sort((a, b) => {
            const ai = domainOrder.indexOf(a[0]);
            const bi = domainOrder.indexOf(b[0]);
            if (ai !== -1 || bi !== -1) return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
            return (labels.get(a[0]) ?? a[0]).localeCompare(labels.get(b[0]) ?? b[0]);
        })
        .map(([domain, objs]) => [
            labels.get(domain) ?? domain,
            objs.sort((a, b) => a.name.localeCompare(b.name)),
        ]);
}

function generateLlmsTxt(
    pages: ParsedPage[],
    apiDomains: ApiNavDomain[],
    apiObjects: ApiObjectLite[],
): string {
    const lines: string[] = ['# OpenMRP Documentation', ''];

    const sectionMap = groupBySection(pages);

    for (const [section, sectionPages] of sectionMap) {
        lines.push(`## ${section}`);

        for (const page of sectionPages) {
            const url = `${BASE_URL}${page.href}.md`;
            if (page.subtitle) {
                lines.push(`- [${page.title}](${url}): ${page.subtitle}`);
            } else {
                lines.push(`- [${page.title}](${url})`);
            }
        }

        lines.push('');
    }

    if (apiDomains.length > 0) {
        lines.push('## API Reference', '');
        for (const domain of apiDomains) {
            lines.push(`### ${domain.name}`);
            for (const resource of domain.resources) {
                for (const ep of resource.endpoints) {
                    const url = `${BASE_URL}${ep.href}.md`;
                    lines.push(
                        `- [${ep.method.toUpperCase()} ${resource.name} — ${ep.name}](${url})`,
                    );
                }
            }
            lines.push('');
        }
    }

    if (apiObjects.length > 0) {
        lines.push('## API Objects', '');
        for (const [domainLabel, objects] of groupObjectsByDomain(apiObjects)) {
            lines.push(`### ${domainLabel}`);
            for (const obj of objects) {
                const url = `${BASE_URL}/api-reference/objects/${obj.slug}.md`;
                const subtitle = firstSentence(obj.description);
                if (subtitle) {
                    lines.push(`- [${obj.name} object](${url}): ${subtitle}`);
                } else {
                    lines.push(`- [${obj.name} object](${url})`);
                }
            }
            lines.push('');
        }
    }

    return lines.join('\n').trim() + '\n';
}

async function main() {
    console.log('Parsing MDX files for llms.txt...');
    const pages = await parseAllMdxFiles();
    console.log(`Found ${pages.length} pages`);

    console.log('Loading API reference endpoints...');
    const apiDomains = await loadApiNavDomains();
    const endpointCount = apiDomains.reduce(
        (sum, d) => sum + d.resources.reduce((s, r) => s + r.endpoints.length, 0),
        0,
    );
    console.log(`Found ${endpointCount} API endpoints`);

    console.log('Loading API reference objects...');
    const apiObjects = await loadApiObjects();
    console.log(`Found ${apiObjects.length} API objects`);

    console.log('Generating llms.txt...');
    const content = generateLlmsTxt(pages, apiDomains, apiObjects);

    // Ensure public directory exists
    const publicDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, content);
    console.log(`Written: ${OUTPUT_FILE}`);
}

main().catch(console.error);

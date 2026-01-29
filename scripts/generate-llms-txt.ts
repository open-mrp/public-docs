import fs from 'fs';
import { glob } from 'glob';
import matter from 'gray-matter';
import path from 'path';

const DOCS_DIR = path.join(process.cwd(), 'src/docs');
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
    const files = await glob('**/*.mdx', { cwd: DOCS_DIR });
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
    for (const [section, sectionPages] of sectionMap) {
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

function generateLlmsTxt(pages: ParsedPage[]): string {
    const lines: string[] = ['# Augno Documentation', ''];

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

    return lines.join('\n').trim() + '\n';
}

async function main() {
    console.log('Parsing MDX files for llms.txt...');
    const pages = await parseAllMdxFiles();
    console.log(`Found ${pages.length} pages`);

    console.log('Generating llms.txt...');
    const content = generateLlmsTxt(pages);

    // Ensure public directory exists
    const publicDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, content);
    console.log(`Written: ${OUTPUT_FILE}`);
}

main().catch(console.error);

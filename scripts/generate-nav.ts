import fs from 'fs';
import { glob } from 'glob';
import matter from 'gray-matter';
import path from 'path';

const DOCS_DIR = path.join(process.cwd(), 'src/docs');
const NAV_DATA_OUTPUT = path.join(process.cwd(), 'src/static/navData.generated.ts');
const PATHS_OUTPUT = path.join(process.cwd(), 'src/static/docPaths.generated.ts');
const PREVIEW_OUTPUT = path.join(process.cwd(), 'src/static/pagePreview.generated.ts');

// Types matching @augno/ui navigation types
interface NavLink {
    href: string;
    children: string;
}

interface NavSubSectionData {
    title: string;
    items: (NavLink | NavSubSectionData)[];
}

interface NavSection {
    title: string;
    links: (NavLink | NavSubSectionData)[];
}

// Frontmatter nav fields
interface NavFrontmatter {
    title?: string;
    order?: number;
    sectionOrder?: number; // Order of the section itself (used by first page in section)
    section?: string;
    subsection?: string;
    hidden?: boolean;
}

interface PageFrontmatter {
    title: string;
    description?: string;
    header?: {
        title: string;
        subtitle: string;
    };
    nav?: NavFrontmatter;
}

interface ParsedPage {
    filePath: string;
    slug: string;
    href: string;
    frontmatter: PageFrontmatter;
    nav: NavFrontmatter;
}

function filePathToSlug(filePath: string): string {
    // Remove the .mdx extension and convert to URL path
    return filePath.replace(/\.mdx$/, '');
}

function filePathToHref(filePath: string): string {
    return '/' + filePathToSlug(filePath);
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

        pages.push({
            filePath: file,
            slug: filePathToSlug(file),
            href: filePathToHref(file),
            frontmatter,
            nav: {
                title: nav.title || frontmatter.title,
                order: nav.order ?? 999,
                sectionOrder: nav.sectionOrder,
                section: nav.section,
                subsection: nav.subsection,
                hidden: nav.hidden,
            },
        });
    }

    return pages;
}

function buildNavStructure(pages: ParsedPage[]): NavSection[] {
    // Group pages by section
    const sectionMap = new Map<string, ParsedPage[]>();
    const sectionOrder = new Map<string, number>();

    for (const page of pages) {
        const section = page.nav.section || 'Documentation';

        if (!sectionMap.has(section)) {
            sectionMap.set(section, []);
        }
        sectionMap.get(section)!.push(page);

        // Track section order using sectionOrder field (if provided)
        // Only pages with explicit sectionOrder set the section's order
        if (page.nav.sectionOrder !== undefined) {
            const currentOrder = sectionOrder.get(section) ?? Infinity;
            if (page.nav.sectionOrder < currentOrder) {
                sectionOrder.set(section, page.nav.sectionOrder);
            }
        }
    }

    // For sections without explicit sectionOrder, use a high default
    for (const section of sectionMap.keys()) {
        if (!sectionOrder.has(section)) {
            sectionOrder.set(section, 999);
        }
    }

    // Sort sections by their order
    const sortedSections = Array.from(sectionMap.keys()).sort((a, b) => {
        return (sectionOrder.get(a) ?? 999) - (sectionOrder.get(b) ?? 999);
    });

    const navSections: NavSection[] = [];

    for (const sectionTitle of sortedSections) {
        const sectionPages = sectionMap.get(sectionTitle)!;
        const links = buildSectionLinks(sectionPages);

        navSections.push({
            title: sectionTitle,
            links,
        });
    }

    return navSections;
}

function buildSectionLinks(pages: ParsedPage[]): (NavLink | NavSubSectionData)[] {
    // Group by subsection
    const subsectionMap = new Map<string | undefined, ParsedPage[]>();
    const subsectionOrder = new Map<string | undefined, number>();

    for (const page of pages) {
        const subsection = page.nav.subsection;

        if (!subsectionMap.has(subsection)) {
            subsectionMap.set(subsection, []);
        }
        subsectionMap.get(subsection)!.push(page);

        // Track subsection order
        const currentOrder = subsectionOrder.get(subsection) ?? Infinity;
        if ((page.nav.order ?? 999) < currentOrder) {
            subsectionOrder.set(subsection, page.nav.order ?? 999);
        }
    }

    // Sort subsections (undefined/no subsection comes first)
    const sortedSubsections = Array.from(subsectionMap.keys()).sort((a, b) => {
        if (a === undefined) return -1;
        if (b === undefined) return 1;
        return (subsectionOrder.get(a) ?? 999) - (subsectionOrder.get(b) ?? 999);
    });

    const links: (NavLink | NavSubSectionData)[] = [];

    for (const subsection of sortedSubsections) {
        const subsectionPages = subsectionMap.get(subsection)!;

        // Sort pages within subsection by order
        subsectionPages.sort((a, b) => (a.nav.order ?? 999) - (b.nav.order ?? 999));

        if (subsection === undefined) {
            // No subsection - add pages directly as NavLinks
            for (const page of subsectionPages) {
                links.push({
                    href: page.href,
                    children: page.nav.title || page.frontmatter.title,
                });
            }
        } else {
            // Has subsection - group into NavSubSectionData
            const items = buildSubsectionItems(subsectionPages);
            links.push({
                title: subsection,
                items,
            });
        }
    }

    return links;
}

function buildSubsectionItems(pages: ParsedPage[]): (NavLink | NavSubSectionData)[] {
    // For nested subsections, we can use folder depth to create hierarchy
    // For now, keep it flat within subsections
    return pages.map((page) => ({
        href: page.href,
        children: page.nav.title || page.frontmatter.title,
    }));
}

function generateNavDataFile(sections: NavSection[]): string {
    const imports = `import { NavSection } from '@augno/ui';`;

    const sectionsJson = JSON.stringify(sections, null, 4);

    return `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.

${imports}

export const items: NavSection[] = ${sectionsJson};
`;
}

interface PagePreview {
    title: string;
    subtitle?: string;
}

function generatePagePreviewFile(pages: ParsedPage[]): string {
    // Build a map of href -> { title, subtitle }
    const previewMap: Record<string, PagePreview> = {};

    for (const page of pages) {
        const title = page.frontmatter.header?.title || page.frontmatter.title;
        const subtitle = page.frontmatter.header?.subtitle;

        previewMap[page.href] = {
            title,
            ...(subtitle && { subtitle }),
        };
    }

    return `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.

export interface PagePreview {
    title: string;
    subtitle?: string;
}

export const pagePreviewData: Record<string, PagePreview> = ${JSON.stringify(previewMap, null, 4)};

export function getPagePreview(path: string): PagePreview | undefined {
    return pagePreviewData[path];
}
`;
}

function generateDocPathsFile(pages: ParsedPage[]): string {
    // Build a nested path object from the pages
    const pathsObj: Record<string, unknown> = {};

    for (const page of pages) {
        const parts = page.slug.split('/');
        let current = pathsObj;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            const isLast = i === parts.length - 1;

            // Convert kebab-case to camelCase for keys
            const key = part.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

            if (isLast) {
                // For the last part, check if it's an index-like file (same name as parent folder)
                if (i > 0 && parts[i - 1] === part) {
                    // This is like account/account.mdx - use 'root' key
                    current['root'] = page.href;
                } else if (part === parts[i - 1]) {
                    current['root'] = page.href;
                } else {
                    // Check if we already have a nested object at this key
                    if (typeof current[key] === 'object') {
                        (current[key] as Record<string, unknown>)['root'] = page.href;
                    } else {
                        current[key] = page.href;
                    }
                }
            } else {
                // Not the last part - create nested object if needed
                if (!current[key]) {
                    current[key] = {};
                } else if (typeof current[key] === 'string') {
                    // Convert string to object with root
                    current[key] = { root: current[key] };
                }
                current = current[key] as Record<string, unknown>;
            }
        }
    }

    // Handle special case for root-level files (like api.mdx, get-started.mdx)
    // They should create nested objects with 'root' if there are child pages
    for (const page of pages) {
        const parts = page.slug.split('/');
        if (parts.length === 1) {
            const key = parts[0].replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
            // Check if there are child pages
            const hasChildren = pages.some(
                (p) => p.slug !== page.slug && p.slug.startsWith(page.slug + '/'),
            );
            if (hasChildren) {
                if (typeof pathsObj[key] === 'object') {
                    (pathsObj[key] as Record<string, unknown>)['root'] = page.href;
                } else {
                    pathsObj[key] = { root: page.href };
                }
            }
        }
    }

    return `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.

export const docPaths = ${JSON.stringify(pathsObj, null, 4)} as const;
`;
}

async function main() {
    console.log('Parsing MDX files...');
    const pages = await parseAllMdxFiles();
    console.log(`Found ${pages.length} pages`);

    console.log('Building navigation structure...');
    const navSections = buildNavStructure(pages);

    console.log('Generating navData file...');
    const navDataContent = generateNavDataFile(navSections);
    fs.writeFileSync(NAV_DATA_OUTPUT, navDataContent);
    console.log(`Written: ${NAV_DATA_OUTPUT}`);

    console.log('Generating docPaths file...');
    const docPathsContent = generateDocPathsFile(pages);
    fs.writeFileSync(PATHS_OUTPUT, docPathsContent);
    console.log(`Written: ${PATHS_OUTPUT}`);

    console.log('Generating pagePreview file...');
    const pagePreviewContent = generatePagePreviewFile(pages);
    fs.writeFileSync(PREVIEW_OUTPUT, pagePreviewContent);
    console.log(`Written: ${PREVIEW_OUTPUT}`);

    console.log('Done!');
}

main().catch(console.error);

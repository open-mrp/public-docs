import fs from 'fs';
import { glob } from 'glob';
import matter from 'gray-matter';
import path from 'path';
import { tabs } from '../src/static/tabs';
import { getSectionOrder, getSubsectionOrder } from '../src/static/navOrder';

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
    order?: number; // Order of the page within its subsection
    section?: string;
    subsection?: string;
    hidden?: boolean;
}

// Sentinel value for pages without a subsection (avoids undefined key sorting issues)
const NO_SUBSECTION = '__NO_SUBSECTION__';

interface PageFrontmatter {
    title: string;
    description?: string;
    route?: string;
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
    // Handle index.mdx files: get-started/index.mdx -> get-started
    return filePath.replace(/\.mdx$/, '').replace(/\/index$/, '');
}

function filePathToHref(filePath: string): string {
    return '/' + filePathToSlug(filePath);
}

/**
 * Get the tab ID from a file path (first directory segment)
 */
function getTabIdFromFilePath(filePath: string): string | undefined {
    const parts = filePath.split('/');
    if (parts.length > 0) {
        const firstSegment = parts[0];
        // Check if this segment matches a known tab
        const tab = tabs.find((t) => t.id === firstSegment);
        return tab?.id;
    }
    return undefined;
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
            href: frontmatter.route || filePathToHref(file),
            frontmatter,
            nav: {
                title: nav.title || frontmatter.title,
                order: nav.order ?? 999,
                section: nav.section,
                subsection: nav.subsection,
                hidden: nav.hidden,
            },
        });
    }

    return pages;
}

interface TabbedNavData {
    [tabId: string]: NavSection[];
}

function buildNavStructure(pages: ParsedPage[], tabId: string): NavSection[] {
    // Group pages by section (case-insensitive)
    const sectionMap = new Map<string, ParsedPage[]>(); // key is lowercase
    const sectionTitle = new Map<string, string>(); // lowercase -> display title

    for (const page of pages) {
        const section = page.nav.section || 'Documentation';
        const sectionKey = section.toLowerCase();

        if (!sectionMap.has(sectionKey)) {
            sectionMap.set(sectionKey, []);
            sectionTitle.set(sectionKey, section); // use first encountered title
        }
        sectionMap.get(sectionKey)!.push(page);
    }

    // Sort sections using the navOrder config
    const sortedSections = Array.from(sectionMap.keys()).sort((a, b) => {
        const orderA = getSectionOrder(tabId, a);
        const orderB = getSectionOrder(tabId, b);
        return orderA - orderB;
    });

    const navSections: NavSection[] = [];

    for (const sectionKey of sortedSections) {
        const sectionPages = sectionMap.get(sectionKey)!;
        const sectionName = sectionTitle.get(sectionKey)!;
        const links = buildSectionLinks(sectionPages, tabId, sectionName);

        navSections.push({
            title: sectionName,
            links,
        });
    }

    return navSections;
}

function buildTabbedNavStructure(pages: ParsedPage[]): TabbedNavData {
    // Group pages by tab first
    const pagesByTab = new Map<string, ParsedPage[]>();

    // Initialize with all known tabs
    for (const tab of tabs) {
        pagesByTab.set(tab.id, []);
    }

    for (const page of pages) {
        const tabId = getTabIdFromFilePath(page.filePath);
        if (tabId && pagesByTab.has(tabId)) {
            pagesByTab.get(tabId)!.push(page);
        }
    }

    // Build nav structure for each tab
    const tabbedNav: TabbedNavData = {};

    for (const [tabId, tabPages] of pagesByTab) {
        tabbedNav[tabId] = buildNavStructure(tabPages, tabId);
    }

    return tabbedNav;
}

function buildSectionLinks(
    pages: ParsedPage[],
    tabId: string,
    sectionName: string
): (NavLink | NavSubSectionData)[] {
    // Group by subsection (case-insensitive, using sentinel for no subsection)
    const subsectionMap = new Map<string, ParsedPage[]>(); // key is lowercase or NO_SUBSECTION
    const subsectionTitle = new Map<string, string | undefined>(); // key -> display title

    for (const page of pages) {
        const subsection = page.nav.subsection;
        const subsectionKey = subsection?.toLowerCase() ?? NO_SUBSECTION;

        if (!subsectionMap.has(subsectionKey)) {
            subsectionMap.set(subsectionKey, []);
            subsectionTitle.set(subsectionKey, subsection); // use first encountered title (undefined for NO_SUBSECTION)
        }
        subsectionMap.get(subsectionKey)!.push(page);
    }

    // Sort subsections using the navOrder config
    const sortedSubsections = Array.from(subsectionMap.keys()).sort((a, b) => {
        // For NO_SUBSECTION pages, try to match by nav.title if there's only one page
        let subsectionA: string | null;
        let subsectionB: string | null;

        if (a === NO_SUBSECTION) {
            const pages = subsectionMap.get(a)!;
            // Use nav.title for ordering when there's a single page without subsection
            subsectionA = pages.length === 1 ? pages[0].nav.title ?? null : null;
        } else {
            subsectionA = subsectionTitle.get(a) ?? null;
        }

        if (b === NO_SUBSECTION) {
            const pages = subsectionMap.get(b)!;
            subsectionB = pages.length === 1 ? pages[0].nav.title ?? null : null;
        } else {
            subsectionB = subsectionTitle.get(b) ?? null;
        }

        const orderA = getSubsectionOrder(tabId, sectionName, subsectionA);
        const orderB = getSubsectionOrder(tabId, sectionName, subsectionB);
        return orderA - orderB;
    });

    const links: (NavLink | NavSubSectionData)[] = [];

    for (const subsectionKey of sortedSubsections) {
        const subsectionPages = subsectionMap.get(subsectionKey)!;
        const displayTitle = subsectionTitle.get(subsectionKey);

        // Sort pages within subsection by order
        subsectionPages.sort((a, b) => (a.nav.order ?? 999) - (b.nav.order ?? 999));

        if (displayTitle === undefined) {
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
                title: displayTitle,
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

function generateNavDataFile(tabbedNav: TabbedNavData): string {
    const imports = `import { NavSection } from '@augno/ui';`;

    const navJson = JSON.stringify(tabbedNav, null, 4);

    return `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.

${imports}

export interface TabbedNavData {
    [tabId: string]: NavSection[];
}

export const navData: TabbedNavData = ${navJson};
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
    // Build a nested path object from the pages based on their routes
    const pathsObj: Record<string, unknown> = {};

    for (const page of pages) {
        // Use route (href) to build the path structure, not the file path
        const route = page.href;
        // Remove leading slash and split by /
        const parts = route.replace(/^\//, '').split('/');
        let current = pathsObj;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            const isLast = i === parts.length - 1;

            // Convert kebab-case to camelCase for keys
            const key = part.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

            if (isLast) {
                // Check if we already have a nested object at this key
                if (typeof current[key] === 'object') {
                    (current[key] as Record<string, unknown>)['root'] = route;
                } else {
                    current[key] = route;
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

    // Handle special case for pages that have children with the same prefix
    // e.g., /api and /api/authentication - /api should become { root: "/api", authentication: "..." }
    for (const page of pages) {
        const route = page.href;
        const parts = route.replace(/^\//, '').split('/');

        if (parts.length === 1) {
            const key = parts[0].replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
            // Check if there are child pages with this route prefix
            const hasChildren = pages.some(
                (p) => p.href !== route && p.href.startsWith(route + '/'),
            );
            if (hasChildren) {
                if (typeof pathsObj[key] === 'object') {
                    (pathsObj[key] as Record<string, unknown>)['root'] = route;
                } else {
                    pathsObj[key] = { root: route };
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

    console.log('Building tabbed navigation structure...');
    const tabbedNav = buildTabbedNavStructure(pages);

    console.log('Generating navData file...');
    const navDataContent = generateNavDataFile(tabbedNav);
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

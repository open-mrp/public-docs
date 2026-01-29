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

interface PageFrontmatter {
    title: string;
    subtitle?: string;
    route?: string;
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

type NavEntry =
    | { type: 'subsection'; title: string; pages: ParsedPage[] }
    | { type: 'standalone'; page: ParsedPage };

function getNavEntryOrder(entry: NavEntry, tabId: string, sectionName: string): number {
    if (entry.type === 'subsection') {
        return getSubsectionOrder(tabId, sectionName, entry.title);
    }

    // For standalone pages, try matching by nav title first
    const navTitle = entry.page.nav.title ?? null;
    if (navTitle !== null) {
        const order = getSubsectionOrder(tabId, sectionName, navTitle);
        if (order !== 999) return order;
    }
    // Fall back to null position (for sections that use null in navOrder)
    return getSubsectionOrder(tabId, sectionName, null);
}

function buildSectionLinks(
    pages: ParsedPage[],
    tabId: string,
    sectionName: string,
): (NavLink | NavSubSectionData)[] {
    // Separate pages into subsection groups and standalone pages
    const subsectionMap = new Map<string, ParsedPage[]>();
    const subsectionTitle = new Map<string, string>();
    const standalonePages: ParsedPage[] = [];

    for (const page of pages) {
        const subsection = page.nav.subsection;
        if (subsection) {
            const key = subsection.toLowerCase();
            if (!subsectionMap.has(key)) {
                subsectionMap.set(key, []);
                subsectionTitle.set(key, subsection);
            }
            subsectionMap.get(key)!.push(page);
        } else {
            standalonePages.push(page);
        }
    }

    // Build a unified list of entries for sorting
    const entries: NavEntry[] = [];

    for (const [, subPages] of subsectionMap) {
        const title = subsectionTitle.get(subPages[0].nav.subsection!.toLowerCase())!;
        entries.push({ type: 'subsection', title, pages: subPages });
    }

    for (const page of standalonePages) {
        entries.push({ type: 'standalone', page });
    }

    // Sort entries using navOrder config
    entries.sort((a, b) => {
        const orderA = getNavEntryOrder(a, tabId, sectionName);
        const orderB = getNavEntryOrder(b, tabId, sectionName);
        return orderA - orderB;
    });

    // Build the final links array
    const links: (NavLink | NavSubSectionData)[] = [];

    for (const entry of entries) {
        if (entry.type === 'standalone') {
            links.push({
                href: entry.page.href,
                children: entry.page.nav.title || entry.page.frontmatter.title,
            });
        } else {
            // Sort pages within subsection by their order field
            entry.pages.sort((a, b) => (a.nav.order ?? 999) - (b.nav.order ?? 999));
            links.push({
                title: entry.title,
                items: buildSubsectionItems(entry.pages),
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
        previewMap[page.href] = {
            title: page.frontmatter.title,
            ...(page.frontmatter.subtitle && { subtitle: page.frontmatter.subtitle }),
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

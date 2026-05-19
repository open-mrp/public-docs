import fs from 'fs';
import { glob } from 'glob';
import matter from 'gray-matter';
import path from 'path';
import { tabs } from '../src/static/tabs';

const DOCS_DIR = path.join(process.cwd(), 'src/docs');
const ROUTE_MAP_OUTPUT = path.join(process.cwd(), 'src/static/routeMap.generated.ts');

interface RouteEntry {
    route: string;
    filePath: string;
    tabId: string | undefined;
}

/**
 * Get the tab ID from a file path (first directory segment)
 */
function getTabIdFromFilePath(filePath: string): string | undefined {
    const parts = filePath.split('/');
    if (parts.length > 0) {
        const firstSegment = parts[0];
        const tab = tabs.find((t) => t.id === firstSegment);
        return tab?.id;
    }
    return undefined;
}

async function getAllRoutes(): Promise<RouteEntry[]> {
    const files = (await glob('**/*.mdx', { cwd: DOCS_DIR })).sort();
    const routes: RouteEntry[] = [];

    for (const file of files) {
        const content = fs.readFileSync(path.join(DOCS_DIR, file), 'utf-8');
        const { data } = matter(content);

        // Use explicit route from frontmatter or fall back to path-derived
        const pathDerivedRoute = '/' + file.replace(/\.mdx$/, '').replace(/\/index$/, '');
        const route = data.route || pathDerivedRoute;

        // Determine tab from file path (directory structure)
        const tabId = getTabIdFromFilePath(file);

        routes.push({ route, filePath: file, tabId });
    }

    return routes;
}

async function getAllSlugs(): Promise<{ slug: string[] }[]> {
    const routes = await getAllRoutes();

    const slugs = routes.map(({ route }) => {
        const slug = route.replace(/^\//, '').split('/');
        return { slug };
    });

    return slugs;
}

async function generatePageFile(): Promise<void> {
    const slugs = await getAllSlugs();

    const pageContent = `import { fetchPageBySlug } from '@/lib/mdx/fetchPageBySlug';
import { MarkdownPage } from '../../_components/MarkdownPage';

const getPageContent = async (slug: string[]) => {
    const { meta, content, cleanMarkdown } = await fetchPageBySlug(slug);
    return { meta, content, cleanMarkdown };
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const { meta } = await getPageContent(slug);
    return { title: meta.title + ' | Augno Documentation' };
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const { content, meta, cleanMarkdown } = await getPageContent(slug);

    return <MarkdownPage meta={meta} content={content} cleanMarkdown={cleanMarkdown} />;
}

export function generateStaticParams() {
  return ${JSON.stringify(slugs, null, 2)} as { slug: string[] }[];
}

export const dynamicParams = false;
`;

    const pagePath = path.join(process.cwd(), 'src/app/(docs)/[...slug]/page.tsx');

    // Write the new page file
    fs.writeFileSync(pagePath, pageContent);
    console.log('Successfully generated page.tsx with updated static params');
}

async function generateRouteMapFile(): Promise<void> {
    const routes = await getAllRoutes();

    // Build the route to file mapping
    const routeToFile: Record<string, string> = {};
    const routeToTab: Record<string, string> = {};

    for (const { route, filePath, tabId } of routes) {
        routeToFile[route] = filePath;
        if (tabId) {
            routeToTab[route] = tabId;
        }
    }

    const routeMapContent = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.

export const routeToFile: Record<string, string> = ${JSON.stringify(routeToFile, null, 4)};

export const routeToTab: Record<string, string> = ${JSON.stringify(routeToTab, null, 4)};
`;

    fs.writeFileSync(ROUTE_MAP_OUTPUT, routeMapContent);
    console.log('Successfully generated routeMap.generated.ts');
}

// Run the generation
async function main() {
    await generatePageFile();
    await generateRouteMapFile();
}

main().catch(console.error);

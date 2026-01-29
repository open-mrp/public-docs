import fs from 'fs';
import { glob } from 'glob';
import path from 'path';

const DOCS_DIR = path.join(process.cwd(), 'src/docs');

async function getAllSlugs(): Promise<{ slug: string[] }[]> {
    // Get all .mdx files recursively
    const files = await glob('**/*.mdx', { cwd: DOCS_DIR });

    // Convert file paths to slug arrays
    const slugs = files.map((file: string) => {
        // Remove .mdx extension and split by directory separator
        const slug = file.replace(/\.mdx$/, '').split('/');
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
  return ${JSON.stringify(slugs, null, 2)};
}

export const dynamicParams = false;
`;

    const pagePath = path.join(process.cwd(), 'src/app/(docs)/[...slug]/page.tsx');

    // Write the new page file
    fs.writeFileSync(pagePath, pageContent);
    console.log('Successfully generated page.tsx with updated static params');
}

// Run the generation
generatePageFile().catch(console.error);

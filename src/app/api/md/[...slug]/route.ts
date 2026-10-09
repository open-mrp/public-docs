import { apiReferenceMarkdown } from '@/lib/api-reference-page-markdown';
import { cleanMdx } from '@/lib/mdx/cleanMdx';
import fs from 'fs';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'src', 'docs');

function markdownResponse(markdown: string) {
    return new Response(markdown, {
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
        },
    });
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;

    // API reference pages are generated from the OpenAPI spec, not MDX files.
    if (slug[0] === 'api-reference') {
        const markdown = await apiReferenceMarkdown(slug.slice(1));
        return markdown === undefined
            ? new Response('Not found', { status: 404 })
            : markdownResponse(markdown);
    }

    const realSlug = slug.join('/');
    const filePath = path.join(rootDirectory, `${realSlug}.mdx`);

    if (!fs.existsSync(filePath)) {
        return new Response('Not found', { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    return markdownResponse(cleanMdx(fileContent));
}

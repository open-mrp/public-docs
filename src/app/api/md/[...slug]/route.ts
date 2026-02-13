import { cleanMdx } from '@/lib/mdx/cleanMdx';
import fs from 'fs';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'src', 'docs');

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const realSlug = slug.join('/');
    const filePath = path.join(rootDirectory, `${realSlug}.mdx`);

    if (!fs.existsSync(filePath)) {
        return new Response('Not found', { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    const markdown = cleanMdx(fileContent);

    return new Response(markdown, {
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
        },
    });
}

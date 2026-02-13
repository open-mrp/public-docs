import { fetchPageBySlug } from '@/lib/mdx/fetchPageBySlug';
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
    return [
        {
            slug: ['development'],
        },
        {
            slug: ['api', 'overview'],
        },
        {
            slug: ['get-started'],
        },
        {
            slug: ['api', 'api-keys'],
        },
        {
            slug: ['api', 'managing-api-keys'],
        },
        {
            slug: ['api', 'idempotency'],
        },
        {
            slug: ['api', 'request-ids'],
        },
        {
            slug: ['api', 'uris'],
        },
        {
            slug: ['api', 'account-context'],
        },
        {
            slug: ['api', 'versioning'],
        },
        {
            slug: ['api', 'pagination'],
        },
        {
            slug: ['api', 'rate-limiting'],
        },
        {
            slug: ['api', 'errors'],
        },
        {
            slug: ['api-tour'],
        },
        {
            slug: ['account', 'activate'],
        },
        {
            slug: ['account', 'checklist'],
        },
        {
            slug: ['account'],
        },
        {
            slug: ['api-request'],
        },
        {
            slug: ['release-phases'],
        },
        {
            slug: ['go-live'],
        },
        {
            slug: ['test-integration'],
        },
    ];
}

export const dynamicParams = false;

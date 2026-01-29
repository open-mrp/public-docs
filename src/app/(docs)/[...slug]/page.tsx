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
    "slug": [
      "get-started"
    ]
  },
  {
    "slug": [
      "get-started",
      "api-request"
    ]
  },
  {
    "slug": [
      "get-started",
      "go-live"
    ]
  },
  {
    "slug": [
      "get-started",
      "test-integration"
    ]
  },
  {
    "slug": [
      "get-started",
      "account"
    ]
  },
  {
    "slug": [
      "get-started",
      "account",
      "activate"
    ]
  },
  {
    "slug": [
      "get-started",
      "account",
      "checklist"
    ]
  },
  {
    "slug": [
      "get-started",
      "api",
      "release-phases"
    ]
  },
  {
    "slug": [
      "get-started",
      "api",
      "idempotency-and-eventual-consistency"
    ]
  },
  {
    "slug": [
      "get-started",
      "api",
      "api-uris"
    ]
  },
  {
    "slug": [
      "get-started",
      "api",
      "api-tour"
    ]
  }
];
}

export const dynamicParams = false;

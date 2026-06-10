import { AccountId } from '@/components/markdown/AccountId';
import { AccountName } from '@/components/markdown/AccountName';
import { SandboxAccountId } from '@/components/markdown/SandboxAccountId';
import { SandboxAccountName } from '@/components/markdown/SandboxAccountName';
import { ApiKeySnippet } from '@/components/markdown/ApiKeySnippet';
import { ApiVersion } from '@/components/markdown/ApiVersion';
import { IfAuthenticated, IfUnauthenticated } from '@/components/markdown/AuthConditional';
import BetaTag from '@/components/markdown/BetaTag';
import { DocsCodeEditor } from '@/components/markdown/DocsCodeEditor';
import { ErrorDetails } from '@/components/markdown/ErrorDetails';
import { ApiEndpoint } from '@/components/api-reference/ApiEndpoint';
import { CustomerCRMIntegration } from '@/components/markdown/flowcharts/CustomerCRMIntegration';
import InlineCode from '@/components/markdown/InlineCode';
import { SdkLanguageTab, SdkLanguageTabs } from '@/components/markdown/SdkLanguageTabs';
import DocLink from '@/components/markdown/link/DocLink';
import InternalLink from '@/components/markdown/link/InternalLink';
import LinkCard from '@/components/markdown/link/LinkCard';
import { cleanMdx } from '@/lib/mdx/cleanMdx';
import { routeToFile } from '@/static/routeMap.generated';
import {
    DocCardGroup,
    DocChecklist,
    DocChecklistItem,
    DocHeading,
    DocHeroSection,
    DocNumberedSection,
    DocTab,
    DocTabs,
} from '@augno/ui';
import type { MDXComponents } from 'mdx/types';
import { compileMDX } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JSXElementConstructor, ReactElement } from 'react';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { z } from 'zod';

// Navigation frontmatter schema
const NavSchema = z
    .object({
        title: z.string().optional(),
        order: z.number().optional(),
        sectionOrder: z.number().optional(),
        section: z.string().optional(),
        subsection: z.string().optional(),
        hidden: z.boolean().optional(),
    })
    .optional();

// Define the Zod schema for the frontmatter
const FrontmatterSchema = z.object({
    title: z.string(),
    subtitle: z.string(),
    route: z.string().optional(),
    layout: z.string().optional(),
    nav: NavSchema,
    toc: z.boolean().optional().default(true),
});

const mdxComponents: MDXComponents = {
    // Custom components
    AccountId,
    AccountName,
    SandboxAccountId,
    SandboxAccountName,
    ApiKeySnippet,
    ApiVersion,
    IfAuthenticated,
    IfUnauthenticated,
    DocLink,
    InternalLink,
    DocCardGroup,
    DocChecklist,
    DocChecklistItem,
    LinkCard,
    BetaTag,
    ErrorDetails,
    ApiEndpoint,
    DocHeroSection,
    DocNumberedSection,
    DocTabs,
    DocTab,
    SdkLanguageTabs,
    SdkLanguageTab,
    DocHeading,
    CustomerCRMIntegration,
    code: ({ children, className }) => {
        // Only wrap standalone code tags (not inside pre) with InlineCode
        const isStandalone = !className?.includes('language-');
        return isStandalone ? (
            <InlineCode className={className}>{children}</InlineCode>
        ) : (
            <code className={className}>{children}</code>
        );
    },
    pre: ({ children }) => <DocsCodeEditor>{children}</DocsCodeEditor>,
    p: ({ children }) => <p className="pt-3">{children}</p>,
    table: ({ children }) => (
        <div className="table-wrapper">
            <table>{children}</table>
        </div>
    ),
    h1: ({ children }) => (
        <DocHeading level={1} className="pt-8">
            {children}
        </DocHeading>
    ),
    h2: ({ children }) => (
        <DocHeading level={2} className="pt-8">
            {children}
        </DocHeading>
    ),
    h3: ({ children }) => (
        <DocHeading level={3} className="pt-6">
            {children}
        </DocHeading>
    ),
    h4: ({ children }) => (
        <DocHeading level={4} className="pt-6">
            {children}
        </DocHeading>
    ),
    h5: ({ children }) => (
        <DocHeading level={5} className="pt-6">
            {children}
        </DocHeading>
    ),
    h6: ({ children }) => (
        <DocHeading level={6} className="pt-6">
            {children}
        </DocHeading>
    ),
    a: ({ children, href }) => (
        <Link href={href} className="text-secondary-500 hover:text-secondary-700">
            {children}
        </Link>
    ),
    hr: () => <hr className="my-8 border-t-1 border-[var(--border-color)]" />,
};

// Define the type based on the schema
export type Frontmatter = z.infer<typeof FrontmatterSchema>;

export async function fetchPageBySlug(slug: string[]): Promise<{
    meta: Frontmatter & { slug: string }; // Use the inferred type and add slug
    content: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
    cleanMarkdown: string;
}> {
    // Build the route from the slug
    const route = '/' + slug.join('/');
    const relativeFilePath = routeToFile[route];

    if (!relativeFilePath) {
        notFound();
    }

    const realSlug = slug.join('/');

    // Import the raw MDX source through the bundler instead of reading it from
    // disk. routeToFile values always end in .mdx, so stripping and re-adding
    // the extension keeps the import context scoped to .mdx files (see the
    // raw-loader rule in next.config.ts). Going through the module graph means
    // editing a doc triggers Fast Refresh in dev instead of requiring a manual
    // reload, while compileMDX still compiles the MDX at runtime.
    const importPath = relativeFilePath.replace(/\.mdx$/, '');
    let fileContent: string;
    try {
        const mod = await import(`../../docs/${importPath}.mdx`);
        fileContent = mod.default as unknown as string;
    } catch {
        notFound();
    }

    const { frontmatter, content } = await compileMDX({
        source: fileContent,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [rehypeHighlight],
                remarkPlugins: [remarkGfm],
            },
        },
        components: mdxComponents,
    });

    // Validate the frontmatter using the Zod schema
    const validatedFrontmatter = FrontmatterSchema.parse(frontmatter);

    return {
        meta: {
            ...validatedFrontmatter, // Use the validated data
            slug: realSlug,
        },
        content,
        cleanMarkdown: cleanMdx(fileContent),
    };
}

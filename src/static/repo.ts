// Public source repository for these docs. Used by the "edit this page" and
// "report an error" links so readers can propose fixes where they read them.
export const repo = {
    url: 'https://github.com/Augno/public-docs',
    branch: 'main',
    // Prefix that turns a routeMap file path into a repo-relative path.
    docsDir: 'src/docs',
} as const;

/** Deep link to GitHub's editor for a doc page's MDX source. */
export function editUrl(filePath: string): string {
    return `${repo.url}/edit/${repo.branch}/${repo.docsDir}/${filePath}`;
}

/** Prefilled "documentation error" issue for a specific page. */
export function reportUrl(page: { title: string; slug: string }): string {
    const params = new URLSearchParams({
        template: 'documentation-error.yml',
        labels: 'documentation',
        title: `Docs: error on "${page.title}"`,
        page: `/${page.slug}`,
    });
    return `${repo.url}/issues/new?${params.toString()}`;
}

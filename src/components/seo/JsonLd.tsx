/**
 * Renders a JSON-LD structured-data block. Server-rendered into the page so
 * search engines can parse rich results (articles, breadcrumbs, organization).
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
    return (
        <script
            type="application/ld+json"
            // Structured data is trusted, build-time content (no user input).
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

import { loadArchivedApiVersion } from '@/lib/archived-api-versions';

/**
 * Sidenav entries for an archived API version, fetched by ApiReferenceSidenav. The
 * latest version's entries ship with the client bundle (apiNav.generated.ts); archived
 * ones come from the spec, loaded on demand. Versions are immutable, so the response is
 * cacheable indefinitely.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ version: string }> }) {
    const { version } = await params;
    const archived = await loadArchivedApiVersion(version);
    if (!archived) {
        return Response.json(
            { error: `Unknown archived API version: ${version}` },
            { status: 404 },
        );
    }
    return Response.json(
        { endpoints: archived.navEntries, objects: archived.objectNavEntries },
        { headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=31536000, immutable' } },
    );
}

import { buildCurlExample } from '@/components/api-reference/buildCurlExample';
import { findEndpoint, findObject, getApiVersionData } from '@/lib/api-reference-data';
import {
    endpointToMarkdown,
    objectToMarkdown,
    overviewToMarkdown,
} from '@/lib/api-reference-markdown';
import { resolveApiRoute } from '@/lib/api-reference-route';
import { Env } from '@/lib/env';
import { LATEST_API_VERSION } from '@/static/apiVersions.generated';

/**
 * Markdown for the API reference page at `/api-reference/<segments>`, or undefined when
 * no such page exists. Archived endpoint pages are labeled with their version.
 */
export async function apiReferenceMarkdown(segments: string[]): Promise<string | undefined> {
    const route = resolveApiRoute(segments);
    if (!route) return undefined;
    const data = await getApiVersionData(route.version);
    if (!data) return undefined;

    const versionNote =
        route.version === LATEST_API_VERSION
            ? ''
            : `> API version ${route.version}. The latest version is ${LATEST_API_VERSION}.\n\n`;

    if (route.objectSlug) {
        const object = findObject(data, route.objectSlug);
        return object && versionNote + objectToMarkdown(object) + '\n';
    }

    if (route.tagSlug && route.endpointSlug) {
        const endpoint = findEndpoint(data, route.tagSlug, route.endpointSlug);
        if (!endpoint) return undefined;
        const curl = route.isArchived
            ? ''
            : buildCurlExample(endpoint).replace('API_HOST', Env.apiHost);
        return (
            versionNote +
            endpointToMarkdown(endpoint) +
            (curl ? `\n\n## Example request\n\`\`\`bash\n${curl}\n\`\`\`` : '') +
            '\n'
        );
    }

    return overviewToMarkdown({ ...data, basePath: route.basePath });
}

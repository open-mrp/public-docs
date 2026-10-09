import { describe, expect, test } from 'bun:test';
import fs from 'fs';
import path from 'path';
import { apiReferenceMarkdown } from '@/lib/api-reference-page-markdown';
import { apiObjects, apiTags } from '@/static/apiEndpoints.generated';

const LLMS_TXT = path.join(process.cwd(), 'public/llms.txt');

describe('apiReferenceMarkdown', () => {
    test('renders an endpoint page with method, path and a curl example', async () => {
        const endpoint = apiTags[0].endpoints[0];
        const markdown = await apiReferenceMarkdown([endpoint.tagSlug, endpoint.endpointSlug]);

        expect(markdown).toBeDefined();
        expect(markdown).toStartWith(`# ${endpoint.summary}\n`);
        expect(markdown).toContain(`\`${endpoint.method.toUpperCase()} ${endpoint.path}\``);
        expect(markdown).toContain('## Example request');
        expect(markdown).not.toContain('API_HOST');
    });

    test('renders an object page', async () => {
        const object = apiObjects[0];
        const markdown = await apiReferenceMarkdown(['objects', object.slug]);

        expect(markdown).toStartWith(`# ${object.name} object\n`);
    });

    test('renders the overview as an index of .md links', async () => {
        const markdown = await apiReferenceMarkdown([]);
        const endpoint = apiTags[0].endpoints[0];

        expect(markdown).toContain(
            `/api-reference/${endpoint.tagSlug}/${endpoint.endpointSlug}.md)`,
        );
        expect(markdown).toContain(`/api-reference/objects/${apiObjects[0].slug}.md)`);
    });

    test('returns undefined for unknown pages', async () => {
        expect(await apiReferenceMarkdown(['no-such-tag', 'no-such-endpoint'])).toBeUndefined();
        expect(await apiReferenceMarkdown(['objects', 'no-such-object'])).toBeUndefined();
        expect(await apiReferenceMarkdown(['a', 'b', 'c', 'd'])).toBeUndefined();
    });

    test('every API reference link in llms.txt resolves', async () => {
        const llms = fs.readFileSync(LLMS_TXT, 'utf8');
        const links = [...llms.matchAll(/\]\(https?:\/\/[^/)]+\/api-reference([^)]*)\.md\)/g)].map(
            (m) => m[1],
        );

        expect(links.length).toBeGreaterThan(0);
        const missing: string[] = [];
        for (const link of links) {
            const segments = link.split('/').filter(Boolean);
            if ((await apiReferenceMarkdown(segments)) === undefined) missing.push(link);
        }
        expect(missing).toEqual([]);
    });
});

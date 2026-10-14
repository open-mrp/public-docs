import { afterEach, beforeEach, describe, expect, mock, test } from 'bun:test';

mock.module('./token-refresh', () => ({
    refreshAccessToken: mock(async () => {}),
}));

const { createOpenMRPBrowserFetch } = await import('./openmrp-browser-fetch');

describe('createOpenMRPBrowserFetch', () => {
    beforeEach(() => {
        Object.defineProperty(globalThis, 'window', {
            value: globalThis,
            configurable: true,
            writable: true,
        });
    });

    afterEach(() => {
        delete (globalThis as { window?: unknown }).window;
    });

    test('401 on a POST → retries with the original body after the first send consumed it', async () => {
        const bodies: string[] = [];
        const innerFetch = async (input: RequestInfo | URL) => {
            bodies.push(await (input as Request).text());
            return new Response(null, { status: bodies.length === 1 ? 401 : 200 });
        };

        const fetch = createOpenMRPBrowserFetch(innerFetch as typeof fetch);
        const response = await fetch('https://api.example.com/v1/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ limit: 1000 }),
        });

        expect(response.status).toBe(200);
        expect(bodies).toEqual(['{"limit":1000}', '{"limit":1000}']);
    });
});

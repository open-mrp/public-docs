'use client';

import { refreshAccessToken } from './token-refresh';

const AUTH_PATHS = ['/v1/auth/access-tokens', '/v1/auth/actions/login'];
const RETRY_HEADER = 'X-Retry';

function isAuthPath(url: string): boolean {
    try {
        return AUTH_PATHS.some((path) => new URL(url).pathname.endsWith(path));
    } catch {
        return AUTH_PATHS.some((path) => url.includes(path));
    }
}

function retryRequest(outboundRequest: Request, downstreamFetch: typeof fetch): Promise<Response> {
    const headers = new Headers(outboundRequest.headers);
    headers.set(RETRY_HEADER, '1');
    return downstreamFetch(new Request(outboundRequest, { headers }));
}

async function handleStaleAuth(
    outboundRequest: Request,
    response: Response,
    downstreamFetch: typeof fetch,
): Promise<Response> {
    if (response.status !== 401 || typeof window === 'undefined') return response;
    if (isAuthPath(outboundRequest.url)) return response;
    if (outboundRequest.headers.has(RETRY_HEADER)) return response;

    try {
        await refreshAccessToken();
    } catch {
        return response;
    }

    return retryRequest(outboundRequest, downstreamFetch);
}

/**
 * Wraps fetch with cookie credentials and stale 401 refresh + retry.
 */
export function createOpenMRPBrowserFetch(innerFetch: typeof fetch): typeof fetch {
    const patchedFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const credentials = (init?.credentials ?? 'include') as RequestCredentials;

        const request = new Request(input, {
            ...init,
            credentials,
        });

        let response = await innerFetch(request);
        response = await handleStaleAuth(request, response, innerFetch);

        return response;
    };

    return patchedFetch as typeof fetch;
}

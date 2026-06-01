'use client';

import { API_VERSION } from '@/static/apiVersion.generated';
import { Augno } from '@augno/internal-sdk';
import { Env } from './env';
import { createAugnoBrowserFetch } from './augno-browser-fetch';

export const augnoClient = new Augno({
    baseURL: Env.apiV2BaseUrl,
    bearerToken: null,
    augnoAccountID: null,
    defaultHeaders: { 'Augno-Version': API_VERSION.current },
    fetchOptions: { credentials: 'include' },
    fetch: createAugnoBrowserFetch(globalThis.fetch.bind(globalThis)),
});

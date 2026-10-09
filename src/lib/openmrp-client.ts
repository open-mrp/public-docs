'use client';

import { API_VERSION } from '@/static/apiVersion.generated';
import { OpenMRP } from '@openmrp/internal-sdk';
import { Env } from './env';
import { createOpenMRPBrowserFetch } from './openmrp-browser-fetch';

export const openMRPClient = new OpenMRP({
    baseURL: Env.apiV2BaseUrl,
    bearerToken: null,
    openmrpAccountID: null,
    defaultHeaders: { 'OpenMRP-Version': API_VERSION.current },
    fetchOptions: { credentials: 'include' },
    fetch: createOpenMRPBrowserFetch(globalThis.fetch.bind(globalThis)),
});

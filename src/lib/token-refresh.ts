'use client';

import { API_VERSION } from '@/static/apiVersion.generated';
import { Env } from './env';

let _refreshPromise: Promise<void> | null = null;
let _lastSuccessAt = 0;

const GRACE_PERIOD_MS = 5_000;
const RETRY_DELAY_MS = 100;

async function doRefresh(): Promise<void> {
    const url = new URL('/v1/auth/access-tokens', Env.apiV2BaseUrl).toString();
    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Augno-Version': API_VERSION.current },
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error(`Token refresh failed (${res.status})`);
    }

    _lastSuccessAt = Date.now();
}

/**
 * Refreshes the access token using the refresh token cookie.
 * Deduplicates concurrent calls and retries once after a short delay.
 */
export function refreshAccessToken(): Promise<void> {
    if (_refreshPromise) {
        return _refreshPromise;
    }

    if (Date.now() - _lastSuccessAt < GRACE_PERIOD_MS) {
        return Promise.resolve();
    }

    _refreshPromise = doRefresh()
        .catch(() => {
            return new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    doRefresh().then(resolve, reject);
                }, RETRY_DELAY_MS);
            });
        })
        .finally(() => {
            _refreshPromise = null;
        });

    return _refreshPromise;
}

'use client';

/**
 * Utility class for working with environment variables in external-docs.
 */
export class Env {
    /**
     * Check if the current environment is development.
     */
    public static isDevelopment(): boolean {
        return process.env.NODE_ENV === 'development';
    }

    /**
     * Check if the current environment is production.
     */
    public static isProduction(): boolean {
        return !this.isDevelopment();
    }

    /**
     * The base URL for the V1 API.
     */
    public static get apiV1BaseUrl(): string {
        return process.env['NEXT_PUBLIC_V1_API_URL'] || '';
    }

    /**
     * The base URL for the V2 API.
     */
    public static get apiV2BaseUrl(): string {
        return process.env['NEXT_PUBLIC_V2_API_URL'] || '';
    }

    /**
     * The API host used in documentation code examples.
     */
    public static get apiHost(): string {
        return process.env['NEXT_PUBLIC_V2_API_URL'] || 'https://api.openmrp.ai';
    }

    /**
     * The base URL for the frontend dashboard.
     */
    public static get frontendUrl(): string {
        return process.env['NEXT_PUBLIC_FRONTEND_URL'] || '';
    }
}

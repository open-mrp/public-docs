import type { EndpointData } from '@/static/apiEndpoints.generated';
import { API_VERSION } from '@/static/apiVersion.generated';
import { sanitizeRequestExample } from './sanitizeRequestExample';

function stringifyJson(value: unknown) {
    return JSON.stringify(value ?? {}, null, 2);
}

export function buildCurlExample(endpoint: EndpointData) {
    const method = endpoint.method.toUpperCase();
    const lines: string[] = [];

    lines.push(`curl API_HOST${endpoint.path} \\`);
    if (method !== 'GET') {
        lines.push(`  -X ${method} \\`);
    }
    lines.push(`  -H "Authorization: Bearer YOUR_API_KEY" \\`);
    lines.push(`  -H "OpenMRP-Version: ${API_VERSION.current}"`);

    if (endpoint.requestBody?.example != null) {
        const body = sanitizeRequestExample(
            endpoint.requestBody.example,
            endpoint.requestBody.fields,
        );
        lines[lines.length - 1] += ' \\';
        lines.push(`  -H "Content-Type: application/json" \\`);
        lines.push(`  -d '${stringifyJson(body)}'`);
    }

    return lines.join('\n');
}

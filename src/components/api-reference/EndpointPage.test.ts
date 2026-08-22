import { describe, expect, test } from 'bun:test';
import type { EndpointData } from '@/static/apiEndpoints.generated';
import { buildCurlExample } from './buildCurlExample';

function makeEndpoint(overrides: Partial<EndpointData> = {}): EndpointData {
    return {
        operationId: 'create-customer',
        domain: 'core',
        tag: 'Customers',
        tagSlug: 'customers',
        endpointSlug: 'create-customer',
        method: 'post',
        path: '/v1/core/customers',
        summary: 'Create customer',
        description: '',
        parameters: [],
        actionType: 'create',
        requestBody: undefined,
        responses: [],
        isPreview: false,
        ...overrides,
    };
}

describe('buildCurlExample', () => {
    test('uses injectable API host and API key placeholders', () => {
        const result = buildCurlExample(makeEndpoint());

        expect(result).toContain('curl API_HOST/v1/core/customers');
        expect(result).toContain('Authorization: Bearer YOUR_API_KEY');
        expect(result).not.toContain('https://api.augno.com');
        expect(result).not.toContain('$OPENMRP_API_KEY');
    });

    test('includes request body headers and payload for body examples', () => {
        const result = buildCurlExample(
            makeEndpoint({
                requestBody: {
                    description: 'Customer payload',
                    fields: [],
                    example: {
                        name: 'Acme',
                    },
                },
            }),
        );

        expect(result).toContain('-H "Content-Type: application/json"');
        expect(result).toContain(`-d '{\n  "name": "Acme"\n}'`);
    });
});

import { describe, expect, test } from 'bun:test';
import {
    flattenSyntheticSdkNamespace,
    normalizeSnippetPlaceholders,
} from '@/lib/snippetPlaceholders';
import { getEndpointSnippet } from '@/static/apiSnippets.generated';

describe('normalizeSnippetPlaceholders', () => {
    test('rewrites OpenMRP production API host', () => {
        expect(normalizeSnippetPlaceholders('fetch("https://api.openmrp.ai/v1/foo")')).toContain(
            'API_HOST',
        );
    });

    test('rewrites bearer shell variables from Stainless curl snippets', () => {
        const out = normalizeSnippetPlaceholders(
            'curl https://api.openmrp.ai/x \\\n    -H "Authorization: Bearer $OPENMRP_API_KEY"',
        );
        expect(out).toContain('Bearer YOUR_API_KEY');
        expect(out).toContain('API_HOST');
    });

    test('uses quoted YOUR_API_KEY for TypeScript env reads', () => {
        expect(
            normalizeSnippetPlaceholders(`new Foo({ apiKey: process.env['OPENMRP_API_KEY'] })`),
        ).toContain(`apiKey: 'YOUR_API_KEY'`);
    });

    test('normalizes Python os.environ.get patterns', () => {
        expect(
            normalizeSnippetPlaceholders(`OpenMRP(api_key=os.environ.get("OPENMRP_API_KEY"))`),
        ).toContain(`api_key='YOUR_API_KEY'`);
    });
});

describe('flattenSyntheticSdkNamespace', () => {
    test('unwraps TypeScript docs bucket client property', () => {
        expect(
            flattenSyntheticSdkNamespace(
                'const x = await client.openMRPPublicAPI.createProduct({});',
                'typescript',
            ),
        ).toBe('const x = await client.createProduct({});');
    });

    test('unwraps Python docs bucket attribute', () => {
        expect(
            flattenSyntheticSdkNamespace(
                'response = client.openmrp_public_api.create_product(foo="bar")\n',
                'python',
            ),
        ).toBe('response = client.create_product(foo="bar")\n');
    });

    test('unwraps Go docs bucket field', () => {
        expect(
            flattenSyntheticSdkNamespace(
                'response, err := client.OpenMRPPublicAPI.ListUnits(context.TODO(), params)',
                'go',
            ),
        ).toBe('response, err := client.ListUnits(context.TODO(), params)');
    });
});

describe('getEndpointSnippet', () => {
    test('returns undefined for unknown operations', () => {
        expect(
            getEndpointSnippet('this-operation-id-should-not-exist', 'typescript'),
        ).toBeUndefined();
    });
});

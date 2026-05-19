import { describe, expect, test } from 'bun:test';
import type { SchemaField } from '@/static/apiEndpoints.generated';
import { sanitizeRequestExample } from './sanitizeRequestExample';

describe('sanitizeRequestExample', () => {
    test('omits null for optional fields that would be left out of the request', () => {
        const fields: SchemaField[] = [
            { name: 'sku', type: 'string', description: '', required: true, nullable: false },
            { name: 'type', type: 'string', description: '', required: true, nullable: false },
            {
                name: 'product_line_id',
                type: 'string',
                description: '',
                required: true,
                nullable: true,
            },
            { name: 'category_id', type: 'string', description: '', required: true, nullable: false },
            {
                name: 'portal_visibility',
                type: 'string',
                description: '',
                required: false,
                nullable: false,
            },
        ];

        const out = sanitizeRequestExample(
            {
                sku: 'ALM-2024-1001',
                type: 'sale',
                product_line_id: null,
                category_id: 'ic_01',
                portal_visibility: null,
            },
            fields,
        ) as Record<string, unknown>;

        expect(out).toEqual({
            sku: 'ALM-2024-1001',
            type: 'sale',
            product_line_id: null,
            category_id: 'ic_01',
        });
    });

    test('keeps null for x-nullable-clear fields on PATCH', () => {
        const fields: SchemaField[] = [
            { name: 'sku', type: 'string', description: '', required: false, nullable: false },
            {
                name: 'description',
                type: 'string',
                description: 'Description. Send `null` to clear.',
                required: false,
                nullable: true,
            },
            {
                name: 'notes',
                type: 'string',
                description: 'Notes. Send `null` to clear.',
                required: false,
                nullable: true,
            },
            {
                name: 'portal_visibility',
                type: 'string',
                description: '',
                required: false,
                nullable: false,
            },
        ];

        const out = sanitizeRequestExample(
            {
                sku: 'SKU-002',
                description: null,
                notes: null,
                portal_visibility: null,
            },
            fields,
        ) as Record<string, unknown>;

        expect(out).toEqual({
            sku: 'SKU-002',
            description: null,
            notes: null,
        });
    });

    test('sanitizes nested objects', () => {
        const addressFields: SchemaField[] = [
            { name: 'name', type: 'string', description: '', required: true, nullable: false },
            { name: 'type', type: 'string', description: '', required: false, nullable: false },
            { name: 'country', type: 'string', description: '', required: true, nullable: false },
        ];
        const fields: SchemaField[] = [
            {
                name: 'bill_to_address',
                type: 'object',
                description: '',
                required: true,
                nullable: false,
                properties: addressFields,
            },
        ];

        const out = sanitizeRequestExample(
            {
                bill_to_address: {
                    name: 'Acme Inc.',
                    type: null,
                    country: 'US',
                },
            },
            fields,
        ) as Record<string, unknown>;

        expect(out).toEqual({
            bill_to_address: {
                name: 'Acme Inc.',
                country: 'US',
            },
        });
    });
});

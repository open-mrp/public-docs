import { describe, expect, test } from 'bun:test';
import type { SchemaField } from '@/static/apiEndpoints.generated';
import { sanitizeResponseExample } from './sanitizeResponseExample';

describe('sanitizeResponseExample', () => {
    test('nulls expandable object when include enum does not cover that path', () => {
        const fields: SchemaField[] = [
            { name: 'id', type: 'string', description: '', required: true, nullable: false },
            {
                name: 'role',
                type: 'object',
                description: '',
                required: false,
                nullable: true,
                expandable: true,
            },
        ];
        const example = {
            id: 'usr_1',
            role: { id: 'role_1', name: 'Admin' },
        };

        const out = sanitizeResponseExample(example, fields, undefined, ['permissions']) as Record<
            string,
            unknown
        >;

        expect(out.id).toBe('usr_1');
        expect(out.role).toBeNull();
    });

    test('keeps expandable object when include enum lists that path', () => {
        const fields: SchemaField[] = [
            { name: 'id', type: 'string', description: '', required: true, nullable: false },
            {
                name: 'role',
                type: 'object',
                description: '',
                required: false,
                nullable: true,
                expandable: true,
                properties: [
                    { name: 'id', type: 'string', description: '', required: true, nullable: false },
                ],
            },
        ];
        const example = {
            id: 'usr_1',
            role: { id: 'role_1' },
        };

        const out = sanitizeResponseExample(example, fields, undefined, ['role']) as Record<
            string,
            unknown
        >;

        expect(out.role).toEqual({ id: 'role_1' });
    });

    test('keeps nested expandable field when include enum lists parent path', () => {
        const fields: SchemaField[] = [
            {
                name: 'role',
                type: 'object',
                description: '',
                required: false,
                nullable: true,
                expandable: true,
                properties: [
                    {
                        name: 'permissions',
                        type: 'array',
                        description: '',
                        required: false,
                        nullable: true,
                        expandable: true,
                        itemType: 'string',
                    },
                ],
            },
        ];
        const example = {
            role: {
                permissions: ['inventory:read'],
            },
        };

        const out = sanitizeResponseExample(example, fields, undefined, ['role']) as Record<
            string,
            unknown
        >;
        const role = out.role as Record<string, unknown>;
        expect(role.permissions).toEqual(['inventory:read']);
    });

    test('nulls alwaysNull nested field while preserving parent object', () => {
        const fields: SchemaField[] = [
            {
                name: 'profile',
                type: 'object',
                description: '',
                required: true,
                nullable: false,
                properties: [
                    {
                        name: 'avatar',
                        type: 'object',
                        description: '',
                        required: false,
                        nullable: true,
                        alwaysNull: true,
                    },
                    { name: 'bio', type: 'string', description: '', required: false, nullable: true },
                ],
            },
        ];
        const example = {
            profile: {
                avatar: { url: 'https://x.test/a.png' },
                bio: 'Hello',
            },
        };

        const out = sanitizeResponseExample(example, fields, undefined, []) as Record<
            string,
            unknown
        >;

        expect((out.profile as Record<string, unknown>).avatar).toBeNull();
        expect((out.profile as Record<string, unknown>).bio).toBe('Hello');
    });

    test('strips expansion root from paths for list-shaped responses', () => {
        const fields: SchemaField[] = [
            {
                name: 'data',
                type: 'array',
                description: '',
                required: true,
                nullable: false,
                itemType: 'object',
                properties: [
                    { name: 'id', type: 'string', description: '', required: true, nullable: false },
                    {
                        name: 'role',
                        type: 'object',
                        description: '',
                        required: false,
                        nullable: true,
                        expandable: true,
                    },
                ],
            },
        ];
        const example = {
            data: [{ id: '1', role: { id: 'r' } }],
        };

        const out = sanitizeResponseExample(example, fields, 'data', ['other']) as Record<
            string,
            unknown
        >;

        const row = (out.data as unknown[])[0] as Record<string, unknown>;
        expect(row.id).toBe('1');
        expect(row.role).toBeNull();
    });

    test('does not null expandable fields when endpoint has no include enum', () => {
        const fields: SchemaField[] = [
            {
                name: 'role',
                type: 'object',
                description: '',
                required: false,
                nullable: true,
                expandable: true,
            },
        ];
        const example = { role: { id: 'r' } };

        const out = sanitizeResponseExample(example, fields, undefined, []) as Record<
            string,
            unknown
        >;

        expect(out.role).toEqual({ id: 'r' });
    });
});

import { describe, expect, test } from 'bun:test';
import { extractAuthorization } from './extractPermissions';

describe('extractAuthorization', () => {
    test('reads a single permission', () => {
        const result = extractAuthorization(
            'Lists sales orders.\n\nThis endpoint requires the permission: `sales_orders:read`.',
        );

        expect(result.description).toBe('Lists sales orders.');
        expect(result.authorization).toEqual({
            permissions: ['sales_orders:read'],
            mode: 'one',
            counterparty: { customer: null, supplier: null },
            roleType: null,
        });
    });

    test('reads a comma-separated list as any of', () => {
        const result = extractAuthorization(
            'Searches records.\n\nThis endpoint requires the permissions: `sales_orders:read`, `invoices:read`, `items:read`.',
        );

        expect(result.authorization.permissions).toEqual([
            'sales_orders:read',
            'invoices:read',
            'items:read',
        ]);
        expect(result.authorization.mode).toBe('any');
    });

    test('reads a list joined with "and" as all of', () => {
        const result = extractAuthorization(
            'Merges two customers.\n\nThis endpoint requires the permissions: `customers:update` and `customers:delete`.',
        );

        expect(result.authorization.permissions).toEqual(['customers:update', 'customers:delete']);
        expect(result.authorization.mode).toBe('all');
    });

    test('reads what acting in a customer or supplier account requires', () => {
        const result = extractAuthorization(
            "Lists addresses.\n\nActing in a customer's account requires `customers:read`, and acting in a supplier's account requires `suppliers:read`, instead of the permission this endpoint requires in your own account.\n\nThis endpoint requires the permission: `addresses:read`.",
        );

        expect(result.description).toBe('Lists addresses.');
        expect(result.authorization.permissions).toEqual(['addresses:read']);
        expect(result.authorization.counterparty).toEqual({
            customer: 'customers:read',
            supplier: 'suppliers:read',
        });
    });

    test('reads a counterparty paragraph that names one kind of account', () => {
        const result = extractAuthorization(
            "Retrieves a customer.\n\nActing in a supplier's account requires `suppliers:read` instead of the permission this endpoint requires in your own account.\n\nThis endpoint requires the permission: `customers:read`.",
        );

        expect(result.description).toBe('Retrieves a customer.');
        expect(result.authorization.counterparty).toEqual({
            customer: null,
            supplier: 'suppliers:read',
        });
    });

    test('reads a role type ahead of the permission sentence', () => {
        const result = extractAuthorization(
            'Rotates a key.\n\nThis endpoint requires the `admin` role type. This endpoint requires the permission: `api_keys:update`.',
        );

        expect(result.description).toBe('Rotates a key.');
        expect(result.authorization.roleType).toBe('admin');
        expect(result.authorization.permissions).toEqual(['api_keys:update']);
    });

    test('reads a role type alone', () => {
        const result = extractAuthorization(
            'Lists keys.\n\nThis endpoint requires the `admin` role type.',
        );

        expect(result.description).toBe('Lists keys.');
        expect(result.authorization.roleType).toBe('admin');
        expect(result.authorization.permissions).toEqual([]);
    });

    test('leaves a description without authorization sentences alone', () => {
        const result = extractAuthorization('Returns the API status.');

        expect(result.description).toBe('Returns the API status.');
        expect(result.authorization.permissions).toEqual([]);
        expect(result.authorization.roleType).toBeNull();
    });
});

import { describe, expect, test } from 'bun:test';
import {
    abbreviateTypeId,
    buildTypeIdReplacements,
    findTypeIdsInText,
    mergeSnippetReplacements,
} from '@/lib/typeId';

describe('abbreviateTypeId', () => {
    test('abbreviates standard type IDs', () => {
        expect(abbreviateTypeId('apke_01jm4r6700e3kxb9w2nqh7g5fp')).toBe('apke_01jm...g5fp');
        expect(abbreviateTypeId('un_01jm4r6700f8nwq3v5hx2d9ktp')).toBe('un_01jm...9ktp');
        expect(abbreviateTypeId('rl_01gf7a8200er3ar3pkfrb6kk29')).toBe('rl_01gf...kk29');
    });

    test('returns short values unchanged', () => {
        expect(abbreviateTypeId('your-id')).toBe('your-id');
    });
});

describe('findTypeIdsInText', () => {
    test('finds unique IDs in snippet code', () => {
        const code = `
await client.catalog.units.update('un_01jm4r6700f8nwq3v5hx2d9ktp', {
  base_unit_id: 'un_01jm4r6700f8nwq3v5hx2d9ktp',
});
`;
        expect(findTypeIdsInText(code)).toEqual(['un_01jm4r6700f8nwq3v5hx2d9ktp']);
    });

    test('ignores API key secrets', () => {
        const code = "bearerToken: 'mrp_sk_test_AM4Bjfakeapikey_fakeapikeyUWNXD'";
        expect(findTypeIdsInText(code)).toEqual([]);
    });
});

describe('buildTypeIdReplacements', () => {
    test('maps full IDs to abbreviated display values', () => {
        const id = 'sbac_01jm4r6700f8nwq3v5hx2d9ktp';
        expect(buildTypeIdReplacements(`retrieve('${id}')`)).toEqual({
            [id]: {
                display: 'sbac_01jm...9ktp',
                copy: id,
            },
        });
    });
});

describe('mergeSnippetReplacements', () => {
    test('keeps base replacements when keys overlap', () => {
        const merged = mergeSnippetReplacements(
            { YOUR_API_KEY: { display: 'mrp_sk_...WND', copy: 'full-key' } },
            "client.retrieve('apke_01jm4r6700e3kxb9w2nqh7g5fp')",
        );

        expect(merged.YOUR_API_KEY).toEqual({
            display: 'mrp_sk_...WND',
            copy: 'full-key',
        });
        expect(merged['apke_01jm4r6700e3kxb9w2nqh7g5fp']).toEqual({
            display: 'apke_01jm...g5fp',
            copy: 'apke_01jm4r6700e3kxb9w2nqh7g5fp',
        });
    });
});

import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
    ...nextCoreWebVitals,
    ...nextTypescript,
    {
        ignores: [
            'node_modules/**',
            '.next/**',
            'out/**',
            'build/**',
            'next-env.d.ts',
            '.yalc/**',
            'packages/stainless-sdk-json/**',
            'src/static/*.generated.ts',
        ],
    },
    {
        settings: {
            react: {
                version: '19',
            },
        },
    },
];

export default eslintConfig;

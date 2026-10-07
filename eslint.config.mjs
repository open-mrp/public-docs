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
            // Machine-generated, and the endpoint data alone is ~45MB; parsing it took eslint
            // to a heap OOM. Both patterns, since '**' behaviour at depth zero is
            // matcher-dependent and this is not worth being clever about.
            'src/static/*.generated.ts',
            'src/static/**/*.generated.ts',
            // The endpoint data itself lives in a .generated.js module (with .d.ts types).
            'src/static/*.generated.js',
            'src/static/**/*.generated.js',
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

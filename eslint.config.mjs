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
            // Machine-generated, and the archived API versions under api-versions/ are ~39MB
            // across 15 files. The single-level glob missed those, so eslint parsed the lot and
            // died with a heap OOM. Both patterns, since '**' behaviour at depth zero is
            // matcher-dependent and this is not worth being clever about.
            'src/static/*.generated.ts',
            'src/static/**/*.generated.ts',
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

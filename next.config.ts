import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
    transpilePackages: ['@augno/ui'],
    // Load .mdx doc sources as raw strings so they enter the bundler's module
    // graph. This lets `import()`ing them in fetchPageBySlug trigger Fast
    // Refresh on edits (instead of requiring a manual page reload), while
    // compileMDX still does the actual MDX compilation at runtime. Configured
    // for both webpack (`next dev --webpack`) and Turbopack (`next build`).
    turbopack: {
        rules: {
            '*.mdx': {
                loaders: ['raw-loader'],
                as: '*.js',
            },
        },
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.mdx$/,
            use: 'raw-loader',
        });
        return config;
    },
    async rewrites() {
        return [
            {
                source: '/:path*.md',
                destination: '/api/md/:path*',
            },
        ];
    },
};

module.exports = nextConfig;

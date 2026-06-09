import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
    transpilePackages: ['@augno/ui'],
    // Canonical URLs and the page's actual served path must match exactly so
    // link aggregators (e.g. Hacker News) don't keep rewriting a submitted URL
    // to a differing canonical. With trailingSlash:false, `/foo/` 308-redirects
    // to `/foo`, which is also the canonical we emit — submitted URL, redirect
    // target, and <link rel="canonical"> all converge on the same string.
    trailingSlash: false,
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

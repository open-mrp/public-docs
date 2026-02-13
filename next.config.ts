// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
    transpilePackages: ['@augno/ui'],
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

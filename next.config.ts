// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
    transpilePackages: ['@augno/ui'],
};

module.exports = nextConfig;

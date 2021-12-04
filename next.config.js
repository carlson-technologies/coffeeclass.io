const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
})

module.exports = withMDX({
    pageExtensions: ['js', 'jsx', 'mdx'],
    webpack: (config, { isServer }) => {
        if (isServer) {
            require('./src/scripts/generate-sitemap');
        }
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }
        return config
    },
    async redirects() {
        return [
            {
                source: '/snippets/add-comments-to-nextjs-website',
                destination: '/articles/add-comments-to-nextjs-website',
                permanent: true,
            },
        ]
    },
})
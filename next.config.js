const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
})

module.exports = withMDX({
    pageExtensions: ['js', 'jsx', 'mdx'],
    webpack: (config, { isServer }) => {
        if (isServer) {
            require('./lib/generate-sitemap');
        }

        return config
    }
})
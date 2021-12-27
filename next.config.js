const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
})

module.exports = withMDX({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    webpack: (config, { isServer }) => {
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
            {
                source: '/tutorials/add-firebase-to-flutter-mobile-app',
                destination: '/articles/add-firebase-to-flutter-mobile-app',
                permanent: true,
            },
            {
                source: '/snippets/add-firebase-to-nextjs',
                destination: '/articles/add-firebase-to-nextjs',
                permanent: true,
            },
            {
                source: '/snippets/add-google-analytics-to-nextjs',
                destination: '/articles/add-google-analytics-to-nextjs',
                permanent: true,
            },
            {
                source: '/snippets/add-splitbee-analytics-to-nextjs',
                destination: '/articles/add-splitbee-analytics-to-nextjs',
                permanent: true,
            },
            {
                source: '/snippets/advanced-chakra-ui-do-you-know-all-5',
                destination: '/articles/advanced-chakra-ui-do-you-know-all-5',
                permanent: true,
            },
            {
                source: '/snippets/chakra-ui-mobile-navbar',
                destination: '/articles/chakra-ui-mobile-navbar',
                permanent: true,
            },
            {
                source: '/snippets/create-responsive-navbar-using-chakra-ui',
                destination: '/articles/create-responsive-navbar-using-chakra-ui',
                permanent: true,
            },
            {
                source: '/snippets/flutter-bottom-navigation-bar',
                destination: '/articles/flutter-bottom-navigation-bar',
                permanent: true,
            },
            {
                source: '/snippets/generate-dynamic-sitemap',
                destination: '/articles/generate-dynamic-sitemap',
                permanent: true,
            },
            {
                source: '/snippets/how-to-compare-dates-in-javascript',
                destination: '/articles/how-to-compare-dates-in-javascript',
                permanent: true,
            },
            {
                source: '/snippets/how-to-create-react-native-app',
                destination: '/articles/how-to-create-react-native-app',
                permanent: true,
            },
            {
                source: '/tutorials/java-inheritance-tutorial',
                destination: '/articles/java-inheritance-tutorial',
                permanent: true,
            },
            {
                source: '/snippets/make-div-float-up-hover-css',
                destination: '/articles/make-div-float-up-hover-css',
                permanent: true,
            },
            {
                source: '/snippets/map-function-with-dart-lists',
                destination: '/articles/map-function-with-dart-lists',
                permanent: true,
            },
            {
                source: '/snippets/next-image-position-relative',
                destination: '/articles/next-image-position-relative',
                permanent: true,
            },
            {
                source: '/tutorials/nextjs-crash-course-build-a-developer-portfolio-website',
                destination: '/articles/nextjs-crash-course-build-a-developer-portfolio-website',
                permanent: true,
            },
            {
                source: '/snippets/nextjs-mdx-quickstart',
                destination: '/articles/nextjs-mdx-quickstart',
                permanent: true,
            },
            {
                source: '/tutorials/todo-app-nextjs-chakraui-firebase',
                destination: '/articles/todo-app-nextjs-chakraui-firebase',
                permanent: true,
            },
            {
                source: '/snippets/use-disclosure-menu-chakra-ui',
                destination: '/articles/use-disclosure-menu-chakra-ui',
                permanent: true,
            },
            {
                source: '/snippets/using-react-useeffect',
                destination: '/articles/using-react-useeffect',
                permanent: true,
            },
            {
                source: '/learn',
                destination: '/courses',
                permanent: true,
            },
        ]
    },
})

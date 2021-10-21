const fs = require('fs');
const globby = require('globby');
const prettier = require('prettier');

(async () => {
    const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
    const pages = await globby([
        'pages/*.js',
        'content/**/*.mdx',
        '!pages/_*.js',
        '!pages/api'
    ]);
    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <!--Base URL-->
            <url>
                <loc>https://www.coffeeclass.io</loc>
            </url>

            <!--Page URLS In Order-->
            <url>
                <loc>https://www.coffeeclass.io/authors</loc>
            </url>

            <url>
                <loc>https://www.coffeeclass.io/getting-started</loc>
            </url>

            <url>
                <loc>https://www.coffeeclass.io/learn</loc>
            </url>

            <url>
                <loc>https://www.coffeeclass.io/learn/chakra-ui</loc>
            </url>

            <url>
                <loc>https://www.coffeeclass.io/legal/disclaimer</loc>
            </url>

            <url>
                <loc>https://www.coffeeclass.io/legal/privacy</loc>
            </url>

            <url>
                <loc>https://www.coffeeclass.io/legal/terms</loc>
            </url>

            <url>
                <loc>https://www.coffeeclass.io/snippets</loc>
            </url>

            <url>
                <loc>https://www.coffeeclass.io/tags</loc>
            </url>

            <url>
                <loc>https://www.coffeeclass.io/tutorials</loc>
            </url>

            <url>
                <loc>https://www.coffeeclass.io/about</loc>
            </url>

            <url>
                <loc>https://www.coffeeclass.io/search</loc>
            </url>
                  
            <!--Dynamic URLS-->
            ${pages
            .map((page) => {
                const path = page
                    .replace('pages', '')
                    .replace('content', '')
                    .replace('.js', '')
                    .replace('.mdx', '');
                const route = path === '/index' ? '' : path;
                if (path === '/404') {
                    return;
                }
                return `
                        <url>
                            <loc>${`https://www.coffeeclass.io${route}`}</loc>
                        </url>
                    `;
            })
            .join('')}
        </urlset>
    `;

    const formatted = prettier.format(sitemap, {
        ...prettierConfig,
        parser: 'html'
    });

    // eslint-disable-next-line no-sync
    fs.writeFileSync('public/sitemap.xml', formatted);
})();
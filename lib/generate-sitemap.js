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
            <url>
                <loc>https://coffeeclass.io/legal/disclaimer</loc>
            </url>

            <url>
                <loc>https://coffeeclass.io/legal/privacy</loc>
            </url>

            <url>
                <loc>https://coffeeclass.io/legal/terms</loc>
            </url>

            <url>
                <loc>https://coffeeclass.io/snippets</loc>
            </url>

            <url>
                <loc>https://coffeeclass.io/tags</loc>
            </url>

            <url>
                <loc>https://coffeeclass.io/tutorials</loc>
            </url>     
                   
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
                            <loc>${`https://coffeeclass.io${route}`}</loc>
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
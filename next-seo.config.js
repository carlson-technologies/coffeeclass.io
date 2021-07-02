const title = 'Free Programming Tutorials And Advice | Coffeeclass'
const description = 'Programming advice, tutorials, snippets on python, javascript, algorithms, next.js, react, and more - learn for free on Coffeeclass.'

const SEO = {
    title,
    description,
    canonical: 'https://coffeeclass.io',
    openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: 'https://coffeeclass.io',
        title,
        description,
        images: [
            {
                url: 'https://coffeeclass.io/favicons/logo-white-bg.png',
                alt: title
            }
        ]
    },
    twitter: {
        handle: '@bjmncrlsn',
        site: '@bjmncrlsn',
        cardType: 'summary_large_image'
    }
}

export default SEO
const title = 'Coffeeclass - Learn to code and ship your app idea.'
const description = 'Browse a variety of programming tutorials and snippets on Coffeclass.'

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
                url: 'https://coffeeclass.io/images/logo.png',
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
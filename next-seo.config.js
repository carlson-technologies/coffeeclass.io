const title = 'Free Programming Tutorials And Advice | coffeeclass.io'
const description = 'Programming advice, tutorials, snippets on python, javascript, algorithms, Next.js, React, and more - learn for free on coffeeclass.io.'

const SEO = {
    title,
    description,
    canonical: 'https://www.coffeeclass.io',
    openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: 'https://www.coffeeclass.io',
        title,
        description,
        images: [
            {
                url: 'https://www.coffeeclass.io/logo-white-bg.png',
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
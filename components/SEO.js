import { NextSeo, ArticleJsonLd } from 'next-seo'

const SEO = ({ title, summary, publishedAt, url, image, author }) => {
    const date = new Date(publishedAt).toISOString()
    const featuredImage = {
        url: `https://coffeeclass.io${image}`,
        alt: title
    }

    return (
        <>
            <NextSeo
                title={`${title} – CoffeeClass`}
                description={summary}
                canonical={url}
                openGraph={{
                    type: 'article',
                    article: {
                        publishedTime: date
                    },
                    url,
                    title,
                    description: summary,
                    images: [featuredImage]
                }}
            />
            <ArticleJsonLd
                authorName={author}
                dateModified={date}
                datePublished={date}
                description={summary}
                images={[featuredImage]}
                publisherLogo="/static/favicons/logo.png"
                publisherName="Benjamin Carlson"
                title={title}
                url={url}
            />
        </>
    )
}

export default SEO
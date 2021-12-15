import { NextSeo, ArticleJsonLd } from 'next-seo'

const SEO = ({ title, seoDescription, publishedAt, updatedAt, url, author, featureImg, slug }) => {
    const date = new Date(publishedAt).toISOString()
    const featuredImage = {
        url: featureImg ? `https://www.coffeeclass.io/content${slug}/${featureImg}` : `https://www.coffeeclass.io/logo-white-bg.png`,
        alt: title,
    }

    return (
        <>
            <NextSeo
                title={title}
                description={seoDescription}
                canonical={url}
                openGraph={{
                    type: 'article',
                    article: {
                        publishedTime: date
                    },
                    url,
                    title,
                    description: seoDescription,
                    images: [featuredImage]
                }}
            />
            <ArticleJsonLd
                authorName={author}
                dateModified={updatedAt ? updatedAt : date}
                datePublished={date}
                description={seoDescription}
                images={[featuredImage]}
                publisherLogo="/logo-white-bg.png"
                publisherName="coffeeclass.io"
                title={title}
                url={url}
            />
        </>
    )
}

export default SEO
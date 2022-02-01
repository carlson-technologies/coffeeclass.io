import { NextSeo, ArticleJsonLd } from 'next-seo'
import useSWR from "swr";
import fetcher from "../scripts/fetcher";

const SEO = ({ title, description, publishedAt, updatedAt, url, author, tags, image,slug }) => {
    const date = new Date(publishedAt).toISOString()
    const featuredImage = {
        url: image? `https://www.coffeeclass.io/content/articles/${slug}/${image}`: 
        "https://www.coffeeclass.io/logo-white-bg.png",
        alt: title,
    }

    const { data } = useSWR(
        `/api/getAuthor?authorSlug=${author.replace(".mdx", "")}`,
        fetcher
    );

    return (
        <>
            <NextSeo
                title={title}
                description={description}
                canonical={url}
                openGraph={{
                    type: 'article',
                    article: {
                        publishedTime: date,
                        modifiedTime: updatedAt,
                    },
                    url,
                    title,
                    tags,
                    description: description,
                    images: [featuredImage]
                }}
            />
            <ArticleJsonLd
                authorName={data?.data?.data?.name}
                datePublished={date}
                dateModified={updatedAt ? updatedAt : date}
                description={description}
                images={[featuredImage.url]}
                publisherLogo="/logo-white-bg.png"
                publisherName="coffeeclass.io"
                title={title}
                url={url}
            />
        </>
    )
}

export default SEO
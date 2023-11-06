import { NextSeo, ArticleJsonLd } from 'next-seo'
import useSWR from 'swr'

import fetcher from '@/lib/scripts/fetcher'

interface Props {
  title?: string
  description?: string
  publishedAt?: string
  updatedAt?: string
  url?: string
  author?: string
}

const SEO = ({ title, description, publishedAt, updatedAt, url, author }: Props) => {
  const date = new Date(publishedAt).toISOString()
  const featuredImage = {
    url: 'https://www.coffeeclass.io/logo-white-bg.png',
    alt: title
  }

  const { data }: { data?: any } = useSWR(
    `/api/getAuthor?authorSlug=${author.replace('.mdx', '')}`,
    fetcher
  )

  const authorName = data?.data?.data?.name

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
            modifiedTime: updatedAt
          },
          url,
          title,
          description: description,
          images: [featuredImage]
        }}
      />
      <ArticleJsonLd
        authorName={authorName}
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

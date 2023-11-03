import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Heading,
  Flex,
  useColorModeValue,
  Box,
  Text,
  Divider,
  AspectRatio,
  Skeleton
} from '@chakra-ui/react'
import matter from 'gray-matter'
import NextImage from 'next/image'
import Link from 'next/link'
import { serialize } from 'next-mdx-remote/serialize'
import React from 'react'

import fs from 'fs'
import path from 'path'

import ArticleCard from '@/components/ArticleCard'
import Container from '@/components/Container'
import { contentFilePaths, CONTENT_PATH, tagsFilePaths, TAGS_PATH } from '@/lib/scripts/mdx-utils'

interface Props {
  articles: {
    content: string
    data: {
      [key: string]: any
    }
    filePath: string
  }[]
  source: any
  frontMatter: {
    [key: string]: any
  }
}

export default function Index({ articles, frontMatter }: Props) {
  const [loaded, setLoaded] = React.useState(false)
  const url = `https://www.coffeeclass.io/tags/${frontMatter.title}`
  const title = `${frontMatter.title}`
  const description = `Articles relating to ${frontMatter.title} on coffeeclass.io.${
    frontMatter.description ? ` ${frontMatter.description}` : ''
  }`

  const filteredArticles = articles.filter(article => {
    return article.data.tags.includes(frontMatter.title)
  })

  const color = useColorModeValue('gray.500', 'gray.400')
  const iconColor = useColorModeValue('gray.700', 'gray.300')

  return (
    <Container title={title} description={description} url={url}>
      <Box flexDir="column" mx="auto" px={4} mt={10} maxW={1000}>
        <Box as="header" mt={10} mb={10} px={4} maxW={1000} justifySelf="center">
          <div className="flex justify-center items-center">
            {frontMatter.image && (
              <Box p={4} borderRadius={5}>
                <Box w={50} h={50} mx="auto">
                  <AspectRatio ratio={1}>
                    <Skeleton isLoaded={loaded}>
                      <NextImage
                        src={`/logos/${frontMatter.image}`}
                        alt={frontMatter.image}
                        layout="fill"
                        onLoad={() => setLoaded(true)}
                      />
                    </Skeleton>
                  </AspectRatio>
                </Box>
              </Box>
            )}
            <Heading
              as="h1"
              size="xl"
              textTransform="uppercase"
              textAlign="center"
              color={useColorModeValue('brand_one.600', 'brand_one.500')}
            >
              #{frontMatter.title}
            </Heading>
            {frontMatter.url && (
              <Link href={frontMatter.url} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon mx="2px" ml={2} color={iconColor} />
              </Link>
            )}
          </div>
          {frontMatter?.description && (
            <Heading as="h2" size="md" textAlign="center" color={color} mt={2}>
              {frontMatter.description}
            </Heading>
          )}
        </Box>
      </Box>
      <Divider />
      <Flex flexDir="column">
        <Box px={4} mt={10} maxW={1000} mx="auto" w="100%">
          <Text
            as="small"
            textTransform="uppercase"
            mt={4}
            mb={1}
            fontFamily="lato"
            color={useColorModeValue('gray.600', 'gray.400')}
            fontSize="sm"
          >
            {filteredArticles.length} article{filteredArticles.length > 1 && 's'}
          </Text>
          <Heading as="h1" size="2xl" fontFamily="lato" mb={2} fontWeight="medium">
            Articles
          </Heading>
        </Box>
        <Flex flexDir="column" px={[2, 2, 2, 6, 10, 12]} mx="auto">
          {filteredArticles.map((post, index) => (
            <ArticleCard key={index} article={post} />
          ))}
        </Flex>
      </Flex>
    </Container>
  )
}

export const getStaticProps = async ({
  params
}: {
  params: {
    tag: string
  }
}) => {
  const tagsPath = path.join(TAGS_PATH, `${params.tag}.mdx`)
  const source = fs.readFileSync(tagsPath)
  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    scope: data
  })

  const articles = contentFilePaths.map(filePath => {
    const source = fs.readFileSync(path.join(CONTENT_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath
    }
  })

  articles.sort(
    (a, b) => Number(new Date(b.data.publishedAt)) - Number(new Date(a.data.publishedAt))
  )

  return {
    props: {
      articles,
      source: mdxSource,
      frontMatter: {
        ...data
      }
    }
  }
}

export const getStaticPaths = async () => {
  const paths = tagsFilePaths
    // Remove file extensions for page paths
    .map(path => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map(tag => ({ params: { tag } }))

  return {
    paths,
    fallback: false
  }
}

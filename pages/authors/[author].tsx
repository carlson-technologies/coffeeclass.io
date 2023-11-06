import {
  Heading,
  Flex,
  Tag,
  Link,
  Text,
  useColorModeValue,
  Box,
  SkeletonCircle
} from '@chakra-ui/react'
import matter from 'gray-matter'
import NextImage from 'next/image'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeo } from 'next-seo'
import { useState } from 'react'

import fs from 'fs'
import path from 'path'

import ArticleCard from '@/components/ArticleCard'
import Container from '@/components/Container'
import {
  contentFilePaths,
  CONTENT_PATH,
  authorsFilePaths,
  AUTHORS_PATH
} from '@/lib/scripts/mdx-utils'

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
  filePath: string
  content: string
}

export default function Index({ articles, frontMatter, filePath, content }: Props) {
  const url = `https://www.coffeeclass.io/authors/${frontMatter.slug}`
  const title = `${frontMatter.name} | coffeeclass.io`
  const description = `coffeeclass.io articles written by ${frontMatter.name}. ${frontMatter.description}`

  const [loaded, setLoaded] = useState(false)
  const color = useColorModeValue('gray.500', 'gray.400')

  // loop through articles and if the author slug matches frontMatter.author add it
  const filteredArticles = articles.filter(article => {
    return article.data.author === filePath
  })

  return (
    <Container>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
          type: 'profile',
          profile: {
            firstName: `${frontMatter.name.split(' ')[0]}`,
            lastName: `${frontMatter.name.split(' ')[1]}`
          },
          images: [
            {
              url: `https://www.coffeeclass.io/authors/${frontMatter?.image}`,
              alt: `${frontMatter.name}'s avatar`
            }
          ]
        }}
      />
      <Flex flexDir="column">
        <Box as="header">
          <Flex
            flexDir="column"
            bgGradient={`linear(to-r,${useColorModeValue(
              'gray.50',
              'gray.600'
            )},${useColorModeValue('gray.200', 'gray.800')},${useColorModeValue(
              'gray.300',
              'gray.900'
            )})`}
            pb={10}
          >
            <Box px={4}>
              <Flex justifyContent="center" mt={50} mb={2}>
                <SkeletonCircle w="150px" h="150px" isLoaded={loaded}>
                  <div>
                    <NextImage
                      alt={`${frontMatter.name}'s avatar`}
                      src={`/authors/${frontMatter?.image}`}
                      width={150}
                      height={150}
                      objectFit="cover"
                      onLoad={() => setLoaded(true)}
                      className="avatar"
                    />
                  </div>
                </SkeletonCircle>
              </Flex>
              <Heading
                as="h1"
                size="2xl"
                textAlign="center"
                letterSpacing="tight"
                color={useColorModeValue('brand_one.600', 'brand_one.500')}
              >
                {frontMatter.name}
              </Heading>
              <Text textAlign="center" color={color} fontSize="xl">
                {content}
              </Text>
              <Flex my={4} justifyContent="center" h={5} wrap="wrap">
                {frontMatter?.links?.website && (
                  <Link
                    href={frontMatter?.links?.website}
                    _hover={{ textDecor: 'none' }}
                    mr={2}
                    mb={2}
                    isExternal
                  >
                    <Tag size="lg" transition="margin .2s ease-in-out" _hover={{ mt: '-2' }}>
                      Website
                    </Tag>
                  </Link>
                )}

                {frontMatter?.links?.github && (
                  <Link
                    href={frontMatter?.links?.github}
                    _hover={{ textDecor: 'none' }}
                    mr={2}
                    mb={2}
                    isExternal
                  >
                    <Tag size="lg" transition="margin .2s ease-in-out" _hover={{ mt: '-2' }}>
                      GitHub
                    </Tag>
                  </Link>
                )}

                {frontMatter?.links?.twitter && (
                  <Link
                    href={frontMatter?.links?.twitter}
                    _hover={{ textDecor: 'none' }}
                    mr={2}
                    mb={2}
                    isExternal
                  >
                    <Tag size="lg" transition="margin .2s ease-in-out" _hover={{ mt: '-2' }}>
                      Twitter
                    </Tag>
                  </Link>
                )}

                {frontMatter?.links?.facebook && (
                  <Link
                    href={frontMatter?.links?.facebook}
                    _hover={{ textDecor: 'none' }}
                    mr={2}
                    mb={2}
                    isExternal
                  >
                    <Tag size="lg" transition="margin .2s ease-in-out" _hover={{ mt: '-2' }}>
                      Facebook
                    </Tag>
                  </Link>
                )}

                {frontMatter?.links?.linkedin && (
                  <Link
                    href={frontMatter?.links?.linkedin}
                    _hover={{ textDecor: 'none' }}
                    mr={2}
                    mb={2}
                    isExternal
                  >
                    <Tag size="lg" transition="margin .2s ease-in-out" _hover={{ mt: '-2' }}>
                      LinkedIn
                    </Tag>
                  </Link>
                )}

                {frontMatter?.links?.youtube && (
                  <Link
                    href={frontMatter?.links?.youtube}
                    _hover={{ textDecor: 'none' }}
                    mr={2}
                    mb={2}
                    isExternal
                  >
                    <Tag
                      size="lg"
                      transition="margin .2s ease-in-out"
                      _hover={{ mt: '-2' }}
                      mr={2}
                      mb={2}
                    >
                      YouTube
                    </Tag>
                  </Link>
                )}
              </Flex>
            </Box>
          </Flex>

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
        </Box>
      </Flex>
    </Container>
  )
}

export const getStaticProps = async ({ params }: { params: any }) => {
  const authorsPath = path.join(AUTHORS_PATH, `${params.author}.mdx`)
  const source = fs.readFileSync(authorsPath)
  const { content, data } = matter(source)

  // get the filePath in the format ben-carlson.mdx
  const filePath = path.basename(authorsPath)

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
      filePath,
      content,
      frontMatter: {
        ...data
      }
    }
  }
}

export const getStaticPaths = async () => {
  const paths = authorsFilePaths
    // Remove file extensions for page paths
    .map(path => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map(author => ({ params: { author } }))

  return {
    paths,
    fallback: false
  }
}

import { Heading, Flex, Text, useColorModeValue, Wrap, Box, Link } from '@chakra-ui/react'
import matter from 'gray-matter'
import NextLink from 'next/link'
import { useState } from 'react'

import fs from 'fs'
import path from 'path'

import ArticleCard from '@/components/ArticleCard'
import Container from '@/components/Container'
import Search from '@/components/navigation/Search'
import Pagination from '@/components/Pagination'
import { contentFilePaths, CONTENT_PATH } from '@/lib/scripts/mdx-utils'

const url = 'https://www.coffeeclass.io/articles'
const title = 'Articles'
const description = 'Read all coffeeclass.io articles on programming and computer science for free.'

type Post = {
  content: string
  data: {
    [key: string]: any
  }
  filePath: string
}

interface Props {
  posts: Post[]
}

const tags = ['react', 'flutter', 'chakra-ui', 'firebase', 'terminal', 'mdx', 'dart', 'nextjs']

export default function Index({ posts }: Props) {
  const color = useColorModeValue('gray.500', 'gray.400')
  const color2 = useColorModeValue('gray.500', 'gray.400')
  const color3 = useColorModeValue('gray.700', 'gray.300')
  const bgColor = useColorModeValue('gray.100', 'gray.700')

  const [sliceStart, setSliceStart] = useState(0)
  const [sliceEnd, setSliceEnd] = useState(10)

  return (
    <Container title={title} description={description} url={url} selected="article">
      <Flex flexDir="column" px={[2, 2, 2, 6, 10, 12]}>
        <Text
          as="small"
          textTransform="uppercase"
          mt={8}
          mb={1}
          fontFamily="lato"
          color={useColorModeValue('gray.600', 'gray.400')}
          fontSize="sm"
        >
          {posts.length} articles
        </Text>
        <Heading
          as="h1"
          size="2xl"
          fontFamily="lato"
          mb={2}
          fontWeight="medium"
          color={useColorModeValue('gray.800', 'gray.300')}
        >
          Articles
        </Heading>
        <Flex>
          <Flex flexDir="column">
            {sliceStart >= 20 && (
              <Box bgColor={bgColor} m={4} p={5} borderRadius={15}>
                <Text fontSize="lg" color={color3}>
                  Looking for a specific article? Try a <Search is404 />!
                </Text>
              </Box>
            )}

            {posts.slice(sliceStart, sliceEnd).map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </Flex>
          <Flex display={['none', 'none', 'none', 'none', 'none', 'flex']} flexDir="column" w={200}>
            <Text
              mb={2}
              textTransform="uppercase"
              color={useColorModeValue('gray.600', 'gray.400')}
              fontSize="sm"
              fontWeight="semibold"
            >
              Browse Popular Tags
            </Text>
            <Wrap>
              {tags.map((tag, index) => {
                return (
                  <Link
                    as={NextLink}
                    key={index}
                    href={`/tags/${tag}`}
                    color={color}
                    fontSize="sm"
                    fontWeight="semibold"
                    _hover={{
                      textDecor: 'none'
                    }}
                  >
                    <Box
                      px={3}
                      py={1}
                      border="1px"
                      borderRadius={5}
                      borderColor={color2}
                      transition=".1s background-color ease-in-out"
                      _hover={{
                        backgroundColor: color2,
                        color: 'white'
                      }}
                    >
                      #{tag}
                    </Box>
                  </Link>
                )
              })}
              <Link
                as={NextLink}
                href={`/tags`}
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize="sm"
                fontWeight="semibold"
                _hover={{
                  textDecor: 'none'
                }}
              >
                <Box
                  px={3}
                  py={1}
                  border="1px"
                  borderRadius={5}
                  borderColor={useColorModeValue('gray.500', 'gray.400')}
                  transition=".1s background-color ease-in-out"
                  backgroundColor={useColorModeValue('gray.500', 'gray.400')}
                  color="white"
                  _hover={{
                    backgroundColor: 'transparent',
                    color: useColorModeValue('black', 'white')
                  }}
                >
                  View All
                </Box>
              </Link>
            </Wrap>
          </Flex>
        </Flex>
        <Pagination
          total={posts.length}
          sliceStart={sliceStart}
          sliceEnd={sliceEnd}
          setSliceStart={setSliceStart}
          setSliceEnd={setSliceEnd}
        />
      </Flex>
    </Container>
  )
}

export function getStaticProps() {
  const posts = contentFilePaths.map(filePath => {
    const source = fs.readFileSync(path.join(CONTENT_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath
    }
  })

  posts.sort((a, b) => Number(new Date(b.data.publishedAt)) - Number(new Date(a.data.publishedAt)))

  return { props: { posts } }
}

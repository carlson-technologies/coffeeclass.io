import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Heading,
  Flex,
  Button,
  Text,
  Box,
  useColorMode,
  useColorModeValue,
  SimpleGrid,
  Divider,
  Link,
  Image
} from '@chakra-ui/react'
import matter from 'gray-matter'
import NextLink from 'next/link'

import fs from 'fs'
import path from 'path'

import ArticleCard from '../components/ArticleCard'
import Container from '../components/Container'
import CourseCard from '../components/courses/CourseCard'
import Hero from '../components/Hero'
import { contentFilePaths, CONTENT_PATH } from '../lib/scripts/mdx-utils'

const data = {
  routes: [
    {
      title: 'Chakra UI',
      path: '/courses/chakra-ui',
      slug: 'chakra-ui',
      image: 'chakra-ui.png',
      colorLight: 'teal.100',
      colorDark: 'teal.500',
      description:
        'Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.'
    },
    {
      title: 'Data Structures',
      path: '/courses/data-structures',
      slug: 'data-structures',
      image: 'ds.png',
      colorLight: 'purple.100',
      colorDark: 'purple.500',
      description:
        'The fundamentals of compute science. Learn every data structure you need to ace your college DS classes or coding interviews.'
    }
  ]
}

const url = 'https://www.coffeeclass.io/'
const title = 'coffeeclass.io Home'

interface Props {
  posts: {
    content: string
    data: {
      [key: string]: any
    }
    filePath: string
  }[]
}

export default function Index({ posts }: Props) {
  const { colorMode } = useColorMode()
  const bgImage = {
    light: 'linear-gradient(to bottom,rgba(255,255,255, 0),rgba(255,255,255, 1) 90%)',
    dark: ''
  }
  const logoType = useColorModeValue('dark', 'light')

  return (
    <Container title={title} url={url} selected="home">
      <Flex flexDir="column" maxW="100vw">
        <Flex flexDir="column" as="section">
          <Hero />
        </Flex>
        <Box backgroundImage={bgImage[colorMode]} w="100%" h="2em" mt="-2em" />

        <div className="flex items-center flex-wrap mx-auto text-center justify-center space-x-8 px-4">
          <NextLink href={`/tags/nextjs`} passHref>
            <Image
              alt=""
              width="75px"
              height="75px"
              objectFit="contain"
              src={`/hero/next-${logoType}.svg`}
            />
          </NextLink>

          <NextLink href={`/tags/dart`} passHref>
            <Image alt="" width="75px" height="75px" objectFit="contain" src="/hero/dart.svg" />
          </NextLink>

          <NextLink href={`/tags/javascript`} passHref>
            <Image alt="" width="50px" height="50px" objectFit="contain" src="/hero/js.svg" />
          </NextLink>

          <NextLink href={`/tags/github`} passHref>
            <Image alt="" width="75px" height="75px" objectFit="contain" src="/hero/github.svg" />
          </NextLink>

          <NextLink href={`/tags/firebase`} passHref>
            <Image alt="" width="75px" height="75px" objectFit="contain" src="/hero/firebase.svg" />
          </NextLink>

          <NextLink href={`/tags/algolia`} passHref className="hidden sm:block">
            <Image alt="" width="75px" height="75px" objectFit="contain" src="/hero/algolia.svg" />
          </NextLink>

          <NextLink href={`/tags/css`} passHref className="hidden md:block">
            <Image alt="" width="60px" height="60px" objectFit="contain" src="/hero/css3.svg" />
          </NextLink>
        </div>

        <p className="text-center text-gray-500 text-sm font-semibold mt-2">Learn 30+ topics</p>

        <Divider my={8} w="80%" mx="auto" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 max-w-[1400px] mx-auto w-full">
          <div className="col-span-2">
            <Box>
              <p className="text-2xl mb-2 text-center font-semibold mt-8 text-gray-700 dark:text-gray-300 px-4">
                Latest Articles &mdash;
              </p>
            </Box>

            <Flex flexDir="column" px={[2, 2, 2, 6, 10, 12]} mx="auto">
              {posts.slice(0, 6).map((post, index) => (
                <ArticleCard key={index} article={post} />
              ))}
            </Flex>
          </div>
          <div>
            <Box>
              <p className="text-2xl text-center mb-2 font-semibold mt-8 text-gray-700 dark:text-gray-300 px-4">
                Latest Courses &mdash;
              </p>
            </Box>

            <SimpleGrid gap={2}>
              {data.routes.map((course: any, index: number) => {
                return <CourseCard course={course} key={index} />
              })}
            </SimpleGrid>
          </div>
        </div>

        {/* <div className="space-x-0 md:space-x-4 mt-4 md:mt-0 mx-auto flex flex-col md:flex-row">
          <Button
            as={NextLink}
            w={300}
            mx="auto"
            href={`/courses`}
            rightIcon={<ChevronRightIcon />}
            size="lg"
            variant="solid"
            mt={8}
            colorScheme="brand_one"
          >
            All Courses
          </Button>
          <Button
            as={NextLink}
            w={300}
            mx="auto"
            href={`/articles`}
            rightIcon={<ChevronRightIcon />}
            size="lg"
            variant="solid"
            mt={8}
            colorScheme="brand_three"
          >
            All Articles
          </Button>
        </div> */}

        <Divider mt={20} w="80%" mx="auto" />

        <Flex
          as="section"
          flexDir="column"
          align="center"
          justify="space-around"
          mx={2}
          px={2}
          my={8}
        >
          <Heading as="h2" size="xl" letterSpacing="tight" mb={2} textTransform="uppercase">
            Write For Us
          </Heading>
          <Text fontSize="xl" mt={2} mb={4} textAlign="center">
            Like to write code? Try writing about it!
          </Text>
          <Link
            isExternal
            href="https://benjamincarlson.notion.site/Contributing-to-Coffeeclass-io-27ab5e894368424a9c86a7f11555514b"
          >
            <Button colorScheme="brand_one" w={['100%', '100%', '100%', 200, 200, 200]}>
              See How
            </Button>
          </Link>
        </Flex>
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

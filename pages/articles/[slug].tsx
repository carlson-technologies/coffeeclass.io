import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Text,
  Link,
  Flex,
  useColorMode,
  Divider,
  Box,
  Heading,
  useColorModeValue,
  AspectRatio,
  Image,
  Icon,
  useBreakpointValue
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import matter from 'gray-matter'
import mdxPrism from 'mdx-prism'
import { useRouter } from 'next/router'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useState, useEffect } from 'react'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkCodeTitles from 'remark-flexible-code-titles'
import useSWR, { SWRResponse } from 'swr'

import fs from 'fs'
import path from 'path'

import Container from '@/components/Container'
import CarbonAd from '@/components/content/Ad'
import EmbeddedVideo from '@/components/EmbeddedVideo'
import HeadersAccordion from '@/components/HeadersAccordion'
import HeadersSidebar from '@/components/HeadersSidebar'
import MDXComponents from '@/components/MDXComponents'
import RelatedPosts from '@/components/RelatedPosts'
import SEO from '@/components/SEO'
import WrittenBy from '@/components/WrittenBy'
import WrittenByAside from '@/components/WrittenByAside'
import fetcher from '@/lib/scripts/fetcher'
import getEmbedId from '@/lib/scripts/get-embed-id'
import getHeaders from '@/lib/scripts/get-headings'
import { contentFilePaths, CONTENT_PATH } from '@/lib/scripts/mdx-utils'
import TimeAgo from '@/lib/scripts/time-ago'

interface Props {
  source: MDXRemoteSerializeResult
  frontMatter: {
    [key: string]: any
  }
  posts: {
    data: {
      title: string
      publishedAt: string
      logoImage: string
      tags: string[]
    }
    filePath: string
  }[]
}

export default function PostPage({ source, frontMatter, posts }: Props) {
  const { colorMode } = useColorMode()
  const color = {
    light: 'gray.600',
    dark: 'gray.500'
  }
  const color1 = {
    light: 'gray.600',
    dark: 'gray.500'
  }
  const router = useRouter()
  const slug = router.query.slug

  const {
    data
  }:
    | SWRResponse<{
        data: {
          data: {
            name: string
          }
        }
      }>
    | any = useSWR(`/api/getAuthor?authorSlug=${frontMatter.author.replace('.mdx', '')}`, fetcher)

  // use useBreakpointValue to set the size to xl on small screens and 2xl on larger screens above 1000px
  const size = useBreakpointValue({ lg: 'lg', xl: 'xl', '2xl': '2xl' })

  const [width, setWidth] = useState(0)

  const handleScroll = () => {
    let scrollTop = window.scrollY
    let docHeight =
      document.body.offsetHeight - document?.getElementById('end-content')?.offsetHeight
    let winHeight = window.innerHeight
    let scrollPercent = scrollTop / (docHeight - winHeight)
    let scrollPercentRounded = Math.round(scrollPercent * 100)
    setWidth(scrollPercentRounded)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const bgColor = useColorModeValue('gray.100', 'gray.700')
  const h1ColorGradient = useColorModeValue(
    'linear(to-r, gray.700, gray.700)',
    'linear(to-r, gray.200, yellow.400, pink.200, red.200)'
  )

  return (
    <Container selected="article">
      <SEO url={`https://www.coffeeclass.io${slug}`} {...frontMatter} />
      <Box
        h={1}
        as="div"
        bg="brand_one.500"
        pos="fixed"
        top={0}
        left={0}
        zIndex={15}
        w={`${width}%`}
        transition="width .3s ease-in-out"
      />

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* w is 800 + 300 */}
        <Flex
          flexDir="column"
          w="100%"
          maxW={[800, 800, 800, 800, 800, 1100]}
          px={4}
          py={4}
          mx="auto"
        >
          <Box bgColor={bgColor} w="fit-content" mr={2} p={4} mb={2} borderRadius={5}>
            <AspectRatio ratio={1} w={50}>
              <Image src={`/logos/${frontMatter.logoImage}`} alt={frontMatter.title} />
            </AspectRatio>
          </Box>
          <Heading
            as="h1"
            size={size}
            bgGradient={h1ColorGradient}
            bgClip="text"
            fontWeight="bold"
            lineHeight="1.1"
            letterSpacing="tight"
            fontFamily="Recursive"
          >
            {frontMatter.title}
          </Heading>
        </Flex>

        <Flex mx="auto" maxW={[800, 800, 800, 800, 800, 1100]}>
          {/* main content */}
          <Flex flexDir="column" mx="auto" w="100%" overflowX="scroll" px={4} maxW={800}>
            <Flex color={color[colorMode]} alignItems="center" fontFamily="Recursive">
              {frontMatter.readingTime.text}{' '}
              <span className="font-bold text-2xl mx-1">&middot;</span>{' '}
              {frontMatter.readingTime.words} words{' '}
              <span className="font-bold text-2xl mx-1">&middot;</span> Shared{' '}
              {TimeAgo(new Date(frontMatter.publishedAt))} by
              <Flex
                _hover={{ borderBottomColor: 'blue.500' }}
                as="span"
                borderBottom="2px solid"
                borderBottomColor="transparent"
                transition="border-bottom-color .2s ease-in-out"
                ml={1}
              >
                <Link
                  href={`
                  /authors/${frontMatter.author.replace('.mdx', '')}
                `}
                  color="blue.500"
                  _hover={{ TextDecoder: 'none' }}
                >
                  {data?.data?.data?.name}
                </Link>
              </Flex>
              {frontMatter.updatedAt && (
                <>
                  <span className="font-bold text-2xl mx-1">&middot;</span> Updated{' '}
                  {TimeAgo(new Date(frontMatter.updatedAt))}
                </>
              )}
            </Flex>
            <Text fontSize="xl" my={2}>
              <strong className="text-brand_one-500">Article Summary:</strong>{' '}
              <Text as="span" color={color1[colorMode]}>
                {frontMatter.description}
              </Text>
            </Text>
            <Box
              display={['none', 'none', 'none', 'none', 'none', 'block']}
              className="my-8 h-1.5 bg-gray-200 dark:bg-gray-700 rounded"
            />
            {frontMatter.youtubeId && (
              <Flex justify="center" my={2}>
                <EmbeddedVideo src={getEmbedId(frontMatter?.youtubeId)} maxW={800} />
              </Flex>
            )}
            <Box display={['block', 'block', 'block', 'block', 'block', 'none']}>
              <HeadersAccordion headers={frontMatter?.headers} />
            </Box>
            <Box my={2}>
              <CarbonAd />
            </Box>
            <Box id="main-content">
              <MDXRemote {...source} components={MDXComponents as any} />
            </Box>
            <Link
              textDecor="underline"
              _hover={{ opacity: 0.8 }}
              w="fit-content"
              href={`https://github.com/carlson-technologies/coffeeclass.io/blob/live/content/articles/${slug}.mdx`}
              isExternal
            >
              <Flex align="center">
                <Icon as={ExternalLinkIcon} />
                <Text ml={2}>Edit on GitHub</Text>
              </Flex>
            </Link>
          </Flex>

          {/* Right sidebar */}
          <Flex display={['none', 'none', 'none', 'none', 'none', 'flex']} mt={4}>
            <div>
              <Box w={300}>
                <WrittenByAside frontMatter={frontMatter} />
                <RelatedPosts style="sidebar" frontMatter={frontMatter} posts={posts} />
              </Box>
              <Box w={300} overflow="scroll" pos="sticky" top={10}>
                <HeadersSidebar headers={frontMatter?.headers} />
              </Box>
            </div>
          </Flex>
        </Flex>

        <Box maxW={800} mx="auto" id="end-content">
          <Flex flexDir="column" m="auto" my={10}>
            <RelatedPosts frontMatter={frontMatter} posts={posts} />
          </Flex>
          <Divider
            mt={12}
            mb={4}
            alignSelf="center"
            display={['inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'none']}
          />
          <Flex
            align="center"
            my={4}
            justify="center"
            flexDir="column"
            display={['flex', 'flex', 'flex', 'flex', 'flex', 'none']}
          >
            <WrittenBy frontMatter={frontMatter} />
          </Flex>
        </Box>
      </motion.div>
    </Container>
  )
}

export const getStaticProps = async ({
  params
}: {
  params: {
    slug: string
  }
}) => {
  const contentsPath = path.join(CONTENT_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(contentsPath)
  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkCodeTitles as any, rehypeAutolinkHeadings],
      rehypePlugins: [mdxPrism]
    },
    scope: data
  })

  // all posts for related posts
  const posts = contentFilePaths.map(filePath => {
    const source = fs.readFileSync(path.join(CONTENT_PATH, filePath))
    const { content, data } = matter(source)
    return {
      content,
      data,
      filePath
    }
  })

  return {
    props: {
      posts,
      source: mdxSource,
      frontMatter: {
        readingTime: readingTime(content),
        headers: await getHeaders(content),
        ...data
      }
    }
  }
}

export const getStaticPaths = async () => {
  const paths = contentFilePaths
    // Remove file extensions for page paths
    .map(path => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map(slug => ({ params: { slug } }))

  return {
    paths,
    fallback: false
  }
}

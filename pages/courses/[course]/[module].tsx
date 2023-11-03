import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Heading, Text, Box, Flex, useColorModeValue, Link, Icon } from '@chakra-ui/react'
import { parseISO, format } from 'date-fns'
import { motion } from 'framer-motion'
import matter from 'gray-matter'
import mdxPrism from 'mdx-prism'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkCodeTitles from 'remark-flexible-code-titles'

import fs from 'fs'

import CarbonAd from '@/../components/content/Ad'
import Layout from '@/../components/courses/course'
import Pagination from '@/../components/courses/Pagination'
import HeadersAccordion from '@/../components/HeadersAccordion'
import MDXComponents from '@/../components/MDXComponents'
import getHeaders from '@/../lib/scripts/get-headings'
import { getCourseFilePaths, COURSE_PATH } from '@/../lib/scripts/mdx-utils'

interface Props {
  source: any
  frontMatter: any
  params: {
    course: string
    module: string
  }
}

export default function PostPage({ source, frontMatter, params }: Props) {
  return (
    <Layout frontMatter={frontMatter}>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box mb={4}>
          <Heading as="h1" size="2xl" letterSpacing="tight" mb={2}>
            {frontMatter.title}
          </Heading>
          <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')}>
            <strong>Module Summary:</strong> {frontMatter.description}
          </Text>
          <Text fontSize="md" color="gray.500" mb={4}>
            {frontMatter.readingTime.text} &middot; {frontMatter.readingTime.words} words
          </Text>
          <HeadersAccordion headers={frontMatter?.headers} />
        </Box>
        <Flex flexDir="column" id="main-content">
          <CarbonAd />
          <MDXRemote {...source} components={MDXComponents} />
        </Flex>
        <Box mb={2} mt={10}>
          {frontMatter.updatedAt && (
            <Text color="gray.500" fontSize="sm" textAlign="center">
              Last updated on{' '}
              {format(parseISO(frontMatter.updatedAt || frontMatter.publishedAt), 'MMMM dd, yyyy')}
            </Text>
          )}
        </Box>
        <Flex align="center" justify="center" mb={4}>
          <Link textDecor="underline" _hover={{ opacity: 0.8 }} w="fit-content">
            <Icon as={ExternalLinkIcon} mr={2} />
            <Link
              href={`https://github.com/carlson-technologies/coffeeclass.io/tree/live/content/courses/${params.course}/${params.module}.mdx`}
              isExternal
            >
              Edit on GitHub
            </Link>
          </Link>
        </Flex>
        <Pagination />
      </motion.div>
    </Layout>
  )
}

interface PropsProps {
  params: {
    course: string
    module: string
  }
}

export const getStaticProps = async ({ params }: PropsProps) => {
  const modulePath = COURSE_PATH + `/${params.course}/` + `${params.module}.mdx`
  const moduleSource = fs.readFileSync(modulePath)
  const { content, data } = matter(moduleSource)

  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkCodeTitles as any, rehypeAutolinkHeadings],
      rehypePlugins: [mdxPrism]
    },
    scope: data
  })

  return {
    props: {
      params,
      source,
      frontMatter: {
        readingTime: readingTime(content),
        headers: await getHeaders(content),
        ...data
      }
    }
  }
}

export const getStaticPaths = async () => {
  const paths = getCourseFilePaths(COURSE_PATH)
    .map(path => path.replace(/\.mdx?$/, ''))
    .map(module => ({
      params: {
        course: module.split('/').slice(-2)[0],
        module: module.split('/').pop()
      }
    }))

  return {
    paths,
    fallback: false
  }
}

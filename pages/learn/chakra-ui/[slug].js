import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import path from 'path'
import LearnLayout from '../../../layouts/learn'
import { learnChakraUIFilePaths, LEARN_CHAKRAUI_PATH } from '../../../lib/mdxUtils'
import MDXComponents from '../../../components/MDXComponents'
import mdxPrism from 'mdx-prism'
import readingTime from 'reading-time'
import { motion } from 'framer-motion'
import Pagination from '../../../components/Pagination'
import { parseISO, format } from 'date-fns'
import {
    Heading,
    Text,
    Box
} from '@chakra-ui/react'

export default function PostPage({ source, frontMatter }) {
    return (
        <LearnLayout frontMatter={frontMatter} src="chakra-ui.png" alt="Chakra UI Image">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: .5 }}
            >
                <Box>
                    <Heading as="h1" size="2xl">
                        {frontMatter.title}
                    </Heading>
                    <Text fontSize="lg">{frontMatter.description}</Text>
                </Box>
                <MDXRemote {...source} components={MDXComponents} />
                <Box my={4}>
                    {frontMatter.lastUpdated && <Text color="gray.500" fontSize="sm" textAlign="center">Last updated on {format(parseISO(frontMatter.lastUpdated ? frontMatter.lastUpdated : frontMatter.publishedAt), 'MMMM dd, yyyy')}    </Text>}
                </Box>
                <Pagination />
            </motion.div>
        </LearnLayout>
    )
}

export const getStaticProps = async ({ params }) => {
    const learnChakraUIPath = path.join(LEARN_CHAKRAUI_PATH, `${params.slug}.mdx`)
    const source = fs.readFileSync(learnChakraUIPath)

    const { content, data } = matter(source)

    const mdxSource = await serialize(content, {
        MDXComponents,
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [
                require('remark-code-titles'),
                require('remark-autolink-headings')
            ],
            rehypePlugins: [mdxPrism],
        },
        scope: data,
    })

    return {
        props: {
            source: mdxSource,
            frontMatter: {
                readingTime: readingTime(content),
                ...data
            },
        },
    }
}

export const getStaticPaths = async () => {
    const paths = learnChakraUIFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug } }))

    return {
        paths,
        fallback: false,
    }
}
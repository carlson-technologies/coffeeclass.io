import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import path from 'path'
import LearnLayout from '../../../layouts/learn'
import { learnPythonFilePaths, LEARN_PYTHON_PATH } from '../../../scripts/mdx-utils'
import MDXComponents from '../../../components/MDXComponents'
import mdxPrism from 'mdx-prism'
import readingTime from 'reading-time'
import { motion } from 'framer-motion'
import Pagination from '../../../components/Pagination'
import { parseISO, format } from 'date-fns'
import getHeaders from '../../../scripts/get-headings'
import {
    Heading,
    Text,
    Box,
    Divider,
    Flex,
    useColorModeValue,
} from '@chakra-ui/react'

export default function PostPage({ source, frontMatter }) {
    return (
        <LearnLayout frontMatter={frontMatter} src="python.png" alt="Python Image">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: .5 }}
                style={{
                    flexDir: "column",
                    w: "100%",
                    alignSelf: "center",
                    maxW: '1000px',
                }}
            >
                <Box>
                    <Heading as="h1" size="xl">
                        {frontMatter.title}
                    </Heading>
                    <Text color={useColorModeValue("gray.500", "gray.400")} fontSize="xl" mt={2}>{frontMatter.description}</Text>
                    <Divider my={2} />
                </Box>
                <Flex
                    flexDir="column"
                    maxW="1000px"
                    id="main-content"
                >
                    <MDXRemote {...source} components={MDXComponents} />
                </Flex>
                <Box mb={4} mt={10}>
                    {frontMatter.lastUpdated && <Text color="gray.500" fontSize="sm" textAlign="center">Last updated on {format(parseISO(frontMatter.lastUpdated ? frontMatter.lastUpdated : frontMatter.publishedAt), 'MMMM dd, yyyy')}    </Text>}
                </Box>
                <Pagination />
            </motion.div>
        </LearnLayout>
    )
}

export const getStaticProps = async ({ params }) => {
    const learnPythonPath = path.join(LEARN_PYTHON_PATH, `${params.slug}.mdx`)
    const source = fs.readFileSync(learnPythonPath)

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
                headers: await getHeaders(content),
                ...data
            },
        },
    }
}

export const getStaticPaths = async () => {
    const paths = learnPythonFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug } }))

    return {
        paths,
        fallback: false,
    }
}
import fs from 'fs'
import matter from 'gray-matter'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import path from 'path'
import Layout from '../../components/Layout'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../../utils/mdxUtils'
import MDXComponents from '../../components/MDXComponents'
import mdxPrism from 'mdx-prism'
import { parseISO, format } from 'date-fns'
import readingTime from 'reading-time'
import {
    Heading,
    Text,
    Divider,
    Link,
    Flex,
    Badge,
    Tooltip,
    useColorMode
} from '@chakra-ui/react'
import { YoutubeIcon, GitHubIcon } from '../../components/CustomIcons'

export default function PostPage({ source, frontMatter }) {
    const content = hydrate(source, { MDXComponents })
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.700',
        dark: 'gray.300'
    }
    return (
        <Layout frontMatter={frontMatter}>
            <Flex flexDir={["column", "column", "row"]}>
                <Flex w={['100%', '100%', 1000]}>
                    <Heading as="h1" size="2xl">{frontMatter.title}</Heading>
                </Flex>
                <Flex flexDir="column">
                    <Text fontSize="xl" mt={2} color={color[colorMode]}>{frontMatter.description}</Text>
                    <Text fontSize="md" mt={1} color={color[colorMode]}>
                        By {frontMatter.author} on {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}</Text>
                    <Text size="md" color={color[colorMode]}>{frontMatter.readingTime?.text} min read</Text>
                    <Flex align="center">
                        {frontMatter.githubURL &&
                            <Tooltip hasArrow label="Link To Code">
                                <Link isExternal href={frontMatter?.githubURL} w="fit-content">
                                    <GitHubIcon fontSize="2xl" mt={2} mr={2} />
                                </Link>
                            </Tooltip>
                        }
                        {frontMatter.youtubeId?.map((id) => {
                            return (
                                <Tooltip hasArrow label="Link To Related YouTube Video">
                                    <Link isExternal href={id} w="fit-content">
                                        <YoutubeIcon fontSize="2xl" mt={2} mr={2} />
                                    </Link>
                                </Tooltip>
                            )
                        })}
                        {frontMatter.tags?.map((tag) => {
                            return (
                                <Badge mt={2} mr={2}>{tag}</Badge>
                            )
                        })}
                    </Flex>
                </Flex>
            </Flex>
            <Divider mt={4} />
            {content}
        </Layout>
    )
}

export const getStaticProps = async ({ params }) => {
    const turorialsPath = path.join(TUTORIALS_PATH, `${params.slug}.mdx`)
    const source = fs.readFileSync(turorialsPath)

    const { content, data } = matter(source)

    const mdxSource = await renderToString(content, {
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
                // wordCount: content.split(/\s+/gu).length,
                readingTime: readingTime(content),
                ...data
            },
        },
    }
}

export const getStaticPaths = async () => {
    const paths = tutorialsFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug } }))

    return {
        paths,
        fallback: false,
    }
}
import fs from 'fs'
import matter from 'gray-matter'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import path from 'path'
import Layout from '../../components/Layout'
import { snippetsFilePaths, SNIPPETS_PATH } from '../../utils/mdxUtils'
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
    useColorMode,
    Avatar
} from '@chakra-ui/react'
import { YoutubeIcon, GitHubIcon } from '../../components/CustomIcons'
import NextLink from 'next/link'

export default function PostPage({ source, frontMatter }) {
    const content = hydrate(source, { MDXComponents })
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.700',
        dark: 'gray.300'
    }
    return (
        <Layout frontMatter={frontMatter}>
            <Flex flexDir="column">
                <Flex align="center" mb={2}>
                    {frontMatter.tags?.map((tag) => {
                        return (
                            <NextLink key={tag} href={`/tags/${tag}`} passHref>
                                <Link href={`/${tag}`}>
                                    <Badge colorScheme="cyan" mr={2}>#{tag}</Badge>
                                </Link>
                            </NextLink>
                        )
                    })}
                    •
                    <Text mx={2} color={color[colorMode]} fontSize="sm">{format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}</Text>
                    •
                    <Text mx={2} color={color[colorMode]} fontSize="sm">{frontMatter.readingTime.text} min read</Text>
                </Flex>
                <Heading as="h1" size="2xl" fontWeight="normal">{frontMatter.title}</Heading>
                <Text fontSize="xl" mt={2} color={color[colorMode]}>{frontMatter.description}</Text>
                <Flex align="center" my={2}>
                    <Avatar src={`/authors/${frontMatter.authorImage}`} mr={2}></Avatar>
                    <Flex flexDir="column">
                        <Text>By {frontMatter.author}</Text>
                        <Text color={color[colorMode]}>{frontMatter.authorPosition}</Text>
                    </Flex>
                </Flex>
                <Flex align="center">
                    {frontMatter.githubURL &&
                        <Tooltip hasArrow label="Link To This Post's Code" closeDelay={100}>
                            <Link isExternal href={frontMatter?.githubURL} w="fit-content">
                                <GitHubIcon fontSize="2xl" mt={2} mr={2} />
                            </Link>
                        </Tooltip>
                    }
                    {frontMatter.youtubeId?.map((id) => {
                        return (
                            <Tooltip hasArrow label="Link To This Post As A YouTube Video" closeDelay={100}>
                                <Link isExternal href={id} w="fit-content">
                                    <YoutubeIcon fontSize="2xl" mt={2} mr={2} />
                                </Link>
                            </Tooltip>
                        )
                    })}
                </Flex>
            </Flex>
            <Divider mt={4} />
            {content}
        </Layout>
    )
}

export const getStaticProps = async ({ params }) => {
    const snippetsPath = path.join(SNIPPETS_PATH, `${params.slug}.mdx`)
    const source = fs.readFileSync(snippetsPath)

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
                readingTime: readingTime(content),
                ...data
            },
        },
    }
}

export const getStaticPaths = async () => {
    const paths = snippetsFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug } }))

    return {
        paths,
        fallback: false,
    }
}
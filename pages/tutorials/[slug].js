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
    useColorMode,
    Avatar
} from '@chakra-ui/react'
import NextLink from 'next/link'

export default function PostPage({ source, frontMatter }) {
    const content = hydrate(source, { MDXComponents })
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.600',
        dark: 'gray.500'
    }
    return (
        <Layout frontMatter={frontMatter}>
            <Flex flexDir="column">
                <Flex align="center" alignSelf="center" mb={2}>
                    {frontMatter.tags?.map((tag) => {
                        return (
                            <Flex key={tag} mr={2}>
                                <NextLink href={`/tags/${tag}`} passHref>
                                    <Link href={`/${tag}`}>
                                        <Badge colorScheme="cyan">#{tag}</Badge>
                                    </Link>
                                </NextLink>
                            </Flex>
                        )
                    })}
                    •
                    <Text mx={2} color={color[colorMode]} fontSize="sm">{format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}</Text>
                    •
                    <Text mx={2} color={color[colorMode]} fontSize="sm">{frontMatter.readingTime.text} min read</Text>
                </Flex>
                <Heading as="h1" size="2xl" fontWeight="medium" textAlign={["left", "left", "center"]}>{frontMatter.title}</Heading>
                <Flex flexDir={['column', 'column', 'row']} mt={[0, 0, 4]}>
                    <Text
                        fontSize="xl"
                        mt={2}
                        color={color[colorMode]}
                        w={["100%", "100%", "600px"]}
                    >
                        {frontMatter.description}
                    </Text>
                    <Flex align="center" my={2}>
                        <Avatar src={`/authors/${frontMatter.authorImage}`} mr={2}></Avatar>
                        <Flex flexDir="column">
                            <Text>By {frontMatter.author}</Text>
                            <Text color={color[colorMode]}>{frontMatter.authorPosition}</Text>
                        </Flex>
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
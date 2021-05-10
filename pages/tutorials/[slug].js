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
    useColorMode,
    Avatar,
    Tag,
    Tooltip,
    Button
} from '@chakra-ui/react'
import NextLink from 'next/link'
import Comments from '../../components/Comments'
import getHeaders from '../../components/get-headers'

export default function PostPage({ source, frontMatter }) {
    const content = hydrate(source, { MDXComponents })
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.600',
        dark: 'gray.500'
    }
    return (
        <Layout frontMatter={frontMatter}>
            <Flex flexDir="column" w={['100%', '100%', '70%']} alignSelf="center">
                <Flex
                    align="center"
                    justify={["left", "left", "center"]}
                    mb={2}
                    flexDir={['column', 'row', 'row']}
                >
                    <Flex mb={[2, 0, 0]}>
                        {frontMatter.tags?.map((tag) => {
                            return (
                                <Flex key={tag} mr={2}>
                                    <NextLink href={`/tags/${tag}`} _hover={{ textDecor: 'none' }} passHref>
                                        <Tooltip hasArrow label={`View posts relating to ${tag}`}>
                                            <Link href={`/tags/${tag}`} _hover={{ textDecor: 'none' }}>
                                                <Tag size="sm">#{tag}</Tag>
                                            </Link>
                                        </Tooltip>
                                    </NextLink>
                                </Flex>
                            )
                        })}
                    </Flex>
                    <Flex display={['none', 'flex', 'flex']}>•</Flex>
                    <Flex>
                        <Text mx={2} color={color[colorMode]} fontSize="sm">{format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}</Text>
                    •
                    <Text mx={2} color={color[colorMode]} fontSize="sm">{frontMatter.readingTime.text}</Text>
                    •
                    <Text mx={2} color={color[colorMode]} fontSize="sm" fontWeight="bold"><Link href="#comments">Comments</Link></Text>
                    </Flex>
                </Flex>
                <Heading as="h1" size="2xl" textAlign={["left", "left", "center"]}>{frontMatter.title}</Heading>
                <Text
                    fontSize="xl"
                    mt={2}
                    color={color[colorMode]}
                    textAlign={["left", "left", "center"]}
                >
                    {frontMatter.description}
                </Text>
            </Flex>
            <Divider my={[4, 8, 12]} w={["100%", "100%", "30%"]} alignSelf="center" />
            <Flex
                flexDir="column"
                w={["100%", "100%", "60%"]}
                alignSelf="center"
                maxW="800px"
            >
                {content}
            </Flex>
            <Flex
                justify="center"
                flexDir="column"
                mt={8}
            >
                <Button
                    variant="outline"
                    w={['100%', 250, 300]}
                    alignSelf="center"
                >
                    <Link
                        href="#comments"
                        _hover={{ textDecor: 'none' }}
                    >
                        Leave A Comment
                    </Link>
                </Button>
            </Flex>
            <Divider mt={12} mb={4} w="30%" alignSelf="center" />
            <Flex
                align="center"
                mt={4}
                justify="center"
                flexDir="column"
            >
                <Avatar src={`/authors/${frontMatter.authorImage}`} size="xl" mb={2} alt={`Image of ${frontMatter.author}`} />
                <Flex flexDir="column" align="center">
                    <Text>Written By {frontMatter.author}</Text>
                    <Text color={color[colorMode]}>{frontMatter.authorPosition}</Text>
                    <Text mt={4}><Link href={`/authors/${frontMatter.author}`} fontWeight="bold">More Articles By {frontMatter.author}</Link></Text>
                </Flex>
            </Flex>
            <Divider my={12} w="30%" alignSelf="center" />
            <Comments />
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
                readingTime: readingTime(content),
                headers: await getHeaders(content),
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
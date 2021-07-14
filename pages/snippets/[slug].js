import fs from 'fs'
import matter from 'gray-matter'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import path from 'path'
import Layout from '../../layouts/snippet'
import { snippetsFilePaths, SNIPPETS_PATH } from '../../lib/mdxUtils'
import MDXComponents from '../../components/MDXComponents'
import mdxPrism from 'mdx-prism'
import readingTime from 'reading-time'
import { parseISO, format } from 'date-fns'
import {
    Heading,
    Text,
    Link,
    Flex,
    useColorMode,
    Avatar,
    Button,
    Image,
    Badge,
    Divider
} from '@chakra-ui/react'
import Comments from '../../components/Comments'
import getHeaders from '../../lib/get-headers'
import { motion } from 'framer-motion'
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
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                    flexDir: "column",
                    w: ['100%', '100%', '100%', '100%', '100%', '70%'],
                    alignSelf: "center",
                    maxW: "800px"
                }}
            >
                <Flex
                    flexDir="column"
                    alignSelf="center"
                    maxW="800px"
                >
                    <Flex>
                        {
                            frontMatter.logoImage?.map((image, index) => (
                                // If the image title includes "light", it has a dark mode image
                                // so we need to use the correct image.
                                image.includes('light') ?
                                    <Image
                                        key={index}
                                        src={colorMode === "light" ? `/snippet-images/${image}` : `/snippet-images/${image.replace('light', 'dark')}`}
                                        alt={frontMatter.logoImage}
                                        w={100}
                                        alignSelf="left"
                                        mb={4}
                                        mr={2}
                                    /> :
                                    <Image
                                        key={index}
                                        src={`/snippet-images/${image}`}
                                        alt={frontMatter.logoImage}
                                        w={100}
                                        alignSelf="left"
                                        mb={4}
                                        mr={2}
                                    />
                            ))
                        }
                    </Flex>
                    <Heading
                        as="h1"
                        size="2xl"
                        textAlign="left"
                    >
                        {frontMatter.title}
                    </Heading>
                    <Text
                        fontSize="xl"
                        mt={2}
                        color={color[colorMode]}
                        textAlign="left"
                    >
                        {frontMatter.description}
                    </Text>
                </Flex>
                <Flex
                    flexDir="column"
                    alignSelf="center"
                    maxW="800px"
                >
                    {content}
                </Flex>
                <Flex
                    justify="center"
                    flexDir="column"
                    mt={4}
                >
                    <Divider mb={4} />
                    <Flex align="center" mb={8}>
                        <Text color={color[colorMode]} fontSize="md">Published on {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')} in</Text>
                        <Flex ml={2}>
                            {frontMatter.tags.map((tag, index) => (
                                <Flex
                                    mr={2}
                                    key={index}
                                    _hover={{
                                        textDecor: 'none',
                                        opacity: '.5'
                                    }}
                                    cursor="pointer"
                                >
                                    <NextLink href={`/tags/${tag}`} passHref>
                                        <Link href={`/${tag}`}
                                        >
                                            <Badge fontSize="lg">#{tag}</Badge>
                                        </Link>
                                    </NextLink>
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>
                    <Button
                        variant="outline"
                        w={['100%', '100%', '100%', 200, 250, 300]}
                        alignSelf="center"
                        mb={8}
                    >
                        <Link
                            href="#comments"
                            _hover={{ textDecor: 'none' }}
                        >
                            Leave A Comment
                        </Link>
                    </Button>
                </Flex>
                <Flex
                    align="center"
                    mt={4}
                    mb={6}
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
                <Comments />
            </motion.div>
        </Layout>
    )
}

export const getStaticProps = async ({ params }) => {
    const snippetsPath = path.join(SNIPPETS_PATH, `${params.slug}.mdx`)
    const source = fs.readFileSync(snippetsPath)
    const { content, data } = matter(source)
    // const headings = getHeaders(content)
    // console.log(headings)

    // const headings = Promise.resolve(getHeaders(content))
    //     .then(function (value) {
    //         console.log(value);
    //     })

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
import { useState } from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import path from 'path'
import Layout from '../../layouts/snippet'
import { snippetsFilePaths, SNIPPETS_PATH } from '../../scripts/mdx-utils'
import MDXComponents from '../../components/MDXComponents'
import mdxPrism from 'mdx-prism'
import readingTime from 'reading-time'
import { parseISO, format } from 'date-fns'
import getHeaders from '../../scripts/get-headings'
import {
    Text,
    Link,
    Flex,
    useColorMode,
    Avatar,
    Button,
    Badge,
    Divider,
    useToast,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    UnorderedList,
    Box,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react'
import Comments from '../../components/Comments'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useRouter } from 'next/router'
import getAuthorSlug from '../../scripts/get-author-slug'
import RelatedPosts from '../../components/RelatedPosts'
import Ad from '../../components/Ad'

export default function PostPage({ source, frontMatter, posts }) {
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.600',
        dark: 'gray.500'
    }

    const [display, setDisplay] = useState("flex")

    const toast = useToast()

    const router = useRouter()
    const slug = router.query.slug

    var author = frontMatter.author
    return (
        <Layout frontMatter={frontMatter}>
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: .5 }}
                style={{
                    flexDir: "column",
                    w: ['100%', '100%', '100%', '100%', '100%', '70%'],
                    alignSelf: "center",
                    maxW: "800px",
                }}
            >
                <Flex
                    flexDir="column"
                    maxW="800px"
                >
                    <Box>
                        <Accordion allowMultiple mt={4}>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex="1" textAlign="left">
                                            On this page
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                    {frontMatter?.headers.map((h) => {
                                        return (
                                            <Link href={`#${h.text}`}>
                                                <Box
                                                    key={h.text}
                                                    p={1}
                                                    _hover={{
                                                        bgColor: useColorModeValue("gray.100", "gray.800"),
                                                        cursor: "pointer",
                                                    }}
                                                    my={1}
                                                    borderRadius={2}
                                                >
                                                    <Heading
                                                        as="h4"
                                                        size="sm"
                                                        color={color[colorMode]}
                                                        my={1}
                                                    >
                                                        <Text
                                                            ml={(h.level - 2) * 6}
                                                            _hover={{ textDecor: 'none' }}
                                                        >
                                                            {h.text}
                                                        </Text>
                                                    </Heading>
                                                </Box>
                                            </Link>
                                        )
                                    })}
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </Box>
                    <Ad />
                    <MDXRemote {...source} components={MDXComponents} />
                </Flex>
                <Flex
                    justify="center"
                    flexDir="column"
                    mt={4}
                >
                    <Divider mb={4} />
                    <Flex align="center" flexDir={["column", "column", "column", "column", "column", "row"]}>
                        <Text color={color[colorMode]} fontSize="md">Published on {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')} ({timeAgo.format(new Date(frontMatter.publishedAt))}) in</Text>
                        <Flex wrap="wrap">
                            {frontMatter.tags.map((tag, index) => (
                                <Flex
                                    m={1}
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
                    <Divider my={4} />
                    <Flex flexDir="column" m="auto" my={10}>
                        <RelatedPosts tags={frontMatter.tags} posts={posts} currPostTitle={frontMatter.title} />
                    </Flex>
                    <Flex flexDir="column" align="center" mb={4} display={display}>
                        <Text mt={4}>Was this snippet helpful?</Text>
                        <Flex mt={4}>
                            <Button
                                mr={2}
                                w={100}
                                data-splitbee-event="Snippet Helpful"
                                data-splitbee-event-type={`yes - ${slug}`}
                                onClick={() => {
                                    toast({
                                        title: "Awesome!",
                                        description: "Your feedback is helpful for the future of coffeeclass.io!",
                                        status: "success",
                                        duration: 4000,
                                        isClosable: true,
                                    }),
                                        setDisplay("none")
                                }
                                }
                            >
                                Yes
                            </Button>
                            <Button
                                w={100}
                                data-splitbee-event="Snippet Helpful"
                                data-splitbee-event-type={`no  - ${slug}`}
                                onClick={() => {
                                    toast({
                                        title: "Sorry to hear that :(",
                                        description: "Your feedback is helpful for the future of coffeeclass.io!",
                                        status: "success",
                                        duration: 4000,
                                        isClosable: true,
                                    }),
                                        setDisplay("none")
                                }
                                }
                            >
                                No
                            </Button>
                        </Flex>
                    </Flex>
                    <Divider mb={4} />
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
                        <Text mt={4}><Link href={`/authors/${getAuthorSlug(author)}`} fontWeight="bold">More Articles By {frontMatter.author}</Link></Text>
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

    // all snippets
    const posts = snippetsFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(SNIPPETS_PATH, filePath))
        const { content, data } = matter(source)
        return {
            content,
            data,
            filePath,
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
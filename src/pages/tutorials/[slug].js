import { useState } from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import path from 'path'
import Layout from '../../layouts/tutorial'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../../scripts/mdx-utils'
import { snippetsFilePaths, SNIPPETS_PATH } from '../../scripts/mdx-utils'
import MDXComponents from '../../components/MDXComponents'
import mdxPrism from 'mdx-prism'
import readingTime from 'reading-time'
import {
    Heading,
    Text,
    Divider,
    Link,
    Flex,
    useColorMode,
    Avatar,
    Button,
    Box,
    AspectRatio,
    Image,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    useColorModeValue,
    Wrap,
    Tooltip,
    Tag,
} from '@chakra-ui/react'
import Comments from '../../components/Comments'
import getHeaders from '../../scripts/get-headings'
import { useRouter } from 'next/router'
import getAuthorSlug from '../../scripts/get-author-slug'
import EmbeddedVideo from '../../components/EmbeddedVideo'
import Ad from '../../components/Ad'
import RelatedPosts from '../../components/RelatedPosts'
import { getEmbedId } from '../../scripts/get-embed-id'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import NextLink from 'next/link'

export default function PostPage({ source, frontMatter, posts }) {
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.600',
        dark: 'gray.500'
    }
    const [loaded, setLoaded] = useState(false)
    const router = useRouter()
    const slug = router.query.slug

    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')
    return (
        <Layout frontMatter={frontMatter}>
            <Flex
                flexDir="column"
                w="100%"
                alignSelf="center"
                as="heading"
            >
                <Flex flexDir="column" maxW={800} m="auto">
                    <Heading
                        mt={[10, 10, 10, 10, 0, 0]}
                        as="h1"
                        size="xl"
                        textAlign={["left", "left", "left", "center", "center", "center"]}
                    >
                        {frontMatter.title}
                    </Heading>
                    <Text
                        fontSize="xl"
                        mt={2}
                        mb={4}
                        color={color[colorMode]}
                        textAlign={["left", "left", "left", "center", "center", "center"]}
                    >
                        {frontMatter.description}
                    </Text>
                </Flex>
                {frontMatter.youtubeId ?
                    <Flex justify="center">
                        <EmbeddedVideo src={getEmbedId(frontMatter.youtubeId)} alt={frontMatter.title} maxW={800} />
                    </Flex> :
                    <Flex justify="center">
                        <AspectRatio w="100%" ratio={16 / 9} maxW={800}>
                            <Image src={`/content/tutorials/${slug}/${frontMatter.featureImg}`} alt={frontMatter.title} />
                        </AspectRatio>
                    </Flex>
                }
                <Flex
                    maxW={800}
                    mx="auto"
                    w="100%"
                    align={["left", "left", "left", "left", "center", "center"]}
                    justify="center"
                    my={2}
                    flexDir={["column", "column", "column", "column", "row", "row"]}
                >
                    <Flex align="center" my={[2, 2, 2, 2, 0, 0]}>
                        <Avatar src={`/authors/${frontMatter.authorImage}`} size="md" mr={2} alt={`Image of ${frontMatter.author}`} />
                        <Flex flexDir="column" align="left">
                            <Text>Written By {frontMatter.author}</Text>
                            <Text color={color[colorMode]}>{frontMatter.authorPosition}</Text>
                        </Flex>
                    </Flex>
                    <Divider orientation="vertical" mx={2} h="80%" alignSelf="center" display={['none', 'none', 'none', 'none', 'flex', 'flex']} />
                    <Text my={[2, 2, 2, 2, 0, 0]} color={color[colorMode]}>Posted {timeAgo.format(new Date(frontMatter.publishedAt))}</Text>
                    <Divider orientation="vertical" mx={2} h="80%" alignSelf="center" display={['none', 'none', 'none', 'none', 'flex', 'flex']} />
                    <Wrap maxW={[null, null, null, null, 250, 250]} mt={[2, 2, 2, 2, 0, 0]}>
                        {frontMatter.tags?.map((tag) => {
                            return (
                                <NextLink key={tag} href={`/tags/${tag}`} _hover={{ textDecor: 'none' }} passHref>
                                    <Tooltip hasArrow label={`View posts relating to ${tag}`}>
                                        <Link href={`/tags/${tag}`} _hover={{ textDecor: 'none' }}>
                                            <Tag borderRadius={10} bgColor={useColorModeValue("gray.100", "whiteAlpha.100")} size="lg" mb={2}>#{tag}</Tag>
                                        </Link>
                                    </Tooltip>
                                </NextLink>
                            )
                        })}
                    </Wrap>
                </Flex>
            </Flex>
            <Flex
                flexDir="column"
                w="100%"
                alignSelf="center"
                maxW="800px"
                id="tutorial-content"
                px={4}
            >
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
                {/* <Ad /> */}
                <MDXRemote {...source} components={MDXComponents} />
            </Flex>
            <Divider mt={12} mb={4} w="30%" alignSelf="center" />
            <Flex flexDir="column" m="auto" my={10}>
                <RelatedPosts tags={frontMatter.tags} posts={posts} currPostTitle={frontMatter.title} />
            </Flex>
            <Flex
                justify="center"
                flexDir="column"
                mt={8}
            >
                <Button
                    variant="outline"
                    w={['100%', '100%', '100%', 200, 250, 300]}
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
                    <Text mt={4}><Link href={`/authors/${getAuthorSlug(frontMatter.author)}`} fontWeight="bold">More Articles By {frontMatter.author}</Link></Text>
                </Flex>
            </Flex>
            <Divider my={12} w="30%" alignSelf="center" />
            <Comments />
        </Layout>
    )
}

export const getStaticProps = async ({ params }) => {
    const tutorialsPath = path.join(TUTORIALS_PATH, `${params.slug}.mdx`)
    const source = fs.readFileSync(tutorialsPath)

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
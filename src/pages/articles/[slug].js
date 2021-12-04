import { useState, useEffect } from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import path from 'path'
import { contentFilePaths, CONTENT_PATH } from '../../scripts/mdx-utils'
import MDXComponents from '../../components/MDXComponents'
import mdxPrism from 'mdx-prism'
import readingTime from 'reading-time'
import getHeaders from '../../scripts/get-headings'
import {
    Text,
    Link,
    Flex,
    useColorMode,
    Avatar,
    Button,
    Divider,
    useToast,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Heading,
    useColorModeValue,
    AspectRatio,
    Image,
    Icon,
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
import EmbeddedVideo from '../../components/EmbeddedVideo'
import { getEmbedId } from '../../scripts/get-embed-id'
import Container from '../../components/Container'
import SEO from '../../components/SEO'
import { ExternalLinkIcon } from '@chakra-ui/icons'

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

    const [width, setWidth] = useState(0)

    const handleScroll = () => {
        let scrollTop = window.scrollY;
        let docHeight = document.body.offsetHeight;
        let winHeight = window.innerHeight;
        let scrollPercent = scrollTop / (docHeight - winHeight);
        let scrollPercentRounded = Math.round(scrollPercent * 100);
        setWidth(scrollPercentRounded)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    return (
        <Container>
            <SEO url={`https://www.coffeeclass.io${slug}`} slug={slug} {...frontMatter} />
            <Box h={1} as="div" bgGradient="linear(to-r, #EAD9CD, #714B2F)" pos="fixed" top={0} left={0} zIndex={15} w={`${width}%`}></Box>

            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: .5 }}
            >
                <Flex justify="center">
                    {/* Left sidebar */}
                    <Flex display={['none', 'none', 'none', 'none', 'none', 'flex']}>
                        <div>
                            <Box maxW={300} overflow="scroll" pos="sticky" top={20}>
                                <RelatedPosts style="sidebar" tags={frontMatter.tags} posts={posts} currPostTitle={frontMatter.title} />
                            </Box>
                        </div>
                    </Flex>

                    {/* main content */}
                    <Flex flexGrow={1} flexDir="column" w="100%" p={4} maxW={800}>
                        {
                            frontMatter.logoImage &&
                            <Box bgColor={useColorModeValue("gray.100", "gray.700")} w="fit-content" p={4} borderRadius={5}>
                                <AspectRatio ratio={1} w={50}>
                                    <Image src={`/logos/${frontMatter.logoImage[0]}`} alt={frontMatter.title} />
                                </AspectRatio>
                            </Box>
                        }
                        <Heading
                            mt={8}
                            as="h1"
                            size="xl"
                            textAlign={frontMatter.logoImage ? "left" : ["left", "left", "left", "center", "center", "center"]}
                        >
                            {frontMatter.title}
                        </Heading>
                        <Text
                            fontSize="xl"
                            mt={2}
                            mb={4}
                            color={color[colorMode]}
                            textAlign={frontMatter.logoImage ? "left" : ["left", "left", "left", "center", "center", "center"]}
                        >
                            {frontMatter.description}
                        </Text>
                        {/* {
                        frontMatter.youtubeId &&
                        <Flex justify="center">
                            <EmbeddedVideo src={getEmbedId(frontMatter?.youtubeId)} alt={frontMatter.title} maxW={800} />
                        </Flex>
                    } */}
                        {
                            frontMatter.featureImg && !frontMatter.youtubeId &&
                            <Flex justify="center">
                                <AspectRatio w="100%" ratio={16 / 9} maxW={800}>
                                    <Image src={`/content/articles/${slug}/${frontMatter.featureImg}`} alt={frontMatter.title} />
                                </AspectRatio>
                            </Flex>
                        }
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
                        <Ad />
                        <Box id="main-content">
                            <MDXRemote {...source} components={MDXComponents} />
                        </Box>
                        <Flex align="center">
                            <Icon as={ExternalLinkIcon} />
                            <Text>Edit on GitHib</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Box maxW={800} mx="auto">
                    <Divider mt={12} mb={4} alignSelf="center" />
                    <Flex flexDir="column" m="auto" my={10}>
                        <RelatedPosts tags={frontMatter.tags} posts={posts} currPostTitle={frontMatter.title} />
                    </Flex>
                    <Divider mt={12} mb={4} alignSelf="center" />
                    <Flex
                        justify="center"
                        flexDir="column"
                        mt={8}
                        px={4}
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
                    <Divider mt={12} mb={8} alignSelf="center" />
                    <Flex
                        align="center"
                        my={4}
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
                    <Divider mt={12} mb={8} alignSelf="center" />
                    <Box px={4}>
                        <Comments />
                    </Box>
                </Box>
            </motion.div>
        </Container>
    )
}

export const getStaticProps = async ({ params }) => {
    const contentsPath = path.join(CONTENT_PATH, `${params.slug}.mdx`)
    const source = fs.readFileSync(contentsPath)
    const { content, data } = matter(source)

    const mdxSource = await serialize(content, {
        MDXComponents,
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [
                require('remark-code-titles'),
                // require('rehype-autolink-headings')
            ],
            rehypePlugins: [mdxPrism],
        },
        scope: data,
    })

    // all posts for related posts
    const posts = contentFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(CONTENT_PATH, filePath))
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
    const paths = contentFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug } }))

    return {
        paths,
        fallback: false,
    }
}
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
    useBreakpointValue,
} from '@chakra-ui/react'
import Comments from '../../components/Comments'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useRouter } from 'next/router'
import RelatedPosts from '../../components/RelatedPosts'
import Ad from '../../components/Content/Ad'
import EmbeddedVideo from '../../components/EmbeddedVideo'
import getEmbedId from '../../scripts/get-embed-id'
import Container from '../../components/Container'
import SEO from '../../components/SEO'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { parseISO, format } from 'date-fns'
import WrittenBy from '../../components/WrittenBy'

export default function PostPage({ source, frontMatter, posts }) {
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.600',
        dark: 'gray.500'
    }
    const color1 = {
        light: 'gray.700',
        dark: 'gray.400'
    }
    const router = useRouter()
    const slug = router.query.slug

    // use useBreakpointValue to set the size to xl on small screens and 2xl on larger screens above 1000px
    const size = useBreakpointValue({ xl: 'xl', '2xl': '2xl' })

    const [width, setWidth] = useState(0)

    const handleScroll = () => {
        let scrollTop = window.scrollY;
        let docHeight = document.body.offsetHeight - document.getElementById("end-content").offsetHeight;
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

    const bgColor = useColorModeValue("gray.100", "gray.700")
    const bgColor1 = useColorModeValue("gray.100", "gray.700")
    const hoverBg = useColorModeValue("gray.100", "gray.700")

    return (
        <Container>
            <SEO url={`https://www.coffeeclass.io${slug}`} slug={slug} {...frontMatter} />
            <Box h={1} as="div" bgGradient="linear(to-r, #EAD9CD, #714B2F)" pos="fixed" top={0} left={0} zIndex={15} w={`${width}%`} transition="width .3s ease-in-out"></Box>

            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: .5 }}
            >
                {
                    !frontMatter.logoImage &&
                    <Flex flexDir="column" w={["100%", "100%", "100%", "100%", "80%", "70%"]} align={frontMatter.logoImage ? "left" : ["left", "left", "left", "left", "center", "center"]} maxW={["100%", "100%", "100%", "90%", "90%", "90%"]} mx="auto" px="4">
                        <Heading
                            mt={2}
                            as="h1"
                            size={size}
                            textAlign={frontMatter.logoImage ? "left" : ["left", "left", "left", "left", "center", "center"]}
                        >
                            {frontMatter.title}
                        </Heading>
                        <Text
                            fontSize="xl"
                            my={2}
                            color={color1[colorMode]}
                            textAlign={frontMatter.logoImage ? "left" : ["left", "left", "left", "left", "center", "center"]}
                        >
                            {frontMatter.description}
                        </Text>
                        <Text
                            fontSize="md"
                            textAlign={frontMatter.logoImage ? "left" : ["left", "left", "left", "left", "center", "center"]}
                            color={color[colorMode]}
                            mb={4}
                        >
                            {frontMatter.readingTime.text} &middot; Shared {timeAgo.format(new Date(frontMatter.publishedAt))} {frontMatter.updatedAt && `· Updated ${timeAgo.format(new Date(frontMatter.updatedAt))}`}
                        </Text>
                    </Flex>
                }
                <Flex justify="center">
                    {/* main content */}
                    <Flex flexGrow={1} flexDir="column" w="100%" px={4} maxW={800}>
                        {
                            frontMatter.logoImage &&
                            <>
                                {
                                    frontMatter.logoImage &&
                                    <Box bgColor={bgColor} w="fit-content" p={4} borderRadius={5}>
                                        <AspectRatio ratio={1} w={50}>
                                            <Image src={`/logos/${frontMatter.logoImage[0]}`} alt={frontMatter.title} />
                                        </AspectRatio>
                                    </Box>
                                }
                                <Heading
                                    mt={2}
                                    as="h1"
                                    size={size}
                                    textAlign={frontMatter.logoImage ? "left" : ["left", "left", "left", "left", "center", "center"]}
                                >
                                    {frontMatter.title}
                                </Heading>
                                <Text
                                    fontSize="xl"
                                    my={2}
                                    color={color1[colorMode]}
                                    textAlign={frontMatter.logoImage ? "left" : ["left", "left", "left", "left", "center", "center"]}
                                >
                                    {frontMatter.description}
                                </Text>
                                <Text
                                    fontSize="md"
                                    textAlign={frontMatter.logoImage ? "left" : ["left", "left", "left", "left", "center", "center"]}
                                    color={color[colorMode]}
                                    mb={4}
                                >
                                    {frontMatter.readingTime.text} &middot; Shared {timeAgo.format(new Date(frontMatter.publishedAt))}
                                </Text>
                            </>
                        }
                        {
                            frontMatter.youtubeId &&
                            <Flex justify="center">
                                <EmbeddedVideo src={getEmbedId(frontMatter?.youtubeId)} alt={frontMatter.title} maxW={800} />
                            </Flex>
                        }
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
                                    <AccordionButton _hover={{ bgColor: hoverBg }}>
                                        <Box flex="1" textAlign="left">
                                            On this page
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                    {frontMatter?.headers.map((h) => {
                                        return (
                                            <Link href={`#${h.text}`} key={h.text}>
                                                <Box
                                                    p={1}
                                                    _hover={{
                                                        bgColor: bgColor1,
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
                        <Text my={2} color={useColorModeValue("gray.600", "gray.400")}>Published on {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')} ({timeAgo.format(new Date(frontMatter.publishedAt))})</Text>
                        <Link textDecor="underline" _hover={{ opacity: .8 }} w="fit-content">
                            <Flex align="center">
                                <Icon as={ExternalLinkIcon} mr={2} />
                                <Link href={`https://github.com/carlson-technologies/coffeeclass.io/blob/main/content/articles/${slug}.mdx`} isExternal>Edit on GitHub</Link>
                            </Flex>
                        </Link>
                    </Flex>

                    {/* Right sidebar */}
                    <Flex display={['none', 'none', 'none', 'none', 'none', 'flex']}>
                        <div>
                            <Box maxW={300} overflow="scroll" pos="sticky" top={20}>
                                <Ad />
                                <RelatedPosts style="sidebar" tags={frontMatter.tags} posts={posts} currPostTitle={frontMatter.title} />
                            </Box>
                        </div>
                    </Flex>
                </Flex>
                <Box maxW={800} mx="auto" id="end-content">
                    <Flex
                        justify="center"
                        flexDir="column"
                        mt={8}
                        px={4}
                    >
                        <Link
                            href="#comments"
                            _hover={{ textDecor: 'none' }}
                        >
                            <Button
                                variant="outline"
                                w={['100%', '100%', '100%', 200, 250, 300]}
                                alignSelf="center"
                            >
                                Leave A Comment
                            </Button>
                        </Link>
                    </Flex>
                    <Divider mt={12} mb={4} alignSelf="center" />
                    <Flex flexDir="column" m="auto" my={10}>
                        <RelatedPosts tags={frontMatter.tags} posts={posts} currPostTitle={frontMatter.title} />
                    </Flex>
                    <Divider mt={12} mb={4} alignSelf="center" />
                    <Flex
                        align="center"
                        my={4}
                        justify="center"
                        flexDir="column"
                    >
                        <WrittenBy frontMatter={frontMatter} />
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

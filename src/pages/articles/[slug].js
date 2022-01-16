import { useState, useEffect } from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
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
    Button,
    Divider,
    Box,
    Heading,
    useColorModeValue,
    AspectRatio,
    Image,
    Icon,
    useBreakpointValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
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
import useSWR from "swr"
import fetcher from '../../scripts/fetcher'
import TimeAgo from '../../scripts/time-ago'
import HeadersAccordion from "../../components/HeadersAccordion";
import HeadersSidebar from "../../components/HeadersSidebar";

export default function PostPage({ source, frontMatter, posts }) {
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

    const { data, error } = useSWR(`/api/getAuthor?authorSlug=${frontMatter.author.replace(".mdx", "")}`, fetcher)

    // use useBreakpointValue to set the size to xl on small screens and 2xl on larger screens above 1000px
    const size = useBreakpointValue({ lg: 'lg', xl: 'xl', '2xl': '4xl' })

    const [width, setWidth] = useState(0)

    const handleScroll = () => {
        let scrollTop = window.scrollY
        let docHeight = document.body.offsetHeight - document?.getElementById("end-content")?.offsetHeight
        let winHeight = window.innerHeight
        let scrollPercent = scrollTop / (docHeight - winHeight)
        let scrollPercentRounded = Math.round(scrollPercent * 100)
        setWidth(scrollPercentRounded)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    const bgColor = useColorModeValue("gray.100", "gray.700")
    const h1ColorGradient = useColorModeValue("linear(to-r, black, black)", "linear(to-r, gray.200, yellow.400, pink.200, red.200)")

    return (
        <Container>
            <SEO url={`https://www.coffeeclass.io${slug}`} slug={slug} {...frontMatter} />
            <Box h={1} as="div" bg="brand_one.500" pos="fixed" top={0} left={0} zIndex={15} w={`${width}%`} transition="width .3s ease-in-out"></Box>

            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: .5 }}
            >
                {/* w is 850 + 300 */}
                <Flex flexDir="column" w="100%" maxW={[850, 850, 850, 850, 850, 1150]} px={4} mx="auto">
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
                        bgGradient={h1ColorGradient}
                        bgClip='text'
                        py={4}
                        fontWeight="bold"
                        letterSpacing="tight"
                        mb={2}
                    >
                        {frontMatter.title}
                    </Heading>
                </Flex>

                <Flex justify="center">
                    {/* main content */}
                    <Flex flexGrow={1} flexDir="column" w="100%" px={4} maxW={850}>
                        <Box bgColor={bgColor} p={5} borderRadius={5}>
                            <Text
                                fontSize="md"
                                color={color[colorMode]}
                                mb={4}
                            >
                                {frontMatter.readingTime.text} &middot; {frontMatter.readingTime.words} words &middot; Shared {TimeAgo(new Date(frontMatter.publishedAt))} by <Box _hover={{ borderBottomColor: useColorModeValue("brand_one.700", "brand_one.500") }} as="span" borderBottom="2px solid" borderBottomColor="transparent" transition="border-bottom-color .2s ease-in-out"><Link href="#author-bio" color={useColorModeValue("brand_one.700", "brand_one.500")} _hover={{ TextDecoder: 'none' }}>{data?.data?.data?.name}</Link></Box> {frontMatter.updatedAt && `· Updated ${TimeAgo(new Date(frontMatter.publishedAt))}`}
                            </Text>
                            <Text
                                fontSize="xl"
                                mb={2}
                                color={color1[colorMode]}
                            >
                                <strong>Article Summary:</strong> {frontMatter.description}
                            </Text>
                        </Box>
                        {
                            frontMatter.youtubeId &&
                            <Flex justify="center" my={2}>
                                <EmbeddedVideo src={getEmbedId(frontMatter?.youtubeId)} alt={frontMatter.title} maxW={800} />
                            </Flex>
                        }
                        <HeadersAccordion headers={frontMatter?.headers} />
                        <Ad />
                        <Box id="main-content">
                            <MDXRemote {...source} components={MDXComponents} />
                        </Box>
                        <Text my={2} color={useColorModeValue("gray.600", "gray.400")}>Published on {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')} ({TimeAgo(new Date(frontMatter.publishedAt))})</Text>
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
                            {/* <Box w={300} overflow="scroll" pos="sticky" top={10}>
                                <RelatedPosts style="sidebar" frontMatter={frontMatter} posts={posts} />
                            </Box> */}
                            <Box w={300}>
                                <RelatedPosts style="sidebar" frontMatter={frontMatter} posts={posts} />
                            </Box>
                            <Box w={300} overflow="scroll" pos="sticky" top={10}>
                                <HeadersSidebar headers={frontMatter?.headers} />
                            </Box>
                        </div>
                    </Flex>
                </Flex>

                <Box maxW={800} mx="auto" id="end-content">
                    <Flex flexDir="column" m="auto" my={10}>
                        <RelatedPosts frontMatter={frontMatter} posts={posts} />
                    </Flex>
                    <Divider mt={12} mb={4} alignSelf="center" />
                    <Flex
                        align="center"
                        my={4}
                        justify="center"
                        flexDir="column"
                        id="author-bio"
                    >
                        <WrittenBy frontMatter={frontMatter} />
                    </Flex>
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
                rehypeAutolinkHeadings,
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
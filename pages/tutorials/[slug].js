import fs from 'fs'
import matter from 'gray-matter'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import path from 'path'
import Layout from '../../layouts/tutorial'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../../lib/mdxUtils'
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
    Button,
    Image
} from '@chakra-ui/react'
import Comments from '../../components/Comments'
import getHeaders from '../../lib/get-headers'
import { useRouter } from 'next/router'

export default function PostPage({ source, frontMatter }) {
    const content = hydrate(source, { MDXComponents })
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.600',
        dark: 'gray.500'
    }
    const router = useRouter()
    const slug = router.query.slug
    return (
        <Layout frontMatter={frontMatter}>
            <Flex
                flexDir="column"
                w="100%"
                alignSelf="center"
                as="heading"
            >
                <Heading
                    as="h1"
                    size="2xl"
                    textAlign={["left", "left", "left", "center", "center", "center"]}
                >
                    {frontMatter.title}
                </Heading>
                <Text
                    fontSize="2xl"
                    mt={2}
                    mb={4}
                    color={color[colorMode]}
                    textAlign={["left", "left", "left", "center", "center", "center"]}
                >
                    {frontMatter.description}
                </Text>
                <Image
                    src={`/content/tutorials/${slug}/${frontMatter.featureImg}`}
                    alt={frontMatter.title}
                    maxW={800}
                    borderRadius={15}
                    alignSelf={[null, null, null, null, null, "center"]}
                />
            </Flex>
            <Flex
                flexDir="column"
                w="100%"
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
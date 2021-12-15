import fs from 'fs'
import matter from 'gray-matter'
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import path from 'path'
import LearnLayout from '../../../layouts/course'
import { learnChakraUIFilePaths, LEARN_CHAKRAUI_PATH } from '../../../scripts/mdx-utils'
import MDXComponents from '../../../components/MDXComponents'
import mdxPrism from 'mdx-prism'
import readingTime from 'reading-time'
import { motion } from 'framer-motion'
import Pagination from '../../../components/Courses/Pagination'
import { parseISO, format } from 'date-fns'
import getHeaders from '../../../scripts/get-headings'
import {
    Heading,
    Text,
    Box,
    Flex,
    useColorModeValue,
    useColorMode,
    Link,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Icon,
} from '@chakra-ui/react'
import Ad from '../../../components/Content/Ad'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'

export default function PostPage({ source, frontMatter }) {
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.600',
        dark: 'gray.400'
    }
    const bgColor = useColorModeValue("gray.100", "gray.800")

    const router = useRouter()
    const slug = router.query.slug

    return (
        <LearnLayout frontMatter={frontMatter} src="chakra-ui.png" alt="Chakra UI Image">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: .5 }}
                style={{
                    flexDir: "column",
                    w: "100%",
                    alignSelf: "center",
                    maxW: '1000px',
                }}
            >
                <Box>
                    <Heading as="h1" size="2xl" letterSpacing="tight" mb={1}>{frontMatter.title}</Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")} fontSize="xl">{frontMatter.description}</Text>
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
                                        <Link href={`#${h.text}`} key={h.text}>
                                            <Box
                                                p={1}
                                                _hover={{
                                                    bgColor: bgColor,
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
                <Flex
                    flexDir="column"
                    maxW="1000px"
                    id="main-content"
                >
                    <Ad />
                    <MDXRemote {...source} components={MDXComponents} />
                </Flex>
                <Box mb={4} mt={10}>
                    {frontMatter.updatedAt && <Text color="gray.500" fontSize="sm" textAlign="center">Last updated on {format(parseISO(frontMatter.updatedAt || frontMatter.publishedAt), 'MMMM dd, yyyy')}</Text>}
                </Box>
                <Link textDecor="underline" _hover={{ opacity: .8 }} w="fit-content">
                    <Flex align="center">
                        <Icon as={ExternalLinkIcon} mr={2} />
                        <Link href={`https://github.com/carlson-technologies/coffeeclass.io/blob/main/content/courses/chakra-ui/${slug}.mdx`} isExternal>Edit on GitHib</Link>
                    </Flex>
                </Link>
                <Pagination />
            </motion.div>
        </LearnLayout>
    )
}

export const getStaticProps = async ({ params }) => {
    const learnChakraUIPath = path.join(LEARN_CHAKRAUI_PATH, `${params.slug}.mdx`)
    const source = fs.readFileSync(learnChakraUIPath)

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
    const paths = learnChakraUIFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug } }))

    return {
        paths,
        fallback: false,
    }
}
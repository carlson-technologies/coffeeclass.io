import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import path from 'path'
import LearnLayout from '../../../layouts/learn'
import { learnChakraUIFilePaths, LEARN_CHAKRAUI_PATH } from '../../../scripts/mdx-utils'
import MDXComponents from '../../../components/MDXComponents'
import mdxPrism from 'mdx-prism'
import readingTime from 'reading-time'
import { motion } from 'framer-motion'
import Pagination from '../../../components/Pagination'
import { parseISO, format } from 'date-fns'
import getHeaders from '../../../scripts/get-headings'
import {
    Heading,
    Text,
    Box,
    Divider,
    Flex,
    useColorModeValue,
    useColorMode,
    Link,
    Circle,
    Center,
    Wrap,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    UnorderedList,
    ListItem,
} from '@chakra-ui/react'
import Ad from '../../../components/Ad'

export default function PostPage({ source, frontMatter }) {
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.600',
        dark: 'gray.400'
    }
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
                        {/* <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        Meta
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel>
                                <UnorderedList>
                                    <ListItem>
                                        <Text>{frontMatter.readingTime.text}</Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text>Published {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}</Text>
                                    </ListItem>
                                </UnorderedList>
                            </AccordionPanel>
                        </AccordionItem> */}

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
                <Flex
                    flexDir="column"
                    maxW="1000px"
                    id="main-content"
                >
                    {/* <Ad /> */}
                    <MDXRemote {...source} components={MDXComponents} />
                </Flex>
                <Box mb={4} mt={10}>
                    {frontMatter.lastUpdated && <Text color="gray.500" fontSize="sm" textAlign="center">Last updated on {format(parseISO(frontMatter.lastUpdated || frontMatter.publishedAt), 'MMMM dd, yyyy')}</Text>}
                </Box>
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
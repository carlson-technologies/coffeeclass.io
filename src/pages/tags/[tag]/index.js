import { useState } from 'react'
import {
    Heading,
    Flex,
    useColorModeValue,
    Box,
    Grid,
    Text,
    Link,
    AspectRatio,
    Skeleton,
    Icon,
} from '@chakra-ui/react'
import Container from '../../../components/Container'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { contentFilePaths, CONTENT_PATH, tagsFilePaths, TAGS_PATH } from '../../../scripts/mdx-utils'
import { motion } from "framer-motion"
import NextLink from 'next/link'
import { ChevronRightIcon } from '@chakra-ui/icons'
import TimeAgo from '../../../scripts/time-ago'

const MotionBox = motion(Box)

export default function Index({ articles, frontMatter }) {
    const url = `https://www.coffeeclass.io/tags/${frontMatter.title}`
    const title = `${frontMatter.title}`
    const description = `Articles relating to ${frontMatter.title} on coffeeclass.io.${frontMatter.description ? ` ${frontMatter.description}` : ''}`

    // loop through articles and if the tag is in the tags array, add it to the filtered array
    const filteredArticles = articles.filter(article => {
        return article.data.tags.includes(frontMatter.title)
    })

    const [loaded, setLoaded] = useState(false)

    const color = useColorModeValue("gray.500", "gray.400")
    const bgColor = useColorModeValue("gray.100", "gray.900")

    // console.log(filteredArticles)

    return (
        <Container title={title} description={description} url={url}>
            <Flex
                bgGradient={`linear(to-r,${useColorModeValue("gray.50", "gray.600")},${useColorModeValue("gray.200", "gray.800")},${useColorModeValue("gray.300", "gray.900")})`}
                flexDir="column"
            >
                <Box as="header" mt={10} mb={10} px={4}>
                    <Heading
                        as="h1"
                        size="xl"
                        letterSpacing="tight"
                        textTransform="uppercase"
                        color={useColorModeValue("brand_one.600", "brand_one.500")}
                    >
                        #{frontMatter.title}
                    </Heading>
                    {frontMatter?.description &&
                        <Heading
                            as="h2"
                            size="md"
                            color={color}
                            mt={2}
                        >
                            {frontMatter.description}
                        </Heading>
                    }
                </Box>
            </Flex>

            <Box p={4}>
                <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={6}>
                    {filteredArticles.map((post) => (
                        <MotionBox
                            initial={{ opacity: 0, marginTop: 5 }}
                            animate={{ opacity: 1, marginTop: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            style={{
                                height: '100%',
                            }}
                            key={post.data.title}
                        >
                            <NextLink href={`/articles/${post.filePath.replace(".mdx", "")}`} passHref>
                                <Link href={`/articles/${post.filePath.replace(".mdx", "")}`} _hover={{ textDecor: 'none' }}>
                                    <Flex
                                        minH={400}
                                        flexDir="column"
                                        bgColor={bgColor}
                                        h="100%"
                                        p={5}
                                        borderRadius={5}
                                        _hover={{
                                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                                            transform: "translateY(-2px)",
                                        }}
                                        transition="box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out"
                                        justify="space-between"
                                    >
                                        <Box>
                                            <Text minW={120} textAlign="center" color={color} fontSize="md" mb={6}>{TimeAgo(new Date(post.data.publishedAt))}</Text>
                                            <Heading as="h3" size="lg" mt={4} fontWeight="medium" letterSpacing="wide">{post.data.title}</Heading>
                                        </Box>
                                        <Flex mt={4} align="center">
                                            <Text color="brand_one.500" fontSize="lg">Read article</Text>
                                            <Icon color="brand_one.500" as={ChevronRightIcon} fontSize="2xl" />
                                        </Flex>
                                    </Flex>
                                </Link>
                            </NextLink>
                        </MotionBox>
                    ))}
                </Grid>
            </Box>
        </Container>
    )
}

export const getStaticProps = async ({ params }) => {
    const tagsPath = path.join(TAGS_PATH, `${params.tag}.mdx`)
    const source = fs.readFileSync(tagsPath)
    const { content, data } = matter(source)

    const mdxSource = await serialize(content, {
        scope: data,
    })

    const articles = contentFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(CONTENT_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content,
            data,
            filePath,
        }
    })

    articles.sort(
        (a, b) =>
            Number(new Date(b.data.publishedAt)) -
            Number(new Date(a.data.publishedAt))
    );

    return {
        props: {
            articles,
            source: mdxSource,
            frontMatter: {
                ...data
            },
        },
    }
}

export const getStaticPaths = async () => {
    const paths = tagsFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((tag) => ({ params: { tag } }))

    return {
        paths,
        fallback: false,
    }
}
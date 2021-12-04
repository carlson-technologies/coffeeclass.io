import {
    Heading,
    Flex,
    Grid,
    useColorModeValue,
    Box,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../../../components/Container'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { snippetsFilePaths, SNIPPETS_PATH } from '../../../scripts/mdx-utils'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../../../scripts/mdx-utils'
import Snippet from '../../../components/Cards/Snippet'
import Tutorial from '../../../components/Cards/Tutorial'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { tagsFilePaths, TAGS_PATH } from '../../../scripts/mdx-utils'

export default function Index({ tutorials, snippets, frontMatter }) {
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const url = `https://www.coffeeclass.io/tags/${frontMatter.title}`
    const title = `${frontMatter.title} | Tags | coffeeclass.io`
    const description = `Articles relating to ${frontMatter.title} on coffeeclass.io. ${frontMatter.description ?? ""}`

    return (
        <Container>
            <NextSeo
                title={title}
                description={description}
                canonical={url}
                openGraph={{
                    url,
                    title,
                    description
                }}
            />
            <Flex
                bgGradient={`linear(to-r,${useColorModeValue("gray.50", "gray.600")},${useColorModeValue("gray.200", "gray.800")},${useColorModeValue("gray.300", "gray.900")})`}
                flexDir="column"
            >
                <Box as="header" mt={10} mb={20} px={4}>
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
                            color={useColorModeValue("gray.500", "gray.400")}
                            my={1}
                        >
                            {frontMatter.description}
                        </Heading>
                    }
                </Box>
            </Flex>

            <Flex flexDir="column" px={4} mt="-10">
                <Box as="section">
                    {/* <Heading my={4} as="h2">Snippets</Heading> */}
                    <Grid
                        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
                        gap={6}
                        mt={4}
                    >
                        {
                            snippets.map(post => post.data.tags.map(t => {
                                return (
                                    t == frontMatter.title ?
                                        <Snippet
                                            key={post.data.title}
                                            src={`/content/articles/${post.filePath.replace(/\.mdx?$/, '')}/${post.data.featureImg}`}
                                            title={post.data.title}
                                            description={post.data.description}
                                            tags={post.data.tags}
                                            as={`/snippets/${post.filePath.replace(/\.mdx?$/, '')}`}
                                            href={`/snippets/[slug]`}
                                            mainTag={frontMatter.title}
                                            image={`/logos/${post.data.logoImage[0]}`}
                                            timeAge={timeAgo.format(new Date(post.data.publishedAt))}
                                            authorName={post.data.author}
                                        /> : null
                                )
                            }))
                        }
                    </Grid>
                </Box>
                <Box as="section">
                    {/* <Heading my={4} as="h2">Tutorials</Heading> */}
                    <Grid
                        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
                        gap={6}
                        mt={4}
                    >
                        {
                            tutorials.map(post => post.data.tags.map(t => {
                                return (
                                    t == frontMatter.title ?
                                        <Tutorial
                                            key={post.data.title}
                                            src={`/content/articles/${post.filePath.replace(/\.mdx?$/, '')}/${post.data.featureImg}`}
                                            title={post.data.title}
                                            description={post.data.description}
                                            tags={post.data.tags}
                                            as={`/articles/${post.filePath.replace(/\.mdx?$/, '')}`}
                                            href={`/articles/[slug]`}
                                            mainTag={frontMatter.title}
                                        /> : null
                                )
                            }))
                        }
                    </Grid>
                </Box>
            </Flex>
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

    const tutorials = tutorialsFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(TUTORIALS_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content,
            data,
            filePath,
        }
    })

    const snippets = snippetsFilePaths.map((filePath) => {
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
            tutorials,
            snippets,
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
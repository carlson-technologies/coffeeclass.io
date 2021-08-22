import {
    Heading,
    Flex,
    Stack,
    Grid,
    Divider,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../../../components/Container'
import { useRouter } from 'next/router'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { snippetsFilePaths, SNIPPETS_PATH } from '../../../lib/mdxUtils'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../../../lib/mdxUtils'
import Snippet from '../../../components/Cards/Snippet'
import Tutorial from '../../../components/Cards/Tutorial'
import tags from '../../../configs/tags.json'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

export default function Index({ tutorials, snippets }) {
    const router = useRouter()
    const { tag } = router.query
    var currentTag = [];
    for (var i = 0; i < tags.tags.length; i++) {
        if (tags.tags[i].title === tag) {
            currentTag.push(tags.tags[i])
        }
    }

    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const url = `https://coffeeclass.io/tags/${tag}`
    const title = `${tag} | Tags | coffeeclass.io`
    const description = `Articles relating to ${tag} on coffeeclass.io. ${currentTag[0]?.description ?? ""}`
    const { colorMode } = useColorMode()
    const headerColor = {
        light: 'brand_one.600',
        dark: 'brand_one.500'
    }

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
            <Stack
                spacing={8}
                px={4}
            >
                <Flex
                    flexDir="column"
                    mt={50}
                >
                    <Heading
                        as="h1"
                        size="xl"
                        letterSpacing="tight"
                        textTransform="uppercase"
                        color={headerColor[colorMode]}
                    >
                        #{tag}
                    </Heading>
                    {currentTag[0]?.description &&
                        <Heading
                            as="h2"
                            size="md"
                            color={useColorModeValue("gray.500", "gray.400")}
                            my={1}
                        >
                            {currentTag[0]?.description}
                        </Heading>
                    }
                    <Divider mt={2} />
                    <Heading my={4} as="h2" size="md">Snippets</Heading>
                    <Flex flexDir="column">
                        <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={6}>
                            {
                                snippets.map(post => post.data.tags.map(t => {
                                    return (
                                        t == tag ?
                                            <Snippet
                                                key={post.data.title}
                                                src={`/content/snippets/${post.filePath.replace(/\.mdx?$/, '')}/${post.data.featureImg}`}
                                                title={post.data.title}
                                                description={post.data.description}
                                                tags={post.data.tags}
                                                as={`/snippets/${post.filePath.replace(/\.mdx?$/, '')}`}
                                                href={`/snippets/[slug]`}
                                                mainTag={tag}
                                                image={`/snippet-images/${post.data.logoImage[0]}`}
                                                timeAge={timeAgo.format(new Date(post.data.publishedAt))}
                                                authorName={post.data.author}
                                            /> : null
                                    )
                                }))
                            }
                        </Grid>
                        <Heading my={4} as="h3" size="md">Tutorials</Heading>
                        <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={6}>
                            {
                                tutorials.map(post => post.data.tags.map(t => {
                                    return (
                                        t == tag ?
                                            <Flex m={1, 1, 1, 2, 2, 2}>
                                                <Tutorial
                                                    key={post.data.title}
                                                    src={`/content/tutorials/${post.filePath.replace(/\.mdx?$/, '')}/${post.data.featureImg}`}
                                                    title={post.data.title}
                                                    description={post.data.description}
                                                    tags={post.data.tags}
                                                    as={`/tutorials/${post.filePath.replace(/\.mdx?$/, '')}`}
                                                    href={`/tutorials/[slug]`}
                                                    mainTag={tag}
                                                /></Flex> : null
                                    )
                                }))
                            }
                        </Grid>
                    </Flex>
                </Flex>
            </Stack>
        </Container>
    )
}

export function getStaticProps() {
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

    return { props: { tutorials, snippets } }
}

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}
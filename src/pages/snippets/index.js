import {
    Heading,
    Flex,
    Stack,
    useColorMode,
    Grid,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../../components/Container'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { snippetsFilePaths, SNIPPETS_PATH } from '../../scripts/mdx-utils'
import Snippet from '../../components/Cards/Snippet'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

const url = 'https://www.coffeeclass.io/snippets'
const title = 'Snippets | coffeeclass.io'
const description = 'coffeeclass.io snippets are code bits that you can easily copy and paste into your project.'

export default function Index({ posts }) {
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.700',
        dark: 'gray.300'
    }
    const headerColor = {
        light: 'brand_one.600',
        dark: 'brand_one.500'
    }

    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')
    
    const snippetsOrderedByPublishedDate = posts
        .sort(
            (a, b) =>
                Number(new Date(b.data.publishedAt)) - Number(new Date(a.data.publishedAt))
        )
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
                <Flex flexDir="column" mt={50}>
                    <Heading
                        as="h1"
                        size="xl"
                        letterSpacing="tight"
                        textTransform="uppercase"
                        color={headerColor[colorMode]}
                        textAlign="center"
                        mb={8}
                    >
                        coffeeclass.io Snippets ✂️
                    </Heading>
                    <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={6}>
                        {snippetsOrderedByPublishedDate.map((post) => (
                            <Snippet
                                key={post.data.title}
                                src={`/content/snippets/${post.filePath.replace(/\.mdx?$/, '')}/${post.data.featureImg}`}
                                title={post.data.title}
                                description={post.data.description}
                                tags={post.data.tags}
                                as={`/snippets/${post.filePath.replace(/\.mdx?$/, '')}`}
                                href={`/snippets/[slug]`}
                                image={`/snippet-images/${post.data.logoImage[0]}`}
                                timeAge={timeAgo.format(new Date(post.data.publishedAt))}
                                authorName={post.data.author}
                            />
                        ))}
                    </Grid>
                </Flex>
            </Stack>
        </Container>
    )
}

export function getStaticProps() {
    const posts = snippetsFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(SNIPPETS_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content,
            data,
            filePath,
        }
    })

    return { props: { posts } }
}
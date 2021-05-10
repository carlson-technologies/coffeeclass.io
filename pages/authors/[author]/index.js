import { useState } from 'react'
import {
    Heading,
    Flex,
    Stack,
    Grid,
    Divider,
    useColorMode,
    Tag,
    Link
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../../../components/Container'
import { useRouter } from 'next/router'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { snippetsFilePaths, SNIPPETS_PATH } from '../../../utils/mdxUtils'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../../../utils/mdxUtils'
import Snippet from '../../../components/Cards/Snippet'
import Tutorial from '../../../components/Cards/Tutorial'

export default function Index({ tutorials, snippets }) {
    const router = useRouter()
    const { author } = router.query
    const url = `https://coffeeclass.io/tag/${author}`
    const title = 'Tags – Coffeeclass'
    const description = `Articles relating to ${author}`
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
                    <Heading as="h1" size="2xl" textAlign="center" letterSpacing="tight" color={headerColor[colorMode]}>{author}</Heading>
                    <Flex my={2} justifyContent="center" mt={2}>
                        <Tag mr={2} size="lg"><Link href="https://benjamincarlson.io" isExternal>Website</Link></Tag>
                        <Tag mr={2} size="lg"><Link href="https://github.com/bjcarlson42" isExternal>GitHub</Link></Tag>
                    </Flex>
                    <Divider mt={2} />
                    <Heading my={4} as="h2">Snippets</Heading>
                    <Flex flexDir="column">
                        <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={6}>
                            {
                                snippets.map(s => {
                                    return (
                                        s.data.author == author ?
                                            <Snippet
                                                key={s.data.title}
                                                src={`/content/snippets/${s.filePath.replace(/\.mdx?$/, '')}/${s.data.featureImg}`}
                                                title={s.data.title}
                                                description={s.data.description}
                                                tags={s.data.tags}
                                                as={`/snippets/${s.filePath.replace(/\.mdx?$/, '')}`}
                                                href={`/snippets/[slug]`}
                                            /> : null
                                    )
                                })
                            }
                        </Grid>
                        <Heading my={4} as="h3">Tutorials</Heading>
                        {
                            tutorials.map(t => {
                                return (
                                    t.data.author == author ?
                                        <Tutorial
                                            key={t.data.title}
                                            src={`/content/tutorials/${t.filePath.replace(/\.mdx?$/, '')}/${t.data.featureImg}`}
                                            title={t.data.title}
                                            description={t.data.description}
                                            tags={t.data.tags}
                                            as={`/tutorials/${t.filePath.replace(/\.mdx?$/, '')}`}
                                            href={`/tutorials/[slug]`}
                                        /> : null
                                )
                            })
                        }
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
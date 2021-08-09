import {
    Heading,
    Flex,
    Stack,
    Grid,
    Divider,
    useColorMode,
    Tag,
    Link,
    Avatar
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
import authors from '../../../configs/authors.json'

export default function Index({ tutorials, snippets }) {
    const router = useRouter()
    const { author } = router.query
    const url = `https://coffeeclass.io/authors/${author}`
    const title = `${author} | coffeeclass.io`
    const description = `coffeeclass.io tutorials and snippets written by ${author}`
    const { colorMode } = useColorMode()
    const headerColor = {
        light: 'brand_one.600',
        dark: 'brand_one.500'
    }
    var currentAuthor = [];
    for (var i = 0; i < authors.authors.length; i++) {
        if (authors.authors[i].name === author) {
            currentAuthor.push(authors.authors[i])
        }
    }

    if (currentAuthor.length === 0) {
        return (
            <Container>
                <Heading as="h1" size="2xl" textAlign="center" letterSpacing="tight" color={headerColor[colorMode]}>{author} not found!</Heading>
            </Container>
        )
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
                    <Avatar alignSelf="center" size="2xl" src={currentAuthor[0]?.image} />
                    <Heading as="h1" size="2xl" textAlign="center" letterSpacing="tight" color={headerColor[colorMode]}>{author}</Heading>
                    <Flex
                        my={4}
                        justifyContent="center"
                        h={5}
                    >
                        <Tag
                            mr={2}
                            size="lg"
                            transition="margin .2s ease-in-out"
                            _hover={{ mt: "-2" }}
                        >
                            <Link
                                href={currentAuthor[0]?.website}
                                _hover={{ textDecor: 'none' }}
                                isExternal
                            >
                                Website
                            </Link>
                        </Tag>
                        <Tag
                            mr={2}
                            size="lg"
                            transition="margin .2s ease-in-out"
                            _hover={{ mt: "-2" }}
                        >
                            <Link
                                href={currentAuthor[0]?.github}
                                _hover={{ textDecor: 'none' }}
                                isExternal
                            >
                                GitHub
                            </Link>
                        </Tag>
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
                                                image={`/snippet-images/${s.data.logoImage[0]}`}
                                            /> : null
                                    )
                                })
                            }
                        </Grid>
                        <Heading my={4} as="h3">Tutorials</Heading>
                        <Flex wrap="wrap">
                            {
                                tutorials.map(t => {
                                    return (
                                        t.data.author == author ?
                                            <Flex m={1, 1, 1, 2, 2, 2}>
                                                <Tutorial
                                                    key={t.data.title}
                                                    src={`/content/tutorials/${t.filePath.replace(/\.mdx?$/, '')}/${t.data.featureImg}`}
                                                    title={t.data.title}
                                                    description={t.data.description}
                                                    tags={t.data.tags}
                                                    as={`/tutorials/${t.filePath.replace(/\.mdx?$/, '')}`}
                                                    href={`/tutorials/[slug]`}
                                                />
                                            </Flex> : null
                                    )
                                })
                            }
                        </Flex>
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
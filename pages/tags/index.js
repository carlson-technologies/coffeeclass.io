import {
    Heading,
    Flex,
    Stack,
    Link,
    Divider,
    useColorMode,
    Badge
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../../components/Container'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { snippetsFilePaths, SNIPPETS_PATH } from '../../utils/mdxUtils'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../../utils/mdxUtils'
import NextLink from 'next/link'

const url = `https://coffeeclass.io/tag`
const title = 'Tags – Coffeeclass'
const description = `Tags for Coffeeclass`

export default function Index({ tutorials, snippets }) {
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.700',
        dark: 'gray.300'
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
                    <Heading as="h1" size="2xl">All Tags</Heading>
                    <Divider my={6} />
                    {/* This will work until we have duplicate tags */}
                    <Flex wrap="wrap">
                        {
                            tutorials.map(tut => tut.data.tags.map(tag => {
                                return (
                                    <NextLink key={tag} href={`/tags/${tag}`} passHref>
                                        <Link href={`/${tag}`}>
                                            <Badge colorScheme="cyan" mr={2} mb={2} p={1} fontSize="xl">#{tag}</Badge>
                                        </Link>
                                    </NextLink>
                                )
                            }))
                        }
                        {
                            snippets.map(snip => snip.data.tags.map(tag => {
                                return (
                                    <NextLink key={tag} href={`/tags/${tag}`} passHref>
                                        <Link href={`/${tag}`}>
                                            <Badge colorScheme="cyan" mr={2} mb={2} p={1} fontSize="xl">#{tag}</Badge>
                                        </Link>
                                    </NextLink>
                                )
                            }))
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
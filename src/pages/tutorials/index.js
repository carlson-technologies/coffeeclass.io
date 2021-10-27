import {
    Heading,
    Flex,
    useColorModeValue,
    SimpleGrid,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../../components/Container'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../../scripts/mdx-utils'
import Tutorial from '../../components/Cards/Tutorial'

const url = 'https://www.coffeeclass.io/tutorials/'
const title = 'Tutorials | coffeeclass.io'
const description = 'Learn a new skill with coffeeclass.io Tutorials.'

export default function Index({ posts }) {
    const tutorialsOrderedByPublishedDate = posts
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
            <Flex flexDir="column" px={4}>
                <Heading
                    as="h1"
                    size="2xl"
                    letterSpacing="tight"
                    textTransform="uppercase"
                    my={8}
                >
                    Tutorials 📚
                </Heading>
                <SimpleGrid minChildWidth={["100%", "100%", "100%", "100%", "400px", "400px"]} spacing="40px">
                    {tutorialsOrderedByPublishedDate.map((post) => (
                        <Tutorial
                            key={post.data.title}
                            src={`/content/tutorials/${post.filePath.replace(/\.mdx?$/, '')}/${post.data.featureImg}`}
                            title={post.data.title}
                            description={post.data.description}
                            tags={post.data.tags}
                            as={`/tutorials/${post.filePath.replace(/\.mdx?$/, '')}`}
                            href={`/tutorials/[slug]`}
                        />
                    ))}
                </SimpleGrid>
            </Flex>
        </Container>
    )
}

export function getStaticProps() {
    const posts = tutorialsFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(TUTORIALS_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content, // do I need to fetch content? This may cause significant load time down the line
            data,
            filePath,
        }
    })

    return { props: { posts } }
}
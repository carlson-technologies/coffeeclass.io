import {
    Heading,
    Flex,
    Stack
} from '@chakra-ui/react'
import Container from '../../components/Container'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { snippetsFilePaths, SNIPPETS_PATH } from '../../utils/mdxUtils'
import Snippet from '../../components/Cards/Snippet'

export default function Index({ posts }) {
    return (
        <Container>
            <Stack
                spacing={8}
                px={4}
            >
                <Flex flexDir="column" mt={50}>
                    <Heading as="h1" size="2xl" mb={4} textAlign="center">Coffeeclass Snippets ✂️</Heading>
                    <Flex flexDir="column">
                        {posts.map((post) => (
                            <Snippet
                                key={post.filePath}
                                src={`/content/snippets/${post.filePath.replace(/\.mdx?$/, '')}/${post.data.featureImg}`}
                                title={post.data.title}
                                description={post.data.description}
                                tags={post.data.tags}
                                as={`/snippets/${post.filePath.replace(/\.mdx?$/, '')}`}
                                href={`/snippets/[slug]`}
                            />
                        ))}
                    </Flex>
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
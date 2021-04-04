import {
    Heading,
    Flex,
    Button,
    Stack,
    Text,
    Box,
    Badge
} from '@chakra-ui/react'
import Container from '../../components/Container'
import Image from 'next/image'
import NextLink from 'next/link'
import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import path from 'path'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../../utils/mdxUtils'

export default function Index({ posts }) {
    return (
        <Container>
            <Stack
                spacing={8}
                px={4}
            >
                <Flex flexDir="column">
                    <Heading>Tutorials</Heading>
                    <ul>
                        {posts.map((post) => (
                            <li key={post.filePath}>
                                <Link
                                    as={`/tutorials/${post.filePath.replace(/\.mdx?$/, '')}`}
                                    href={`/tutorials/[slug]`}
                                >
                                    <a>{post.data.title}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Flex>
            </Stack>
        </Container>
    )
}

export function getStaticProps() {
    const posts = tutorialsFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(TUTORIALS_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content,
            data,
            filePath,
        }
    })

    return { props: { posts } }
}
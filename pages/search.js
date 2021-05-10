import React, { useState } from 'react'
import {
    Heading,
    Flex,
    Stack,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    Link,
    InputGroup,
    Input,
    InputRightElement,
    Tag,
    useColorMode
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../components/Container'
import NextLink from 'next/link'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { snippetsFilePaths, SNIPPETS_PATH } from '../utils/mdxUtils'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../utils/mdxUtils'
import { SearchIcon } from '@chakra-ui/icons'

const url = 'https://coffeeclass.io/search'
const title = 'Search – Coffeeclass'
const description = 'Search free programming tutorials on beginner Python, intermediate Python, advanced Python, JavaScript, algorithms, Next.js, react, and more all for free on Coffeeclass.'

export default function Search({ snippets, tutorials }) {
    const [searchValue, setSearchValue] = useState('')
    const allPosts = []
    snippets.map(s => { allPosts.push(s) })
    tutorials.map(t => { allPosts.push(t) })
    const filteredPosts = allPosts
        .sort(
            (a, b) =>
                Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
        )
        .filter((frontMatter) =>
            frontMatter.data.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            frontMatter.data.description.toLowerCase().includes(searchValue.toLowerCase())
        )
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
                maxW="100em"
            >
                <Flex
                    flexDir="column"
                    mt={50}
                >
                    <Heading as="h1" size="2xl" color={headerColor[colorMode]} letterSpacing="tight">Search</Heading>
                    <InputGroup my={4} w="50%">
                        <Input
                            aria-label="Search by title and summary"
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search by title and summary"
                        />
                        <InputRightElement>
                            <SearchIcon color="gray.300" />
                        </InputRightElement>
                    </InputGroup>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Title</Th>
                                <Th>Summary</Th>
                                <Th display={['none', 'none', 'table-cell']}>Tags</Th>
                                <Th display={['none', 'none', 'table-cell']}>Author</Th>
                                <Th display={['none', 'none', 'table-cell']}>Date Posted</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filteredPosts.map((p, index) => {
                                const type = p.data.type === 'tutorial' ? '/tutorials/' : '/snippets/'
                                return (
                                    <Tr key={index}>
                                        <Td>
                                            <Link
                                                href={`${type}${p.filePath.replace(/\.mdx?$/, '')}`}
                                            >
                                                {p.data.title}
                                            </Link>
                                        </Td>
                                        <Td>{p.data.description}</Td>
                                        <Td display={['none', 'none', 'table-cell']}>{p.data.tags.map((t, index) => {
                                            return (
                                                <span style={{ padding: '1px' }} key={index}>
                                                    <NextLink href={`/tags/${t}`} passHref>
                                                        <Link
                                                            href={`/${t}`}
                                                            _hover={{
                                                                textDecor: 'none',
                                                                opacity: '.5'
                                                            }}
                                                        >
                                                            <Tag size="sm">#{t}</Tag>
                                                        </Link>
                                                    </NextLink>
                                                </span>
                                            )
                                        })}</Td>
                                        <Td display={['none', 'none', 'table-cell']}>{p.data.author}</Td>
                                        <Td display={['none', 'none', 'table-cell']}>{p.data.publishedAt}</Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
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
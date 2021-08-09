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
    useColorMode,
    Text
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../components/Container'
import NextLink from 'next/link'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { snippetsFilePaths, SNIPPETS_PATH } from '../lib/mdxUtils'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../lib/mdxUtils'
import { learnPythonFilePaths, LEARN_PYTHON_PATH } from '../lib/mdxUtils'
import { learnChakraUIFilePaths, LEARN_CHAKRAUI_PATH } from '../lib/mdxUtils'
import { SearchIcon } from '@chakra-ui/icons'
import get_type from '../lib/get_type'
import { parseISO, format } from 'date-fns'

const url = 'https://coffeeclass.io/search'
const title = 'Search | coffeeclass.io'
const description = 'Search free programming tutorials on beginner Python, intermediate Python, advanced Python, JavaScript, algorithms, Next.js, react, and more all for free on coffeeclass.io.'

export default function Search({ snippets, tutorials, learn_python, learn_chakraui }) {
    const [searchValue, setSearchValue] = useState('')
    const allPosts = []
    snippets.map(s => { allPosts.push(s) })
    tutorials.map(t => { allPosts.push(t) })
    learn_python.map(l_p => { allPosts.push(l_p) })
    learn_chakraui.map(l_c => { allPosts.push(l_c) })

    allPosts.sort((a, b) => {
        return Number(new Date(b.data.publishedAt)) - Number(new Date(a.data.publishedAt))
    })

    const filteredPosts = allPosts
        .filter((frontMatter) =>
            frontMatter.data?.title?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
            frontMatter.data?.description?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
            frontMatter.data?.tags?.some(tag => tag.toLowerCase().includes(searchValue.toLowerCase())) ||
            frontMatter.data?.author?.toLowerCase()?.includes(searchValue.toLowerCase())
        )

    const { colorMode } = useColorMode()
    const headerColor = {
        light: 'brand_one.600',
        dark: 'brand_one.500'
    }
    const secondaryColor = {
        light: 'gray.500',
        dark: 'gray.600'
    }
    const tableColorBg = {
        light: 'gray.200',
        dark: 'gray.700',
    }

    function getEmojiTitle(post_type) {
        switch (post_type) {
            case 'tutorial':
                return '📚 tutorial'
            case 'snippet':
                return '✂️ snippet'
            case 'learn':
                return '🎒 learn'
        }
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
                    <Heading
                        as="h1"
                        size="xl"
                        letterSpacing="tight"
                        textTransform="uppercase"
                        color={headerColor[colorMode]}
                    >
                        Search
                    </Heading>
                    <InputGroup my={4}>
                        <Input
                            autoFocus
                            focusBorderColor={headerColor[colorMode]}
                            aria-label="Search by title, summary, tags, and author"
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder={`Search ${allPosts.length} results by title, summary, tags, and author`}
                        />
                        <InputRightElement>
                            <SearchIcon color={secondaryColor[colorMode]} />
                        </InputRightElement>
                    </InputGroup>
                    <Text color={secondaryColor[colorMode]}>{filteredPosts.length} search {filteredPosts.length == 1 ? "result" : "results"}...</Text>
                    <Flex overflow="auto">
                        <Table variant="unstyled">
                            <Thead>
                                <Tr>
                                    <Th>Type</Th>
                                    <Th>Title</Th>
                                    <Th>Summary</Th>
                                    <Th>Tags</Th>
                                    <Th>Author</Th>
                                    <Th>Date Posted</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {filteredPosts.map((p, index) => {
                                    const type = get_type(p.data.type)
                                    return (
                                        <Tr key={index} bg={index % 2 ? tableColorBg[colorMode] : null}>
                                            <Td minW="130px" borderTopLeftRadius={10} borderBottomLeftRadius={10}>{getEmojiTitle(p.data.type)}</Td>
                                            <Td minW="250px">
                                                <Link
                                                    href={
                                                        p.data.type === 'learn' ?
                                                            `${type}${p.data.language}/${p.filePath.replace(/\.mdx?$/, '')}`
                                                            : `${type}${p.filePath.replace(/\.mdx?$/, '')}`}
                                                >
                                                    {p.data.title}
                                                </Link>
                                            </Td>
                                            <Td minW="250px">{p.data?.description}</Td>
                                            <Td>{p.data?.tags?.map((t, index) => {
                                                return (
                                                    <NextLink href={`/tags/${t}`} key={index} passHref>
                                                        <Link
                                                            href={`/${t}`}
                                                            _hover={{
                                                                textDecor: 'none',
                                                                opacity: '.5'
                                                            }}
                                                        >
                                                            <Tag m={1} size="md">#{t}</Tag>
                                                        </Link>
                                                    </NextLink>
                                                )
                                            })}</Td>
                                            <Td>{p.data?.author}</Td>
                                            <Td minW="150px" borderTopEndRadius={10} borderBottomEndRadius={10}>{format(parseISO(p.data?.publishedAt), 'MMMM dd, yyyy')}</Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
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

    const learn_python = learnPythonFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(LEARN_PYTHON_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content,
            data,
            filePath,
        }
    })

    const learn_chakraui = learnChakraUIFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(LEARN_CHAKRAUI_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content,
            data,
            filePath,
        }
    })

    return { props: { tutorials, snippets, learn_python, learn_chakraui } }
}
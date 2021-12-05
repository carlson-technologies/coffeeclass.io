import {
    Heading,
    Flex,
    Stack,
    Link,
    Divider,
    useColorMode,
    Tag,
    Box,
    Text,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../../components/Container'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { tagsFilePaths, TAGS_PATH } from '../../scripts/mdx-utils'
import NextLink from 'next/link'
import removeDuplicatesAndCount from '../../scripts/remove-duplicates-and-count'

const url = `https://www.coffeeclass.io/tags/`
const title = 'Tags | coffeeclass.io'
const description = `All tags on coffeeclass.io.`

export default function Index({ tags }) {
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
            <Heading px={4} mt={4} as="h1" size="2xl" color="brand_one.500">Tags 🏷️</Heading>
            <Box mx={4} bgColor="brand_one.500" h={2} w={150} borderRadius={5} mb={12} mt={2} />
            <Flex
                wrap="wrap"
                justify="center"
            >
                {
                    tags.map(tag => {
                        return (
                            <Link
                                href={`/tags/${tag.data.title}`}
                                _hover={{
                                    textDecor: 'none',
                                    opacity: '.8',
                                    transform: 'scale(1.1)'
                                }}
                                key={tag.data.title}
                            >
                                <Flex mr={2} mb={2} w="100px" h="100px" align="center" justify="center" borderRadius="50%" bgColor="brand_one.500">
                                    <NextLink href={`/tags/${tag.data.title}`} passHref>

                                        <Text fontSize="sm" textAlign="center">#{tag.data.title}</Text>
                                        {/* <Tag size="lg" colorScheme="brand_one">#{tag.data.title}</Tag> */}
                                    </NextLink>
                                </Flex>
                            </Link>
                        )
                    })
                }
            </Flex>
        </Container>
    )
}

export function getStaticProps() {
    const tags = tagsFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(TAGS_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content,
            data,
            filePath,
        }
    })


    return { props: { tags } }
}
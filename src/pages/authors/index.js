import {
    Heading,
    Flex,
    Stack,
    useColorMode,
    Text,
    UnorderedList,
    ListItem,
    Link,
    Box,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../../components/Container'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { authorsFilePaths, AUTHORS_PATH } from '../../scripts/mdx-utils'

const url = 'https://www.coffeeclass.io/authors'
const title = 'Authors | coffeeclass.io'
const description = 'All authors on coffeeclass.io.'

export default function Index({ authors }) {
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.700',
        dark: 'gray.300'
    }
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
                <Flex flexDir="column">
                    <Heading mt={4} as="h1" size="2xl" color="brand_one.500">Authors</Heading>
                    <Box bgColor="brand_one.500" h={2} w={150} borderRadius={5} mb={4} mt={2} />
                    <Text color={color[colorMode]} mb={2} fontSize="lg">All authors on coffeeclass.io.</Text>
                    <UnorderedList>
                        {authors.map((author, index) =>
                            <ListItem key={index}><Link textDecor="underline" href={`/authors/${author.data.slug}`}>{author.data.name}</Link></ListItem>
                        )
                        }
                    </UnorderedList>
                </Flex>
            </Stack>
        </Container>
    )
}

export function getStaticProps() {
    const authors = authorsFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(AUTHORS_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content,
            data,
            filePath,
        }
    })

    return { props: { authors } }
}
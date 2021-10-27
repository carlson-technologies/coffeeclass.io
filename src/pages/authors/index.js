import {
    Heading,
    Flex,
    Stack,
    useColorMode,
    Text,
    UnorderedList,
    ListItem,
    Link,
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
                    <Heading
                        as="h1"
                        size="2xl"
                        letterSpacing="tight"
                        textTransform="uppercase"
                        my={8}
                    >
                        Authors
                    </Heading>
                    <Text color={color[colorMode]} mb={2} fontSize="lg">All authors on coffeeclass.io.</Text>
                    <UnorderedList>
                        {authors.map(author =>
                            <ListItem><Link textDecor="underline" href={`/authors/${author.data.slug}`}>{author.data.name}</Link></ListItem>
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
import {
    Heading,
    Flex,
    Stack,
    Link,
    Divider,
    useColorMode,
    Tag,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../../components/Container'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { snippetsFilePaths, SNIPPETS_PATH } from '../../lib/mdxUtils'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../../lib/mdxUtils'
import NextLink from 'next/link'

const url = `https://coffeeclass.io/tags/`
const title = 'Tags | coffeeclass.io'
const description = `All tags on coffeeclass.io.`

export default function Index({ tutorials, snippets }) {
    const { colorMode } = useColorMode()
    const headerColor = {
        light: 'brand_one.600',
        dark: 'brand_one.500'
    }
    var tagArray = []
    tutorials.map(tut => tut.data.tags.map(tag => {
        tagArray.push(tag)
    }))
    snippets.map(snip => snip.data.tags.map(tag => {
        tagArray.push(tag)
    }))

    // Removes duplicates from an array and returns an object
    // with a count of the members
    function removeDupes(arr) {
        var result = {};
        var i = arr.length;

        while (i--) {

            // If member is a duplicate, increment count and delete it      
            if (result.hasOwnProperty(arr[i])) {
                result[arr[i]]++;
                arr.splice(i, 1);

                // Otherwise, just add it to the results 
            } else {
                result[arr[i]] = 1;
            }
        }

        // convert results to the desired object format
        return Object.keys(result).map(function (p) { return { tag: p, count: result[p] }; });
    }

    var tagArray = removeDupes(tagArray)

    // var tagArray = [...new Set(tagArray)]
    console.log(tagArray)
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
                    <Heading
                        as="h1"
                        size="xl"
                        letterSpacing="tight"
                        textTransform="uppercase"
                        color={headerColor[colorMode]}
                    >
                        All Tags 🏷️
                    </Heading>
                    <Divider my={6} />
                    <Flex
                        wrap="wrap"
                        borderRadius="50%"
                    >
                        {
                            tagArray.map(tag => {
                                return (
                                    <Flex mr={2} mb={2} key={tag.tag}>
                                        <NextLink href={`/tags/${tag.tag}`} passHref>
                                            <Link
                                                href={`/${tag.tag}`}
                                                _hover={{
                                                    textDecor: 'none',
                                                    opacity: '.5'
                                                }}
                                            >
                                                <Tag size="lg" colorScheme="orange">#{tag.tag} ({tag.count})</Tag>
                                            </Link>
                                        </NextLink>
                                    </Flex>
                                )
                            })
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
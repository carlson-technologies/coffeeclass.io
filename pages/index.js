import {
    Heading,
    Flex,
    Button,
    Stack,
    Text,
    Box,
    Divider,
    Grid,
    Image,
    Link,
    Icon,
    useColorMode
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../components/Container'
import NextLink from 'next/link'
import Tutorial from '../components/Cards/Tutorial'
import Snippet from '../components/Cards/Snippet'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { snippetsFilePaths, SNIPPETS_PATH } from '../lib/mdxUtils'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../lib/mdxUtils'
import { ChevronRightIcon } from '@chakra-ui/icons'

const url = 'https://coffeeclass.io/'
const title = 'Home – Coffeeclass'
const description = 'Free programming tutorials, advice, snippets covering beginner Python, intermediate Python, advanced Python, JavaScript, algorithms, Next.js, react, and more all for free on Coffeeclass.'

export default function Index({ snippets, tutorials }) {
    const { colorMode } = useColorMode()
    const borderBottomColor = {
        light: 'black',
        dark: 'white'
    }
    const color = {
        light: 'gray.500',
        dark: 'gray.400'
    }
    const headerColor = {
        light: 'brand_one.600',
        dark: 'brand_one.500'
    }
    const snippetsOrderedByPublishedDate = snippets
        .sort(
            (a, b) =>
                Number(new Date(b.data.publishedAt)) - Number(new Date(a.data.publishedAt))
        ).slice(0, 4)

    const tutorialsOrderedByPublishedDate = tutorials
        .sort(
            (a, b) =>
                Number(new Date(b.data.publishedAt)) - Number(new Date(a.data.publishedAt))
        ).slice(0, 4)

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
                    mx={4}
                    maxW="100em"
                >
                    <Flex
                        flexDir={['column', 'column', 'column', 'column', 'row', 'row']}
                        justify="center"
                        align="center"
                        minH="100vh"
                        as="section"
                    >
                        <Flex
                            flexDir="column"
                            align="center"
                            as="header"
                        >
                            <Heading as="h1" size="4xl" textAlign="center" w={['100%', '100%', '100%', '100%', 700, 900]} mt={20}>Learn to code 👨‍💻 and ship 🚀 your app for free.</Heading>
                            <Heading as="h2" color={color[colorMode]} textAlign="center" size="md" my={8} w={['100%', '100%', '100%', '100%', 400, 600]}>Coffeeclass ☕ takes complex programming concepts and presents them in an easy to learn manner.
                                Browse snippets, tutorials, or learn a new skill.</Heading>
                            <Flex
                                flexDirection={['column', 'column', 'column', 'row', 'row', 'row']}
                                w="100%"
                                justify="center"
                            >
                                <NextLink href="#explore" passHref>
                                    <Button mr={4} w={['100%', '100%', '100%', 200, 200, 200]} colorScheme="brand_one" leftIcon="🔭">Explore Content</Button>
                                </NextLink>
                                <Flex mt={[4, 4, 4, 0, 0, 0]}>
                                    <NextLink href="/about" passHref>
                                        <Button variant="outline" w={['100%', '100%', '100%', 200, 200, 200]} colorScheme="brand_one" to="/about">About</Button>
                                    </NextLink>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex as="section" flexDir="column">
                        <Heading
                            as="h2"
                            size="lg"
                            my={4}
                            letterSpacing="tight"
                            color={headerColor[colorMode]}
                            id="explore"
                        >
                            Browse The Latest Tutorials
                        </Heading>
                        <Flex wrap="wrap" justify="space-between">
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
                        </Flex>
                    </Flex>

                    <Flex as="section" flexDir="column" mt={16}>
                        <Heading
                            as="h2"
                            size="lg"
                            mb={10}
                            letterSpacing="tight"
                            color={headerColor[colorMode]}
                        >
                            Only Have 5 Minutes? Check Out Some Snippets!
                        </Heading>
                        <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={6}>
                            {snippetsOrderedByPublishedDate.map((post) => (
                                <Snippet
                                    key={post.data.title}
                                    src={`/content/snippets/${post.filePath.replace(/\.mdx?$/, '')}/${post.data.featureImg}`}
                                    title={post.data.title}
                                    description={post.data.description}
                                    tags={post.data.tags}
                                    as={`/snippets/${post.filePath.replace(/\.mdx?$/, '')}`}
                                    href={`/snippets/[slug]`}
                                    image={`/snippet-images/${post.data.logoImage[0]}`}
                                />
                            ))}
                        </Grid>
                        <Flex justify="center" mt={16}>
                            <Flex _hover={{ cursor: 'pointer' }}>
                                <NextLink href="/snippets">
                                    <Box borderBottom={`1px solid ${borderBottomColor[colorMode]}`}>
                                        <Flex align="center">
                                            <Text>View All Snippets</Text>
                                            <Icon as={ChevronRightIcon} />
                                        </Flex>
                                    </Box>
                                </NextLink>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex
                        as="section"
                        flexDir={["column", "column", "column", "column", "row", "row"]}
                        align="center"
                        justify="space-around"
                        mt={20}
                    >
                        <Flex flexDir="column" w={['100%', '100%', '100%', '100%', 500, 500]}>
                            <Heading
                                as="h2"
                                size="lg"
                                letterSpacing="tight"
                                mb={2}
                                textTransform="uppercase"
                            >
                                What Is Coffeeclass?
                            </Heading>
                            <Text mb={2}>Coffeeclass is a suite of programming tutorial tools including this website and <Link color="brand_one.500" href="https://youtube.com/benjamincarlson" isExternal>this YouTube channel</Link>.</Text>
                            <Flex mb={2}>
                                <NextLink href="/about" passHref>
                                    <Button variant="outline" colorScheme="brand_one" w={['100%', '100%', '100%', 200, 200, 200]} to="/about">Learn More</Button>
                                </NextLink>
                            </Flex>
                        </Flex>
                        <Flex w={['100%', '100%', '100%', '100%', 500, 500]} justify="center">
                            <Box w={200} h={200}>
                                <Image src="favicons/logo-transparent-bg.png" alt="Coffeeclass Logo" />
                            </Box>
                        </Flex>
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
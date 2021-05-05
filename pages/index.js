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
import { snippetsFilePaths, SNIPPETS_PATH } from '../utils/mdxUtils'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../utils/mdxUtils'
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
        light: 'gray.600',
        dark: 'gray.300'
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
                    mx={5}
                    maxW="100em"
                >
                    <Flex
                        flexDir={['column', 'column', 'row']}
                        justify="center"
                        align="center"
                        h="100vh"
                        as="section"
                    >
                        <Flex
                            flexDir="column"
                            w={['100%', '100%', 800]}
                            align="center"
                        >
                            <Heading as="h1" size="3xl" textAlign="center">Learn to <Flex display="inline" color="brand.500">code</Flex> 👨‍💻
                            and <Flex display="inline" color="red.400">ship</Flex> 🚀 your app for free.</Heading>
                            
                            <Heading as="h2" color={color[colorMode]} textAlign="center" size="md" my={8} letterSpacing="wide">Coffeeclass ☕ takes complex programming concepts and presents them in an easy to learn manner.
                            Browse snippets, tutorials, or learn a new skill.</Heading>
                            <Flex
                                flexDirection={['column', 'row', 'row']}
                                w="100%"
                                justify="center"
                            >
                                <NextLink href="#explore" passHref>
                                    <Button mr={4} w={['100%', 200, 200]}><Flex as="span" mr={4}>🔭</Flex> Explore Content</Button>
                                </NextLink>
                                <Flex mt={[4, 0, 0]}>
                                    <NextLink href="/about" passHref>
                                        <Button variant="outline" w={['100%', 200, 200]} to="/about">About</Button>
                                    </NextLink>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex as="section" flexDir="column">
                        <Heading as="h3" size="lg" mb={4} id="explore">Browse The Latest Tutorials</Heading>
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

                    <Divider my={8} />

                    <Flex as="section" flexDir="column">
                        <Heading as="h3" size="lg" mb={10}>Only Have 5 Minutes? Check Out Some Snippets!</Heading>
                        <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={6}>
                            {snippetsOrderedByPublishedDate.map((post) => (
                                <Snippet
                                    key={post.data.title}
                                    src={`/content/snippets/${post.filePath.replace(/\.mdx?$/, '')}/${post.data.featureImg}`}
                                    title={post.data.title}
                                    description={post.data.description}
                                    tags={post.data.tags}
                                    as={`/snippets/${post.filePath.replace(/\.mdx?$/, '')}`}
                                    href={`/snippets/[slug]`}
                                />
                            ))}
                        </Grid>
                        <Flex justify="center" mt={8}>
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

                    <Divider my={8} />

                    <Flex
                        as="section"
                        flexDir={["column", "column", "row"]}
                        align="center"
                        justify="space-around"
                    >
                        <Flex flexDir="column" w={['100%', '100%', 500]}>
                            <Heading as="h3" size="lg" mb={2}>What Is Coffeeclass?</Heading>
                            <Text mb={2}>Coffeeclass is a suite of programming tutorial tools including this website and <Link color="blue.500" href="https://youtube.com/benjamincarlson" isExternal>this YouTube channel</Link>.</Text>
                            <Flex mb={2}>
                                <NextLink href="/about" passHref>
                                    <Button variant="outline" colorScheme="blue" w={['100%', 200, 200]} to="/about">Learn More</Button>
                                </NextLink>
                            </Flex>
                        </Flex>
                        <Flex w={['100%', '100%', 500]} justify="center" mt={[]}>
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
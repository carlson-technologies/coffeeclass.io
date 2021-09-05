import {
    Heading,
    Flex,
    Button,
    Text,
    Box,
    Grid,
    Image,
    Link,
    Icon,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../components/Container'
import NextLink from 'next/link'
import Tutorial from '../components/Cards/Tutorial'
import Snippet from '../components/Cards/Snippet'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { snippetsFilePaths, SNIPPETS_PATH } from '../scripts/mdx-utils'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../scripts/mdx-utils'
import { ChevronRightIcon } from '@chakra-ui/icons'
import TagSlider from '../components/PageComponents/Index/TagSlider'
import FeaturedTutorial from '../components/PageComponents/Index/FeaturedTutorial'
import removeDuplicatesAndCount from '../scripts/remove-duplicates-and-count'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

const url = 'https://www.coffeeclass.io/'
const title = 'Home | coffeeclass.io'
const description = 'Explore the latest programming and computer science tutorials, snippets, and learn sections on coffeeclass.io.'

export default function Index({ snippets, tutorials }) {
    const { colorMode } = useColorMode()
    const borderBottomColor = {
        light: 'black',
        dark: 'white'
    }
    const headerColor = {
        light: 'brand_one.600',
        dark: 'brand_one.500'
    }
    const bgImage = {
        light: 'linear-gradient(to bottom,rgba(255,255,255, 0),rgba(255,255,255, 1) 90%)',
        dark: 'linear-gradient(to bottom,rgba(0,0,0, 0),rgba(0,0,0, 1) 90%)'
    }

    var tagArray = []
    tutorials.map(tut => tut.data.tags.map(tag => {
        tagArray.push(tag)
    }))
    snippets.map(snip => snip.data.tags.map(tag => {
        tagArray.push(tag)
    }))

    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    var tagArray = removeDuplicatesAndCount(tagArray)

    const snippetsOrderedByPublishedDate = snippets
        .sort(
            (a, b) =>
                Number(new Date(b.data.publishedAt)) - Number(new Date(a.data.publishedAt))
        ).slice(0, 4) // we want the newest 4 snippets

    const tutorialsOrderedByPublishedDate = tutorials
        .sort(
            (a, b) =>
                Number(new Date(b.data.publishedAt)) - Number(new Date(a.data.publishedAt))
        ).slice(1, 5) // we want the newest 4 tutorials minus the first one

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
            <Flex
                flexDir="column"
                maxW="110em"
            >
                <Flex
                    flexDir="column"
                    as="section"
                    bgGradient={`linear(to-r,${useColorModeValue("gray.50", "gray.600")},${useColorModeValue("gray.200", "gray.800")},${useColorModeValue("gray.300", "gray.900")})`}
                >
                    <FeaturedTutorial tut={tutorials[0]} />
                </Flex>

                <Box backgroundImage={bgImage[colorMode]} w="100%" h="2em" mt="-2em" />

                <Box as="section">
                    <TagSlider tags={tagArray} />
                </Box>

                <Flex
                    as="section"
                    flexDir="column"
                    mx={4}
                    px={4}
                >
                    <Heading
                        as="h2"
                        size="lg"
                        mb={4}
                        letterSpacing="tight"
                        color={headerColor[colorMode]}
                        id="explore"
                    >
                        Latest Tutorials
                    </Heading>
                    <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={6}>
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
                    </Grid>
                </Flex>

                <Box bgColor={useColorModeValue("gray.100", "gray.800")} mt={8}>
                    <Flex
                        as="section"
                        flexDir="column"
                        my={8}
                        mx={4}
                        px={4}
                    >
                        <Heading
                            as="h2"
                            size="lg"
                            mb={10}
                            letterSpacing="tight"
                            color={headerColor[colorMode]}
                        >
                            Latest Snippets
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
                                    timeAge={timeAgo.format(new Date(post.data.publishedAt))}
                                    authorName={post.data.author}
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
                </Box>

                <Flex
                    as="section"
                    flexDir={["column", "column", "column", "column", "row", "row"]}
                    align="center"
                    justify="space-around"
                    mt={20}
                    mx={4}
                    px={4}
                >
                    <Flex flexDir="column" w={['100%', '100%', '100%', '100%', 500, 500]}>
                        <Heading
                            as="h2"
                            size="lg"
                            letterSpacing="tight"
                            mb={2}
                            textTransform="uppercase"
                        >
                            What Is coffeeclass.io?
                        </Heading>
                        <Text mb={2}>coffeeclass.io is a suite of programming tutorial tools including this website and <Link color="brand_one.500" href="https://youtube.com/benjamincarlson" isExternal>this YouTube channel</Link>.</Text>
                        <Flex mb={2}>
                            <NextLink href="/about" passHref>
                                <Button variant="outline" colorScheme="brand_one" w={['100%', '100%', '100%', 200, 200, 200]} to="/about">Learn More</Button>
                            </NextLink>
                        </Flex>
                    </Flex>
                    <Flex w={['100%', '100%', '100%', '100%', 500, 500]} justify="center">
                        <Box w={200} h={200}>
                            <Image src="favicons/logo-transparent-bg.png" alt="coffeeclass.io Logo" />
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
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
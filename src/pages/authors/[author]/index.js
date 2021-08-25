import { useState } from 'react'
import {
    Heading,
    Flex,
    Grid,
    useColorMode,
    Tag,
    Link,
    Text,
    useColorModeValue,
    Box,
    SkeletonCircle,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../../../components/Container'
import { useRouter } from 'next/router'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { snippetsFilePaths, SNIPPETS_PATH } from '../../../scripts/mdx-utils'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../../../scripts/mdx-utils'
import Snippet from '../../../components/Cards/Snippet'
import Tutorial from '../../../components/Cards/Tutorial'
import authors from '../../../configs/authors.json'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import NextImage from 'next/image'

export default function Index({ tutorials, snippets }) {
    const router = useRouter()
    const { author } = router.query

    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    var currentAuthor = []
    for (var i = 0; i < authors.authors.length; i++) {
        if (authors.authors[i].slug === author) {
            currentAuthor.push(authors.authors[i])
        }
    }

    const url = `https://coffeeclass.io/authors/${author}`
    const title = `${currentAuthor[0]?.name} | coffeeclass.io`
    const description = `coffeeclass.io articles written by ${currentAuthor[0]?.name}. ${currentAuthor[0].description && currentAuthor[0].description}`
    const { colorMode } = useColorMode()
    const headerColor = {
        light: 'brand_one.600',
        dark: 'brand_one.500'
    }

    const [loaded, setLoaded] = useState(false)

    const snippetsOrderedByPublishedDate = snippets
        .sort(
            (a, b) =>
                Number(new Date(b.data.publishedAt)) - Number(new Date(a.data.publishedAt))
        )

    const tutorialsOrderedByPublishedDate = tutorials
        .sort(
            (a, b) =>
                Number(new Date(b.data.publishedAt)) - Number(new Date(a.data.publishedAt))
        )

    var snippetCount = 0
    var tutorialCount = 0

    for (var i = 0; i < snippetsOrderedByPublishedDate.length; i++) {
        if (snippetsOrderedByPublishedDate[i].data.author == currentAuthor[0].name) {
            snippetCount++
        }
    }

    for (var i = 0; i < tutorialsOrderedByPublishedDate.length; i++) {
        if (tutorialsOrderedByPublishedDate[i].data.author == currentAuthor[0].name) {
            tutorialCount++
        }
    }

    if (currentAuthor.length === 0) {
        return (
            <Container>
                <Heading as="h1" size="2xl" textAlign="center" letterSpacing="tight" color={headerColor[colorMode]}>{author} not found!</Heading>
            </Container>
        )
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
            <Flex
                flexDir="column"
            >
                <Box as="header">
                    <Flex
                        flexDir="column"
                        bgGradient={`linear(to-r,${useColorModeValue("gray.50", "gray.600")},${useColorModeValue("gray.200", "gray.800")},${useColorModeValue("gray.300", "gray.900")})`}
                        pb={10}
                    >
                        <Flex justifyContent="center" mt={50} mb={2}>
                            <SkeletonCircle w="150px" h="150px" isLoaded={loaded}>
                                <div>
                                    <NextImage
                                        alt={`${currentAuthor[0].name}'s avatar`}
                                        src={`/authors/${currentAuthor[0]?.image}`}
                                        width="150px"
                                        height="150px"
                                        objectFit="cover"
                                        onLoad={() => setLoaded(true)}
                                        className="avatar"
                                    />
                                </div>
                            </SkeletonCircle>
                        </Flex>
                        <Heading as="h1" size="2xl" textAlign="center" letterSpacing="tight" color={headerColor[colorMode]}>{currentAuthor[0].name}</Heading>
                        {currentAuthor[0].description &&
                            <Text textAlign="center" color={useColorModeValue("gray.500", "gray.400")} fontSize="xl">{currentAuthor[0].description}</Text>
                        }
                        <Flex
                            my={4}
                            justifyContent="center"
                            h={5}
                        >
                            {currentAuthor[0]?.website &&
                                <Link
                                    href={currentAuthor[0]?.website}
                                    _hover={{ textDecor: 'none' }}
                                    mr={2}
                                    isExternal
                                >
                                    <Tag
                                        size="lg"
                                        transition="margin .2s ease-in-out"
                                        _hover={{ mt: "-2" }}
                                    >
                                        Website
                                    </Tag>
                                </Link>
                            }

                            {currentAuthor[0]?.github &&
                                <Link
                                    href={currentAuthor[0]?.github}
                                    _hover={{ textDecor: 'none' }}
                                    mr={2}
                                    isExternal
                                >
                                    <Tag
                                        size="lg"
                                        transition="margin .2s ease-in-out"
                                        _hover={{ mt: "-2" }}
                                    >
                                        GitHub
                                    </Tag>
                                </Link>
                            }

                            {currentAuthor[0]?.twitter &&
                                <Link
                                    href={currentAuthor[0]?.twitter}
                                    _hover={{ textDecor: 'none' }}
                                    mr={2}
                                    isExternal
                                >
                                    <Tag
                                        size="lg"
                                        transition="margin .2s ease-in-out"
                                        _hover={{ mt: "-2" }}
                                    >
                                        Twitter
                                    </Tag>
                                </Link>
                            }

                            {currentAuthor[0]?.facebook &&
                                <Link
                                    href={currentAuthor[0]?.facebook}
                                    _hover={{ textDecor: 'none' }}
                                    mr={2}
                                    isExternal
                                >
                                    <Tag
                                        size="lg"
                                        transition="margin .2s ease-in-out"
                                        _hover={{ mt: "-2" }}
                                    >
                                        Facebook
                                    </Tag>
                                </Link>
                            }

                            {currentAuthor[0]?.linkedin &&
                                <Link
                                    href={currentAuthor[0]?.linkedin}
                                    _hover={{ textDecor: 'none' }}
                                    mr={2}
                                    isExternal
                                >
                                    <Tag
                                        size="lg"
                                        transition="margin .2s ease-in-out"
                                        _hover={{ mt: "-2" }}
                                    >
                                        LinkedIn
                                    </Tag>
                                </Link>
                            }

                            {currentAuthor[0]?.youtube &&
                                <Link
                                    href={currentAuthor[0]?.youtube}
                                    _hover={{ textDecor: 'none' }}
                                    mr={2}
                                    isExternal
                                >
                                    <Tag
                                        size="lg"
                                        transition="margin .2s ease-in-out"
                                        _hover={{ mt: "-2" }}
                                    >
                                        YouTube
                                    </Tag>
                                </Link>
                            }
                        </Flex>
                    </Flex>
                    <Box bgGradient={`linear(to-r,${useColorModeValue("gray.50", "gray.600")},${useColorModeValue("gray.200", "gray.800")},${useColorModeValue("gray.300", "gray.900")})`}>
                        <Text ml={4} fontSize="lg"><Link _hover={{ textDecor: 'none', opacity: .5 }} href="#snippets" passHref><span style={{ fontWeight: 'bold' }}>{snippetCount}</span> snippet{snippetCount == 1 ? null : 's'}</Link> / <Link _hover={{ textDecor: 'none', opacity: .5 }} href="#tutorials"><span style={{ fontWeight: 'bold' }}>{tutorialCount}</span> tutorial{tutorialCount == 1 ? null : 's'}</Link></Text>
                    </Box>
                </Box>
                <Flex flexDir="column" px={4}>
                    <Box as="section" id="snippets">
                        <Heading my={4} as="h2">Snippets</Heading>
                        <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={6}>
                            {
                                snippetsOrderedByPublishedDate.map(s => {
                                    return (
                                        s.data.author == currentAuthor[0].name ?
                                            <Snippet
                                                key={s.data.title}
                                                src={`/content/snippets/${s.filePath.replace(/\.mdx?$/, '')}/${s.data.featureImg}`}
                                                title={s.data.title}
                                                description={s.data.description}
                                                tags={s.data.tags}
                                                as={`/snippets/${s.filePath.replace(/\.mdx?$/, '')}`}
                                                href={`/snippets/[slug]`}
                                                image={`/snippet-images/${s.data.logoImage[0]}`}
                                                timeAge={timeAgo.format(new Date(s.data.publishedAt))}
                                                authorName={s.data.author}
                                            /> : null
                                    )
                                })
                            }
                        </Grid>
                    </Box>
                    <Box as="section" id="tutorials">
                        <Heading my={4} as="h2">Tutorials</Heading>
                        <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={6}>
                            {
                                tutorialsOrderedByPublishedDate.map(t => {
                                    return (
                                        t.data.author == currentAuthor[0].name ?
                                            <Flex m={1, 1, 1, 2, 2, 2}>
                                                <Tutorial
                                                    key={t.data.title}
                                                    src={`/content/tutorials/${t.filePath.replace(/\.mdx?$/, '')}/${t.data.featureImg}`}
                                                    title={t.data.title}
                                                    description={t.data.description}
                                                    tags={t.data.tags}
                                                    as={`/tutorials/${t.filePath.replace(/\.mdx?$/, '')}`}
                                                    href={`/tutorials/[slug]`}
                                                />
                                            </Flex> : null
                                    )
                                })
                            }
                        </Grid>
                    </Box>
                </Flex>
            </Flex>
        </Container >
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

    return { props: { tutorials, snippets, authors } }
}

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}
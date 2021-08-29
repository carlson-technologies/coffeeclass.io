import { useState } from 'react'
import {
    Heading,
    Flex,
    Grid,
    Tag,
    Link,
    Text,
    useColorModeValue,
    Box,
    SkeletonCircle,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../../components/Container'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { snippetsFilePaths, SNIPPETS_PATH } from '../../scripts/mdx-utils'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../../scripts/mdx-utils'
import { authorsFilePaths, AUTHORS_PATH } from '../../scripts/mdx-utils'
import Snippet from '../../components/Cards/Snippet'
import Tutorial from '../../components/Cards/Tutorial'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import NextImage from 'next/image'

export default function Index({ tutorials, snippets, source, frontMatter }) {
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const url = `https://coffeeclass.io/authors/${frontMatter.slug}`
    const title = `${frontMatter.name} | coffeeclass.io`
    const description = `coffeeclass.io articles written by ${frontMatter.name}. ${frontMatter.description}`

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
        if (snippetsOrderedByPublishedDate[i].data.author == frontMatter.name) {
            snippetCount++
        }
    }

    for (var i = 0; i < tutorialsOrderedByPublishedDate.length; i++) {
        if (tutorialsOrderedByPublishedDate[i].data.author == frontMatter.name) {
            tutorialCount++
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
            <Flex
                flexDir="column"
            >
                <Box as="header">
                    <Flex
                        flexDir="column"
                        bgGradient={`linear(to-r,${useColorModeValue("gray.50", "gray.600")},${useColorModeValue("gray.200", "gray.800")},${useColorModeValue("gray.300", "gray.900")})`}
                        pb={10}
                    >
                        <Box px={4}>
                            <Flex justifyContent="center" mt={50} mb={2}>
                                <SkeletonCircle w="150px" h="150px" isLoaded={loaded}>
                                    <div>
                                        <NextImage
                                            alt={`${frontMatter.name}'s avatar`}
                                            src={`/authors/${frontMatter?.image}`}
                                            width="150px"
                                            height="150px"
                                            objectFit="cover"
                                            onLoad={() => setLoaded(true)}
                                            className="avatar"
                                        />
                                    </div>
                                </SkeletonCircle>
                            </Flex>
                            <Heading as="h1" size="2xl" textAlign="center" letterSpacing="tight" color={useColorModeValue("brand_one.600", "brand_one.500")}>{frontMatter.name}</Heading>
                            {frontMatter.description &&
                                <Text textAlign="center" color={useColorModeValue("gray.600", "gray.300")} fontSize="xl">{frontMatter.description}</Text>
                            }
                            <Flex
                                my={4}
                                justifyContent="center"
                                h={5}
                            >
                                {frontMatter?.links?.website &&
                                    <Link
                                        href={frontMatter?.links?.website}
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

                                {frontMatter?.links?.github &&
                                    <Link
                                        href={frontMatter?.links?.github}
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

                                {frontMatter?.links?.twitter &&
                                    <Link
                                        href={frontMatter?.links?.twitter}
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

                                {frontMatter?.links?.facebook &&
                                    <Link
                                        href={frontMatter?.links?.facebook}
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

                                {frontMatter?.links?.linkedin &&
                                    <Link
                                        href={frontMatter?.links?.linkedin}
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

                                {frontMatter?.links?.youtube &&
                                    <Link
                                        href={frontMatter?.links?.youtube}
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
                        </Box>
                    </Flex>
                    <Box bgGradient={`linear(to-r,${useColorModeValue("gray.50", "gray.600")},${useColorModeValue("gray.200", "gray.800")},${useColorModeValue("gray.300", "gray.900")})`}>
                        <Text ml={4} fontSize="lg"><Link _hover={{ textDecor: 'none', opacity: .5 }} href="#snippets" passHref><span style={{ fontWeight: 'bold' }}>{snippetCount != 0 && snippetCount}</span> {snippetCount != 0 && "snippet"}{snippetCount <= 1 ? null : 's'}</Link> {snippetCount != 0 && tutorialCount != 0 && "/"} <Link _hover={{ textDecor: 'none', opacity: .5 }} href="#tutorials"><span style={{ fontWeight: 'bold' }}>{tutorialCount != 0 && tutorialCount}</span> {tutorialCount != 0 && "tutorial"}{tutorialCount <= 1 ? null : 's'}</Link></Text>
                    </Box>
                </Box>
                <Flex flexDir="column" px={4}>
                    {snippetCount > 0 &&
                        <Box as="section" id="snippets">
                            <Heading my={4} as="h2">Snippets</Heading>
                            <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={6}>
                                {
                                    snippetsOrderedByPublishedDate.map(s => {
                                        return (
                                            s.data.author == frontMatter.name ?
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
                    }
                    {tutorialCount > 0 &&
                        <Box as="section" id="tutorials">
                            <Heading my={4} as="h2">Tutorials</Heading>
                            <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={6}>
                                {
                                    tutorialsOrderedByPublishedDate.map(t => {
                                        return (
                                            t.data.author == frontMatter.name ?
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
                    }
                </Flex>
            </Flex>
        </Container >
    )
}

export const getStaticProps = async ({ params }) => {
    const authorsPath = path.join(AUTHORS_PATH, `${params.author}.mdx`)
    const source = fs.readFileSync(authorsPath)
    const { content, data } = matter(source)

    const mdxSource = await serialize(content, {
        // MDXComponents,
        // Optionally pass remark/rehype plugins
        // mdxOptions: {
        // },
        scope: data,
    })

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

    const authors = authorsFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(AUTHORS_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content,
            data,
            filePath,
        }
    })

    return {
        props: {
            tutorials,
            snippets,
            source: mdxSource,
            frontMatter: {
                ...data
            },
        },
    }
}

export const getStaticPaths = async () => {
    const paths = authorsFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((author) => ({ params: { author } }))

    return {
        paths,
        fallback: false,
    }
}
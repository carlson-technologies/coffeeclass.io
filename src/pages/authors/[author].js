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
import { authorsFilePaths, AUTHORS_PATH } from '../../scripts/mdx-utils'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import NextImage from 'next/image'

export default function Index({ frontMatter }) {
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const url = `https://www.coffeeclass.io/authors/${frontMatter.slug}`
    const title = `${frontMatter.name} | coffeeclass.io`
    const description = `coffeeclass.io articles written by ${frontMatter.name}. ${frontMatter.description}`

    const [loaded, setLoaded] = useState(false)
    const color = useColorModeValue("gray.600", "gray.300")

    return (
        <Container>
            <NextSeo
                title={title}
                description={description}
                canonical={url}
                openGraph={{
                    url,
                    title,
                    description,
                    type: 'profile',
                    profile: {
                        firstName: `${frontMatter.name.split(" ")[0]}`,
                        lastName: `${frontMatter.name.split(" ")[1]}`,
                    },
                    images: [
                        {
                            url: `https://www.coffeeclass.io/authors/${frontMatter?.image}`,
                            alt: `${frontMatter.name}'s avatar`,
                        },
                    ],
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
                                <Text textAlign="center" color={color} fontSize="xl">{frontMatter.description}</Text>
                            }
                            <Flex
                                my={4}
                                justifyContent="center"
                                h={5}
                                wrap="wrap"
                            >
                                {frontMatter?.links?.website &&
                                    <Link
                                        href={frontMatter?.links?.website}
                                        _hover={{ textDecor: 'none' }}
                                        mr={2}
                                        mb={2}
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
                                        mb={2}
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
                                        mb={2}
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
                                        mb={2}
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
                                        mb={2}
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
                                        mb={2}
                                        isExternal
                                    >
                                        <Tag
                                            size="lg"
                                            transition="margin .2s ease-in-out"
                                            _hover={{ mt: "-2" }}
                                            mr={2}
                                            mb={2}
                                        >
                                            YouTube
                                        </Tag>
                                    </Link>
                                }
                            </Flex>
                        </Box>
                    </Flex>
                    <Box bgGradient={`linear(to-r,${useColorModeValue("gray.50", "gray.600")},${useColorModeValue("gray.200", "gray.800")},${useColorModeValue("gray.300", "gray.900")})`}>
                        {/* <Text ml={4} fontSize="lg"><Link _hover={{ textDecor: 'none', opacity: .5 }} href="#snippets" passHref><span style={{ fontWeight: 'bold' }}>{snippetCount != 0 && snippetCount}</span> {snippetCount != 0 && "snippet"}{snippetCount <= 1 ? null : 's'}</Link> {snippetCount != 0 && tutorialCount != 0 && "/"} <Link _hover={{ textDecor: 'none', opacity: .5 }} href="#tutorials"><span style={{ fontWeight: 'bold' }}>{tutorialCount != 0 && tutorialCount}</span> {tutorialCount != 0 && "tutorial"}{tutorialCount <= 1 ? null : 's'}</Link></Text> */}
                    </Box>
                </Box>
            </Flex>
        </Container >
    )
}

export const getStaticProps = async ({ params }) => {
    const authorsPath = path.join(AUTHORS_PATH, `${params.author}.mdx`)
    const source = fs.readFileSync(authorsPath)
    const { content, data } = matter(source)

    const mdxSource = await serialize(content, {
        scope: data,
    })

    return {
        props: {
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
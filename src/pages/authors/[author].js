import { useState } from 'react'
import {
    Heading,
    Flex,
    Tag,
    Link,
    Text,
    useColorModeValue,
    Box,
    SkeletonCircle,
    SimpleGrid,
    AspectRatio,
    Skeleton,
    Icon,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../../components/Container'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { contentFilePaths, CONTENT_PATH, authorsFilePaths, AUTHORS_PATH } from '../../scripts/mdx-utils'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import NextImage from 'next/image'
import getAuthorSlug from "../../scripts/get-author-slug"
import { motion } from "framer-motion"
import NextLink from 'next/link'
import { ChevronRightIcon } from '@chakra-ui/icons'

const MotionBox = motion(Box)

export default function Index({ articles, frontMatter }) {
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const url = `https://www.coffeeclass.io/authors/${frontMatter.slug}`
    const title = `${frontMatter.name} | coffeeclass.io`
    const description = `coffeeclass.io articles written by ${frontMatter.name}. ${frontMatter.description}`

    const [loaded, setLoaded] = useState(false)
    // const color = useColorModeValue("gray.600", "gray.300")
    const color = useColorModeValue("gray.500", "gray.400")
    const bgColor = useColorModeValue("gray.100", "gray.900")

    // loop through articles and if the author slug matches getAuthorSlug(frontMatter.author) add it
    const filteredArticles = articles.filter(article => {
        return getAuthorSlug(article.data.author) === frontMatter.slug
    })

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
                        <Text pl={2} fontSize="lg"><strong>{filteredArticles.length}</strong> articles</Text>
                    </Box>

                    <Box p={4}>
                        <SimpleGrid minChildWidth={["100%", "100%", "100%", "100%", "300px", "300px"]} spacing="40px">
                            {filteredArticles.map((post) => (
                                <MotionBox
                                    initial={{ opacity: 0, marginTop: 5 }}
                                    animate={{ opacity: 1, marginTop: 0 }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                    style={{
                                        height: '100%',
                                    }}
                                    key={post.data.title}
                                >
                                    <NextLink href={`/articles/${post.filePath.replace(".mdx", "")}`} passHref>
                                        <Link href={`/articles/${post.filePath.replace(".mdx", "")}`} _hover={{ textDecor: 'none' }}>
                                            <Flex
                                                flexDir="column"
                                                bgColor={bgColor}
                                                h="100%"
                                                p={5}
                                                borderRadius={5}
                                                _hover={{
                                                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                                                    transform: 'scale(1.05)',
                                                }}
                                                transition="box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out"
                                                justify="space-between"
                                            >
                                                <Box>
                                                    <Text minW={120} textAlign="center" color={color} fontSize="md" mb={6}>{timeAgo.format(new Date(post.data.publishedAt))}</Text>
                                                    {post?.data?.logoImage &&
                                                        <Box>
                                                            <Box
                                                                w={50}
                                                                h={50}
                                                                my={2}
                                                                mx="auto"
                                                            >
                                                                <AspectRatio ratio={1}>
                                                                    <Skeleton isLoaded={loaded}>
                                                                        <NextImage
                                                                            src={`/logos/${post.data.logoImage[0]}`}
                                                                            alt={post?.data?.logoImage[0]}
                                                                            layout="fill"
                                                                            onLoad={() => setLoaded(true)}
                                                                        />
                                                                    </Skeleton>
                                                                </AspectRatio>
                                                            </Box>
                                                        </Box>}

                                                    {
                                                        post?.data?.featureImg &&
                                                        <Flex justify="center">
                                                            <AspectRatio w="100%" ratio={16 / 9}>
                                                                <NextImage src={`/content/articles/${post?.filePath.replace(".mdx", "")}/${post?.data?.featureImg}`} alt={post?.data?.title} layout="fill" />
                                                            </AspectRatio>
                                                        </Flex>
                                                    }
                                                    <Heading as="h3" size="md" mt={4} fontWeight="normal">{post.data.title}</Heading>
                                                </Box>
                                                <Flex mt={4} align="center">
                                                    <Text color="brand_one.500" fontSize="lg">Read article</Text>
                                                    <Icon color="brand_one.500" as={ChevronRightIcon} fontSize="2xl" />
                                                </Flex>
                                            </Flex>
                                        </Link>
                                    </NextLink>
                                </MotionBox>
                            ))}
                        </SimpleGrid>
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

    const articles = contentFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(CONTENT_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content,
            data,
            filePath,
        }
    })

    return {
        props: {
            articles,
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
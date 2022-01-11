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
    Grid,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../../components/Container'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { contentFilePaths, CONTENT_PATH, authorsFilePaths, AUTHORS_PATH } from '../../scripts/mdx-utils'
import NextImage from 'next/image'
import { motion } from "framer-motion"
import NextLink from 'next/link'
import { ChevronRightIcon } from '@chakra-ui/icons'
import TimeAgo from '../../scripts/time-ago'

const MotionBox = motion(Box)

export default function Index({ articles, frontMatter, filePath, content }) {
    const url = `https://www.coffeeclass.io/authors/${frontMatter.slug}`
    const title = `${frontMatter.name} | coffeeclass.io`
    const description = `coffeeclass.io articles written by ${frontMatter.name}. ${frontMatter.description}`

    const [loaded, setLoaded] = useState(false)
    // const color = useColorModeValue("gray.600", "gray.300")
    const color = useColorModeValue("gray.500", "gray.400")
    const bgColor = useColorModeValue("gray.100", "gray.900")

    // loop through articles and if the author slug matches frontMatter.author add it
    const filteredArticles = articles.filter(article => {
        return article.data.author === filePath
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
                            <Text textAlign="center" color={color} fontSize="xl">{content}</Text>
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
                        <Text pl={2} fontSize="lg"><strong>{filteredArticles.length}</strong> article{filteredArticles.length > 1 && "s"}</Text>
                    </Box>

                    <Box p={4}>
                        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={6}>
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
                                                minH={400}
                                                flexDir="column"
                                                bgColor={bgColor}
                                                h="100%"
                                                p={5}
                                                borderRadius={5}
                                                _hover={{
                                                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                                                    transform: "translateY(-2px)",
                                                }}
                                                transition="box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out"
                                                justify="space-between"
                                            >
                                                <Box>
                                                    <Text minW={120} textAlign="center" color={color} fontSize="md" mb={6}>{TimeAgo(new Date(post.data.publishedAt))}</Text>
                                                    <Heading as="h3" size="lg" mt={4} fontWeight="medium" letterSpacing="wide">{post.data.title}</Heading>
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
                        </Grid>
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

    // get the filePath in the format ben-carlson.mdx
    const filePath = path.basename(authorsPath)

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

    articles.sort(
        (a, b) =>
            Number(new Date(b.data.publishedAt)) -
            Number(new Date(a.data.publishedAt))
    );

    return {
        props: {
            articles,
            source: mdxSource,
            filePath,
            content,
            frontMatter: {
                ...data,
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
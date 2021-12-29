import {
    Heading,
    Flex,
    Stack,
    SimpleGrid,
    Box,
    Text,
    AspectRatio,
    Skeleton,
    useColorModeValue,
    Link,
    Icon,
} from '@chakra-ui/react'
import Container from '../../components/Container'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { contentFilePaths, CONTENT_PATH } from '../../scripts/mdx-utils'
import { motion } from "framer-motion"
import NextImage from 'next/image'
import { useState } from 'react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import TimeAgo from '../../scripts/time-ago'

const url = 'https://www.coffeeclass.io/articles'
const title = 'Articles'
const description = 'Read all coffeeclass.io articles on programming and computer science for free.'

const MotionBox = motion(Box)

export default function Index({ posts }) {

    const [loaded, setLoaded] = useState(false)

    const orderedByDate = posts.sort(
        (a, b) =>
            Number(new Date(b.data.publishedAt)) - Number(new Date(a.data.publishedAt))
    )

    const bgColor = useColorModeValue("gray.100", "gray.900")
    const color = useColorModeValue("gray.500", "gray.400")

    return (
        <Container title={title} description={description} url={url}>
            <Stack
                spacing={8}
                px={4}
            >
                <Flex flexDir="column">
                    <Heading mt={4} as="h1" size="2xl" color="brand_one.500">Articles</Heading>
                    <Box bgColor="brand_one.500" h={2} w={150} borderRadius={5} mb={4} mt={2} />
                    <SimpleGrid minChildWidth={["100%", "100%", "100%", "100%", "300px", "300px"]} spacing="40px">
                        {orderedByDate.map((post) => (
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
                                                <Text minW={120} textAlign="center" color={color} fontSize="md" mb={6}>{TimeAgo(new Date(post.data.publishedAt))}</Text>
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
                </Flex>
            </Stack>
        </Container>
    )
}

export function getStaticProps() {
    const posts = contentFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(CONTENT_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content,
            data,
            filePath,
        }
    })

    return { props: { posts } }
}
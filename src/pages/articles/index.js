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
import { NextSeo } from 'next-seo'
import Container from '../../components/Container'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { contentFilePaths, CONTENT_PATH } from '../../scripts/mdx-utils'
import Snippet from '../../components/Cards/Snippet'
import Tutorial from '../../components/Cards/Tutorial'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { motion } from "framer-motion"
import NextImage from 'next/image'
import { useState } from 'react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

const url = 'https://www.coffeeclass.io/snippets'
const title = 'Snippets | coffeeclass.io'
const description = 'coffeeclass.io snippets are code bits that you can easily copy and paste into your project.'

const MotionBox = motion(Box)

export default function Index({ posts }) {
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const [loaded, setLoaded] = useState(false)

    const orderedByDate = posts.sort(
        (a, b) =>
            Number(new Date(b.data.publishedAt)) - Number(new Date(a.data.publishedAt))
    )

    const [opacity, setOpacity] = useState(0)

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
                <Flex flexDir="column">
                    <Heading mt={4} as="h1" size="2xl" color="brand_one.500">Articles</Heading>
                    <Box bgColor="brand_one.500" h={2} w={150} borderRadius={5} mb={4} mt={2} />
                    <SimpleGrid minChildWidth={["100%", "100%", "100%", "100%", "250px", "250px"]} spacing="40px">
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
                                        {/* <Box
                                                borderRadius={15}
                                                bgColor={useColorModeValue("gray.100", "gray.900")}
                                            >
                                                <AspectRatio ratio={16 / 9} borderRadius={15}>
                                                    <Skeleton isLoaded={loaded} borderRadius={15}>
                                                        <NextImage
                                                            src={post.data.type == 'tutorial' ? `/content/articles/${post.filePath.replace(/\.mdx?$/, '')}/${post.data.featureImg}` : `/logos/${post.data.logoImage[0]}`}
                                                            alt={post.data.title}
                                                            objectFit="contain"
                                                            objectPosition="center"
                                                            layout="fill"
                                                            onLoad={() => setLoaded(true)}
                                                        />
                                                    </Skeleton>
                                                </AspectRatio>
                                            </Box> */}
                                        <Flex
                                            flexDir="column"
                                            bgColor={useColorModeValue("gray.100", "gray.900")}
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
                                                <Flex mt={2}>
                                                    <Text fontSize="lg">{post.data.tags[0]}</Text>
                                                    <Text mx={2} fontSize="lg">&middot;</Text>
                                                    <Text fontSize="lg">{timeAgo.format(new Date(post.data.publishedAt))}</Text>
                                                </Flex>
                                                <Heading as="h3" size="lg" fontWeight="normal">{post.data.title}</Heading>
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
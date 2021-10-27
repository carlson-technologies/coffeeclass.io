import { useState, useEffect } from 'react'
import {
    Heading,
    Flex,
    UnorderedList,
    ListItem,
    Badge,
    Text,
    Box,
    Divider,
    useColorModeValue,
    AspectRatio,
    Skeleton,
} from '@chakra-ui/react'
import Link from 'next/link'
import NextImage from 'next/image'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

export default function RelatedPosts({ tags, posts, currPostTitle, style }) {
    var relatedPosts = []

    // loop through all tags and see if they match any of the tags of the current post
    for (var i = 0; i < tags.length; i++) {
        posts.map(post => {
            post.data.tags.map(tag => {
                if (tags[i] == tag) {
                    relatedPosts.push(post)
                }
            })
        })
    }

    // remove duplicates
    relatedPosts = [...new Set(relatedPosts)]

    const [scrollY, setScrollY] = useState(0)

    const handleScroll = () => {
        setScrollY(window.scrollY)
    }

    useEffect(() => {
        setScrollY(window.scrollY)
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    const [showRelatedPostsSidebar, setShowRelatedPostsSidebar] = useState(null)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1000) {
                setShowRelatedPostsSidebar("none")
            } else {
                setShowRelatedPostsSidebar("flex")
            }
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    if (style == "sidebar") {
        return (
            relatedPosts.length > 1 &&
            <>
                <Flex
                    flexDir="column"
                    mr={10}
                    // pos="sticky"
                    // top={10}
                    opacity={scrollY > 500 ? 1 : 0}
                    transition="opacity .7s ease-in-out"
                    display={showRelatedPostsSidebar}
                >
                    <Heading as="h4" size="sm" my={2}>View Related Posts</Heading>
                    {relatedPosts.map(post => {
                        return (
                            <Link as={`/snippets/${post.filePath.replace(/\.mdx?$/, '')}`} href={`/snippets/[slug]`}>
                                <Box
                                    key={post.data.title}
                                    p={1}
                                    _hover={{
                                        bgColor: useColorModeValue("gray.100", "gray.800"),
                                        cursor: "pointer",
                                    }}
                                    my={1}
                                    borderRadius={2}
                                >
                                    <Heading
                                        as="h5"
                                        size="sm"
                                        // color={color[colorMode]}
                                        my={1}
                                        fontWeight="normal"
                                    >
                                        {post.data.title}
                                    </Heading>
                                </Box>
                            </Link>
                        )
                    })}
                </Flex>
            </>
        )
    }

    const [loaded, setLoaded] = useState(false)

    return (
        relatedPosts.length > 1 && // we need 1 because the current post is also in the list
        <>
            <Flex flexDir="column" w="95vw" maxW={800}>
                <Heading as="h4" size="md" mb={2}>View Related Posts</Heading>
                <Flex overflowX="auto">
                    {relatedPosts.map(post => (
                        <Link
                            as={`/snippets/${post.filePath.replace(/\.mdx?$/, '')}`}
                            href={`/snippets/[slug]`}
                            _hover={{
                                cursor: "pointer",
                            }}
                        >
                            <Flex
                                flexDir="column"
                                justify="space-between"
                                bgColor={useColorModeValue("gray.200", "gray.700")}
                                m={2}
                                p={5}
                                transition='box-shadow 0.3s ease-in-out'
                                borderRadius={5}
                                _hover={{
                                    boxShadow: useColorModeValue("0px 8px 26px rgba(0, 0, 0, 0.25)", "0px 8px 26px rgba(255, 255, 255, 0.25)"),
                                    cursor: "pointer",
                                }}
                                maxW={200}
                            >
                                <Box>
                                    <Text mb={2} minW={120} textAlign="center" color={useColorModeValue("gray.500", "gray.400")} fontSize="xs" mb={2}>{timeAgo.format(new Date(post.data.publishedAt))}</Text>
                                    <Box
                                        w={50}
                                        h={50}
                                        my={2}
                                        mx="auto"
                                    >
                                        <AspectRatio ratio={1}>
                                            <Skeleton isLoaded={loaded}>
                                                <NextImage
                                                    src={`/snippet-images/${post.data.logoImage[0]}`}
                                                    alt={post?.data?.logoImage[0]}
                                                    width="50px"
                                                    height="50px"
                                                    objectFit="contain"
                                                    onLoad={() => setLoaded(true)}
                                                />
                                            </Skeleton>
                                        </AspectRatio>
                                    </Box>
                                </Box>
                                <Heading size="sm" mt={4}>{post.data.title}</Heading>
                            </Flex>
                        </Link>
                    ))}
                </Flex>
            </Flex>
        </>
    )
}

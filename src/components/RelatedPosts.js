import { useState, useEffect } from 'react'
import {
    Heading,
    Flex,
    Text,
    Box,
    useColorModeValue,
    AspectRatio,
    Skeleton,
    Link,
    Wrap,
} from '@chakra-ui/react'
import NextImage from 'next/image'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import NextLink from 'next/link'
import Subscribe from '../components/Subscribe'

export default function RelatedPosts({ tags, posts, style, currPostTitle }) {
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

    // remove current post
    relatedPosts = relatedPosts.filter(
        post => post.data.title !== currPostTitle
    )

    // order posts by date
    relatedPosts.sort((a, b) => {
        return new Date(b.data.publishedAt) - new Date(a.data.publishedAt)
    })

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
    }, [])

    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const bgColor = useColorModeValue("gray.200", "gray.700")
    const color = useColorModeValue("gray.500", "gray.400")
    const boxShadow = useColorModeValue("0px 8px 26px rgba(0, 0, 0, 0.25)", "0px 8px 26px rgba(255, 255, 255, 0.25)")
    const bgColor1 = useColorModeValue("gray.100", "gray.700")
    const color1 = useColorModeValue("gray.700", "gray.400")
    const headerColor = useColorModeValue('gray.600', 'gray.400')

    const [loaded, setLoaded] = useState(false)

    // const MySkeleton = ({ children }) => {
    //     return (
    //         <Skeleton isLoaded={loaded}>
    //             {children}
    //         </Skeleton>
    //     )
    // }

    if (style == "sidebar") {
        return (
            relatedPosts.length > 0 &&
            <>
                <Flex
                    flexDir="column"
                    opacity={scrollY > 300 ? 1 : 0}
                    transition="opacity .7s ease-in-out"
                    visibility={scrollY > 300 ? "visible" : "hidden"}
                    px={2}
                >
                    <Box overflowY="auto" overflowX="hidden" h="calc(100vh - 100px)" as="aside">
                        <Text
                            m={2}
                            textTransform="uppercase"
                            color={headerColor}
                            fontSize="sm"
                            fontWeight="semibold"
                        >
                            Related Tags
                        </Text>
                        <Wrap>
                            {tags.map((tag, index) => {
                                return (
                                    <Box key={index} px={2}>
                                        <NextLink href="/tags/[tag]" as={`/tags/${tag}`} passHref>
                                            <Link
                                                href={`/tags/${tag}`}
                                                color={color}
                                                fontSize="sm"
                                                fontWeight="semibold"
                                                _hover={{ color: "brand_one.500" }}
                                            >
                                                {tag}
                                            </Link>
                                        </NextLink>
                                    </Box>
                                )
                            })}
                        </Wrap>

                        <Text
                            mt={8}
                            mb={2}
                            mx={2}
                            textTransform="uppercase"
                            color={headerColor}
                            fontSize="sm"
                            fontWeight="semibold"
                        >
                            Related Posts
                        </Text>
                        {relatedPosts.slice(0, 5).map(post => {
                            return (
                                <NextLink as={`/articles/${post.filePath.replace(/\.mdx?$/, '')}`} href={`/articles/[slug]`} key={post.data.title}>
                                    <Box
                                        p={2}
                                        _hover={{
                                            bgColor: bgColor1,
                                            cursor: "pointer",
                                            textDecoration: 'underline',
                                        }}
                                        my={1}
                                        borderRadius={2}
                                    >
                                        <Heading
                                            as="h5"
                                            size="sm"
                                            color={color1}
                                            my={1}
                                            fontWeight="normal"
                                        >
                                            {post.data.title} &middot; {timeAgo.format(new Date(post.data.publishedAt))}
                                        </Heading>
                                    </Box>
                                </NextLink>
                            )
                        })}
                        <Subscribe isSidebar />
                    </Box>
                </Flex>
            </>
        )
    }

    return (
        relatedPosts.length > 0 ?
            <>
                <Flex flexDir="column" w="100vw" maxW={800} minW={320}>
                    <Heading as="h4" size="md" mb={2} px={4}>View Related Posts</Heading>
                    <Flex overflowX="auto">
                        {relatedPosts.map(post => (
                            <NextLink
                                as={`/articles/${post.filePath.replace(/\.mdx?$/, '')}`}
                                href={`/articles/[slug]`}
                                _hover={{
                                    cursor: "pointer",
                                }}
                                key={post.data.title}
                            >
                                <Flex
                                    flexDir="column"
                                    justify="space-between"
                                    bgColor={bgColor}
                                    m={2}
                                    p={5}
                                    transition='box-shadow 0.3s ease-in-out'
                                    borderRadius={5}
                                    _hover={{
                                        boxShadow: boxShadow,
                                        cursor: "pointer",
                                    }}
                                    maxW={200}
                                >
                                    <Text mb={2} minW={120} textAlign="center" color={color} fontSize="xs">{timeAgo.format(new Date(post.data.publishedAt))}</Text>
                                    {post?.data?.logoImage &&
                                        <Box>
                                            <Box
                                                w={50}
                                                h={50}
                                                my={2}
                                                mx="auto"
                                            >
                                                <AspectRatio ratio={1}>
                                                    {/* <MySkeleton> */}
                                                    <NextImage
                                                        src={`/logos/${post.data.logoImage[0]}`}
                                                        alt={post?.data?.logoImage[0]}
                                                        layout="fill"
                                                    // onLoad={() => setLoaded(true)}
                                                    />
                                                    {/* </MySkeleton> */}
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
                                    <Heading size="sm" mt={4}>{post.data.title}</Heading>
                                </Flex>
                            </NextLink>
                        ))}
                    </Flex>
                </Flex>
            </> : <Text fontSize="lg">No related posts! Like {tags[0]}? Try <NextLink href="/contribute/getting-started" passHref><Link href="/contributing/getting-started" color="brand_one.500">writing about it</Link></NextLink>.</Text>
    )
}

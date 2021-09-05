import { useState } from 'react'
import {
    Text,
    Flex,
    Link,
    useColorModeValue,
    Heading,
    Avatar,
    useColorMode,
    Skeleton,
    Button,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import getAuthorSlug from '../../../scripts/get-author-slug'
import NextImage from 'next/image'
import Underline from '../../Underline'

export default function FeaturedTutorial({ tut }) {
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')
    const { colorMode } = useColorMode()
    const tagColor = {
        light: 'gray.600',
        dark: 'gray.300'
    }
    const bgImage = {
        light: 'linear-gradient(to bottom,rgba(255,255,255, 0),rgba(255,255,255, 1) 90%)',
        dark: 'linear-gradient(to bottom,rgba(0,0,0, 0),rgba(0,0,0, 1) 90%)'
    }
    const [loaded, setLoaded] = useState(false)
    return (
        <>
            <Flex justify="center" align="center" my={20} flexDir={['column', 'column', 'column', 'column', 'column', 'row']}>
                <Flex flexDir="column" maxW={600} mx={4}>
                    <Heading as="h1" size="lg">By 2029, <Underline>316,000</Underline> Software Engineering jobs will be added with a median annual pay of <Underline>$110,140</Underline>.<Text as="small" fontSize="sm" fontWeight="thin" letterSpacing="tight" ml={1}>- <Link textDecor="underline" href="https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm" isExternal>bls.gov</Link></Text></Heading>
                    <Heading as="h2" size="lg" fontWeight="normal" color={useColorModeValue("gray.700", "gray.200")} mt={4}>Learn to code on coffeeclass.io</Heading>
                    <Button
                        my={8}
                        colorScheme="brand_one"
                        w={["100%", "100%", "100%", 200, 200, 200]}
                        transition="width 0.3s"
                        href="/learn"
                        as="a"
                    >
                        Learn Now!
                    </Button>
                </Flex>
                <Flex
                    mx={4}
                    borderRadius={15}
                    flexDir="column"
                    w="100%"
                    maxW={500}
                >
                    <Flex justify="center">
                        <Skeleton isLoaded={loaded}>
                            <Link href={`/tutorials/${tut.filePath.replace(/\.mdx?$/, '')}`}>
                                <div className="featured-tutorial-img">
                                    <NextImage
                                        width={500}
                                        height={250}
                                        objectFit="cover"
                                        src={`/content/tutorials/${tut.filePath.replace(/\.mdx?$/, '')}/${tut.data.featureImg}`}
                                        alt={tut.data.title}
                                        onLoad={() => { setLoaded(true) }}
                                    />
                                </div>
                            </Link>
                        </Skeleton>
                    </Flex>
                    <Flex
                        flexDir="column"
                        align="start"
                        mt="-20"
                        mx={[4, 4, 4, 2, 0, 0]}
                        zIndex={1}
                    >
                        <Flex flexDir="column">
                            <Heading as="h1" size="xl">
                                <Link
                                    href={`/tutorials/${tut.filePath.replace(/\.mdx?$/, '')}`}>
                                    We Recommend: {tut.data.title}
                                </Link>
                            </Heading>
                            <Text fontSize="xl" color={useColorModeValue("blackAlpha.700", "gray.400")} mt={2} mb={4}>{tut.data.description}</Text>
                            <Flex wrap="wrap" align="center">
                                <Flex align="center" wrap="wrap">
                                    <Avatar mr={2} size="sm" src={`/authors/${tut.data.authorImage}`} />
                                    <Text fontWeight="semibold" fontStyle="italic">{timeAgo.format(new Date(tut.data.publishedAt))}</Text>
                                    <Text mx={1}>by</Text>
                                    <Text textDecor="underline"><Link href={`/authors/${getAuthorSlug(tut.data.author)}`} passHref>{tut.data.author}</Link></Text>
                                </Flex>
                                <Text mx={1}>in</Text>
                                {tut.data?.tags?.map((tag) => {
                                    return (
                                        <Flex
                                            mr={2}
                                            key={tag}
                                            _hover={{
                                                textDecor: 'none',
                                                opacity: '.5'
                                            }}
                                            cursor="pointer"
                                        >
                                            <NextLink href={`/tags/${tag}`} passHref>
                                                <Link href={`/${tag}`}
                                                >
                                                    <Text fontSize="lg" color={tagColor[colorMode]}>#{tag}</Text>
                                                </Link>
                                            </NextLink>
                                        </Flex>
                                    )
                                })}
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <style jsx>{`
            .featured-tutorial-img {
                opacity: 0.85;
                transition: opacity .2s ease-in-out;
            }
            .featured-tutorial-img:hover {
                opacity: 1;
            }
            `}</style>
        </>
    )
}

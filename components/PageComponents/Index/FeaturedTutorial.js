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
} from '@chakra-ui/react'
import NextLink from 'next/link'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import getAuthorSlug from '../../../lib/get-author-slug'
import NextImage from 'next/image'

export default function FeaturedTutorial({ tut }) {
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')
    const { colorMode } = useColorMode()
    const tagColor = {
        light: 'gray.600',
        dark: 'gray.300'
    }
    const [loaded, setLoaded] = useState(false)
    return (
        <Flex justify="center" my={10}>
            <Flex
                align="center"
                justify="center"
                mx={4}
                p={4}
                borderRadius={15}
                flexDir={['column', 'column', 'column', 'column', 'column', 'row']}
                bgColor={useColorModeValue("gray.400", "gray.600")}
                w="100%"
            >
                <Flex justify="center">
                    <Skeleton isLoaded={loaded}>
                        <NextImage
                            placeholder="blur"
                            width={550}
                            height={350}
                            objectFit="contain"
                            src={`/content/tutorials/${tut.filePath.replace(/\.mdx?$/, '')}/${tut.data.featureImg}`}
                            alt={tut.data.title}
                            onLoad={() => { setLoaded(true) }}
                        />
                    </Skeleton>
                </Flex>
                <Flex flexDir="column" ml={6} align="start" w={['100%', '100%', '100%', '100%', '100%', 'auto']}>
                    <Flex wrap="wrap" mt={[4, 4, 4, 4, 4, 0]}>
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
                    <Heading as="h1" size="2xl">
                        <Link
                            href={`/tutorials/${tut.filePath.replace(/\.mdx?$/, '')}`}>
                            {tut.data.title}
                        </Link>
                    </Heading>
                    <Text fontSize="xl" my={6} color={useColorModeValue("blackAlpha.700", "gray.400")}>{tut.data.description}</Text>
                    <Flex align="center" wrap="wrap">
                        <Avatar mr={2} size="sm" src={`/authors/${tut.data.authorImage}`} />
                        <Text fontWeight="semibold" fontStyle="italic">{timeAgo.format(new Date(tut.data.publishedAt))}</Text>
                        <Text mx={1}>by</Text>
                        <Text textDecor="underline"><Link href={`/authors/${getAuthorSlug(tut.data.author)}`} passHref>{tut.data.author}</Link></Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

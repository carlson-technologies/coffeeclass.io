import {
    Text,
    Flex,
    Link,
    useColorModeValue,
    Heading,
    Avatar,
    Image,
    useColorMode,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

export default function FeaturedTutorial({ tut }) {
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const { colorMode } = useColorMode()
    const tagColor = {
        light: 'gray.600',
        dark: 'gray.300'
    }
    return (
        <Flex justify="center" my={10}>
            <Flex
                align="center"
                justify="center"
                mx={4}
                flexDir={['column', 'column', 'column', 'column', 'column', 'row']}
            >
                <Flex
                    boxShadow={`16px 0 15px -4px ${useColorModeValue("#CBD5E0", "#171923")}, -16px 0 8px -4px ${useColorModeValue("#EDF2F7","#2D3748")}`}
                    borderRadius={15}
                >
                    <Image borderRadius={15} w={600} src={`/content/tutorials/${tut.filePath.replace(/\.mdx?$/, '')}/${tut.data.featureImg}`} />
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
                    <Text fontSize="xl" my={6} color={useColorModeValue("gray.500", "gray.400")}>{tut.data.description}</Text>
                    <Flex align="center">
                        <Avatar mr={2} size="sm" src={`/authors/${tut.data.authorImage}`} />
                        <Text mr={1}>By</Text>
                        <Text fontWeight="semibold"><NextLink href={`/authors/${tut.data.author}`}><Link href={`/authors/${tut.data.author}`}>{tut.data.author}</Link></NextLink></Text>
                        <Text ml={1}>{timeAgo.format(new Date(tut.data.publishedAt))}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

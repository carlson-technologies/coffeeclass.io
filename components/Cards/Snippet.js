import {
    Heading,
    Flex,
    Text,
    Box,
    Tag,
    useColorMode
} from '@chakra-ui/react'
import Link from 'next/link'
import NextLink from 'next/link'

export default function Snippet({ title, description, tags, href, as, mainTag }) {
    const { colorMode } = useColorMode()
    const bgColor = {
        light: 'gray.50',
        dark: 'gray.700'
    }
    const boxShadowColor = {
        light: '0px 8px 26px rgba(0, 0, 0, 0.1)',
        dark: '0px 8px 26px rgba(0, 0, 0, 0.9)'
    }
    return (
        <Flex
            w="100%"
            justify="center"
            key={title}
            _hover={{
                boxShadow: boxShadowColor[colorMode],
            }}
        >
            <Box
                bgColor={bgColor[colorMode]}
                p={5}
                borderRadius={5}
                w="100%"
            >
                <Heading><Link href={href} as={as}>{title}</Link></Heading>
                <Text fontSize="lg"><Link href={href} as={as}>{description}</Link></Text>
                <Flex mt={2}>
                    {tags?.map((tag) => {
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
                                        <Tag size="lg" colorScheme={mainTag == tag ? "blue" : "gray"}>#{tag}</Tag>
                                    </Link>
                                </NextLink>
                            </Flex>
                        )
                    })}
                </Flex>
            </Box>
        </Flex>
    )
}
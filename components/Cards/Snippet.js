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
        light: '0 4px 12px 0 rgba(0, 0, 0, 0.3)',
        dark: '0 4px 12px 0 rgba(0, 0, 0, 1)'
    }
    return (
        <Flex
            w="100%"
            justify="center"
            key={title}
        >
            <Box
                bgColor={bgColor[colorMode]}
                p={5} borderRadius={5}
                w="100%"
                boxShadow={boxShadowColor[colorMode]}
                border='1px solid transparent'
                _hover={{
                    border: '1px solid #41729F'
                }}
            >
                <Heading><Link href={href} as={as}>{title}</Link></Heading>
                <Text fontSize="lg"><Link href={href} as={as}>{description}</Link></Text>
                <Flex mt={2}>
                    {tags?.map((tag) => {
                        return (
                            <Flex key={tag} mr={2} _hover={{cursor: 'pointer'}}>
                                <NextLink href={`/tags/${tag}`} passHref>
                                    <Link href={`/${tag}`}>
                                        <Tag size="lg" colorScheme={mainTag == tag ? "blue" : "gray"} fontWeight={mainTag == tag ? "bold" : null}>#{tag}</Tag>
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
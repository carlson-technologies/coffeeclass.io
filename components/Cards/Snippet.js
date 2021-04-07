import {
    Heading,
    Flex,
    Text,
    Box,
    Badge,
    useColorMode
} from '@chakra-ui/react'
import Link from 'next/link'

export default function Snippet({ title, description, tags, href, as }) {
    const { colorMode } = useColorMode()
    const bgColor = {
        light: 'gray.100',
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
        >
            <Box
                bgColor={bgColor[colorMode]}
                p={5} borderRadius={5}
                w="90%"
                boxShadow={boxShadowColor[colorMode]}
                border='1px solid transparent'
                _hover={{
                    border: '1px solid #B7791F'
                }}
            >
                <Heading><Link href={href} as={as}>{title}</Link></Heading>
                <Text fontSize="lg"><Link href={href} as={as}>{description}</Link></Text>
                {tags?.map((tag) => {
                    return (<Badge colorScheme="cyan" mr={2}>#{tag}</Badge>)
                })}
            </Box>
        </Flex>
    )
}
import {
    Flex,
    Text,
    Divider
} from '@chakra-ui/react'
import NextLink from 'next/link'

const Footer = () => {
    return (
        <Flex
            flexDir="column"
            align="center"
            ml={[0, 0, 100]}
            mb={4}
        >
            <Divider w="80%" mb={4} mt={8} />
            <Text fontSize="sm">Find An Error On This Page? Fix It On GitHub</Text>
            <Text fontSize="sm">Copyright &copy; CoffeClass LLC</Text>
            <Text fontSize="sm">Designed And Built By Benjamin Carlson With Next.js / Chakra-UI / MDX</Text>
            <Flex fontSize="sm" flexDir="row">
                <Text>
                    <NextLink href="/terms" passHref>Terms</NextLink>
                    {` • `}
                    <NextLink href="/privacy" passHref>Privacy</NextLink>
                </Text>
            </Flex>
        </Flex>
    )
}

export default Footer
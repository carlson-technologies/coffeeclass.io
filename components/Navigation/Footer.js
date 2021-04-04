import {
    Flex,
    Box,
    IconButton,
    Text,
    Button,
    Divider
} from '@chakra-ui/react'
import NextLink from 'next/link'

const Footer = () => {
    return (
        <Flex
            flexDir="column"
            align="center"
            ml={100}
        >
            <Divider w="80%" my={10} />
            <Text fontSize="lg">Find An Error On This Page? Fix It On GitHub</Text>
            <Text>Copyright &copy; CoffeClass LLC</Text>
            <Text>Designed And Built By Benjamin Carlson With Next.js Chakra-UI</Text>
            <Flex flexDir="row">
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
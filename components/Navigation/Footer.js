import {
    Flex,
    Text,
    Divider,
    useColorMode,
    Box
} from '@chakra-ui/react'
import NextLink from 'next/link'

const Footer = () => {
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.700',
        dark: 'gray.300'
    }
    return (
        <Flex
            flexDir="column"
            align="center"
            ml={[0, 0, 100]}
            mb={8}
            px={4}
            as="footer"
        >
            <Divider w="80%" mb={8} mt={8} />
            <Text fontSize="sm">Copyright &copy; 2021 Coffeclass LLC</Text>
            {/* <Text fontSize="sm" textAlign="center">Created by <Link href="https://benjamincarlson.io" color="blue.500" isExternal>Benjamin Carlson</Link> using <Link href="https://nextjs.org" color="blue.500" isExternal>Next.js</Link> and <Link href="https://chakra-ui.com" color="blue.500" isExternal>Chakra-UI</Link></Text> */}
            <Flex fontSize="sm" flexDir="row" mt={1} color={color[colorMode]}>
                <Box borderBottom="1px solid" mr={2}>
                    <Text mb="-1">
                        <NextLink href="/terms" passHref>Terms</NextLink>
                    </Text>
                </Box>
                {` • `}
                <Box borderBottom="1px solid" mx={2}>
                    <Text>
                        <NextLink href="/privacy" passHref>Privacy</NextLink>
                    </Text>
                </Box>
                {` • `}
                <Box borderBottom="1px solid" ml={2}>
                    <Text>
                        <NextLink href="/disclaimer" passHref>Disclaimer</NextLink>
                    </Text>
                </Box>
            </Flex>
        </Flex>
    )
}

export default Footer
import {
    Flex,
    Text,
    Divider,
    useColorMode,
    Box
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const Footer = () => {
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.700',
        dark: 'gray.300'
    }
    const underlineColor = {
        light: 'band_one.500',
        dark: 'brand_one.500'
    }
    const router = useRouter()
    return (
        <Flex
            flexDir="column"
            align="center"
            ml={[0, 0, 100]}
            my={4}
            px={4}
            as="footer"
        >
            {router.pathname != '/' && <Divider w="80%" mb={4} />}
            <Text fontSize="sm">Copyright &copy; 2021 Coffeclass LLC</Text>
            <Flex fontSize="sm" flexDir="row" mt={1} color="brand_one.500">
                <Box borderBottom="1px solid" mr={2}>
                    <Text>
                        <NextLink href="/legal/terms" passHref>Terms</NextLink>
                    </Text>
                </Box>
                {` • `}
                <Box borderBottom="1px solid" mx={2}>
                    <Text>
                        <NextLink href="/legal/privacy" passHref>Privacy</NextLink>
                    </Text>
                </Box>
                {` • `}
                <Box borderBottom="1px solid" ml={2}>
                    <Text>
                        <NextLink href="/legal/disclaimer" passHref>Disclaimer</NextLink>
                    </Text>
                </Box>
            </Flex>
        </Flex>
    )
}

export default Footer
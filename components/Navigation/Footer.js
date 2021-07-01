import {
    Flex,
    Text,
    Divider,
    useColorMode,
    Box,
    Link,
    Image
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import year from '../../lib/current_date'

const Footer = () => {
    const { colorMode } = useColorMode()
    const logoColor = {
        light: 'dark',
        dark: 'light'
    }
    const router = useRouter()
    return (
        <Flex
            flexDir="column"
            align="center"
            ml={[0, 0, 0, 0, 150, 150]}
            my={4}
            px={4}
            as="footer"
            textAlign="center"
        >
            {router.pathname != '/' && <Divider w="80%" mb={4} />}
            <Text as="small">&copy; Copyright {year}, Carlson Technologies LLC. All Rights Reserved.</Text>
            <Flex my={2}>
                <Link
                    href="https://vercel.com/?utm_source=carlson-technologies&utm_campaign=oss"
                    isExternal
                    _hover={{
                        textDecor: 'none',
                        opacity: .7
                    }}
                >
                    <Flex align="center">
                        <Text mr={1}>Powered by</Text>
                        <Image src={`/vercel/logotype/${logoColor[colorMode]}/vercel-logotype-${logoColor[colorMode]}.png`} w={100} />
                    </Flex>
                </Link>
            </Flex>
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
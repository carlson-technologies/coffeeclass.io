import {
    Flex,
    Text,
    Divider,
    useColorMode,
    useColorModeValue,
    Link,
    Image,
    SimpleGrid,
    Box,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { year } from '../../scripts/time'

const FooterNavItem = ({ text, href }) => {
    return (
        <Text textAlign="left">
            <NextLink href={href} passHref>
                <Link href={href} _hover={{ textDecor: 'underline' }}>
                    {text}
                </Link>
            </NextLink>
        </Text>
    )
}

const FooterNavItemExternal = ({ text, href }) => {
    return (
        <Text textAlign="left">
            <Link href={href} _hover={{ textDecor: 'underline' }} isExternal>
                {text}
            </Link>
        </Text>
    )
}

const FooterHeading = ({ title }) => {
    return (
        <Text
            as="h3"
            textTransform="uppercase"
            marginBottom={6}
            marginTop={8}
            color={useColorModeValue('gray.600', 'gray.400')}
            fontSize="sm"
            fontWeight="semibold"
            letterSpacing="wider"
            textAlign="left"
        >
            {title}
        </Text>
    )
}

const Footer = () => {
    const { colorMode } = useColorMode()
    const logoColor = {
        light: 'dark',
        dark: 'light'
    }
    return (
        <Flex
            flexDir="column"
            align="center"
            ml={[0, 0, 0, 0, 55, 55]}
            my={4}
            px={4}
            as="footer"
        >
            <Divider my={4} />
            <SimpleGrid
                columns={[1, 1, 1, 2, 4, 4]}
                w="100%"
                maxW={[320, 320, 320, 1000, 1000, 1000]}
                mt={4}
                mb={6}
            >
                <Box>
                    <FooterHeading title="Legal" />
                    <Box>
                        <FooterNavItem text="Terms" href="/legal/terms" />
                        <FooterNavItem text="Disclaimer" href="/legal/disclaimer" />
                        <FooterNavItem text="Privacy Policy" href="/legal/privacy" />
                    </Box>
                </Box>

                <Box>
                    <FooterHeading title="Content" />
                    <Box>
                        <FooterNavItem text="Tutorials" href="/tutorials" />
                        <FooterNavItem text="Snippets" href="/snippets" />
                        <FooterNavItem text="Learn" href="/learn" />
                    </Box>
                </Box>

                <Box>
                    <FooterHeading title="Company" />
                    <FooterNavItem text="About" href="/about" />
                    <FooterNavItemExternal text="Carlson Technologies" href="https://carlsontechnologies.dev/" />
                </Box>

                <Box>
                    <FooterHeading title="Open Source" />
                    <FooterNavItemExternal text="Code" href="https://github.com/carlson-technologies/coffeeclass.io" />
                    <FooterNavItemExternal text="Roadmap" href="https://benjamincarlson.notion.site/609b8bb171844146a9bcd9fbabd171a8?v=341de17fff6149bea36dbafbe2f2cf88" />
                    <FooterNavItemExternal text="Engineering Blog" href="https://engineering.coffeeclass.io" />
                </Box>
            </SimpleGrid>

            <Image src="/carlson-technologies-logo.png" alt="Carlson Technologies Logo" w={75} />
            <Text as="small" mt={2}>&copy; Copyright {year}, Carlson Technologies LLC. All Rights Reserved.</Text>

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
                        <Text mr={1} fontSize="sm">Powered by</Text>
                        <Image
                            src={`/vercel/logotype/${logoColor[colorMode]}/vercel-logotype-${logoColor[colorMode]}.png`}
                            w={75}
                            alt="Vercel Logo"
                        />
                    </Flex>
                </Link>
            </Flex>
        </Flex >
    )
}

export default Footer
import {
    Flex,
    Text,
    Divider,
    useColorMode,
    Link,
    Image,
    Heading
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { year } from '../../lib/time'

const FooterNavItem = ({ text, href }) => {
    return (
        <Text textAlign="left">
            <NextLink href={href} passHref>
                <Link href={href} textDecor="underline">
                    {text}
                </Link>
            </NextLink>
        </Text>
    )
}

const FooterNavItemExternal = ({ text, href }) => {
    return (
        <Text textAlign="left">
            <Link href={href} textDecor="underline" isExternal>
                {text}
            </Link>
        </Text>
    )
}

const FooterHeading = ({ title }) => {
    const { colorMode } = useColorMode()
    const headerColor = {
        light: 'gray.500',
        dark: 'gray.300'
    }
    return (
        <Heading
            as="h5"
            size="xs"
            textTransform="uppercase"
            marginBottom={2}
            marginTop={6}
            color={headerColor[colorMode]}
            alignSelf="flex-start"
            textAlign="left"
        >
            {title}
        </Heading>
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
            textAlign="center"
        >
            <Divider my={4} />
            <Flex
                justify="space-around"
                w="100%"
                maxW={[320, 320, 320, 1000, 1000, 1000]}
                my={4}
                flexDir={["column", "column", "column", "row", "row", "row"]}
            >
                <Flex justify={["space-between", "space-between", "space-between", "space-around", "space-around", "space-around"]} w="100%">
                    <Flex flexDir="column">
                        <FooterHeading title="Legal" />
                        <Flex flexDir="column" align="flex-start">
                            <FooterNavItem text="Terms" href="/legal/terms" />
                            <FooterNavItem text="Disclaimer" href="/legal/disclaimer" />
                            <FooterNavItem text="Privacy Policy" href="/legal/privacy" />
                        </Flex>
                    </Flex>
                    <Flex flexDir="column">
                        <FooterHeading title="Content" />
                        <Flex flexDir="column" align={["flex-end", "flex-end", "flex-end", "flex-start", "flex-start", "flex-start"]}>
                            <FooterNavItem text="Tutorials" href="/tutorials" />
                            <FooterNavItem text="Snippets" href="/snippets" />
                            <FooterNavItem text="Learn" href="/learn" />
                        </Flex>
                    </Flex>
                </Flex>

                <Flex justify={["space-between", "space-between", "space-between", "space-around", "space-around", "space-around"]} w="100%">
                    <Flex flexDir="column">
                        <FooterHeading title="Company" />
                        <Flex flexDir="column" align="flex-start">
                            <FooterNavItem text="About" href="/about" />
                            <FooterNavItemExternal text="Carlson Technologies" href="https://carlsontechnologies.dev/" />
                        </Flex>
                    </Flex>
                    <Flex flexDir="column">
                        <FooterHeading title="Open Source" />
                        <Flex flexDir="column" align={["flex-end", "flex-end", "flex-end", "flex-start", "flex-start", "flex-start"]}>
                            <FooterNavItemExternal text="Code" href="https://github.com/carlson-technologies/coffeeclass.io" />
                            <FooterNavItemExternal text="Roadmap" href="https://benjamincarlson.notion.site/609b8bb171844146a9bcd9fbabd171a8?v=341de17fff6149bea36dbafbe2f2cf88" />
                            <FooterNavItemExternal text="Engineering Blog" href="https://engineering.coffeeclass.io" />
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

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
                        <Text mr={1} fontSize="sm">Powered by</Text>
                        <Image
                            src={`/vercel/logotype/${logoColor[colorMode]}/vercel-logotype-${logoColor[colorMode]}.png`}
                            w={75}
                            alt="Vercel Logo"
                        />
                    </Flex>
                </Link>
            </Flex>
        </Flex>
    )
}

export default Footer
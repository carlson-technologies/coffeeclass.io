import {
    Heading,
    Flex,
    Stack,
    Text,
    useColorMode,
    Link,
    Button,
    Icon
} from '@chakra-ui/react'
import Container from '../components/Container'
import NextLink from 'next/link'
import { Search2Icon } from '@chakra-ui/icons'

export default function Custom404() {
    const { colorMode } = useColorMode()
    const headerColor = {
        light: 'brand_one.600',
        dark: 'brand_one.500'
    }
    const bgColor = {
        light: 'gray.100',
        dark: 'gray.700'
    }
    const hoverColor = {
        light: 'gray.300',
        dark: 'gray.500'
    }
    return (
        <Container>
            <Stack
                spacing={8}
                px={4}
            >
                <Flex
                    flexDir="column"
                    mt={50}
                >
                    <Heading
                        as="h1"
                        size="xl"
                        letterSpacing="tight"
                        textTransform="uppercase"
                        color={headerColor[colorMode]}
                    >
                        This page doesn't seem to exist :(
                    </Heading>
                    <NextLink href="/search" passHref>
                        <Link mx={2} href="/search">
                            <Icon
                                aria-label="Search Site"
                                size="lg"
                                _hover={{
                                    textDecoration: 'none',
                                    color: hoverColor[colorMode]
                                }}
                                as={Search2Icon}
                            />
                        </Link>
                    </NextLink>
                    <NextLink href="/" passHref>
                        <Button w={200} my={4} href="/" as="a" colorScheme="orange">Go Home</Button>
                    </NextLink>
                    <Text as="small">Think this is an error? Send us an <Link href="mailto:ben@carlsontechnologies.dev" isExternal color="brown">email</Link>.</Text>
                </Flex>
            </Stack>
        </Container>
    )
}
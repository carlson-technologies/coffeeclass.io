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
                    textAlign="center"
                >
                    <Heading
                        as="h1"
                        size="2xl"
                        letterSpacing="tight"
                        textTransform="uppercase"
                        color={headerColor[colorMode]}
                        mb={2}
                    >
                        This page doesn't seem to exist!
                    </Heading>
                    <Text fontSize="2xl" mb={4}>Why don't you get up 🧍, stretch 🧘, get another cup of coffee ☕, and then <NextLink href="/search" passHref><Link href="/search" color="gray.500">search</Link></NextLink> for what you're looking for!</Text>
                    <Text as="small" fontSize="md">Think this is an error? Send us an <Link href="mailto:ben@carlsontechnologies.dev" isExternal color="gray.500">email</Link>.</Text>
                </Flex>
            </Stack>
        </Container>
    )
}
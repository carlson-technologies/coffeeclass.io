import {
    Heading,
    Flex,
    Stack,
    Text,
    useColorMode,
    Link,
    Button
} from '@chakra-ui/react'
import Container from '../components/Container'
import NextLink from 'next/link'

export default function Custom404() {
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.700',
        dark: 'gray.300'
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
                    alignSelf="center"
                >
                    <Heading>This page doesn't seem to exist :( </Heading>
                    <NextLink href="/" passHref>
                        <Button w={200} my={4} href="/" as="a" colorScheme="orange">Go Home</Button>
                    </NextLink>
                    <Text as="small">Think this is an error? Send us an <Link href="mailto:ben@carlsontechnologies.dev" isExternal color="brown">email</Link>.</Text>
                </Flex>
            </Stack>
        </Container>
    )
}
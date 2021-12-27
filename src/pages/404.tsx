import {
    Heading,
    Text,
    useColorMode,
    Link,
    Center,
    Box,
} from '@chakra-ui/react'
import Container from '../components/Container'
import Search from "../components/Navigation/Search"

export default function Custom404() {
    const { colorMode } = useColorMode()
    const headerColor = {
        light: 'brand_one.600',
        dark: 'brand_one.500'
    }
    return (
        <Container title='404' description='' url=''>
            <Center minH="calc(100vh - 100px)">
                <Box
                    textAlign="center"
                    maxW={1000}
                    mx="auto"
                    px={4}
                >
                    <Heading
                        as="h1"
                        size="2xl"
                        letterSpacing="tight"
                        textTransform="uppercase"
                        color={headerColor[colorMode]}
                        mb={2}
                    >
                        This page doesn&apos;t seem to exist!
                    </Heading>
                    <Text fontSize="2xl" mb={4}>Take this opportunity to get up 🧍, stretch 🧘, get another cup of coffee ☕, and then <Search is404 /> for what you&apos;re looking for!</Text>
                    <Text as="small" fontSize="md">Think this is an error? Send us an <Link href="mailto:ben@carlsontechnologies.dev" isExternal color="gray.500">email</Link>.</Text>
                </Box>
            </Center>
        </Container>
    )
}
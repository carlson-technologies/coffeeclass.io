import {
    Heading,
    Flex,
    Stack,
    Text,
    Box,
    useColorMode,
    Link
} from '@chakra-ui/react'
import Container from '../components/Container'

const url = 'https://www.coffeeclass.io/about'
const title = 'About'
const description = 'Learn about coffeeclass.io. coffeeclass.io offers programming tutorials through this website and their YouTube channel.'

export default function About() {
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.700',
        dark: 'gray.300'
    }

    return (
        <Container title={title} description={description} url={url}>
            <Stack
                spacing={8}
                px={4}
            >
                <Flex
                    flexDir="column"
                    w={["100%", "100%", "100%", "100%", "100%", "60%"]}
                    alignSelf="center"
                >
                    <Heading mt={4} as="h1" size="2xl" color="brand_one.500">About coffeeclass.io 👋</Heading>
                    <Box bgColor="brand_one.500" h={2} w={150} borderRadius={5} mb={4} mt={2} />
                    <Heading as="h2" size="lg" mb={2} mt={4} fontWeight={700} letterSpacing="tight">Who Is coffeeclass.io?</Heading>
                    <Text mb={2} color={color[colorMode]} fontSize="large">coffeeclass.io is created by <Link color="brand_one.500" href="https://benjamincarlson.io" isExternal>Benjamin Carlson</Link>.</Text>

                    <Heading as="h2" size="lg" my={2} mt={4} fontWeight={700} letterSpacing="tight">What Is coffeeclass.io?</Heading>
                    <Text mb={2} color={color[colorMode]} fontSize="large">coffeeclass.io is a programming/computer science education service offering tutorials through this website and their <Link color="brand_one.500" href="https://youtube.com/benjamincarlson" isExternal>YouTube channel</Link>.</Text>

                    <Heading as="h2" size="lg" mb={2} mt={4} fontWeight={700} letterSpacing="tight">Where Is coffeeclass.io Located?</Heading>
                    <Text mb={2} color={color[colorMode]} fontSize="large">coffeeclass.io is 100% online.</Text>

                    <Heading as="h2" size="lg" my={2} mt={4} fontWeight={700} letterSpacing="tight">When Was coffeeclass.io Created?</Heading>
                    <Text mb={2} color={color[colorMode]} fontSize="large">Ben started creating programming tutorials in April 2020 on his <Link color="brand_one.500" href="https://benjamincarlson.io" isExternal>website</Link> and YouTube channel. In April 2021, Ben stopped writing tutorials on his personal website and created this website.</Text>

                    <Heading as="h2" size="lg" my={2} mt={4} fontWeight={700} letterSpacing="tight">Why Was coffeeclass.io Created?</Heading>
                    <Text mb={2} color={color[colorMode]} fontSize="large">To present complex programming ideas in an easy, and fun, to follow format.</Text>

                    {/* <Heading as="h2" size="lg" my={2} mt={4} fontWeight={700} letterSpacing="tight">How Do I Use coffeeclass.io?</Heading>
                    <Text mb={2} color={color[colorMode]} fontSize="large">This is completely up to you! This site is growing by the day but at the moment, our three main services
                        are <Link color="brand_one.500" href="/tutorials">coffeeclass.io Tutorials</Link>, <Link color="brand_one.500" href="/snippets">coffeeclass.io Snippets</Link>, and <Link color="brand_one.500" href="/learn">coffeeclass.io Learn</Link>.</Text> */}
                </Flex>
            </Stack>
        </Container>
    )
}
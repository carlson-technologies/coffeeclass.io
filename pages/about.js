import {
    Heading,
    Flex,
    Stack,
    Text,
    Divider,
    useColorMode,
    Link
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../components/Container'

const url = 'https://coffeeclass.io/about'
const title = 'About – Coffeeclass'
const description = 'Coffeeclass offers programming tutorials through this website and their YouTube channel.'

export default function About() {
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.700',
        dark: 'gray.300'
    }
    return (
        <Container>
            <NextSeo
                title={title}
                description={description}
                canonical={url}
                openGraph={{
                    url,
                    title,
                    description
                }}
            />
            <Stack
                spacing={8}
                px={4}
            >
                <Flex
                    flexDir="column"
                    mt={50}
                >
                    <Heading as="h1" size="2xl">About Coffeeclass 👋</Heading>
                    <Divider mt={2} />
                    <Heading as="h2" size="lg" mb={2} mt={4} fontWeight="medium">Who Is Coffeeclass?</Heading>
                    <Text mb={2} color={color[colorMode]} fontSize="large">Coffeeclass is created by <Link color="blue.500" href="https://benjamincarlson.io" isExternal>Benjamin Carlson</Link>.</Text>
                    
                    <Heading as="h2" size="lg" my={2} mt={4} fontWeight="medium">What Is Coffeeclass?</Heading>
                    <Text mb={2} color={color[colorMode]} fontSize="large">Coffeeclass is a programming/computer science education service offering tutorials through this website and their <Link color="blue.500" href="https://youtube.com/benjamincarlson" isExternal>YouTube channel</Link>.</Text>
                    
                    <Heading as="h2" size="lg" mb={2} mt={4} fontWeight="medium">Where Is Coffeeclass Located?</Heading>
                    <Text mb={2} color={color[colorMode]} fontSize="large">Coffeeclass is 100% online.</Text>

                    <Heading as="h2" size="lg" my={2} mt={4} fontWeight="medium">When Was Coffeeclass Created?</Heading>
                    <Text mb={2} color={color[colorMode]} fontSize="large">Ben started creating programming tutorials in April 2020 on his website and YouTube channel, but re-branded to Coffeeclass (coffeeclass.io) in April 2021.</Text>
                    
                    <Heading as="h2" size="lg" my={2} mt={4} fontWeight="medium">Why Was Coffeeclass Created?</Heading>
                    <Text mb={2} color={color[colorMode]} fontSize="large">To present complex programming ideas in an easy, and fun, to follow format.</Text>
                    
                    <Heading as="h2" size="lg" my={2} mt={4} fontWeight="medium">How Do I Use Coffeeclass?</Heading>
                    <Text mb={2} color={color[colorMode]} fontSize="large">This is completely up to you! This site is growing by the day but at the moment, our two main services
                    are <Link color="blue.500" href="/tutorials">Coffeeclass Tutorials</Link> and <Link color="blue.500" href="/snippets">Coffeeclass Snippets</Link>.</Text>
                </Flex>
            </Stack>
        </Container>
    )
}
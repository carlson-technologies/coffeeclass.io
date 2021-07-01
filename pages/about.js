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
    const headerColor = {
        light: 'brand_one.600',
        dark: 'brand_one.500'
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
                    w={["100%", "100%", "100%", "100%", "100%", "60%"]}
                    alignSelf="center"
                >
                    <Heading as="h1" size="2xl" letterSpacing="tight" color={headerColor[colorMode]}>About Coffeeclass 👋</Heading>
                    <Divider mt={2} />
                    <Heading as="h2" size="lg" mb={2} mt={4} fontWeight={700} letterSpacing="tight">Who Is Coffeeclass?</Heading>
                    <Text mb={2} color={color[colorMode]} fontSize="large">Coffeeclass is created by <Link color="brand_one.500" href="https://benjamincarlson.io" isExternal>Benjamin Carlson</Link>.</Text>

                    <Heading as="h2" size="lg" my={2} mt={4} fontWeight={700} letterSpacing="tight">What Is Coffeeclass?</Heading>
                    <Text mb={2} color={color[colorMode]} fontSize="large">Coffeeclass is a programming/computer science education service offering tutorials through this website and their <Link color="brand_one.500" href="https://youtube.com/benjamincarlson" isExternal>YouTube channel</Link>.</Text>

                    <Heading as="h2" size="lg" mb={2} mt={4} fontWeight={700} letterSpacing="tight">Where Is Coffeeclass Located?</Heading>
                    <Text mb={2} color={color[colorMode]} fontSize="large">Coffeeclass is 100% online.</Text>

                    <Heading as="h2" size="lg" my={2} mt={4} fontWeight={700} letterSpacing="tight">When Was Coffeeclass Created?</Heading>
                    <Text mb={2} color={color[colorMode]} fontSize="large">Ben started creating programming tutorials in April 2020 on his website and YouTube channel, but re-branded to Coffeeclass (coffeeclass.io) in April 2021.</Text>

                    <Heading as="h2" size="lg" my={2} mt={4} fontWeight={700} letterSpacing="tight">Why Was Coffeeclass Created?</Heading>
                    <Text mb={2} color={color[colorMode]} fontSize="large">To present complex programming ideas in an easy, and fun, to follow format.</Text>

                    <Heading as="h2" size="lg" my={2} mt={4} fontWeight={700} letterSpacing="tight">How Do I Use Coffeeclass?</Heading>
                    <Text mb={2} color={color[colorMode]} fontSize="large">This is completely up to you! This site is growing by the day but at the moment, our three main services
                        are <Link color="brand_one.500" href="/tutorials">Coffeeclass Tutorials</Link>, <Link color="brand_one.500" href="/snippets">Coffeeclass Snippets</Link>, and <Link color="brand_one.500" href="/learn">Coffeeclass Learn</Link>.</Text>
                </Flex>
            </Stack>
        </Container>
    )
}
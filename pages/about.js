import {
    Heading,
    Flex,
    Stack,
    Text,
    Divider,
    useColorMode
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
                    <Heading as="h1" size="2xl">About Coffeeclass</Heading>
                    <Divider mt={2} />
                    <Heading as="h3" size="lg" mt={6} my={2}>What Is Coffeeclass?</Heading>
                    <Text mb={2} color={color[colorMode]}>Coffeeclass offers programming tutorials through this website and their YouTube channel.</Text>
                    <Heading as="h3" size="lg" mt={6} my={2}>Who Is Coffeeclass?</Heading>
                    <Text mb={2} color={color[colorMode]}>Coffeeclass is created by Benjamin carlson.</Text>
                    <Heading as="h3" size="lg" mt={6} my={2}>How Do I Use Coffeeclass?</Heading>
                    <Text mb={2} color={color[colorMode]}>Tutorials, Snippets, Learn.</Text>
                    <Heading as="h3" size="lg" mt={6} my={2}>Why Was Coffeeclass Created?</Heading>
                    <Text mb={2} color={color[colorMode]}>To present complex programming ideas in an easy to follow format.</Text>
                    <Heading as="h3" size="lg" mt={6} my={2}>When Was Coffeeclass Created?</Heading>
                    <Text mb={2} color={color[colorMode]}>Started tutorials in April 2020 but re-branded to Coffeeclass in April 2021.</Text>
                    <Heading as="h3" size="lg" mt={6} my={2}>Open Source</Heading>
                    <Text mb={2} color={color[colorMode]}>Coffeclass is 100% open source - down to this website. This site was built using Nex.js, Chakra-UI, and
                    deployed on Vercel. If you find an error or want to write a guest post, feel free to submit a pull request on GitHub!</Text>
                </Flex>
            </Stack>
        </Container>
    )
}
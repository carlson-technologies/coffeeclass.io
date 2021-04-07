import {
    Heading,
    Flex,
    Button,
    Stack,
    Text,
    Box,
    Divider
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../components/Container'
import NextLink from 'next/link'
import Tutorial from '../components/Cards/Tutorial'
import Snippet from '../components/Cards/Snippet'

const url = 'https://coffeeclass.io/'
const title = 'Home – Coffeeclass'
const description = 'Browse a variety of programming tutorials and snippets on Coffeclass.'

export default function Index() {
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
                maxW="100em"
            >
                <Flex
                    flexDir="column"
                    mx={5}
                    as="section"
                    maxW="100em"
                    mt={50}
                >
                    <Flex
                        flexDir={['column', 'column', 'row']}
                        justify="center"
                        align="center"
                    >
                        {/* Left Side */}
                        <Flex flexDir="column" w={['100%', '100%', 600]}>
                            <Heading as="h1" size="2xl">Learn to code and ship your app idea.</Heading>
                            <Heading as="h2" color="gray.500" size="md" mt={4}>Coffeeclass ☕ takes complex programming concepts and presents them in an easy to learn manner.</Heading>
                            <Flex mt={8}>
                                <NextLink href="#explore" passHref>
                                    <Button mr={4} w={200}><Flex as="span" mr={4}>🔭</Flex> Explore Content</Button>
                                </NextLink>
                                <NextLink href="/about" passHref>
                                    <Button variant="outline" w={200} to="/about">About</Button>
                                </NextLink>
                            </Flex>
                        </Flex>

                        {/* Right Side */}
                        <Flex alignSelf={['start', 'start', 'center']}>
                            <Tutorial
                                src="/content/tutorials/add-firebase-to-nextjs/feature.png"
                                title="Firebase + Next.js Quickstart"
                                description="Learn how to connect Next.js to Google's Firebase and
                                use authentication, cloud Firestore, Realtime Database, and
                                cloud storage."
                                tags={["chakra", "nextjs"]}
                                href="/tutorials/add-firebase-to-nextjs"
                            />
                        </Flex>

                    </Flex>

                    <Divider my={8} />

                    <Flex as="section" flexDir="column">
                        <Heading as="h3" size="lg" mb={4} id="explore">Browse The Latest Tutorials</Heading>
                        <Flex wrap="wrap" justify="space-between">
                            <Tutorial
                                src="/content/tutorials/add-firebase-to-nextjs/feature.png"
                                title="Firebase + Next.js Quickstart"
                                description="Learn how to connect Next.js to Google's Firebase and
                                use authentication, cloud Firestore, Realtime Database, and
                                cloud storage."
                                tags={["chakra", "nextjs"]}
                                href="/tutorials/add-firebase-to-nextjs"
                            />
                            {/* Add more here... Either 2 or 4 */}
                        </Flex>
                    </Flex>

                    <Divider my={8} />

                    <Flex as="section" flexDir="column">
                        <Heading as="h3" size="lg" mb={10}>Only Have 5 Minutes? Check Out Some Snippets!</Heading>
                        <Snippet
                            title="Chakra-UI Responsive Navigation Bar"
                            description="Learn how to create a responsive navigation bar using Chakra-UI."
                            tags={["chakra"]}
                            href="/snippets/create-responsive-navbar-using-chakra-ui"
                        />
                    </Flex>

                    <Divider my={8} />

                    <Flex as="section" flexDir="row" align="center" justify="space-around">
                        <Flex flexDir="column" w={500}>
                            <Heading as="h3" size="lg" mb={2}>What Is Coffeeclass?</Heading>
                            <Text mb={2}>Coffeeclass is a suite of programming tutorial tools including this website and this YouTube channel.</Text>
                            <NextLink href="/about" passHref>
                                <Button variant="outline" w={200} to="/about">Learn More</Button>
                            </NextLink>
                        </Flex>
                        <Flex w={500} justify="center">
                            <Box w={200} h={200} backgroundColor="gray.100" borderRadius="50%">

                            </Box>
                        </Flex>
                    </Flex>

                </Flex>
            </Stack>
        </Container>
    )
}
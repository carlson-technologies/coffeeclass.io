import {
    Heading,
    Flex,
    Button,
    Stack,
    Text,
    Box,
    Badge
} from '@chakra-ui/react'
import Container from '../components/Container'
import NextLink from 'next/link'
import Tutorial from '../components/Cards/Tutorial'

export default function Index() {
    return (
        <Container>
            <Stack
                spacing={8}
                px={4}
            >
                <Flex flexDir="column" mx={5}>
                    <Flex
                        flexDir="row"
                        justify="center"
                        align="center"
                    >
                        {/* Left Side */}
                        <Flex flexDir="column" w={600}>
                            <Heading as="h1" size="2xl">Learn to code and ship your app idea.</Heading>
                            <Heading as="h2" color="gray.500" size="md" mt={4}>Coffeeclass takes complex programming concepts and Presents them in an easy to learn manner.</Heading>
                            <Flex mt={8}>
                                <Button mr={4} w={200}>🔭 Explore Content</Button>
                                <NextLink href="/about" passHref>
                                    <Button variant="outline" w={200} to="/about">ℹ️ About</Button>
                                </NextLink>
                            </Flex>
                        </Flex>

                        {/* Right Side */}
                        <Tutorial
                            src="/test.png"
                            title="Firebase + Next.js Quickstart"
                            description="Learn how to connect Next.js to Google's Firebase and
                                use authentication, cloud Firestore, Realtime Database, and
                                cloud storage."
                            tags={["chakra", "nextjs"]}
                        />

                    </Flex>

                    <Heading as="h3" size="lg" my={10}>Browse The Latest Tutorials</Heading>
                    <Flex wrap="wrap" justify="space-between">
                        <Tutorial
                            src="/test.png"
                            title="Firebase + Next.js Quickstart"
                            description="Learn how to connect Next.js to Google's Firebase and
                                use authentication, cloud Firestore, Realtime Database, and
                                cloud storage."
                            tags={["chakra", "nextjs"]}
                        />
                        <Tutorial
                            src="/test.png"
                            title="Firebase + Next.js Quickstart"
                            description="Learn how to connect Next.js to Google's Firebase and
                                use authentication, cloud Firestore, Realtime Database, and
                                cloud storage."
                            tags={["chakra", "nextjs"]}
                        />
                    </Flex>

                </Flex>
            </Stack>
        </Container>
    )
}
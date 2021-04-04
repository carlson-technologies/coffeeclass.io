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
import Image from 'next/image'
import NextLink from 'next/link'

export default function Index() {
    return (
        <Container>
            <Stack
                spacing={8}
                px={4}
            >
                <Flex flexDir="column">
                    <Flex
                        flexDir="row"
                        mt={100}
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
                        <Flex w={600}>
                            <Box bgColor="gray.100" p={5} borderRadius={5}>
                                <Image
                                    width={550}
                                    height={350}
                                    objectFit="contain"
                                    src="/test.png"
                                />
                                <Heading>Firebase + Next.js Quickstart</Heading>
                                <Text>Learn how to connect Next.js to Google's Firebase and
                                use authentication, cloud Firestore, Realtime Database, and
                                cloud storage.</Text>
                                <Badge colorScheme="cyan" mr={2}>#chakra</Badge>
                                <Badge colorScheme="cyan">#nextjs</Badge>
                            </Box>
                        </Flex>
                    </Flex>

                <Heading as="h3" size="lg" mt={10}>Browse The Latest Tutorials</Heading>

                </Flex>
            </Stack>
        </Container>
    )
}
import {
    Heading,
    Flex,
    Button,
    Stack,
    Text,
    Box,
    Badge,
    Divider
} from '@chakra-ui/react'
import Container from '../components/Container'

export default function About() {
    return (
        <Container>
            <Stack
                spacing={8}
                px={4}
            >
                <Flex
                    flexDir="column"
                >
                    <Heading as="h1">About Coffeeclass</Heading>
                    <Divider mt={2} />

                    <Heading>FAQ</Heading>
                </Flex>
            </Stack>
        </Container>
    )
}
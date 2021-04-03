import {
    Heading,
    Flex,
    Button
} from '@chakra-ui/react'
import Container from '../components/Container'

export default function Index() {
    return (
        <Container>
            <Flex flexDir="column">
                <Heading as="h1">coffeeclass.io</Heading>
                <Heading as="h1" mt={50}>coffeeclass.io</Heading>
                <Heading as="h1" mt={50}>coffeeclass.io</Heading>
                <Heading as="h1" mt={50}>coffeeclass.io</Heading>
                <Heading as="h1" mt={50}>coffeeclass.io</Heading>
            </Flex>
        </Container>
    )
}
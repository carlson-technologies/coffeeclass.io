import {
    Heading,
    Flex,
    Stack,
    Text,
    Link,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../../components/Container'

const url = 'https://www.coffeeclass.io/guides'
const title = 'Guides | coffeeclass.io'
const description = 'Save a guide to reference while you are coding.'

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
            >
                <Flex flexDir="column">
                    <Heading
                        as="h1"
                        size="2xl"
                        letterSpacing="tight"
                        textTransform="uppercase"
                        my={8}
                    >
                        Guides
                    </Heading>
                    <Text fontSize="lg">We are working hard to build Guides. In the meantime, explore some <Link href="/snippets" color="blue.500">Snippets</Link>!</Text>
                </Flex>
            </Stack>
        </Container>
    )
}
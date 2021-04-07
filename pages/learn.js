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

const url = 'https://coffeeclass.io/learn'
const title = 'Learn – Coffeeclass'
const description = 'Learn programming languages quickly and easily.'

export default function Learn() {
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
                    <Heading as="h1" size="2xl">Coffeeclass Learn</Heading>
                    <Divider mt={2} />
                    <Text mt={8} color={color[colorMode]} fontSize="xl">Coming soon!</Text>
                </Flex>
            </Stack>
        </Container>
    )
}
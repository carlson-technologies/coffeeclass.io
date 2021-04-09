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
import Container from '../../components/Container'
import subjects from "../../configs/learn.json"

const url = 'https://coffeeclass.io/learn'
const title = 'Learn – Coffeeclass'
const description = 'Learn programming languages quickly and easily.'

export default function Index() {
    const data = subjects.routes
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.700',
        dark: 'gray.300'
    }
    return (
        console.log(data),
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
                    <Flex flexDir="column">
                        {
                            data.map((item, index) => {
                                return (
                                    <Text fontSize="large" key={index}>
                                        <Link href={item.path}>{item.title}</Link>
                                    </Text>
                                )
                            })
                        }
                    </Flex>
                </Flex>
            </Stack>
        </Container>
    ) 
}
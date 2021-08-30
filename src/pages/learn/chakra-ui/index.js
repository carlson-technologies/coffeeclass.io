
import {
    Heading,
    Text,
    Flex,
    Link,
    OrderedList,
    ListItem,
    Stack
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import lessons from "../../../configs/learn/chakra-ui.json"
import Container from "../../../components/Container"

const url = 'https://www.coffeeclass.io/chakra-ui'
const title = 'Learn Chakra UI | coffeeclass.io'
const description = 'Learn the css framework Chakra UI.'

export default function ChakraUI() {
    const data = lessons.routes
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
                    <Heading as="h1" size="2xl" mb={4} textAlign="center">{lessons.title}</Heading>
                    <Text mb={8} textAlign="center" fontSize="large">
                        Learn Chakra UI programming language in this beginner and intermediate tutorial series.
                    </Text>
                    <Heading mb={4} textAlign="center">🚗 Road Map</Heading>
                    <OrderedList>
                        {data.map((item, index) => (
                            <ListItem m={2} fontSize="lg" key={index}><Link href={item.path}>{item.title}</Link></ListItem>
                        ))}
                    </OrderedList>
                </Flex>
            </Stack>
        </Container >
    )
}
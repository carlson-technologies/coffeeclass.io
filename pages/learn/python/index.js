
import {
    useColorMode,
    Heading,
    Text,
    Flex,
    Link,
    OrderedList,
    ListItem,
    Stack
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import lessons from "../../../configs/learn/python.json"
import Container from "../../../components/Container"

const url = 'https://coffeeclass.io/python'
const title = 'Learn Python | coffeeclass.io'
const description = 'Learn the python programming language.'

export default function Python() {
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
                        Learn Python programming language in this beginner and intermediate tutorial series.
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

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
import lessons from "../../../configs/learn/algorithms.json"
import Container from "../../../components/Container"

export default function Algorithms() {
    const data = lessons.routes
    return (
        <Container>
            <Stack
                spacing={8}
                px={4}
            >
                <Flex
                    flexDir="column"
                    mt={50}
                >
                    <Heading as="h1" size="2xl" mb={4}>{lessons.title}</Heading>
                    <Text mb={8}>
                        Learn the basic sorting and searching computer science algorithms, runtime, big o notation, and more.
                    </Text>
                    <Heading mb={4}>🚗 Road Map</Heading>
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
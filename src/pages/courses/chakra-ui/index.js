
import {
    Heading,
    Text,
    Flex,
    Link,
    Stack,
    Box,
    useColorModeValue,
    Image,
    Badge,
} from '@chakra-ui/react'
import lessons from "../../../configs/courses/chakra-ui.json"
import Container from "../../../components/Container"
import NextLink from "next/link"

const url = 'https://www.coffeeclass.io/chakra-ui'
const title = 'Chakra UI Complete Course'
const description = 'Learn the css framework Chakra UI though our easy to follow, step by step course modules.'

export default function ChakraUI() {
    const data = lessons.routes
    const boxShadow = useColorModeValue("0px 8px 26px rgba(0, 0, 0, 0.25)", "0px 8px 26px rgba(255, 255, 255, 0.1)")
    const bgColor = useColorModeValue("#fff", "#15161a")
    const borderColor = useColorModeValue("gray.200", "gray.700")

    return (
        <Container title={title} description={description} url={url}>
            <Stack
                spacing={8}
            >
                <Flex
                    flexDir="column"
                >
                    <Box
                        bgColor={useColorModeValue("gray.100", "gray.800")}
                        maxW={1000}
                        minH="100vh"
                        alignSelf="center"
                        w="100%"
                    >
                        <Box px={4}>
                            <Flex justify="center" mt={10}>
                                <Image src={`/logos/${lessons.image}`} w={100} justifySelf="center" alt={`Image of ${lessons.title} Logo`} />
                            </Flex>
                            <Heading as="h1" size="2xl" mb={4} mt={5} textAlign="center">{lessons.title}</Heading>
                            <Text mb={8} textAlign="center" fontSize="large">
                                {lessons.description}
                            </Text>
                        </Box>
                        <Text fontSize="lg" mb={2} ml={2}>🚗 Road Map / {data.length} modules</Text>
                        {data.map((item, index) => (
                            <NextLink href={item.path} key={index} passHref>
                                <Link 
                                href={item.path} 
                                _hover={{ textDecor: 'none' }}
                                    as="button"
                                    textAlign="left"
                                    disabled={item.tag == "coming soon" && true}
                                    _disabled={{
                                        opacity: 0.5,
                                        cursor: "not-allowed"
                                    }}
                                    w="100%"
                                >
                                    <Flex
                                        _hover={{
                                            transform: "scale(1.05)",
                                            boxShadow: boxShadow,
                                        }}
                                        transition="transform .5s, box-shadow .5s"
                                        bgColor={bgColor}
                                        border="1px solid"
                                        borderColor={borderColor}
                                        borderRadius={5}
                                        p={5}
                                        align="center"
                                    >
                                        <Text mr={4} fontSize="lg">{index + 1}.</Text>
                                        <Flex flexDir="column">
                                            <Heading as="h2" size="md">{item.title}</Heading>
                                            <Text mt={1}>{item.description}</Text>
                                            <Text>{item.tag == "coming soon" && <Badge>Coming Soon!</Badge>}</Text>
                                        </Flex>
                                    </Flex>
                                </Link>
                            </NextLink>
                        ))}
                    </Box>
                </Flex>
            </Stack>
        </Container>
    )
}
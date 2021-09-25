
import {
    Heading,
    Text,
    Flex,
    Link,
    Stack,
    Box,
    useColorModeValue,
    Image,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import lessons from "../../../configs/learn/chakra-ui.json"
import Container from "../../../components/Container"
import NextLink from "next/link"

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
            // px={4}
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
                                <Image src={lessons.image} w={100} justifySelf="center" alt={`Image of ${lessons.title} Logo`} />
                            </Flex>
                            <Heading as="h1" size="2xl" mb={4} mt={5} textAlign="center">{lessons.title}</Heading>
                            <Text mb={2} textAlign="center">{data.length} modules / 6 hours</Text>
                            <Text mb={8} textAlign="center" fontSize="large">
                                {lessons.description}
                            </Text>
                            <Heading size="md" mb={2}>🚗 Road Map</Heading>
                        </Box>
                        {data.map((item, index) => (
                            <NextLink href={item.path} passHref>
                                <Link href={item.path} _hover={{ textDecor: 'none' }}>
                                    <Flex
                                        _hover={{
                                            transform: "scale(1.05)",
                                        }}
                                        transition="transform .5s"
                                        key={index}
                                        bgColor={useColorModeValue("#fff", "#15161a")}
                                        border="1px solid"
                                        borderColor={useColorModeValue("gray.200", "gray.700")}
                                        borderRadius={5}
                                        p={5}
                                        align="center"
                                    >
                                        <Text mr={4} fontSize="lg">{index + 1}.</Text>
                                        <Flex flexDir="column">
                                            <Heading as="h2" size="md">{item.title}</Heading>
                                            <Text mt={1}>{item.description}</Text>
                                        </Flex>
                                    </Flex>
                                </Link>
                            </NextLink>
                        ))}
                    </Box>
                </Flex>
            </Stack>
        </Container >
    )
}
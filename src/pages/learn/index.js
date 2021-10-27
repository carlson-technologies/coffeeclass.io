import { useState } from 'react'
import {
    Heading,
    Flex,
    Stack,
    Text,
    Divider,
    useColorMode,
    SkeletonCircle,
    useColorModeValue,
    Link,
    OrderedList,
    ListItem,
    Grid,
    Icon,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../../components/Container'
import subjects from "../../configs/learn.json"
import Image from 'next/image'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

const url = 'https://www.coffeeclass.io/learn'
const title = 'Learn | coffeeclass.io'
const description = 'Learn programming languages quickly and easily.'

const Wrapper = ({ path, children }) => {
    const { colorMode } = useColorMode()
    const boxShadowColor = {
        light: '0px 8px 26px rgba(0, 0, 0, 0.25)',
        dark: '0px 8px 26px rgba(255, 255, 255, 0.25)'
    }
    const [opacity, setOpacity] = useState(0)
    return (
        <NextLink href={path} passHref>
            <Link
                href={path}
                mt={2}
                mr={2}
                _hover={{ textDecor: 'none' }}
                onMouseOver={() => setOpacity(1)}
                onMouseLeave={() => setOpacity(0)}
            >
                <Flex
                    bgColor={useColorModeValue("gray.200", "gray.700")}
                    p={4}
                    flexDir="column"
                    borderRadius={15}
                    transition='box-shadow 0.3s ease-in-out'
                    _hover={{
                        boxShadow: boxShadowColor[colorMode],
                    }}
                    h="100%"
                >
                    <Icon as={ExternalLinkIcon} fontSize="30px" color="gray.500" pos="absolute" opacity={opacity} transition="opacity .5s ease" />
                    {children}
                </Flex>
            </Link>
        </NextLink>
    )
}

export default function Index() {
    const data = subjects.routes
    const { colorMode } = useColorMode()
    const headerColor = {
        light: 'brand_one.600',
        dark: 'brand_one.500'
    }

    const [loaded, setLoaded] = useState(false)
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
                >
                    <Heading
                        as="h1"
                        size="2xl"
                        letterSpacing="tight"
                        textTransform="uppercase"
                        my={8}
                    >
                        Learn 🎒
                    </Heading>
                    <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
                        {
                            data.map((item, index) => {
                                return (
                                    <Wrapper key={index} path={item.path}>
                                        <Flex my={4} justify="center">
                                            <SkeletonCircle isLoaded={loaded} h={100} w={100}>
                                                <Image
                                                    src={`/learn-images/${item.image}`}
                                                    alt={`logo for ${item.image}`}
                                                    height={100}
                                                    width={100}
                                                    onLoad={() => setLoaded(true)}
                                                />
                                            </SkeletonCircle>
                                        </Flex>
                                        <Heading textAlign="center" mx={2} mb={2} as="h2">{item.title}</Heading>
                                        <Text textAlign="center" mx={2}>{item.description}</Text>
                                        <Divider borderColor={useColorModeValue("blackAlpha.300", "gray.300")} my={4} />
                                        {/* <Heading as="h3" size="sm" textTransform="uppercase" color={useColorModeValue("gray.600", "gray.400")} mb={2}>First Modules</Heading> */}
                                        <OrderedList spacing={4}>
                                            {item['first-5-lessons'].map((lesson, index) => {
                                                return (
                                                    <ListItem key={index} color="gray.500">{lesson.title}</ListItem>
                                                )
                                            }
                                            )}
                                        </OrderedList>
                                        <Text fontSize="sm" textTransform="uppercase" color={useColorModeValue("gray.400", "gray.600")} mt={2}>and more...</Text>
                                    </Wrapper>
                                )
                            })
                        }
                    </Grid>
                </Flex>
            </Stack>
        </Container>
    )
}
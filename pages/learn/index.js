import {
    Heading,
    Flex,
    Stack,
    Text,
    Divider,
    useColorMode,
    Link,
    Button,
    Image
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
                    <Heading as="h1" size="2xl">Coffeeclass Learn 🎒</Heading>
                    <Divider mt={2} />
                    <Flex flexDir="column">
                        {
                            data.map((item, index) => {
                                return (
                                    <Link
                                        href={item.path}
                                        mt={2}
                                        mr={2}
                                        _hover={{ textDecor: 'none' }}
                                        key={index}
                                    >
                                        <Button p={2} size="lg" aria-label={item.title}>
                                            <Image
                                                src={`learn-images/${item.image}`}
                                                h='100%'
                                            />
                                            <Text ml={2}>{item.title}</Text>
                                        </Button>
                                    </Link>
                                )
                            })
                        }
                    </Flex>
                </Flex>
            </Stack>
        </Container>
    )
}
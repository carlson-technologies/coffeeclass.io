import { useState } from 'react'
import {
    Heading,
    Flex,
    Stack,
    Text,
    Divider,
    useColorMode,
    Link,
    Button,
    Badge,
    SkeletonCircle,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../../components/Container'
import subjects from "../../configs/learn.json"
import Image from 'next/image'

const url = 'https://coffeeclass.io/learn'
const title = 'Learn | coffeeclass.io'
const description = 'Learn programming languages quickly and easily.'

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
                    mt={50}
                >
                    <Heading
                        as="h1"
                        size="xl"
                        letterSpacing="tight"
                        textTransform="uppercase"
                        color={headerColor[colorMode]}
                    >
                        coffeeclass.io Learn 🎒
                    </Heading>
                    <Heading as="h2" size="md" fontWeight="normal" mt={2}>Learn a new language or skill, bookmark a module page for future reference, how you use coffeeclass.io Learn is up to you.</Heading>
                    <Divider mt={2} />
                    <Flex wrap="wrap">
                        {
                            data.map((item, index) => {
                                return (
                                    <Flex key={index}>
                                        <Link
                                            href={item.path}
                                            mt={2}
                                            mr={2}
                                            _hover={{ textDecor: 'none' }}
                                        >
                                            <Button p={2} size="lg" aria-label={item.title}>
                                                <SkeletonCircle isLoaded={loaded}>
                                                    <Image
                                                        src={`/learn-images/${item.image}`}
                                                        alt={`logo for ${item.image}`}
                                                        height={35}
                                                        width={35}
                                                        onLoad={() => setLoaded(true)}
                                                    />
                                                </SkeletonCircle>
                                                <Text ml={2}>{item.title}</Text>
                                                {item.new && <Badge colorScheme="purple" ml={2} fontSize="lg">New!</Badge>}
                                            </Button>
                                        </Link>
                                    </Flex>
                                )
                            })
                        }
                    </Flex>
                </Flex>
            </Stack>
        </Container>
    )
}
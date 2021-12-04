import { useState } from 'react'
import {
    Text,
    Flex,
    Link,
    useColorModeValue,
    Heading,
    Avatar,
    useColorMode,
    Skeleton,
    Button,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import Underline from '../../Underline'
import chakra from "../../../configs/courses/chakra-ui.json"

export default function Hero() {
    const { colorMode } = useColorMode()
    const tagColor = {
        light: 'gray.600',
        dark: 'gray.300'
    }
    const [loaded, setLoaded] = useState(false)
    return (
        <>
            <Flex justify="center" align="center" my={20} flexDir={['column', 'column', 'column', 'column', 'column', 'row']}>
                <Flex flexDir="column" maxW={600} mx={4}>
                    <Heading as="h1" size="lg">By 2029, <Underline>316,000</Underline> Software Engineering jobs will be added with a median annual pay of <Underline>$110,140</Underline>.<Text as="small" fontSize="sm" fontWeight="thin" letterSpacing="tight" ml={1}>- <Link textDecor="underline" href="https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm" isExternal>bls.gov</Link></Text></Heading>
                    <Heading as="h2" size="lg" fontWeight="normal" color={useColorModeValue("gray.700", "gray.200")} mt={4}>Learn to code on coffeeclass.io</Heading>
                    <NextLink href="/courses" passHref>
                        <Button
                            my={8}
                            colorScheme="brand_one"
                            w={["100%", "100%", "100%", 200, 200, 200]}
                            transition="width 0.3s"
                            href="/courses"
                            as="a"
                        >
                            Learn Now!
                        </Button>
                    </NextLink>
                </Flex>
                <Flex
                    mx={4}
                    borderRadius={15}
                    flexDir="column"
                    w="100%"
                    maxW={500}
                    bgColor={useColorModeValue("gray.200", "gray.800")}
                    p={5}
                >
                    <Flex justify="center" overflow="hidden">
                        <Skeleton isLoaded={loaded}>
                            <NextLink href={chakra.base} passHref>
                                <Link href={chakra.base}>
                                    <div className="featured-tutorial-img">
                                        <NextImage
                                            width={500}
                                            height={250}
                                            objectFit="cover"
                                            src={`/content/courses/chakra-ui/chakra-ui.png`}
                                            alt={chakra.title}
                                            onLoad={() => { setLoaded(true) }}
                                        />
                                    </div>
                                </Link>
                            </NextLink>
                        </Skeleton>
                    </Flex>
                    <Flex
                        flexDir="column"
                        align="start"
                        mx={[4, 4, 4, 2, 0, 0]}
                        zIndex={1}
                    >
                        <Flex flexDir="column">
                            <Heading as="h1" size="xl">
                                <NextLink href={chakra.base} passHref>
                                    <Link
                                        href={chakra.base}
                                    >
                                        {chakra.title}
                                    </Link>
                                </NextLink>
                            </Heading>
                            <Text fontSize="xl" color={useColorModeValue("blackAlpha.700", "gray.400")} mt={2} mb={4}>{chakra.description}</Text>
                            <Button as="a" href={chakra.routes[0].path} colorScheme="brand_one" variant="outline">Start Course</Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <style jsx>{`
            .featured-tutorial-img {
                transition: opacity .5s ease-in-out, transform .5s ease-in-out;
                border-radius: 20px;
                overflow: hidden;
            }
            .featured-tutorial-img:hover {
                opacity: .85;
                transform: scale(1.1);
            }
            `}</style>
        </>
    )
}

import {
    Text,
    Flex,
    Link,
    useColorModeValue,
    Heading,
    Skeleton,
    Button,
    Image,
    Icon,
    Box,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import Underline from './Underline'
import chakra from "../configs/courses/chakra-ui.json"
import { ChevronDownIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'

// https://vecta.io/symbols/25/web-technologies

const MotionBox = motion(Box)

export default function Hero() {
    const logoType = useColorModeValue('dark', 'light')
    return (
        <>
            <Image
                alt=""
                position="absolute"
                top="10vh"
                left="50%"
                transform="translate(-50%)"
                width="150px"
                height="150px"
                objectFit="contain"
                src="/hero/algolia.svg"
                opacity=".3"
                display={['none', 'none', 'none', 'none', 'none', 'block']}
            />
            <Image
                alt=""
                position="absolute"
                top="10vh"
                left="20%"
                transform="translate(-50%)"
                width="150px"
                height="150px"
                objectFit="contain"
                src={`/hero/next-${logoType}.svg`}
                opacity=".3"
                display={['none', 'none', 'none', 'block', 'block', 'block']}
            />
            <Image
                alt=""
                position="absolute"
                top="30vh"
                left="10%"
                transform="translate(-50%)"
                width="150px"
                height="150px"
                objectFit="contain"
                src="/hero/dart.svg"
                opacity=".3"
            />
            <Image
                alt=""
                position="absolute"
                top="15vh"
                right="5%"
                transform="translate(-50%)"
                width="150px"
                height="150px"
                objectFit="contain"
                src="/hero/js.svg"
                opacity=".3"
            />
            <Image
                alt=""
                position="absolute"
                top="70vh"
                left="15%"
                transform="translate(-50%)"
                width="150px"
                height="150px"
                objectFit="contain"
                src="/hero/github.svg"
                opacity=".3"
            />
            <Image
                alt=""
                position="absolute"
                top="70vh"
                right="5%"
                transform="translate(-50%)"
                width="150px"
                height="150px"
                objectFit="contain"
                src="/hero/python.svg"
                opacity=".3"
            />
            <Image
                alt=""
                position="absolute"
                top="70vh"
                left="50%"
                transform="translate(-50%)"
                width="150px"
                height="150px"
                objectFit="contain"
                src="/hero/firebase.svg"
                opacity=".3"
                display={['none', 'none', 'none', 'block', 'block', 'block']}
            />
            <Image
                alt=""
                position="absolute"
                top="80vh"
                right="20%"
                transform="translate(-50%)"
                width="150px"
                height="150px"
                objectFit="contain"
                src="/hero/css3.svg"
                opacity=".3"
                display={['none', 'none', 'none', 'none', 'none', 'block']}
            />
            <Flex
                justify="space-between"
                align="center"
                flexDir="column"
                minH="calc(100vh - 100px)"
            >
                <Box />
                <Flex flexDir="column" maxW={700} mx={4} textAlign="center" zIndex={1}>
                    <MotionBox
                        initial={{ opacity: 0, marginTop: 5 }}
                        animate={{ opacity: 1, marginTop: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <Heading as="h1" size="xl">By 2029, <Underline>316,000</Underline> Software Engineering jobs will be added with a median annual pay of <Underline>$110,140</Underline>.<Text as="small" fontSize="sm" fontWeight="thin" letterSpacing="tight" ml={1}>- <Link textDecor="underline" href="https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm" isExternal>bls.gov</Link></Text></Heading>
                    </MotionBox>
                    <MotionBox
                        initial={{ opacity: 0, marginTop: 5 }}
                        animate={{ opacity: 1, marginTop: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        <Heading as="h2" size="lg" fontWeight="normal" color={useColorModeValue("blue.500", "blue.400")} mt={6}>Learn to code for free on coffeeclass.io</Heading>
                    </MotionBox>
                    <MotionBox
                        initial={{ opacity: 0, marginTop: 5 }}
                        animate={{ opacity: 1, marginTop: 0 }}
                        transition={{ duration: 1, delay: 0.9 }}
                    >
                        <NextLink href="/courses" passHref>
                            <Button
                                my={8}
                                colorScheme="brand_one"
                                w={["100%", "100%", "100%", 200, 200, 200]}
                                transition="width 0.3s"
                                href="/courses"
                                as="a"
                                mx="auto"
                            >
                                Learn Now!
                            </Button>
                        </NextLink>
                    </MotionBox>
                </Flex>
                <Icon as={ChevronDownIcon} fontSize="40px" color={useColorModeValue("gray.700", "gray.200")} zIndex={10} mb={10} />
            </Flex>
        </>
    )
}

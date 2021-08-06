import {
    Heading,
    Flex,
    Text,
    Box,
    useColorMode
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from "framer-motion"
import NextLink from 'next/link'

const MotionBox = motion(Box)

export default function Tutorial({ src, title, description, tags, href, as, mainTag }) {
    const { colorMode } = useColorMode()
    const bgColor = {
        light: 'gray.100',
        dark: 'gray.700'
    }
    const boxShadowColor = {
        light: '0 4px 12px 0 rgba(0, 0, 0, 0.3)',
        dark: '0 4px 12px 0 rgba(0, 0, 0, 1)'
    }
    const tagColor = {
        light: 'gray.600',
        dark: 'gray.300'
    }
    return (
        <Flex
            w={['100%', '100%', '100%', '100%', 500, 500]}
            my={2}
            mt={[10, 10, 0]}
            key={title}
        >
            <Box
                bgColor={bgColor[colorMode]}
                p={5}
                borderRadius={5}
                overflow="hidden"
                boxShadow={boxShadowColor[colorMode]}
            >
                <MotionBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    <MotionBox
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Flex justify="center">
                            <Image
                                placeholder="blur"
                                width={550}
                                height={350}
                                objectFit="contain"
                                src={src}
                                alt={title}
                            />
                        </Flex>
                    </MotionBox>
                </MotionBox>
                <Flex>
                    {tags?.map((tag) => {
                        return (
                            <Flex
                                mr={2}
                                key={tag}
                                _hover={{
                                    textDecor: 'none',
                                    opacity: '.5'
                                }}
                                cursor="pointer"
                            >
                                <NextLink href={`/tags/${tag}`} passHref>
                                    <Link href={`/${tag}`}
                                    >
                                        <Text fontSize="lg" fontWeight={mainTag == tag ? "bold" : "normal"} color={tagColor[colorMode]}>#{tag}</Text>
                                    </Link>
                                </NextLink>
                            </Flex>
                        )
                    })}
                </Flex>
                <Heading><Link href={href} as={as}>{title}</Link></Heading>
                <Text><Link href={href} as={as}>{description}</Link></Text>
            </Box>
        </Flex>
    )
}
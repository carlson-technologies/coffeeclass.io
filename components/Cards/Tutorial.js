import {
    Heading,
    Flex,
    Text,
    Box,
    Tag,
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
        light: 'gray.50',
        dark: 'gray.700'
    }
    const boxShadowColor = {
        light: '0 4px 12px 0 rgba(0, 0, 0, 0.3)',
        dark: '0 4px 12px 0 rgba(0, 0, 0, 1)'
    }
    return (
        <Flex
            w={['100%', '100%', 500]}
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
                                width={550}
                                height={350}
                                objectFit="contain"
                                src={src}
                                alt={title}
                            />
                        </Flex>
                    </MotionBox>
                </MotionBox>
                <Heading><Link href={href} as={as}>{title}</Link></Heading>
                <Text><Link href={href} as={as}>{description}</Link></Text>
                <Flex mt={2}>
                    {tags?.map((tag) => {
                        return (
                            <Flex key={tag} mr={2} _hover={{ cursor: 'pointer' }}>
                                <NextLink href={`/tags/${tag}`} passHref>
                                    <Tag size="lg" colorScheme={mainTag == tag ? "blue" : "gray"} fontWeight={mainTag == tag ? "bold" : null}>#{tag}</Tag>
                                </NextLink>
                            </Flex>
                        )
                    })}
                </Flex>
            </Box>
        </Flex>
    )
}
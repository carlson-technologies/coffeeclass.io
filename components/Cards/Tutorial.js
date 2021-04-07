import {
    Heading,
    Flex,
    Text,
    Box,
    Badge,
    useColorMode
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from "framer-motion"

const MotionBox = motion(Box)

export default function Tutorial({ src, title, description, tags, href, as }) {
    const { colorMode } = useColorMode()
    const bgColor = {
        light: 'gray.100',
        dark: 'gray.700'
    }
    return (
        <Flex
            w={['100%', '100%', 500]}
            my={2}
            mt={[10, 10, 0]}
            key={title}
        >
            <Box bgColor={bgColor[colorMode]} p={5} borderRadius={5} overflow="hidden">
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
                            />
                        </Flex>
                    </MotionBox>
                </MotionBox>
                <Heading><Link href={href} as={as}>{title}</Link></Heading>
                <Text><Link href={href} as={as}>{description}</Link></Text>
                {tags?.map((tag) => {
                    return (<Badge key={tag} colorScheme="cyan" mr={2}>#{tag}</Badge>)
                })}
            </Box>
        </Flex>
    )
}
import { useState } from 'react'
import {
    Heading,
    Flex,
    Text,
    Box,
    useColorMode,
    Skeleton,
    AspectRatio,
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
        light: '0px 8px 26px rgba(0, 0, 0, 0.25)',
        dark: '0px 8px 26px rgba(255, 255, 255, 0.25)'
    }
    const tagColor = {
        light: 'gray.600',
        dark: 'gray.300'
    }

    const [loaded, setLoaded] = useState(false)
    return (
        <Flex
            w="100%"
            my={2}
            // mt={[10, 10, 0]}
            w={300}
            key={title}
            borderRadius={5}
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                boxShadow: boxShadowColor[colorMode],
            }}
        >
            <Box
                bgColor={bgColor[colorMode]}
                // p={5}
                borderRadius={5}
                overflow="hidden"
                w="100%"
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
                        <Link href={href} as={as}>
                            <Box
                                _hover={{ opacity: .9, cursor: 'pointer' }}
                                transition="opacity .5s ease-in-out"
                                borderRadius={5}
                            >
                                <AspectRatio ratio={16 / 9}>
                                    <Skeleton isLoaded={loaded} borderRadius={5}>
                                        <Image
                                            width={550}
                                            height={350}
                                            objectFit="contain"
                                            src={`/content/articles/${post.filePath.replace(/\.mdx?$/, '')}/${post.data.featureImg}`}
                                            alt={title}
                                            onLoad={() => setLoaded(true)}
                                        />
                                    </Skeleton>
                                </AspectRatio>
                            </Box>
                        </Link>
                    </MotionBox>
                </MotionBox>
                <Flex flexDirection="column" p={5}>
                    <Flex wrap="wrap">
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
                                            <Text fontSize="md" fontWeight={mainTag == tag ? "bold" : "normal"} color={tagColor[colorMode]}>#{tag}</Text>
                                        </Link>
                                    </NextLink>
                                </Flex>
                            )
                        })}
                    </Flex>
                    <Heading size="md" _hover={{ opacity: .7 }}><Link href={href} as={as}>{title}</Link></Heading>
                    <Text _hover={{ opacity: .7 }}><Link href={href} as={as}>{description}</Link></Text>
                </Flex>
            </Box>
        </Flex>
    )
}
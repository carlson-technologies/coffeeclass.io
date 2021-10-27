import { useState } from 'react'
import {
    Heading,
    Flex,
    Text,
    Box,
    useColorMode,
    Skeleton,
    AspectRatio,
    useColorModeValue,
    Badge,
    Wrap,
} from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Snippet({ title, description, tags, href, as, mainTag, image, timeAge, authorName }) {
    const { colorMode } = useColorMode()
    const bgColor = {
        light: 'gray.200',
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
    const router = useRouter()
    return (
        <Box
            bgColor={bgColor[colorMode]}
            p={5}
            borderRadius={5}
            w="100%"
            key={title}
            borderRadius={5}
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                boxShadow: boxShadowColor[colorMode],
            }}
        >
            <Flex h="100%" flexDir={["column", "column", "column", "row", "row", "row"]}>
                {/* If the image title includes "light", it has a dark mode image
                    so we need to use the correct image.
                    This is not the best solution, but it works for now. */}
                <Box>
                    {image.includes('light') ?
                        <Box
                            alignSelf="left"
                            mb={4}
                            mr={4}
                            w={75}
                            h={75}
                        >
                            <Skeleton isLoaded={loaded}>
                                <Image
                                    src={colorMode === "light" ? image : image.replace('light', 'dark')}
                                    alt={image}
                                    width="75px"
                                    height="75px"
                                    objectFit="contain"
                                    onLoad={() => setLoaded(true)}
                                />
                            </Skeleton>
                        </Box> :
                        <Box
                            alignSelf="left"
                            mb={4}
                            mr={4}
                            w={75}
                            h={75}
                        >
                            <AspectRatio ratio={1}>
                                <Skeleton isLoaded={loaded}>
                                    <Image
                                        src={image}
                                        alt={image}
                                        width="75px"
                                        height="75px"
                                        objectFit="contain"
                                        onLoad={() => setLoaded(true)}
                                    />
                                </Skeleton>
                            </AspectRatio>
                        </Box>
                    }
                </Box>
                <Flex flexDir="column" justify="space-between">
                    <Flex flexDir="column">
                        <Heading size="md"><Link href={href} as={as}>{title}</Link></Heading>
                        <Text fontSize="lg"><Link href={href} as={as}>{description}</Link></Text>
                    </Flex>
                    {router.pathname.includes("/tags") &&
                        <Wrap mt={1}>
                            {tags.map((tag, index) => (
                                <Badge colorScheme={mainTag == tag ? "brand_one" : "gray"} fontSize="md" key={index} color={tagColor[colorMode]}>{tag}</Badge>
                            ))}
                        </Wrap>
                    }
                    {/* <Text mt={4} fontStyle="italic" color={useColorModeValue("gray.500", "gray.300")} mr={1}>{timeAge}</Text> */}
                </Flex>
            </Flex>
        </Box>
    )
}
import { useState } from 'react'
import {
    Heading,
    Flex,
    Text,
    Box,
    useColorMode,
    Skeleton,
} from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'
import getAuthorSlug from '../../lib/get-author-slug'

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
    return (
        <Flex
            w="100%"
            justify="center"
            key={title}
            borderRadius={5}
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                boxShadow: boxShadowColor[colorMode],
            }}
        >
            <Box
                bgColor={bgColor[colorMode]}
                p={5}
                borderRadius={5}
                w="100%"
            >
                <Flex h="100%" flexDir={["column", "column", "column", "row", "row", "row"]}>
                    {/* If the image title includes "light", it has a dark mode image
                    so we need to use the correct image.
                    This is not the best solution, but it works for now. */}
                    {image.includes('light') ?
                        <Box
                            alignSelf="left"
                            mb={4}
                            mr={4}
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
                        >
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
                        </Box>
                    }
                    <Flex flexDir="column" justify="space-between">
                        <Flex flexDir="column">
                            <Heading><Link href={href} as={as}>{title}</Link></Heading>
                            <Text fontSize="lg"><Link href={href} as={as}>{description}</Link></Text>
                        </Flex>
                        <Flex flexDir="row" wrap="wrap" align="center" mt={2}>
                            <Text fontWeight="semibold" fontStyle="italic" mr={1}>{timeAge}</Text>
                            <Text mr={1}>by</Text>
                            <Text textDecor="underline" mr={1}><Link href={`/authors/${getAuthorSlug(authorName)}`} passHref>{authorName}</Link></Text>
                            <Text mr={1}>in</Text>
                            <Flex wrap="wrap" align="center">
                                {tags?.map((tag) => {
                                    return (
                                        <Text
                                            fontSize="lg"
                                            fontWeight={mainTag == tag ? "bold" : "normal"}
                                            color={tagColor[colorMode]}
                                            key={tag}
                                            _hover={{
                                                textDecor: 'none',
                                                opacity: '.5'
                                            }}
                                            mr={1}
                                        >
                                            <Link href={`/${tag}`} passHref>
                                                {`#${tag}`}
                                            </Link>
                                        </Text>
                                    )
                                })}
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    )
}
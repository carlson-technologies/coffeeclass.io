import {
    Heading,
    Flex,
    Text,
    Box,
    Image,
    useColorMode
} from '@chakra-ui/react'
import Link from 'next/link'
import NextLink from 'next/link'

export default function Snippet({ title, description, tags, href, as, mainTag, image }) {
    const { colorMode } = useColorMode()
    const bgColor = {
        light: 'gray.200',
        dark: 'gray.700'
    }
    const boxShadowColor = {
        light: '0px 8px 26px rgba(0, 0, 0, 0.1)',
        dark: '0px 8px 26px rgba(0, 0, 0, 0.9)'
    }
    const tagColor = {
        light: 'gray.600',
        dark: 'gray.300'
    }
    return (
        <Flex
            w="100%"
            justify="center"
            key={title}
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
                        <Image
                            src={colorMode === "light" ? image : image.replace('light', 'dark')}
                            alt={image}
                            alignSelf="left"
                            mb={4}
                            mr={4}
                            w={75}
                            h={75}
                        /> :
                        <Image
                            src={image}
                            alt={image}
                            alignSelf="left"
                            mb={4}
                            mr={4}
                            w={75}
                            h={75}
                        />}
                    <Flex flexDir="column">
                        <Heading><Link href={href} as={as}>{title}</Link></Heading>
                        <Text fontSize="lg"><Link href={href} as={as}>{description}</Link></Text>
                        <Flex mt={2}>
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
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    )
}
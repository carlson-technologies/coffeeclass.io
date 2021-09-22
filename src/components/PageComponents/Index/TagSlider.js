import { Text, Flex, Tag, Link, Heading, useColorModeValue, } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function TagSlider({ tags }) {
    return (
        <Flex align="center" mt={4} mb={12} px={4} mx={4}>
            <Flex flex="0 0 auto">
                <Heading
                    color={useColorModeValue("gray.600", "gray.400")}
                    size="sm"
                    textTransform="uppercase"
                    mr={2}
                >
                    Explore <br /> Tags
                </Heading>
            </Flex>
            <Flex wrap="nowrap" overflow="auto">
                {tags.map((tag, index) => (
                    <Flex flex="0 0 auto" key={index} mx={1}>
                        <NextLink href={`/tags/${tag.tag}`}>
                            <Link href={`/tags/${tag.tag}`} _hover={{ textDecor: 'none', opacity: .5 }}>
                                <Tag p={2} colorScheme="brand_one" variant="solid">
                                    <Text fontSize="lg">#</Text>
                                    <Text fontSize="lg" fontWeight="semibold">{tag.tag}</Text>
                                </Tag>
                            </Link>
                        </NextLink>
                    </Flex>
                ))}
                <Flex flex="0 0 auto" ml={1}>
                    <NextLink href="/tags">
                        <Link href="/tags" _hover={{ textDecor: 'none' }}>
                            <Tag p={2} colorScheme="brand_one" variant="subtle">
                                <Text fontSize="lg">Explore All</Text>
                            </Tag>
                        </Link>
                    </NextLink>
                </Flex>
            </Flex>
        </Flex>
    )
}

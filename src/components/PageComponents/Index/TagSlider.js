import { Text, Flex, Tag, Link, Heading, useColorModeValue, } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function TagSlider({ tags }) {
    return (
        <Flex align="center" mt={4} mb={12} px={4}>
            <Flex flex="0 0 auto">
                <Heading color={useColorModeValue("gray.600", "gray.400")} size="sm" textTransform="uppercase" textAlign="center">Explore <br /> Tags</Heading>
            </Flex>
            <Flex wrap="nowrap" overflow="auto" m={2}>
                {tags.map((tag, index) => (
                    <Flex flex="0 0 auto" key={index} mx={1}>
                        <NextLink href={`/tags/${tag.tag}`}>
                            <Link href={`/tags/${tag.tag}`} _hover={{ textDecor: 'none', opacity: .5 }}>
                                <Tag p={2} colorScheme={useColorModeValue("blackAlpha", "gray")}>
                                    <Text fontSize="lg">#</Text>
                                    <Text fontSize="lg" fontWeight="semibold">{tag.tag}</Text>
                                    <Text fontSize="lg">({tag.count})</Text>
                                </Tag>
                            </Link>
                        </NextLink>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    )
}

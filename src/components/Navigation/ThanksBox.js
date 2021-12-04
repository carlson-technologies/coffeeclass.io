import {
    Flex,
    Text,
    useColorModeValue,
    Link,
    Image,
} from '@chakra-ui/react'

export default function ThanksBox({ src, intro, title, href, width }) {
    if (href) {
        return (
            <Link href={href} isExternal>
                <Flex bgColor={useColorModeValue("gray.200", "gray.700")} p={2} borderRadius={5} align="center" w={160} h="100%">
                    <Image src={src} w={width} objectFit="contain" mr={2} />
                    <Flex flexDir="column">
                        <Text textTransform="uppercase" fontSize="10px" color={useColorModeValue("gray.600", "gray.400")}>{intro}</Text>
                        <Text fontSize="14px">{title}</Text>
                    </Flex>
                </Flex>
            </Link>
        )
    }

    return (
        <Flex bgColor={useColorModeValue("gray.200", "gray.700")} p={2} borderRadius={5} align="center" w={160} h="100%">
            <Image src={src} w={width} mr={2} />
            <Flex flexDir="column">
                <Text textTransform="uppercase" fontSize="10px" color={useColorModeValue("gray.600", "gray.400")}>{intro}</Text>
                <Text fontSize="14px">{title}</Text>
            </Flex>
        </Flex>
    )
}

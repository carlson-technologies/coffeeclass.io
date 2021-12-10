import {
    Flex,
    Text,
    useColorModeValue,
    Link,
    Image,
} from '@chakra-ui/react'

export default function ThanksBox({ src, intro, title, href, width, alt }) {
    const bgColor = useColorModeValue("gray.200", "gray.600")
    const color = useColorModeValue("gray.600", "gray.400")
    
    if (href) {
        return (
            <Link href={href} isExternal>
                <Flex bgColor={bgColor} p={2} borderRadius={5} align="center" w={160} h="100%">
                    <Image src={src} alt={alt} w={width} objectFit="contain" mr={2} />
                    <Flex flexDir="column">
                        <Text textTransform="uppercase" fontSize="10px" color={color}>{intro}</Text>
                        <Text fontSize="14px">{title}</Text>
                    </Flex>
                </Flex>
            </Link>
        )
    }

    return (
        <Flex bgColor={bgColor} p={2} borderRadius={5} align="center" w={160} h="100%">
            <Image src={src} alt={alt} w={width} mr={2} />
            <Flex flexDir="column">
                <Text textTransform="uppercase" fontSize="10px" color={color}>{intro}</Text>
                <Text fontSize="14px">{title}</Text>
            </Flex>
        </Flex>
    )
}

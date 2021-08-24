import {
    Flex,
    Tag,
    Text,
    Box,
    useColorModeValue
} from '@chakra-ui/react'

export default function FloatUpDivAnimationNoHeight() {
    return (
        <Box
            border="2px dotted"
            borderColor={useColorModeValue("gray.300", "gray.100")}
            py={10}
            mt={4}
        >
            <Flex
                my={4}
                justifyContent="center"
            >
                <Tag
                    mr={2}
                    size="lg"
                    transition="margin .2s ease-in-out"
                    _hover={{ mt: "-2" }}
                >
                    <Text>Hover Me</Text>
                </Tag>
                <Tag
                    mr={2}
                    size="lg"
                    transition="margin .2s ease-in-out"
                    _hover={{ mt: "-2" }}
                >
                    <Text>To Float Up</Text>
                </Tag>
            </Flex>
        </Box>
    )
}

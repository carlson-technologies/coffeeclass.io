import {
    Heading,
    Box,
    Flex
} from '@chakra-ui/react'

const SnippetStep = ({ number, title }) => {
    return (
        <Flex align="center" mt={4} mb={2}>
            <Flex borderRadius="50%" border="1px solid" w={35} h={35} alignItems="center" justifyContent="center" mr={2}>
                {number}
            </Flex>
            <Heading as="h2" size="md">{title}</Heading>
        </Flex>
    )
}

export default SnippetStep
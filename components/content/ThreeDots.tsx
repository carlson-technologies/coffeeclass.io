import { Box, Flex } from '@chakra-ui/react'

export default function ThreeDots() {
  return (
    <Flex my={10} justify="center">
      <Box w="0.8rem" h="0.8rem" bg="gray.300" borderRadius="50%" />
      <Box w="0.8rem" h="0.8rem" bg="gray.300" borderRadius="50%" mx={6} />
      <Box w="0.8rem" h="0.8rem" bg="gray.300" borderRadius="50%" />
    </Flex>
  )
}

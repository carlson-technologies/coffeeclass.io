import {
    Heading,
    Flex,
    Text,
    Box,
    Badge
} from '@chakra-ui/react'
import Image from 'next/image'

export default function Tutorial({ src, title, description, tags }) {
    return (
        <Flex w={600}>
            <Box bgColor="gray.100" p={5} borderRadius={5}>
                <Image
                    width={550}
                    height={350}
                    objectFit="contain"
                    src={src}
                />
                <Heading>{title}</Heading>
                <Text>{description}</Text>
                {tags?.map((tag) => {
                    return (<Badge colorScheme="cyan" mr={2}>#{tag}</Badge>)
                })}
            </Box>
        </Flex>
    )
}
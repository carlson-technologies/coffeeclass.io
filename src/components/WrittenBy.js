import {
    Text,
    Link,
    Flex,
    Avatar,
    useColorMode,
} from '@chakra-ui/react'
import useSWR from "swr"
import fetcher from '../scripts/fetcher'

export default function WrittenBy({ frontMatter }) {

    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.600',
        dark: 'gray.500'
    }

    const { data, error } = useSWR(`/api/getAuthor?authorSlug=${frontMatter.author.replace(".mdx","")}`, fetcher)

    if (process.env.NODE_ENV === 'development') {
        if (data) console.log(data)
        if (error) console.log(error)
    }

    if (error) return <Text>Failed to load author data!</Text>

    if (!data) return <Text>Loading author data...</Text>

    return (
        <>
            <Avatar src={`/authors/${data.data.data.image}`} size="xl" mb={2} alt={`Image of ${frontMatter.author}`} />
            <Flex flexDir="column" align="center" px={4} textAlign="center">
                <Text>Written By {data.data.data.name}</Text>
                <Text color={color[colorMode]}>{data.data.content}</Text>
                <Text mt={4}><Link href={`/authors/${frontMatter.author.replace(".mdx", "")}`} fontWeight="bold">More Articles By {data.data.data.name}</Link></Text>
            </Flex>
        </>
    )
}

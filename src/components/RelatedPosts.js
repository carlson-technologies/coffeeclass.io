import {
    Heading,
    Flex,
    UnorderedList,
    ListItem,
    Badge,
    Text,
    Box,
    Divider,
} from '@chakra-ui/react'
import Link from 'next/link'

export default function RelatedPosts({ tags, posts, currPostTitle }) {
    var relatedPosts = []

    // loop through all tags and see if they match any of the tags of the current post
    for (var i = 0; i < tags.length; i++) {
        posts.map(post => {
            post.data.tags.map(tag => {
                if (tags[i] == tag) {
                    relatedPosts.push(post)
                }
            })
        })
    }

    // remove duplicates
    relatedPosts = [...new Set(relatedPosts)]

    return (
        relatedPosts.length > 1 && ( // we need 1 because the current post is also in the list
            <>
                <Flex flexDir="column">
                    <Heading as="h4" size="md" mb={2}>View Related Posts</Heading>
                    <UnorderedList>
                        {relatedPosts.map(post => (
                            post.data.title != currPostTitle &&
                            <ListItem fontSize="xl" mb={1}>
                                <Flex align="center">
                                    <Box borderBottom="2px solid gray">
                                        <Link as={`/snippets/${post.filePath.replace(/\.mdx?$/, '')}`} href={`/snippets/[slug]`}>
                                            <Text _hover={{ opacity: .5, cursor: "pointer" }}>{post.data.title}</Text>
                                        </Link>
                                    </Box>
                                    <Link href={`/tags/${post.data.tags[0]}`}><Badge display={["none", "none", "none", "flex", "flex", "flex"]} _hover={{ opacity: .5, cursor: "pointer" }} ml={2} fontSize="lg">{post.data.tags[0]}</Badge></Link>
                                </Flex>
                            </ListItem>
                        ))}
                    </UnorderedList>
                </Flex>
                <Divider mt={4} />
            </>)
    )
}

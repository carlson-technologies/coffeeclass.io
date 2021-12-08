import { connectStateResults } from "react-instantsearch-dom"
import {
    Box,
    Text,
    Link,
    Heading,
    useColorModeValue,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { ChevronRightIcon } from "@chakra-ui/icons"

function Hits({ searchState, searchResults }) {
    const validQuery = searchState.query?.length >= 3 // 3 is the minimum query length

    const bgColor = useColorModeValue("gray.200", "gray.700")
    const color = useColorModeValue("gray.600", "gray.400")

    return (
        <>
            {searchResults?.hits.length === 0 && validQuery && (
                <Text>No results found.</Text>
            )}
            {searchResults?.hits.length > 0 && validQuery && (
                <>
                    {searchResults.hits.map((hit, index) => (
                        <div tabIndex={index} key={hit.objectID}>
                            <>
                                {hit.type === "article" && (
                                    <NextLink href={`/articles/${hit.slug.replace(".mdx", "")}`} passHref>
                                        <Link href={`/articles/${hit.slug.replace(".mdx", "")}`}>
                                            <Box bgColor={bgColor} my={4} p={5} borderRadius={5}>
                                                <Breadcrumb color={color} spacing="4px" separator={<ChevronRightIcon color="gray.500" />}>
                                                    <BreadcrumbItem>
                                                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                                    </BreadcrumbItem>

                                                    <BreadcrumbItem>
                                                        <BreadcrumbLink href="/articles">Article</BreadcrumbLink>
                                                    </BreadcrumbItem>
                                                </Breadcrumb>
                                                <Heading size="md">{hit.title}</Heading>
                                            </Box>
                                        </Link>
                                    </NextLink>
                                )}
                            </>

                            <>
                                {hit.type === "author" && (
                                    <>
                                        <NextLink href={`/authors/${hit.slug.replace(".mdx", "")}`} passHref>
                                            <Link href={`/authors/${hit.slug.replace(".mdx", "")}`}>
                                                <Box bgColor={bgColor} my={4} p={5} borderRadius={5}>
                                                    <Breadcrumb color={color} spacing="4px" separator={<ChevronRightIcon color="gray.500" />}>
                                                        <BreadcrumbItem>
                                                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                                        </BreadcrumbItem>

                                                        <BreadcrumbItem>
                                                            <BreadcrumbLink href="/authors">Author</BreadcrumbLink>
                                                        </BreadcrumbItem>
                                                    </Breadcrumb>
                                                    <Heading size="md">{hit.name}</Heading>
                                                </Box>
                                            </Link>
                                        </NextLink>
                                    </>
                                )}
                            </>

                            <>
                                {hit.type === "tag" && (
                                    <>
                                        <NextLink href={`/tags/${hit.slug.replace(".mdx", "")}`} passHref>
                                            <Link href={`/tags/${hit.slug.replace(".mdx", "")}`}>
                                                <Box bgColor={bgColor} my={4} p={5} borderRadius={5}>
                                                    <Breadcrumb color={color} spacing="4px" separator={<ChevronRightIcon color="gray.500" />}>
                                                        <BreadcrumbItem>
                                                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                                        </BreadcrumbItem>

                                                        <BreadcrumbItem>
                                                            <BreadcrumbLink href="/tags">Tag</BreadcrumbLink>
                                                        </BreadcrumbItem>
                                                    </Breadcrumb>
                                                    <Heading size="md">#{hit.title}</Heading>
                                                </Box>
                                            </Link>
                                        </NextLink>
                                    </>
                                )}
                            </>
                        </div>
                    ))}
                </>
            )}
        </>
    )
}

export default connectStateResults(Hits)
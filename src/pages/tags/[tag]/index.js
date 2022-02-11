import {
    Heading,
    Flex,
    useColorModeValue,
    Box,
    Text,
    AspectRatio,
    Image,
} from '@chakra-ui/react'
import Container from '../../../components/Container'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { contentFilePaths, CONTENT_PATH, tagsFilePaths, TAGS_PATH } from '../../../scripts/mdx-utils'
import ArticleCard from "../../../components/ArticleCard"

export default function Index({ articles, frontMatter }) {
    const url = `https://www.coffeeclass.io/tags/${frontMatter.title}`
    const title = `${frontMatter.title}`
    const description = `Articles relating to ${frontMatter.title} on coffeeclass.io.${frontMatter.description ? ` ${frontMatter.description}` : ''}`

    // loop through articles and if the tag is in the tags array, add it to the filtered array
    const filteredArticles = articles.filter(article => {
        return article.data.tags.includes(frontMatter.title)
    })

    const color = useColorModeValue("gray.500", "gray.400")

    return (
        <Container title={title} description={description} url={url}>
            <Flex
                bgGradient={`linear(to-r,${useColorModeValue("gray.50", "gray.600")},${useColorModeValue("gray.200", "gray.800")},${useColorModeValue("gray.300", "gray.900")})`}
                flexDir="column"
            >
                <Box as="header" mt={10} mb={10} px={4}>
                    <Heading
                        as="h1"
                        size="xl"
                        letterSpacing="tight"
                        textTransform="uppercase"
                        color={useColorModeValue("brand_one.600", "brand_one.500")}
                    >
                        #{frontMatter.title}
                    </Heading>
                    {frontMatter?.description &&
                        <Heading
                            as="h2"
                            size="md"
                            color={color}
                            mt={2}
                        >
                            {frontMatter.description}
                        </Heading>
                    }
                </Box>
            </Flex>
            <Flex flexDir="column">
                <Box px={4} mt={10} maxW={1000} mx="auto" w="100%">
                    <Text
                        as="small"
                        textTransform="uppercase"
                        mt={4}
                        mb={1}
                        fontFamily="lato"
                        color={useColorModeValue("gray.600", "gray.400")}
                        fontSize="sm"
                    >
                        {filteredArticles.length} article{filteredArticles.length > 1 && "s"}
                    </Text>
                    <Heading
                        as="h1"
                        size="2xl"
                        fontFamily="lato"
                        mb={2}
                        fontWeight="medium"
                    >
                        Articles
                    </Heading>
                </Box>
                <Flex flexDir="column" px={[2, 2, 2, 6, 10, 12]} mx="auto">
                    {filteredArticles.map((post, index) => (
                        <ArticleCard key={index} article={post} />
                    ))}
                </Flex>
            </Flex>
        </Container>
    )
}

export const getStaticProps = async ({ params }) => {
    const tagsPath = path.join(TAGS_PATH, `${params.tag}.mdx`)
    const source = fs.readFileSync(tagsPath)
    const { content, data } = matter(source)

    const mdxSource = await serialize(content, {
        scope: data,
    })

    const articles = contentFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(CONTENT_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content,
            data,
            filePath,
        }
    })

    articles.sort(
        (a, b) =>
            Number(new Date(b.data.publishedAt)) -
            Number(new Date(a.data.publishedAt))
    );

    return {
        props: {
            articles,
            source: mdxSource,
            frontMatter: {
                ...data
            },
        },
    }
}

export const getStaticPaths = async () => {
    const paths = tagsFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((tag) => ({ params: { tag } }))

    return {
        paths,
        fallback: false,
    }
}
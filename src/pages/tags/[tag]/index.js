import {
    Heading,
    Flex,
    Grid,
    useColorModeValue,
    Box,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../../../components/Container'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { contentFilePaths, CONTENT_PATH, tagsFilePaths, TAGS_PATH } from '../../../scripts/mdx-utils'

export default function Index({ articles, frontMatter }) {
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const url = `https://www.coffeeclass.io/tags/${frontMatter.title}`
    const title = `${frontMatter.title} | Tags | coffeeclass.io`
    const description = `Articles relating to ${frontMatter.title} on coffeeclass.io. ${frontMatter.description ?? ""}`

    // loop through articles and if the tag is in the tags array, add it to the filtered array
    const filteredArticles = articles.filter(article => {
        return article.data.tags.includes(frontMatter.title)
    })

    console.log(filteredArticles)

    return (
        <Container>
            <NextSeo
                title={title}
                description={description}
                canonical={url}
                openGraph={{
                    url,
                    title,
                    description
                }}
            />
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
                            color={useColorModeValue("gray.500", "gray.400")}
                            mt={2}
                        >
                            {frontMatter.description}
                        </Heading>
                    }
                </Box>
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
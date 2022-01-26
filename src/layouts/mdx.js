import { MDXProvider } from '@mdx-js/react'
import MDXComponents from '../components/MDXComponents'
import Container from '../components/Container'
import { Box } from '@chakra-ui/react'
import Image from "next/image"
import SEO from '../components/SEO'
import { useRouter } from 'next/router'

export default function MdxLayout(props) {
    const router = useRouter()
    const slug = router.asPath

    const frontMatter = {
        title: "Getting Started",
        description: "Learn how to write articles for coffeeclass.io",
        publishedAt: "2021-12-29T12:00:00",
        author: "benjamin-carlson.mdx",
    }

    return (
        <Container>
            <SEO url={`https://www.coffeeclass.io${slug}`} {...frontMatter} />
            <Box pos="relative" h={200} w="100%">
                <Image
                    priority
                    src="/writing.jpg"
                    alt="Writing"
                    layout='fill'
                    objectFit="cover"
                />
            </Box>
            <MDXProvider components={MDXComponents}>
                <Box mx="auto" px={4} maxW={1000} {...props} />
            </MDXProvider>
        </Container>
    )
}
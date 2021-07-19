import {
    Flex,
    Stack
} from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'
import { NextSeo } from 'next-seo'
import Container from '../components/Container'
import { useRouter } from 'next/router'

export default function LearnLayout({ children, frontMatter }) {
    const router = useRouter()
    const slug = router.asPath
    const url = `https://coffeeclass${slug}`
    const title = `${frontMatter.title} - Coffeeclass`
    const description = `${frontMatter.description}`
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
                ml={[0, 0, 0, 0, 2, 2]}
            >
                <Sidebar />
                <Stack
                    as="article"
                    spacing={8}
                    alignItems="flex-start"
                    ml={[0, 0, 0, 0, 0, 250]}
                    px={4}
                    mt={50}
                    maxW='1000px'
                >
                    {children}
                </Stack>
            </Flex>
        </Container>
    )
}
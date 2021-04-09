import {
    Heading,
    Flex,
    Stack
} from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'
import { NextSeo } from 'next-seo'
import Container from '../components/Container'

export default function LearnLayout({ children, frontMatter }) {
    const url = 'https://coffeeclass.io/learn'
    const title = `${frontMatter.title} - Coffeeclass`
    const description = `${frontMatter.summary}`
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
                // justifyContent="center"
                ml={[0, 0, 2]}
            >
                <Sidebar />
                <Stack
                    as="article"
                    spacing={8}
                    alignItems="flex-start"
                    ml={[0, 0, 300]}
                    px={4}
                    mt={50}
                >
                    <Heading as="h1" size="2xl">
                        {frontMatter.title}
                    </Heading>
                    {children}
                </Stack>
            </Flex>
        </Container>
    )
}
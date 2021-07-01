import {
    Heading,
    Flex,
    Stack,
    Text,
    Box,
    Link
} from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'
import Pagination from '../components/Pagination'
import { NextSeo } from 'next-seo'
import Container from '../components/Container'
import { useRouter } from 'next/router'
import { parseISO, format } from 'date-fns'
import { motion } from "framer-motion"

const MotionBox = motion(Box)

export default function LearnLayout({ children, frontMatter }) {
    const router = useRouter()
    const slug = router.asPath
    const url = `https://coffeeclass${slug}`
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
                ml={[0, 0, 0, 0, 2, 2]}
            >
                <Sidebar />
                <MotionBox
                    initial={{ y: -16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <Stack
                        as="article"
                        spacing={8}
                        alignItems="flex-start"
                        ml={[0, 0, 0, 0, 250, 250]}
                        px={4}
                        mt={50}
                        maxW='1000px'
                    >
                        <Heading as="h1" size="2xl">
                            {frontMatter.title}
                        </Heading>
                        {children}
                        {frontMatter.lastUpdated && <Text color="gray.500" fontSize="sm" alignSelf="center">Last updated on {format(parseISO(frontMatter.lastUpdated ? frontMatter.lastUpdated : frontMatter.publishedAt), 'MMMM dd, yyyy')}    </Text>}
                        <Pagination />
                    </Stack>
                </MotionBox>
            </Flex>
        </Container>
    )
}
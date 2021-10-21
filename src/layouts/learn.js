import {
    Flex,
    Box,
} from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'
import SEO from '../components/SEO'
import Container from '../components/Container'
import { useRouter } from 'next/router'

export default function LearnLayout({ children, frontMatter, src, alt }) {
    const router = useRouter()
    const slug = router.asPath

    return (
        <Container>
            <SEO url={`https://www.coffeeclass.io${slug}`} {...frontMatter} />

            <Flex justifyContent="center" maxW="2000px">
                <Flex display={['none', 'none', 'none', 'none', 'none', 'flex', 'flex']} px={2}>
                    <Sidebar src={src} alt={alt} />
                </Flex>
                <Box
                    px={4}
                    mx={4}
                    display="block"
                    w="100%"
                    as="article"
                    maxW="800px"
                    mt="3em"
                >
                    {children}
                </Box>
            </Flex>
        </Container>
    )
}
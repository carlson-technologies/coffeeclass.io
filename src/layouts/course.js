import {
    Flex,
    Box,
    useColorModeValue,
} from '@chakra-ui/react'
import Sidebar from '../components/Courses/Sidebar'
import SEO from '../components/SEO'
import Container from '../components/Container'
import { useRouter } from 'next/router'
import HeaderSidebar from '../components/Courses/HeaderSidebar'

export default function Layout({ children, frontMatter }) {
    const router = useRouter()
    const slug = router.asPath

    return (
        <Container>
            <SEO url={`https://www.coffeeclass.io${slug}`} {...frontMatter} />

            <Flex>
                <Flex minH="100vh" display={['none', 'none', 'none', 'none', 'none', 'flex']} bgColor={useColorModeValue("gray.100", "gray.700")}>
                    <div>
                        <Box w={300} overflow="scroll" pos="sticky" top={10}>
                            <Sidebar course={router.query.course} />
                        </Box>
                    </div>
                </Flex>

                <Flex flexGrow={1} flexDir="column" w="100%" px={4} justify="center" display="block">
                    <Box maxW={1000} mx="auto" overflowX="scroll">
                        {children}
                    </Box>
                </Flex>

                <Flex minH="100vh" display={['none', 'none', 'none', 'none', 'none', 'flex']}>
                    <div>
                        <Box w={200} overflow="scroll" pos="sticky" top={10}>
                            <HeaderSidebar headers={frontMatter.headers} />
                        </Box>
                    </div>
                </Flex>
            </Flex>
        </Container>
    )
}
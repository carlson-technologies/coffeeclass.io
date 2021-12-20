import {
    Flex,
    Box,
    useColorModeValue,
} from '@chakra-ui/react'
import Sidebar from '../components/Courses/Sidebar'
import SEO from '../components/SEO'
import Container from '../components/Container'
import { useRouter } from 'next/router'

export default function LearnLayout({ children, frontMatter, src, alt }) {
    const router = useRouter()
    const slug = router.asPath
    
    return (
        <Container>
            <SEO url={`https://www.coffeeclass.io${slug}`} {...frontMatter} />

            <Flex>
                <Flex display={['none', 'none', 'none', 'none', 'none', 'flex']} bgColor={useColorModeValue("gray.100", "gray.700")}>
                    <div>
                        <Box w={300} overflow="scroll" pos="sticky" top={10}>
                            <Sidebar src={src} alt={alt} />
                        </Box>
                    </div>
                </Flex>

                <Flex flexGrow={1} flexDir="column" w="100%" px={4} justify="center" display="block">
                    <Box maxW={1000} mx="auto">
                        {children}
                    </Box>
                </Flex>
            </Flex>
        </Container>
    )
}
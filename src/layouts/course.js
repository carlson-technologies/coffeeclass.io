import { useState, useEffect } from 'react'
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
import CourseHeader from '../components/Courses/CourseHeader'

export default function Layout({ children, frontMatter }) {
    const router = useRouter()
    const slug = router.asPath

    const [display, setDisplay] = useState("flex")
    const [buttonDisplay, setButtonDisplay] = useState("none")

    useEffect(() => {
        const sidebarDisplay = localStorage.getItem('sidebarDisplay')
        if (sidebarDisplay) {
            setDisplay(sidebarDisplay)
        }
    }, [])

    return (
        <Container>
            <SEO url={`https://www.coffeeclass.io${slug}`} {...frontMatter} />

            <Flex>
                <Flex
                    minH="100vh"
                    display={['none', 'none', 'none', 'none', 'none', 'flex']}
                    bgColor={useColorModeValue("rgb(247, 246, 243)", "gray.700")}
                >
                    <div>
                        <Box w={300} overflow="scroll" pos="sticky" top={0} display={display}>
                            <Sidebar course={router.query.course} display={display} setDisplay={setDisplay} courseHeaderDisplay={buttonDisplay} setCourseHeaderDisplay={setButtonDisplay} />
                        </Box>
                    </div>
                </Flex>


                <Flex flexDir="column" mx="auto" w="100%" overflowX="scroll" overflowY="auto">
                    <Box overflow="auto" mt={2}>
                        <CourseHeader title={frontMatter?.title} course={router.query.course} display={display} setDisplay={setDisplay} courseHeaderDisplay={buttonDisplay} setCourseHeaderDisplay={setButtonDisplay} />
                    </Box>

                    <Box maxW={900} mx="auto" w="100%" overflowX="scroll" px={4} mt={["2em", "2em", "2em", "3em", "3em", "4em"]}>
                        {children}
                    </Box>
                </Flex>

                {/* <Flex minH="100vh" display={['none', 'none', 'none', 'none', 'none', 'flex']}>
                    <div>
                        <Box w={200} overflow="scroll" pos="sticky" top={10}>
                            <HeaderSidebar headers={frontMatter.headers} />
                        </Box>
                    </div>
                </Flex> */}

            </Flex>
        </Container>
    )
}
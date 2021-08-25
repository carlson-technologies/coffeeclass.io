import { useState, useEffect } from 'react'
import {
    Flex,
    useColorMode,
    Heading,
    Link,
    Box,
} from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'
import SEO from '../components/SEO'
import Container from '../components/Container'
import { useRouter } from 'next/router'

export default function LearnLayout({ children, frontMatter, src, alt }) {
    const router = useRouter()
    const slug = router.asPath
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.600',
        dark: 'gray.400'
    }
    const [activeHeader, setActiveHeader] = useState(frontMatter?.headers[0]?.text) // set to the first header to avoid a small window when the page loads where there is no active header

    const handleIntersectionObserver = () => {
        let options = {
            root: null,
            rootMargin: '-350px',
            threshold: 1.0
        }
        // grab all heading tags for the tutorial
        const targets = document.getElementById('main-content').querySelectorAll("h2, h3, h4, h5, h6")
        const activeHeader = (target) => {
            const headerObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveHeader(entry.target.getAttribute("id"))
                        observer.disconnect()
                    }
                })
            }, options)

            headerObserver.observe(target)
        }
        targets.forEach(activeHeader)
    }

    useEffect(() => {
        handleIntersectionObserver()
    })

    return (
        <Container>
            <SEO url={`https://coffeeclass.io${slug}`} {...frontMatter} />

            <Flex justifyContent="center" maxW="2000px">
                <Flex display={['none', 'none', 'none', 'none', 'none', 'none', 'flex']} px={2}>
                    <Sidebar src={src} alt={alt} />
                </Flex>
                <Box
                    px={4}
                    mx={4}
                    display={["block", "block", "block", "block", "block", "flex"]}
                    justifyContent="start"
                    flexDir="column"
                    w="100%"
                    as="article"
                    maxW="1000px"
                    mt="5em"
                >
                    {children}
                </Box>
                <Flex
                    display={['none', 'none', 'none', 'none', 'none', 'none', 'flex']}
                    px={2}
                >
                    {frontMatter.headers.length > 0 &&
                        <Flex
                            as="aside"
                            pos="sticky"
                            top="4em"
                            mt="5em"
                            w="180px"
                            flexDir="column"
                            overflowY="auto"
                            maxH="calc(100vh - 5em)"
                            h="fit-content"
                        >
                            <Flex
                                pos="sticky"
                                flexDir="column"
                            >
                                <Heading
                                    fontSize="md"
                                    fontWeight="bold"
                                    textTransform="uppercase"
                                    mb={2}
                                >
                                    On this page
                                </Heading>
                                {frontMatter?.headers.map((h) => {
                                    return (
                                        <Heading
                                            as="h4"
                                            size="sm"
                                            color={color[colorMode]}
                                            fontWeight={activeHeader == h.text ? "bold" : "normal"}
                                            my={1}
                                            key={h.text}
                                            transition="margin .3s ease-in-out"
                                            _hover={{ ml: "2" }}
                                        >
                                            <Link href={`#${h.text}`} ml={(h.level - 2) * 2}>{h.text}</Link>
                                        </Heading>
                                    )
                                })}
                            </Flex>
                        </Flex>
                    }
                </Flex>
            </Flex>
        </Container>
    )
}
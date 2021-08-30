import { useState, useEffect } from 'react'
import Container from '../components/Container'
import {
    Flex,
    Heading,
    Link,
    useColorMode,
    Tooltip,
    Box,
    Tag,
    Button,
    ListItem,
    ListIcon,
    List
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import SEO from '../components/SEO'
import { YoutubeIcon, GitHubIcon } from '../components/CustomIcons'
import NextLink from 'next/link'
import { parseISO, format } from 'date-fns'
import { ChevronUpIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

export default function Layout({ frontMatter, children }) {
    const router = useRouter()
    const slug = router.asPath
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.600',
        dark: 'gray.300'
    }
    const bgColor = {
        light: 'gray.100',
        dark: 'whiteAlpha.100'
    }
    const [activeHeader, setActiveHeader] = useState(frontMatter?.headers[0]?.text) // set to the first header to avoid a small window when the page loads where there is no active header
    const [width, setWidth] = useState(0)

    const handleScroll = () => {
        let scrollTop = window.scrollY
        let docHeight = document.body.offsetHeight
        let winHeight = window.innerHeight
        let scrollPercent = scrollTop / (docHeight - winHeight)
        let scrollPercentRounded = Math.round(scrollPercent * 100)
        setWidth(scrollPercentRounded)
    }

    const handleIntersectionObserver = () => {
        let options = {
            root: null,
            rootMargin: '-350px',
            threshold: 1.0
        }
        // grab all heading tags for the tutorial
        const targets = document.getElementById('tutorial-content').querySelectorAll("h2, h3, h4, h5, h6")
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
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    return (
        <Container>
            <SEO url={`https://www.coffeeclass.io${slug}`} slug={slug} {...frontMatter} />
            <Box h={1} as="div" bgGradient="linear(to-r, #EAD9CD, #714B2F)" pos="fixed" top={0} left={0} zIndex={15} w={`${width}%`}></Box>
            <Flex mt={10} maxW={2560} minH="100vh">
                <Flex
                    flexDir="column"
                    mx={[0, 0, 0, 0, 1, 1]}
                    px={[4, 4, 4, 2, 1, 4]}
                    w={frontMatter.headers ? ["100%", "100%", "100%", "100%", "100%", "calc(100% - 250px)"] : '100%'}
                >
                    {children}
                </Flex>
                <aside>
                    <Flex
                        pos="sticky"
                        top={10}
                        w={200}
                        flexDir="column"
                        mt={10}
                        display={['none', 'none', 'none', 'none', 'none', 'flex']}
                    >
                        <Link href={frontMatter.youtubeId} _hover={{ textDecor: 'none' }} mt={8} isExternal>
                            <Button
                                isFullWidth
                                fontSize="sm"
                                leftIcon={<YoutubeIcon fontSize="xl" />}
                                bgColor={bgColor[colorMode]}
                            >
                                Watch on YouTube
                            </Button>
                        </Link>
                        <Link href={frontMatter.githubURL} _hover={{ textDecor: 'none' }} my={2} isExternal>
                            <Button
                                isFullWidth
                                fontSize="sm"
                                leftIcon={<GitHubIcon fontSize="xl" />}
                                bgColor={bgColor[colorMode]}
                            >
                                View Code
                            </Button>
                        </Link>
                        <Flex bgColor={bgColor[colorMode]} flexDir="column" p={3} borderRadius={10} mb={2}>
                            <List>
                                <ListItem color={color[colorMode]} fontSize="sm">
                                    <ListIcon as={ArrowForwardIcon} color="orange.700" />
                                    Posted on {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
                                    ({timeAgo.format(new Date(frontMatter.publishedAt))})
                                </ListItem>
                                <ListItem color={color[colorMode]} fontSize="sm">
                                    <ListIcon as={ArrowForwardIcon} color="orange.700" />
                                    Reading time: {frontMatter.readingTime.text.replace('read', '')}
                                </ListItem>
                                <ListItem color={color[colorMode]} fontSize="sm" textDecor="underline">
                                    <ListIcon as={ArrowForwardIcon} color="orange.700" />
                                    <Link href="#comments">Go To Comments</Link>
                                </ListItem>
                            </List>
                        </Flex>
                        <Flex wrap="wrap" justify="space-between">
                            {frontMatter.tags?.map((tag) => {
                                return (
                                    <NextLink key={tag} href={`/tags/${tag}`} _hover={{ textDecor: 'none' }} passHref>
                                        <Tooltip hasArrow label={`View posts relating to ${tag}`}>
                                            <Link href={`/tags/${tag}`} _hover={{ textDecor: 'none' }}>
                                                <Tag borderRadius={10} bgColor={bgColor[colorMode]} size="lg" mb={2}>#{tag}</Tag>
                                            </Link>
                                        </Tooltip>
                                    </NextLink>
                                )
                            })}
                        </Flex>
                        {frontMatter?.headers &&
                            <Flex
                                bgColor={bgColor[colorMode]}
                                flexDir="column"
                                p={3}
                                borderRadius={10}
                                mb={2}
                            >
                                <Heading
                                    color={color[colorMode]}
                                    fontSize="sm"
                                    fontWeight="bold"
                                    textTransform="uppercase"
                                    textAlign="center"
                                >
                                    On this page
                                </Heading>
                                {frontMatter?.headers.map((h) => {
                                    return (
                                        <Heading
                                            as="h4"
                                            size="sm"
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
                        }
                        <Link href="#__next" w="100%" _hover={{ textDecor: 'none' }}>
                            <Button
                                fontWeight="normal"
                                borderRadius={10}
                                leftIcon={<ChevronUpIcon />}
                                w="100%"
                                bgColor={bgColor[colorMode]}
                            >
                                Top
                            </Button>
                        </Link>
                    </Flex>
                </aside>
            </Flex>
        </Container>
    )
}
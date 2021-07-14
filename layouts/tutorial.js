import { useState, useEffect } from 'react'
import Container from '../components/Container'
import {
    Flex,
    Heading,
    Link,
    useColorMode,
    Tooltip,
    Box,
    IconButton,
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

export default function Layout({ frontMatter, children }) {
    const router = useRouter()
    const slug = router.asPath
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.600',
        dark: 'gray.300'
    }
    const bgColor = {
        light: 'gray.100',
        dark: 'whiteAlpha.100'
    }

    const [width, setWidth] = useState(0)
    const handleScroll = () => {
        let scrollTop = window.scrollY;
        let docHeight = document.body.offsetHeight;
        let winHeight = window.innerHeight;
        let scrollPercent = scrollTop / (docHeight - winHeight);
        let scrollPercentRounded = Math.round(scrollPercent * 100);
        setWidth(scrollPercentRounded)

        // this value is being passed into Confetti component
        // we only want to set it off once so no need to ever set it back to false
        // if (scrollPercentRounded == 100)
        //     setFire(true)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })
    return (
        <Container>
            <SEO url={`https://coffeeclass.io${slug}`} {...frontMatter} />
            <Box h={1} as="div" bgGradient="linear(to-r, #EAD9CD, #714B2F)" pos="fixed" top={0} left={0} zIndex={15} w={`${width}%`}></Box>
            <Flex mt={10} maxW={2560} minH="100vh">
                <Flex
                    flexDir="column"
                    mx={[0, 0, 0, 0, 1, 1]}
                    px={[4, 4, 4, 2, 1, 1]}
                    w={frontMatter.headers ? ["100%", "100%", "100%", "100%", "calc(100% - 250px)", "calc(100% - 250px)"] : '100%'}
                >
                    {children}
                </Flex>
                <div>
                    <Flex
                        pos="sticky"
                        top={10}
                        w={200}
                        flexDir="column"
                        mt={10}
                        display={['none', 'none', 'none', 'none', 'flex', 'flex']}
                    >
                        <Flex justify="space-between" mb={2} mt={8}>
                            <Link href={frontMatter.youtubeId} isExternal><IconButton w={75} bgColor={bgColor[colorMode]} icon={<YoutubeIcon />} mr={2} borderRadius={8} /></Link>
                            <Link href={frontMatter.githubURL} isExternal><IconButton w={75} bgColor={bgColor[colorMode]} icon={<GitHubIcon />} borderRadius={8} /></Link>
                        </Flex>
                        <Flex bgColor={bgColor[colorMode]} flexDir="column" p={3} borderRadius={10} mb={2}>
                            <List>
                                <ListItem color={color[colorMode]} fontSize="sm">
                                    <ListIcon as={ArrowForwardIcon} color="orange.700" />
                                    Posted on {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
                                </ListItem>
                                <ListItem color={color[colorMode]} fontSize="sm">
                                    <ListIcon as={ArrowForwardIcon} color="orange.700" />
                                    Est. reading time: {frontMatter.readingTime.text.replace('read', '')}
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
                                    <NextLink href={`/tags/${tag}`} _hover={{ textDecor: 'none' }} passHref>
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
                            <Flex bgColor={bgColor[colorMode]} flexDir="column" p={3} borderRadius={10} mb={2}>
                                {frontMatter?.headers.map((h) => {
                                    return (
                                        <Heading as="h4" size="sm" fontWeight="normal" my={1} key={h.text} transition="all .3s ease-in-out" _hover={{ ml: "2" }}>
                                            <Link href={`#${h.text}`} ml={(h.level - 2) * 2}>{h.text}</Link>
                                        </Heading>
                                    )
                                })}
                            </Flex>
                        }
                        <Link href="#__next" w="100%" _hover={{ textDecor: 'none' }} passHref>
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
                </div>
            </Flex>
        </Container>
    )
}
import { useState } from 'react'
import { useRouter } from "next/router"
import chakraUISidebar from "../../configs/courses/chakra-ui.json"
import {
    Box,
    Flex,
    Text,
    Heading,
    Link,
    useColorMode,
    Divider,
    Badge,
    SkeletonCircle,
    AspectRatio,
    useColorModeValue,
} from "@chakra-ui/react"
import Image from 'next/image'
import NextLink from 'next/link'

const configMap = {
    "/courses/chakra-ui": chakraUISidebar
}

export function getRoutes(slug) {
    const [_path, sidebar] =
        Object.entries(configMap).find(([path, _sidebar]) =>
            slug.startsWith(path),
        )

    return sidebar?.routes
}

const Sidebar = ({ src, alt }) => {
    const { pathname } = useRouter()
    const routes = getRoutes(pathname)
    const router = useRouter()
    const [loaded, setLoaded] = useState(false)
    const { colorMode } = useColorMode()
    const sideBarActiveColor = {
        light: 'gray.300',
        dark: 'gray.600'
    }
    const sideBarHoverColor = {
        light: 'gray.300',
        dark: 'gray.600'
    }

    const configMap = {
        "/courses/chakra-ui": chakraUISidebar
    }

    let path1 = router.pathname.split("/")[1]
    let path2 = router.pathname.split("/")[2]
    let path = "/" + path1 + "/" + path2 // courses/<course-title>

    const color = useColorModeValue('gray.600', 'gray.400')

    return (
        <Box>
            <Box
                as="aside"
                aria-label="Sidebar Navigation"
                sx={{
                    overscrollBehavior: "contain",
                }}
                overflowY="auto"
                flexShrink={0}
                h="fit-content"
                maxH="calc(100vh - 100px)"
            >
                <Flex
                    flexDirection="column"
                >
                    <Flex flexDirection="column" alignItems="center" mt={4} id="logo">
                        <SkeletonCircle isLoaded={loaded}>
                            <NextLink href="/courses/chakra-ui" passHref>
                                <Link href="/courses/chakra-ui">
                                    <AspectRatio ratio={1}>
                                        <Image
                                            src={`/logos/${src}`}
                                            alt={alt}
                                            layout="fill"
                                            onLoad={() => setLoaded(true)}
                                        />
                                    </AspectRatio>
                                </Link>
                            </NextLink>
                        </SkeletonCircle>
                        <Heading as="h4" size="md" my={4}>Modules 🔖</Heading>
                    </Flex>
                    {routes.map((item, index) =>
                        <>
                            <Divider my={4} display={index == 0 && 'none'} />
                            <Heading
                                as="h2"
                                textTransform="uppercase"
                                mt={4}
                                mb={2}
                                color={color}
                                fontSize="md"
                                fontWeight="semibold"
                                key={item.title}
                                px={4}
                            >
                                {item.title}
                            </Heading>
                            <>
                                {item?.routes?.map((item, index) => (
                                    <NextLink href={item.path} key={item.title} passHref>
                                        <Link
                                            href={item.path}
                                            _hover={{
                                                textDecoration: 'none'
                                            }}
                                            as="button"
                                            textAlign="left"
                                            disabled={item.tag == "coming soon" && true}
                                            _disabled={{
                                                opacity: 0.5,
                                                cursor: "not-allowed"
                                            }}
                                            w="100%"
                                        >
                                            <Box
                                                _hover={{
                                                    textDecoration: 'none',
                                                    backgroundColor: item.path.includes(router.query.slug) ? sideBarActiveColor[colorMode] : sideBarHoverColor[colorMode]
                                                }}
                                                transition="background-color .15s ease-in-out"
                                                w="100%"
                                                borderRadius={2}
                                                py={2}
                                                px={4}
                                                backgroundColor={item.path.includes(router.query.slug) ? sideBarActiveColor[colorMode] : null}
                                            >
                                                <Flex flexDir="column">
                                                    <Text py="1px" pl={1}>{item.title}</Text>
                                                    {item.tag && <Badge w="fit-content" colorScheme={item.tag == "new" ? "green" : "purple"}>{item.tag}</Badge>}
                                                </Flex>
                                            </Box>
                                        </Link>
                                    </NextLink>
                                ))}
                            </>
                        </>
                    )}
                </Flex>
            </Box>
            <Box py={4} borderTop={`1px solid ${useColorModeValue("#E2E8F0", "#A0AEC0")}`} h="100px">
                <Text ml={2}>{configMap[path].title} - {configMap[path].version}</Text>
            </Box>
        </Box>
    )
}

export default Sidebar
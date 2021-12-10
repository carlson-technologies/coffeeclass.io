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
} from "@chakra-ui/react"
import Image from 'next/image'
import NextLink from 'next/link'
import Ad from '../Content/Ad'

export function getRoutes(slug) {
    const configMap = {
        "/courses/chakra-ui": chakraUISidebar
    }

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
        light: 'brand_one.200',
        dark: 'brand_one.600'
    }
    const sideBarHoverColor = {
        light: 'brand_one.50',
        dark: 'brand_one.500'
    }
    return (
        <Box
            as="nav"
            aria-label="Sidebar Navigation"
            pos="sticky"
            sx={{
                overscrollBehavior: "contain",
            }}
            w="300px"
            top="5em"
            maxH="calc(100vh - 5em)"
            h="fit-content"
            mt="3em"
            overflowY="auto"
            flexShrink={0}
        >
            <Flex
                flexDirection="column"
            >
                <Flex flexDirection="column" alignItems="center">
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
                    <Heading as="h4" size="md" mt={4}>Modules 🔖</Heading>
                </Flex>
                <Divider my={4} />
                {routes.map((r) =>
                    <NextLink href={r.path} key={r.title} passHref>
                        <Link
                            href={r.path}
                            _hover={{
                                textDecoration: 'none'
                            }}
                            my={1}
                            as="button"
                            textAlign="left"
                            disabled={r.tag == "coming soon" && true}
                            _disabled={{
                                opacity: 0.5,
                                cursor: "not-allowed"
                            }}
                            w="100%"
                        >
                            <Box
                                _hover={{
                                    textDecoration: 'none',
                                    backgroundColor: r.path.includes(router.query.slug) ? sideBarActiveColor[colorMode] : sideBarHoverColor[colorMode]
                                }}
                                transition="background-color .15s ease-in-out"
                                w="100%"
                                borderRadius={2}
                                p={2}
                                backgroundColor={r.path.includes(router.query.slug) ? sideBarActiveColor[colorMode] : null}
                            >
                                <Flex justify="space-between" align="center">
                                    <Text py="1px" pl={1}>{r.title}</Text>
                                    {r.tag && <Badge colorScheme={r.tag == "new" ? "green" : "purple"}>{r.tag}</Badge>}
                                </Flex>
                            </Box>
                        </Link>
                    </NextLink>
                )}
            </Flex>
            <Ad />
        </Box>
    )
}

export default Sidebar
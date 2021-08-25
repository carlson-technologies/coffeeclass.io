import { useState } from 'react'
import { useRouter } from "next/router"
import pythonSidebar from "../configs/learn/python.json"
import chakraUISidebar from "../configs/learn/chakra-ui.json"
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
} from "@chakra-ui/react"
import Image from 'next/image'
import NextLink from 'next/link'

export function getRoutes(slug) {
    const configMap = {
        "/learn/python": pythonSidebar,
        "/learn/chakra-ui": chakraUISidebar
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
            top="4em"
            maxH="calc(100vh - 5em)"
            h="fit-content"
            mt="5em"
            overflowY="auto"
            flexShrink={0}
        >
            <Flex
                flexDirection="column"
            >
                <Flex flexDirection="column" alignItems="center">
                    <SkeletonCircle isLoaded={loaded}>
                        <Image
                            src={`/learn-images/language-logo/${src}`}
                            alt={alt}
                            height={35}
                            width={35}
                            onLoad={() => setLoaded(true)}
                        />
                    </SkeletonCircle>
                    <Heading as="h4" size="md" mt={4}>Modules 🔖</Heading>
                </Flex>
                <Divider my={4} />
                {routes.map((r) =>
                    <NextLink href={r.path} passHref>
                        <Link
                            key={r.title}
                            href={r.path}
                            _hover={{
                                textDecoration: 'none'
                            }}>
                            <Box
                                _hover={{
                                    textDecoration: 'none',
                                    backgroundColor: r.path.includes(router.query.slug) ? sideBarActiveColor[colorMode] : sideBarHoverColor[colorMode]
                                }}
                                transition="background-color .15s ease-in-out"
                                w="100%"
                                my={2}
                                borderRadius={5}
                                p={1}
                                backgroundColor={r.path.includes(router.query.slug) ? sideBarActiveColor[colorMode] : null}
                            >
                                <Flex justify="space-between" align="center">
                                    <Text py="1px" pl={1}>{r.title}</Text>
                                    {r.new && <Badge colorScheme="purple">New!</Badge>}
                                </Flex>
                            </Box>
                        </Link>
                    </NextLink>
                )}
            </Flex>
        </Box>
    )
}

export default Sidebar
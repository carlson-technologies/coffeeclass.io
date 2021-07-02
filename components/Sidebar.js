import { useRouter } from "next/router"
import pythonSidebar from "../configs/learn/python.json"
import {
    Box,
    Flex,
    Text,
    Heading,
    Link,
    useColorMode,
    Divider
} from "@chakra-ui/react"
import NextLink from 'next/link'

export function getRoutes(slug) {

    const configMap = {
        "/learn/python": pythonSidebar
    }

    const [_path, sidebar] =
        Object.entries(configMap).find(([path, _sidebar]) =>
            slug.startsWith(path),
        ) ?? []

    return sidebar?.routes ?? []
}

const Sidebar = () => {
    const { pathname } = useRouter()
    const routes = getRoutes(pathname)
    const router = useRouter()
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
            aria-label="Side Navigation"
            pos="fixed"
            sx={{
                overscrollBehavior: "contain",
            }}
            w="270px"
            top="20px"
            h="calc(100vh - 20px)"
            pr="8"
            pb="4"
            pl="3"
            overflowY="auto"
            flexShrink={0}
            display={["none", "none", "none", "none", "block", "block"]}
        >
            <Flex
                flexDirection="column"
            >
                <Heading as="h4" size="md" textAlign="center">Modules 🔖</Heading>
                <Divider my={4} />
                {routes.map((r) =>
                    <NextLink href={r.path} passHref>
                        <Link href={r.path} key={r.title} _hover={{
                            textDecoration: 'none'
                        }}>
                            <Box
                                _hover={{
                                    textDecoration: 'none',
                                    backgroundColor: r.path.includes(router.query.slug) ? sideBarActiveColor[colorMode] : sideBarHoverColor[colorMode]
                                }}
                                w="100%"
                                my={2}
                                borderRadius={5}
                                p={1}
                                backgroundColor={r.path.includes(router.query.slug) ? sideBarActiveColor[colorMode] : null}
                            >
                                <Text py="1px" pl={1}>{r.title}</Text>
                            </Box>
                        </Link>
                    </NextLink>
                )}
            </Flex>
        </Box>
    )
}

export default Sidebar
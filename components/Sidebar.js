import { useRouter } from "next/router"
import algorithmsSidebar from "../configs/learn/algorithms.json"
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
        "/learn/algorithms": algorithmsSidebar
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
        light: 'gray.100',
        dark: 'gray.600'
    }
    // routes[0].path.split('').reverse().join('').split('/')[0].split('').reverse().join('')
    return (
        <Box
            aria-label="Side Navigation"
            pos="fixed"
            sx={{
                overscrollBehavior: "contain",
            }}
            w="270px"
            top="10px"
            h="calc(100vh - 10px)"
            pr="8"
            pb="8"
            pl="3"
            overflowY="auto"
            flexShrink={0}
            display={{ base: "none", md: "block" }}
        >
            <Flex
                flexDirection="column"
            >
                <Heading as="h4" size="md" textAlign="center">Chapters</Heading>
                <Divider my={4} />
                {routes.map((r) =>
                    // console.log(router.query.slug)
                    // console.log(r.path.includes(router.query.slug))
                    <NextLink href={r.path} passHref key={r.title}>
                        <Box
                            _hover={{
                                textDecoration: 'none'
                            }}
                            w="100%"
                            my={2}
                            borderRadius={5}
                            p={1}
                            backgroundColor={r.path.includes(router.query.slug) ? sideBarActiveColor[colorMode] : null}
                        >
                            <Link _hover={{
                                textDecoration: 'none'
                            }}>
                                <Text>{r.title}</Text>
                            </Link>
                        </Box>
                    </NextLink>
                )}
            </Flex>
        </Box>
    )
}

export default Sidebar
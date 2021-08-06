import { useRouter } from "next/router"
import pythonSidebar from "../configs/learn/python.json"
import chakraUISidebar from "../configs/learn/chakra-ui.json"
import {
    Flex,
    Text,
    Link,
    useColorMode,
    Icon
} from "@chakra-ui/react"
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'

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

const Pagination = () => {
    const { pathname, query } = useRouter()
    const routes = getRoutes(pathname)
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.600',
        dark: 'gray.400'
    }
    const hoverColor = {
        light: 'orange.200',
        dark: 'orange.400'
    }
    const pagination = getPagination(routes)

    function getPagination(routes) {
        let data = {}
        for (var i = 0; i < routes.length; i++) {
            const curr = routes[i]

            if (curr && curr.path.includes(query.slug)) {
                const nextRoute = routes[i + 1]
                const prevRoute = routes[i - 1]

                data = {
                    prevRoute,
                    nextRoute
                }
            }
        }
        return data
    }

    return (
        <Flex
            as="section"
            justify="space-between"
            align="center"
            w="100%"
            color={color[colorMode]}
            flexDir={["column", "column", "column", "row", "row", "row"]}
        >
            {pagination.prevRoute ?
                <Link
                    href={pagination.prevRoute.path}
                    _hover={{
                        color: hoverColor[colorMode]
                    }}
                >
                    <Flex
                        align="center"
                        _hover={{
                            color: hoverColor[colorMode]
                        }}
                    >
                        <Icon as={ChevronLeftIcon}></Icon>
                        <Text>{pagination.prevRoute.title}</Text>
                    </Flex>
                </Link>
                : <Text></Text>}
            {pagination.nextRoute ?
                <Link
                    href={pagination.nextRoute.path}
                    _hover={{
                        color: hoverColor[colorMode]
                    }}
                >
                    <Flex
                        align="center"
                        _hover={{
                            color: hoverColor[colorMode]
                        }}
                    >
                        <Text>{pagination.nextRoute.title}</Text>
                        <Icon as={ChevronRightIcon}></Icon>
                    </Flex>
                </Link>
                : <Text></Text>}
        </Flex>
    )
}

export default Pagination
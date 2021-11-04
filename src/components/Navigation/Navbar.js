import { useState, useEffect } from "react"
import {
    Box,
    useColorModeValue,
    Text,
    Heading,
    InputGroup,
    Input,
    InputRightElement,
    Icon,
    Flex,
    Button,
    IconButton,
    useDisclosure,
    MenuItem,
    Menu,
    MenuButton,
    MenuList,
    Link,
    MenuDivider,
} from "@chakra-ui/react"
import { SearchIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { FiCoffee } from 'react-icons/fi'
import NextLink from 'next/link'
import { FiUser } from 'react-icons/fi'
import { useRouter } from 'next/router'
import DarkModeSwitch from './DarkModeSwitch'
import NavBarTop from './NavbarTop'

const More = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Menu isOpen={isOpen}>
            <MenuButton
                variant="ghost"
                mx={1}
                py={[1, 2, 2]}
                px={4}
                borderRadius={5}
                _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
                aria-label="Courses"
                fontWeight="normal"
                onMouseEnter={onOpen}
                onMouseLeave={onClose}
            >
                More {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </MenuButton>
            <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
                <MenuItem><NextLink href="/tags" passHref><Link _hover={{ textDecor: 'none' }} w="100%" href="/tags">Tags</Link></NextLink></MenuItem>
                <MenuItem><NextLink href="/authors" passHref><Link _hover={{ textDecor: 'none' }} w="100%" href="/authors">Authors</Link></NextLink></MenuItem>
                <MenuDivider />
                <Flex justify="flex-end" mr={2}>
                    <DarkModeSwitch />
                </Flex>
            </MenuList>
        </Menu>
    )
}

export default function Navbar() {
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()

    // on scroll get the users scroll position
    // if the user has scrolled 100px, change boxShadow to true
    const [boxShadow, setBoxShadow] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setBoxShadow(true)
            } else {
                setBoxShadow(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <Box
            as="nav"
            w="100%"
            px="4"
            py="2"
            display="flex"
            alignItems="center"
            pos="sticky"
            top={0}
            zIndex={10}
            boxShadow={boxShadow && useColorModeValue("0px 2px 4px rgba(0, 0, 0, 0.2)", "0px 2px 4px rgba(255, 255, 255, 0.1)")}
            backdropFilter="saturate(180%) blur(20px)"
            transition="box-shadow 0.3s ease-in-out"
        >
            <NextLink href="/" mr={1} passHref>
                <Button
                    as="a"
                    variant="ghost"
                    p={[1, 2, 4]}
                    _hover={{ backgroundColor: useColorModeValue("gray.100", "gray.700") }}
                    aria-label="Statistics"
                    fontWeight="normal"
                    color="brand_one.500"
                >
                    <Icon fontSize="2xl" as={FiCoffee} mr={[0, 0, 0, 0, 0, 2]} />
                    <Heading size="lg" display={["none", "none", "none", "none", "none", "inherit"]}>coffeeclass.io</Heading>
                </Button>
            </NextLink>
            {router.pathname != "/search" ?
                <NextLink href="/search" passHref>
                    <Box flexGrow="1" mx={1} as="a" href="/search" display={["none", "none", "none", "none", "none", "inherit"]}>
                        <InputGroup>
                            <Input
                                aria-label="Search by title, summary, tags, and author"
                                placeholder="Search posts..."
                            />
                            <InputRightElement>
                                <SearchIcon />
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                </NextLink> :
                <Box flexGrow="1"></Box>
            }
            <Box flexGrow="1" display={["inherit", "inherit", "inherit", "inherit", "inherit", "none"]}></Box>
            <Box display={["none", "none", "none", "none", "inherit", "inherit"]}>
                <NextLink href="/snippets" passHref>
                    <Button
                        as="a"
                        variant="ghost"
                        mx={1}
                        p={[1, 2, 4]}
                        _hover={{ backgroundColor: useColorModeValue("gray.100", "gray.700") }}
                        aria-label="Snippets"
                        fontWeight="normal"
                        bgColor={router.pathname.includes("/snippets") && useColorModeValue("gray.100", "gray.700")}
                    >
                        Snippets
                    </Button>
                </NextLink>
                <NextLink href="/tutorials" passHref>
                    <Button
                        as="a"
                        variant="ghost"
                        mx={1}
                        p={[1, 2, 4]}
                        _hover={{ backgroundColor: useColorModeValue("gray.100", "gray.700") }}
                        aria-label="Tutorials"
                        fontWeight="normal"
                        bgColor={router.pathname.includes("/tutorials") && useColorModeValue("gray.100", "gray.700")}
                    >
                        Tutorials
                    </Button>
                </NextLink>
                <NextLink href="/guides" passHref>
                    <Button
                        as="a"
                        variant="ghost"
                        mx={1}
                        p={[1, 2, 4]}
                        _hover={{ backgroundColor: useColorModeValue("gray.100", "gray.700") }}
                        aria-label="Statistics"
                        fontWeight="normal"
                        bgColor={router.pathname.includes("/guides") && useColorModeValue("gray.100", "gray.700")}
                    >
                        Guides
                    </Button>
                </NextLink>
                <Menu isOpen={isOpen}>
                    {/* <NextLink href="/learn" passHref> */}
                    <MenuButton
                        variant="ghost"
                        onClick={() => router.push("/learn")}
                        mx={1}
                        py={[1, 2, 2]}
                        px={4}
                        borderRadius={5}
                        _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
                        aria-label="Courses"
                        fontWeight="normal"
                        bgColor={router.pathname.includes("/learn") && useColorModeValue("gray.100", "gray.700")}
                        onMouseEnter={onOpen}
                        onMouseLeave={onClose}
                    >
                        Courses {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </MenuButton>
                    {/* </NextLink> */}
                    <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
                        <MenuItem><NextLink href="/learn/chakra-ui" passHref><Link _hover={{ textDecor: 'none' }} w="100%" href="/learn/chakra-ui">Chakra UI</Link></NextLink></MenuItem>
                    </MenuList>
                </Menu>
                <More />
                <NextLink href="/accounts-waitlist" passHref>
                    <IconButton
                        borderRadius={5}
                        icon={<FiUser size="25px" />}
                        aria-label="Join Accounts Wait-List"
                        href="/accounts-waitlist"
                        as="a"
                        variant="ghost"
                        _hover={{ backgroundColor: useColorModeValue("gray.100", "gray.700") }}
                        p={[1, 2, 4]}
                        ml={1}
                    />
                </NextLink>
            </Box>
            <NavBarTop />
        </Box>
    )
}

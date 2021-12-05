import { useState, useEffect } from "react"
import {
    Box,
    useColorModeValue,
    Text,
    Heading,
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
    Tooltip,
} from "@chakra-ui/react"
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { FiCoffee, FiYoutube, FiGithub } from 'react-icons/fi'
import NextLink from 'next/link'
import { FiUser } from 'react-icons/fi'
import { useRouter } from 'next/router'
import DarkModeSwitch from './DarkModeSwitch'
import NavBarDrawer from './NavbarDrawer'
import Search from "./Search"

export default function Navbar() {
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()

    // on scroll get the users scroll position
    // if the user has scrolled 100px, change boxShadow to true
    const [boxShadow, setBoxShadow] = useState(false)
    const [height, setHeight] = useState('100px')

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setBoxShadow(true)
                setHeight('60px')
            } else {
                setBoxShadow(false)
                setHeight('100px')
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const bgColor = useColorModeValue('gray.100', 'gray.900')
    const bgColor1 = useColorModeValue('white', '#15161a')
    const boxShadow1 = useColorModeValue("0px 2px 4px rgba(0, 0, 0, 0.2)", "0px 2px 4px rgba(255, 255, 255, 0.1)")
    const bg = useColorModeValue("gray.200", "gray.700")

    return (
        <Box
            h={height}
            as="nav"
            w="100%"
            px="4"
            py="2"
            display="flex"
            alignItems="center"
            pos="sticky"
            top={0}
            zIndex={10}
            bgColor={router.pathname === '/' ? bgColor : bgColor1}
            boxShadow={boxShadow && boxShadow1}
            transition="height .5s ease-in-out"
        >
            <NextLink href="/" mr={1} passHref>
                <Button
                    as="a"
                    variant="ghost"
                    p={[1, 2, 4]}
                    _hover={{ backgroundColor: bg }}
                    aria-label="Home"
                    fontWeight="normal"
                    color="brand_one.500"
                >
                    <Icon fontSize="2xl" as={FiCoffee} mr={[0, 0, 0, 0, 0, 2]} />
                    <Heading size="lg" display={["none", "none", "none", "none", "none", "inherit"]}>coffeeclass.io</Heading>
                </Button>
            </NextLink>
            <Flex flexGrow={1}>
                <Search />
            </Flex>
            {/* <Box flexGrow="1" display={["inherit", "inherit", "inherit", "inherit", "inherit", "none"]}></Box> */}
            <Box display={["none", "none", "none", "none", "inherit", "inherit"]}>
                <NextLink href="/articles" passHref>
                    <Button
                        as="a"
                        variant="ghost"
                        mx={1}
                        p={[1, 2, 4]}
                        _hover={{ backgroundColor: bg }}
                        aria-label="Articles"
                        fontWeight="normal"
                        bgColor={router.pathname.includes("/articles") && bg}
                    >
                        Articles
                    </Button>
                </NextLink>
                <Menu isOpen={isOpen}>
                    <MenuButton
                        variant="ghost"
                        onClick={() => router.push("/courses")}
                        mx={1}
                        py={[1, 2, 2]}
                        px={4}
                        borderRadius={5}
                        _hover={{ bg: bg }}
                        aria-label="Courses"
                        fontWeight="normal"
                        bgColor={router.pathname.includes("/courses") && bg}
                        onMouseEnter={onOpen}
                        onMouseLeave={onClose}
                    >
                        Courses {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </MenuButton>
                    <MenuList onMouseEnter={onOpen} onMouseLeave={onClose} mt="-8px">
                        <MenuItem><NextLink href="/courses/chakra-ui" passHref><Link _hover={{ textDecor: 'none' }} w="100%" href="/courses/chakra-ui">Chakra UI</Link></NextLink></MenuItem>
                    </MenuList>
                </Menu>
                <Tooltip label="Subscribe to our YouTube channel!" placement="bottom">
                    <Link href="https://youtube.com/benjamincarlson" isExternal>
                        <IconButton
                            isExternal
                            target="_blank"
                            borderRadius={5}
                            icon={<FiYoutube />}
                            fontSize='20px'
                            aria-label="YouTube"
                            href="https://youtube.com/benjamincarlson"
                            bgColor="transparent"
                            _hover={{ backgroundColor: "transparent", opacity: 0.8 }}
                            p={[1, 2, 4]}
                            ml={1}
                            w={65}
                        />
                    </Link>
                </Tooltip>
                <Tooltip label="View the code!" placement="bottom">
                    <Link href="https://github.com/carlson-technologies/coffeeclass.io" isExternal>
                        <IconButton
                            isExternal
                            target="_blank"
                            borderRadius={5}
                            icon={<FiGithub />}
                            fontSize='20px'
                            aria-label="YouTube"
                            href="https://github.com/carlson-technologies/coffeeclass.io"
                            bgColor="transparent"
                            _hover={{ backgroundColor: "transparent", opacity: 0.8 }}
                            p={[1, 2, 4]}
                            ml={1}
                            w={65}
                        />
                    </Link>
                </Tooltip>
                <NextLink href="/accounts-waitlist" passHref>
                    <IconButton
                        w={65}
                        borderRadius={5}
                        icon={<FiUser />}
                        fontSize='20px'
                        aria-label="Join Accounts Wait-List"
                        href="/accounts-waitlist"
                        variant="ghost"
                        _hover={{ backgroundColor: bg }}
                        p={[1, 2, 4]}
                        ml={1}
                        backgroundColor={router.pathname.includes("/accounts-waitlist") && bg}
                    />
                </NextLink>
                <DarkModeSwitch />
            </Box>
            <NavBarDrawer />
        </Box>
    )
}

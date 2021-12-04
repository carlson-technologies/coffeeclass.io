import { useEffect, useState } from "react"
import {
    Flex,
    Box,
    IconButton,
    useColorMode,
    Button,
    Heading,
    Drawer,
    useDisclosure,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Link,
    ButtonGroup,
    InputGroup,
    Input,
    InputRightElement,
    Text,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, ChevronRightIcon } from '@chakra-ui/icons'
import DarkModeSwitch from './DarkModeSwitch'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { getMessage } from '../../scripts/time'
import { SearchIcon } from '@chakra-ui/icons'

const NavBarTop = ({ pos, noScroll, placement }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()
    const { colorMode } = useColorMode()
    const bgColor = {
        light: 'gray.100',
        dark: 'gray.700'
    }
    const hoverColor = {
        light: 'gray.400',
        dark: 'gray.500'
    }
    const boxShadowColor = {
        light: '0 4px 12px 0 rgba(0, 0, 0, 0.3)',
        dark: '0 4px 12px 0 rgba(0, 0, 0, 0.9)'
    }
    const secondaryColor = {
        light: 'gray.500',
        dark: 'gray.600'
    }
    const focusColor = {
        light: 'brand_one.600',
        dark: 'brand_one.500'
    }
    const [scrolled, setScrolled] = useState(false)
    const scrollValue = 10

    const [opacity, setOpacity] = useState(0)

    const handleState = () => {
        var scrollTop = 0
        scrollTop = scrollY
        if (scrollTop > scrollValue) {
            setScrolled(true)
        } else if (scrollTop < scrollValue) {
            setScrolled(false)
        }
    }
    const handleScroll = () => {
        var scrollTop = 0
        scrollTop = scrollY
        if (scrollTop > scrollValue) {
            setScrolled(true)
        } else if (scrollTop < scrollValue) {
            setScrolled(false)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('load', handleState)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('load', handleState)
        }
    })
    return (
        <>
            <Box
                // display={pos == 'fixed' ? ['block', 'block', 'block', 'block', 'none', 'none'] : ['none', 'none', 'none', 'none', 'block', 'block']}
                display={["inherit", "inherit", "inherit", "inherit", "none", "none"]}
                as="nav"
                aria-label="Nav 1"
            >
                <IconButton
                    bgColor="transparent"
                    aria-label="Open Menu"
                    size="lg"
                    _hover={{
                        textDecoration: 'none',
                        color: hoverColor[colorMode]
                    }}
                    icon={
                        <HamburgerIcon />
                    }
                    onClick={onOpen}
                    borderRadius={5}
                />
            </Box>

            <Drawer onClose={onClose} isOpen={isOpen} size="sm" placement={placement ? placement : 'right'}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        <Flex justify="space-between">
                            <Heading as="h4" size="lg">{getMessage()}</Heading>
                            <IconButton
                                size="md"
                                onClick={onClose}
                                icon={<CloseIcon fontSize="xs" />}
                                borderRadius={5}
                            />
                        </Flex>
                    </DrawerHeader>
                    <DrawerBody>
                        {/* <ButtonGroup spacing="4" justifyContent="space-around" w="100%" size="sm">
                            <NextLink href="/learn" passHref>
                                <Button colorScheme="brand_one" minW={[null, null, 110, 110, 110, 110]} href="/learn">Learn</Button>
                            </NextLink>
                            <NextLink href="/snippets" passHref>
                                <Button colorScheme="brand_one" minW={[null, null, 110, 110, 110, 110]} href="/snippets">Snippets</Button>
                            </NextLink>
                            <NextLink href="/tutorials" passHref>
                                <Button colorScheme="brand_one" minW={[null, null, 110, 110, 110, 110]} href="/tutorials">Tutorials</Button>
                            </NextLink>
                        </ButtonGroup> */}
                        <Heading
                            as="h3"
                            textTransform="uppercase"
                            marginBottom={2}
                            marginTop={8}
                            color={useColorModeValue('gray.600', 'gray.400')}
                            fontSize="sm"
                            fontWeight="semibold"
                            letterSpacing="wider"
                            textAlign="left"
                        >Content
                        </Heading>
                        <Flex flexDir="column" fontSize="lg">
                            <Text>
                                <NextLink href="/" passHref>
                                    <Link
                                        href="/"
                                        _hover={{ textDecor: 'none' }}
                                        aria-label="Home"
                                        color="gray.500"
                                        transition="margin .3s ease-in-out"
                                        _hover={{ ml: "4" }}
                                    >
                                        Home
                                    </Link>
                                </NextLink>
                            </Text>

                            <Text>
                                <NextLink href="/articles" passHref>
                                    <Link
                                        href="/articles"
                                        _hover={{ textDecor: 'none' }}
                                        aria-label="Articles"
                                        color="gray.500"
                                        transition="margin .3s ease-in-out"
                                        _hover={{ ml: "2" }}
                                    >
                                        Articles
                                    </Link>
                                </NextLink>
                            </Text>

                            <Text>
                                <NextLink href="/courses" passHref>
                                    <Link
                                        href="/courses"
                                        _hover={{ textDecor: 'none' }}
                                        aria-label="Courses"
                                        color="gray.500"
                                        transition="margin .3s ease-in-out"
                                        _hover={{ ml: "2" }}
                                    >
                                        Courses
                                    </Link>
                                </NextLink>
                            </Text>

                            <Text>
                                <NextLink href="/tags" passHref>
                                    <Link
                                        href="/tags"
                                        _hover={{ textDecor: 'none' }}
                                        aria-label="Tags"
                                        color="gray.500"
                                        transition="margin .3s ease-in-out"
                                        _hover={{ ml: "2" }}
                                    >
                                        Tags
                                    </Link>
                                </NextLink>
                            </Text>

                            <Text>
                                <NextLink href="/authors" passHref>
                                    <Link
                                        href="/authors"
                                        _hover={{ textDecor: 'none' }}
                                        aria-label="Authors"
                                        color="gray.500"
                                        transition="margin .3s ease-in-out"
                                        _hover={{ ml: "2" }}
                                    >
                                        Authors
                                    </Link>
                                </NextLink>
                            </Text>
                        </Flex>

                        <Heading
                            as="h3"
                            textTransform="uppercase"
                            marginBottom={2}
                            marginTop={8}
                            color={useColorModeValue('gray.600', 'gray.400')}
                            fontSize="sm"
                            fontWeight="semibold"
                            letterSpacing="wider"
                            textAlign="left"
                        >
                            Write For Us!
                        </Heading>
                        <Flex flexDir="column" fontSize="lg">
                            <Text>
                                <NextLink href="/contribute/getting-started" passHref>
                                    <Link
                                        href="/contribute/getting-started"
                                        _hover={{ textDecor: 'none' }}
                                        aria-label="Getting Started"
                                        color="gray.500"
                                        transition="margin .3s ease-in-out"
                                        _hover={{ ml: "2" }}
                                    >
                                        Getting Started
                                    </Link>
                                </NextLink>
                            </Text>
                        </Flex>

                        <Heading
                            as="h3"
                            textTransform="uppercase"
                            marginBottom={2}
                            marginTop={8}
                            color={useColorModeValue('gray.600', 'gray.400')}
                            fontSize="sm"
                            fontWeight="semibold"
                            letterSpacing="wider"
                            textAlign="left"
                        >
                            Company
                        </Heading>
                        <Flex flexDir="column" fontSize="lg">
                            <Text>
                                <NextLink href="/about" passHref>
                                    <Link
                                        href="/about"
                                        _hover={{ textDecor: 'none' }}
                                        aria-label="About"
                                        color="gray.500"
                                        transition="margin .3s ease-in-out"
                                        _hover={{ ml: "2" }}
                                    >
                                        About
                                    </Link>
                                </NextLink>
                            </Text>

                            <Text>
                                <NextLink href="/legal/terms" passHref>
                                    <Link
                                        href="/legal/terms"
                                        _hover={{ textDecor: 'none' }}
                                        aria-label="Terms And Conditions"
                                        color="gray.500"
                                        transition="margin .3s ease-in-out"
                                        _hover={{ ml: "2" }}
                                    >
                                        Terms And Conditions
                                    </Link>
                                </NextLink>
                            </Text>

                            <Text>
                                <NextLink href="/legal/privacy" passHref>
                                    <Link
                                        href="/legal/privacy"
                                        _hover={{ textDecor: 'none' }}
                                        aria-label="Privacy Policy"
                                        color="gray.500"
                                        transition="margin .3s ease-in-out"
                                        _hover={{ ml: "2" }}
                                    >
                                        Privacy Policy
                                    </Link>
                                </NextLink>
                            </Text>

                            <Text>
                                <NextLink href="/legal/disclaimer" passHref>
                                    <Link
                                        href="/legal/disclaimer"
                                        _hover={{ textDecor: 'none' }}
                                        aria-label="Disclaimer"
                                        color="gray.500"
                                        transition="margin .3s ease-in-out"
                                        _hover={{ ml: "2" }}
                                    >
                                        Disclaimer
                                    </Link>
                                </NextLink>
                            </Text>
                        </Flex>

                        <Heading
                            as="h3"
                            textTransform="uppercase"
                            marginBottom={2}
                            marginTop={8}
                            color={useColorModeValue('gray.600', 'gray.400')}
                            fontSize="sm"
                            fontWeight="semibold"
                            letterSpacing="wider"
                            textAlign="left"
                        >
                            Open Source
                        </Heading>
                        <Flex flexDir="column" fontSize="lg">
                            <Text>
                                <Link
                                    isExternal
                                    href="https://github.com/carlson-technologies/coffeeclass.io"
                                    _hover={{ textDecor: 'none' }}
                                    aria-label="Code"
                                    color="gray.500"
                                    transition="margin .3s ease-in-out"
                                    _hover={{ ml: "2" }}
                                >
                                    Code
                                </Link>
                            </Text>

                            <Text>
                                <Link
                                    isExternal
                                    href="https://benjamincarlson.notion.site/609b8bb171844146a9bcd9fbabd171a8?v=341de17fff6149bea36dbafbe2f2cf88"
                                    _hover={{ textDecor: 'none' }}
                                    aria-label="Roadmap"
                                    color="gray.500"
                                    transition="margin .3s ease-in-out"
                                    _hover={{ ml: "2" }}
                                >
                                    Roadmap
                                </Link>
                            </Text>

                            <Text>
                                <Link
                                    isExternal
                                    href="https://engineering.coffeeclass.io"
                                    _hover={{ textDecor: 'none' }}
                                    aria-label="Developer Blog"
                                    color="gray.500"
                                    transition="margin .3s ease-in-out"
                                    _hover={{ ml: "2" }}
                                >
                                    Engineering Blog
                                </Link>
                            </Text>
                        </Flex>
                    </DrawerBody>
                    <DrawerFooter>
                        <DarkModeSwitch />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default NavBarTop
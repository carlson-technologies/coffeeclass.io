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
    Link,
    ButtonGroup,
    InputGroup,
    Input,
    InputRightElement,
    useColorModeValue,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, Search2Icon } from '@chakra-ui/icons'
import DarkModeSwitch from './DarkModeSwitch'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { getMessage } from '../../scripts/time'
import { SearchIcon } from '@chakra-ui/icons'

const NavBarTop = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()
    const { colorMode } = useColorMode()
    const bgColor = {
        light: 'gray.100',
        dark: 'gray.700'
    }
    const hoverColor = {
        light: 'gray.300',
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
                pos="fixed"
                right={0}
                top={0}
                mt={3}
                mr={3}
                boxShadow={scrolled ? boxShadowColor[colorMode] : null}
                as="nav"
                aria-label="Nav 1"
                zIndex="10"
                transition="box-shadow .5s ease-in-out"
            >
                <DarkModeSwitch color={scrolled ? bgColor[colorMode] : 'transparent'} />
                <IconButton
                    transition="background-color .5s ease-in-out"
                    bgColor={scrolled ? bgColor[colorMode] : 'transparent'}
                    aria-label="Open Menu"
                    size="lg"
                    _hover={{
                        textDecoration: 'none',
                        color: hoverColor[colorMode]
                    }}
                    icon={
                        <Search2Icon />
                    }
                    onClick={() => router.push('/search')}
                />
                <IconButton
                    transition="background-color .5s ease-in-out"
                    bgColor={scrolled ? bgColor[colorMode] : 'transparent'}
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
                />
            </Box>

            <Drawer onClose={onClose} isOpen={isOpen} size="sm">
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
                        <ButtonGroup spacing="4" justifyContent="space-around" w="100%" size="sm">
                            <NextLink href="/learn" passHref>
                                <Button colorScheme="brand_one" minW={[null, null, 110, 110, 110, 110]} href="/learn">Learn</Button>
                            </NextLink>
                            <NextLink href="/snippets" passHref>
                                <Button colorScheme="brand_one" minW={[null, null, 110, 110, 110, 110]} href="/snippets">Snippets</Button>
                            </NextLink>
                            <NextLink href="/tutorials" passHref>
                                <Button colorScheme="brand_one" minW={[null, null, 110, 110, 110, 110]} href="/tutorials">Tutorials</Button>
                            </NextLink>
                        </ButtonGroup>
                        {router.pathname != '/search' &&
                            <InputGroup my={4}>
                                <Input
                                    focusBorderColor={focusColor[colorMode]}
                                    aria-label="Search by title and summary"
                                    placeholder={`Search all posts!`}
                                    onClick={() => router.push('/search')}
                                />
                                <InputRightElement>
                                    <SearchIcon color={secondaryColor[colorMode]} />
                                </InputRightElement>
                            </InputGroup>
                        }
                        <Heading as="h4" size="sm" textTransform="uppercase" mt={4}>Content</Heading>
                        <Flex flexDir="column" fontSize="lg">
                            <NextLink href="/" passHref>
                                <Link
                                    href="/"
                                    _hover={{ textDecor: 'none' }}
                                    aria-label="Home"
                                    color="gray.500"
                                    transition="margin .3s ease-in-out"
                                    _hover={{ ml: "2" }}
                                >
                                    Home
                                </Link>
                            </NextLink>

                            <NextLink href="/snippets" passHref>
                                <Link
                                    href="/snippets"
                                    _hover={{ textDecor: 'none' }}
                                    aria-label="Snippets"
                                    color="gray.500"
                                    transition="margin .3s ease-in-out"
                                    _hover={{ ml: "2" }}
                                >
                                    Snippets
                                </Link>
                            </NextLink>

                            <NextLink href="/learn" passHref>
                                <Link
                                    href="/learn"
                                    _hover={{ textDecor: 'none' }}
                                    aria-label="Learn"
                                    color="gray.500"
                                    transition="margin .3s ease-in-out"
                                    _hover={{ ml: "2" }}
                                >
                                    Learn
                                </Link>
                            </NextLink>

                            <NextLink href="/tutorials" passHref>
                                <Link
                                    href="/tutorials"
                                    _hover={{ textDecor: 'none' }}
                                    aria-label="Tutorials"
                                    color="gray.500"
                                    transition="margin .3s ease-in-out"
                                    _hover={{ ml: "2" }}
                                >
                                    Tutorials
                                </Link>
                            </NextLink>

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
                        </Flex>

                        <Heading as="h4" size="sm" textTransform="uppercase" mt={4}>Company</Heading>
                        <Flex flexDir="column" fontSize="lg">
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
                        </Flex>
                        <Heading as="h4" size="sm" textTransform="uppercase" mt={4}>Open Source</Heading>
                        <Flex flexDir="column" fontSize="lg">
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
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default NavBarTop
import React, { useState } from 'react'
import {
    Flex,
    Box,
    IconButton,
    Button,
    useColorMode,
    Tooltip,
    Icon,
    useDisclosure,
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { FiInfo, FiEdit2, FiScissors, FiBookOpen, FiHome, FiBookmark, FiSearch } from "react-icons/fi"
import { useRouter } from 'next/router'

const NavBarLeft = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [display, changeDisplay] = useState('none')
    const { colorMode } = useColorMode()
    const bgColor = {
        light: 'gray.100',
        dark: 'gray.700'
    }
    const boxShadowColor = {
        light: '0 4px 12px 0 rgba(0, 0, 0, 0.3)',
        dark: '0 4px 12px 0 rgba(0, 0, 0, 1)'
    }
    const activeNavColor = {
        light: 'black',
        dark: 'white'
    }
    const color = {
        light: 'black',
        dark: 'white'
    }
    const homeColor = {
        light: 'black',
        dark: 'white'
        // light: 'brand_one.500',
        // dark: 'brand_one.400'
    }
    const router = useRouter()
    const slug = router.asPath
    return (
        <Box
            w={55}
            h="100vh"
            bgColor={bgColor[colorMode]}
            pos="fixed"
            left={0}
            top={0}
            as="nav"
            overflow="auto"
            aria-label="Nav 2"
            boxShadow={boxShadowColor[colorMode]}
            display={['none', 'none', 'none', 'none', 'flex', 'flex']}
        >
            <Flex
                flexDir="column"
                align="center"
                w="100%"
            >
                <NextLink href="/" passHref>
                    <Tooltip
                        hasArrow
                        label="coffeeclass.io Home"
                        placement="right"
                        closeDelay={100}
                    >
                        <Box borderRight={`2px solid ${slug == '/' ? activeNavColor[colorMode] : null}`} w="100%">
                            <Button
                                variant="ghost"
                                aria-label="Home"
                                my={5}
                                w="100%"
                                _hover={{ background: 'none' }}
                            >
                                <Flex
                                    flexDir="column"
                                    align="center"
                                >
                                    <Icon as={FiHome} fontSize="2xl" color={homeColor[colorMode]} />
                                    {/* <Text fontSize="xs" mt={2} color={homeColor[colorMode]}>coffeeclass.io</Text> */}
                                </Flex>
                            </Button>
                        </Box>
                    </Tooltip>
                </NextLink>

                <NextLink href="/learn" passHref>
                    <Tooltip
                        hasArrow
                        label="coffeeclass.io Learn"
                        placement="right"
                        closeDelay={100}
                    >
                        <Box borderRight={`2px solid ${slug.includes('learn') ? activeNavColor[colorMode] : null}`} w="100%">
                            <Button
                                variant="ghost"
                                aria-label="Learn"
                                my={5}
                                w="100%"
                                _hover={{ background: 'none' }}
                                justifyContent="start"
                            >
                                <Icon as={FiEdit2} fontSize="2xl" mr={2} color={slug.includes('learn') ? activeNavColor[colorMode] : null} />
                                {/* <Text fontSize="sm">Learn</Text> */}
                            </Button>
                        </Box>
                    </Tooltip>
                </NextLink>

                <NextLink href="/snippets" passHref>
                    <Tooltip
                        hasArrow
                        label="coffeeclass.io Snippets"
                        placement="right"
                        closeDelay={100}
                    >
                        <Box borderRight={`2px solid ${slug.includes('snippets') ? activeNavColor[colorMode] : null}`} w="100%">
                            <Button
                                variant="ghost"
                                aria-label="Snippets"
                                my={5}
                                w="100%"
                                _hover={{ background: 'none' }}
                                justifyContent="start"
                            >
                                <Icon as={FiScissors} fontSize="2xl" mr={2} color={color[colorMode]} />
                                {/* <Text fontSize="sm">Snippets</Text> */}
                            </Button>
                        </Box>
                    </Tooltip>
                </NextLink>

                <NextLink href="/tutorials" passHref>
                    <Tooltip
                        hasArrow
                        label="coffeeclass.io Tutorials"
                        placement="right"
                        closeDelay={100}
                    >
                        <Box borderRight={`2px solid ${slug.includes('tutorials') ? activeNavColor[colorMode] : null}`} w="100%">
                            <Button
                                variant="ghost"
                                aria-label="Tutorials"
                                my={5}
                                w="100%"
                                _hover={{ background: 'none' }}
                                justifyContent="start"
                            >
                                <Icon as={FiBookOpen} fontSize="2xl" mr={2} color={color[colorMode]} />
                                {/* <Text fontSize="sm">Tutorials</Text> */}
                            </Button>
                        </Box>
                    </Tooltip>
                </NextLink>

                {display == 'none' &&
                    <IconButton
                        onClick={() => changeDisplay('flex')}
                        icon={<ChevronDownIcon />}
                        aria-label="Show More"
                        background="none"
                        _hover={{ background: 'none' }}
                    />
                }

                <Flex
                    display={display}
                    flexDir="column"
                    align="center"
                    w="100%"
                >
                    <NextLink href="/tags" passHref>
                        <Tooltip
                            hasArrow
                            label="Tags"
                            placement="right"
                            closeDelay={100}
                        >
                            <Box borderRight={`2px solid ${slug.includes('tags') ? activeNavColor[colorMode] : null}`} w="100%">
                                <Button
                                    variant="ghost"
                                    aria-label="Tags"
                                    my={5}
                                    w="100%"
                                    _hover={{ background: 'none' }}
                                    justifyContent="start"
                                >
                                    <Icon as={FiBookmark} fontSize="2xl" mr={2} color={color[colorMode]} />
                                    {/* <Text fontSize="sm">Tags</Text> */}
                                </Button>
                            </Box>
                        </Tooltip>
                    </NextLink>

                    <NextLink href="/about" passHref>
                        <Tooltip
                            hasArrow
                            label="About"
                            placement="right"
                            closeDelay={100}
                        >
                            <Box borderRight={`2px solid ${slug.includes('about') ? activeNavColor[colorMode] : null}`} w="100%">
                                <Button
                                    variant="ghost"
                                    aria-label="About"
                                    my={5}
                                    w="100%"
                                    _hover={{ background: 'none' }}
                                    justifyContent="start"
                                >
                                    <Icon as={FiInfo} fontSize="2xl" mr={2} color={color[colorMode]} />
                                    {/* <Text fontSize="sm">About</Text> */}
                                </Button>
                            </Box>
                        </Tooltip>
                    </NextLink>

                    <NextLink href="/search" passHref>
                        <Tooltip
                            hasArrow
                            label="Search"
                            placement="right"
                            closeDelay={100}
                        >
                            <Box borderRight={`2px solid ${slug.includes('search') ? activeNavColor[colorMode] : null}`} w="100%">
                                <Button
                                    variant="ghost"
                                    aria-label="Search"
                                    my={5}
                                    w="100%"
                                    _hover={{ background: 'none' }}
                                    justifyContent="start"
                                >
                                    <Icon as={FiSearch} fontSize="2xl" mr={2} color={color[colorMode]} />
                                    {/* <Text fontSize="sm">Search</Text> */}
                                </Button>
                            </Box>
                        </Tooltip>
                    </NextLink>

                    <IconButton
                        onClick={() => changeDisplay('none')}
                        icon={<ChevronUpIcon />}
                        aria-label="Show Less"
                        background="none"
                        _hover={{ background: 'none' }}
                    />
                </Flex>
            </Flex>
        </Box >
    )
}

export default NavBarLeft
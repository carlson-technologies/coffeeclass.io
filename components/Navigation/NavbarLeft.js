import React, { useState } from 'react'
import {
    Flex,
    Box,
    IconButton,
    Text,
    Button,
    useColorMode
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

const NavBarLeft = () => {
    const [display, changeDisplay] = useState('none')
    const { colorMode } = useColorMode()
    const bgColor = {
        light: 'gray.100',
        dark: 'gray.700'
    }
    return (
        <Box
            w={100}
            h="100vh"
            bgColor={bgColor[colorMode]}
            pos="fixed"
            left={0}
            top={0}
            as="nav"
            boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.5)'
        >
            <Flex
                flexDir="column"
                align="center"
            >
                <NextLink href="/" passHref>
                    <Button
                        as="a"
                        variant="ghost"
                        aria-label="Home"
                        my={5}
                        w="100%"
                    >
                        Home
                    </Button>
                </NextLink>

                <NextLink href="/snippets" passHref>
                    <Button
                        as="a"
                        variant="ghost"
                        aria-label="Snippets"
                        my={5}
                        w="100%"
                    >
                        Snippets
                    </Button>
                </NextLink>

                <NextLink href="/learn" passHref>
                    <Button
                        as="a"
                        variant="ghost"
                        aria-label="Learn"
                        my={5}
                        w="100%"
                    >
                        Learn
                    </Button>
                </NextLink>

                <NextLink href="/tutorials" passHref>
                    <Button
                        as="a"
                        variant="ghost"
                        aria-label="Tutorials"
                        my={5}
                        w="100%"
                    >
                        Tutorials
                    </Button>
                </NextLink>

                {display == 'none' &&
                    <IconButton
                        onClick={() => changeDisplay('flex')}
                        icon={<ChevronDownIcon />}
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
                    <NextLink href="/about" passHref>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="About"
                            my={5}
                            w="100%"
                        >
                            About
                        </Button>
                    </NextLink>

                    <IconButton
                        onClick={() => changeDisplay('none')}
                        icon={<ChevronUpIcon />}
                        background="none"
                        _hover={{ background: 'none' }}
                    />
                </Flex>
            </Flex>
        </Box >
    )
}

export default NavBarLeft
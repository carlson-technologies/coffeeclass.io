import React, { useState } from 'react'
import {
    Flex,
    Box,
    IconButton,
    Text,
    Button
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

const NavBarLeft = () => {
    const [display, changeDisplay] = useState('none')
    return (
        <Box
            w={100}
            h="100vh"
            bgColor="gray.100"
            pos="fixed"
            left={0}
            top={0}
            as="nav"
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
                    >
                        Tutorials
                    </Button>
                </NextLink>

                {display == 'none' &&
                    <IconButton
                        onClick={() => changeDisplay('flex')}
                        icon={<ChevronDownIcon />}
                    />
                }

                <Flex
                    display={display}
                    flexDir="column"
                    align="center"
                >
                    <NextLink href="/about" passHref>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="About"
                            my={5}
                        >
                            About
                    </Button>
                    </NextLink>

                    <IconButton
                        onClick={() => changeDisplay('none')}
                        icon={<ChevronUpIcon />}
                    />
                </Flex>
            </Flex>
        </Box >
    )
}

export default NavBarLeft
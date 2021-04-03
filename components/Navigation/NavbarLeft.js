import {
    Flex,
    Box,
    IconButton,
    Text,
    Button
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

const NavBarLeft = () => {
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
                justify="space-around"
                h="400px"
                align="center"
            >
                <NextLink href="/snippets" passHref>
                    <Button
                        as="a"
                        variant="ghost"
                        aria-label="Snippets"
                    >
                        Snippets
                    </Button>
                </NextLink>

                <NextLink href="/learn" passHref>
                    <Button
                        as="a"
                        variant="ghost"
                        aria-label="Snippets"
                    >
                        Learn
                    </Button>
                </NextLink>

                <NextLink href="/tutorials" passHref>
                    <Button
                        as="a"
                        variant="ghost"
                        aria-label="Snippets"
                    >
                        Tutorials
                    </Button>
                </NextLink>

                <IconButton icon={<ChevronDownIcon />} />
            </Flex>
        </Box>
    )
}

export default NavBarLeft
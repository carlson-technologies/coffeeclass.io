import {
    Flex,
    Box,
    IconButton
} from '@chakra-ui/react'
import { HamburgerIcon, MoonIcon } from '@chakra-ui/icons'

const NavBarTop = () => {
    return (
        <Box
            bgColor="gray.100"
            pos="fixed"
            right={0}
            top={0}
            borderRadius={5}
            mt={3}
            mr={3}
        >
            <IconButton
                size="lg"
                _hover={{
                    textDecoration: 'none',
                    color: 'white'
                }}
                icon={
                    <MoonIcon />
                }
            />
            <IconButton
                size="lg"
                _hover={{
                    textDecoration: 'none',
                    color: 'white'
                }}
                icon={
                    <HamburgerIcon />
                }
            />
        </Box>
    )
}

export default NavBarTop
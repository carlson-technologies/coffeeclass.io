import {
    Flex,
    Box,
    IconButton
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import DarkModeSwitch from './DarkModeSwitch'

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
            boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.3)'
        >
            <DarkModeSwitch />
            <IconButton
                aria-label="Open Menu"
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
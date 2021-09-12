import { useColorMode, IconButton, } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const DarkModeSwitch = ({ color }) => {
    const { colorMode, toggleColorMode } = useColorMode()
    const iconColor = {
        light: 'black',
        dark: 'white'
    }
    const bgColor = {
        light: 'gray.100',
        dark: 'gray.700'
    }
    const hoverColor = {
        light: 'gray.300',
        dark: 'gray.500'
    }
    return (
        <IconButton
            transition="background-color .5s ease-in-out"
            bgColor={color}
            size="lg"
            _hover={{
                textDecoration: 'none',
                color: hoverColor[colorMode]
            }}
            aria-label="Toggle dark mode"
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            color={iconColor[colorMode]}
            borderRadius={5}
        />
    )
}

export default DarkModeSwitch
import { useColorMode, IconButton, useColorModeValue, } from '@chakra-ui/react'
import { FiSun, FiMoon } from "react-icons/fi"

const DarkModeSwitch = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <IconButton
            size="md"
            aria-label="Toggle dark mode"
            icon={colorMode === 'dark' ? <FiSun /> : <FiMoon />}
            fontSize='20px'
            onClick={toggleColorMode}
            borderRadius={5}
            variant="ghost"
            _hover={{ backgroundColor: useColorModeValue("gray.200", "gray.700") }}
            w={65}
        />
    )
}

export default DarkModeSwitch
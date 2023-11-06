import { useColorMode, IconButton } from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import { FiSun, FiMoon } from 'react-icons/fi'

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { theme, setTheme } = useTheme()

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    toggleColorMode()
  }

  return (
    <>
      {colorMode === 'dark' ? (
        <FiSun
          className="hover:opacity-80 text-lg cursor-pointer"
          onClick={handleThemeChange}
        />
      ) : (
        <FiMoon
          className="hover:opacity-80 text-lg cursor-pointer"
          onClick={handleThemeChange}
        />
      )}
    </>
  )
}

export default DarkModeSwitch

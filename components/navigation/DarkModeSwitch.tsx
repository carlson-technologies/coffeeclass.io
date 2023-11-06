import { useColorMode, IconButton } from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import React from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

const DarkModeSwitch = () => {
  const { colorMode, setColorMode } = useColorMode()
  const { theme, setTheme } = useTheme()

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    setColorMode(theme === 'light' ? 'dark' : 'light')
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

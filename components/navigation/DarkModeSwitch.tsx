import { useColorMode, IconButton } from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import { FiSun, FiMoon } from 'react-icons/fi'

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { theme, setTheme } = useTheme()

  return (
    <>
      {colorMode === 'dark' ? (
        <FiSun
          className="hover:opacity-80 text-lg cursor-pointer"
          onClick={() => {
            toggleColorMode()
            setTheme(theme === 'light' ? 'dark' : 'light')
          }}
        />
      ) : (
        <FiMoon
          className="hover:opacity-80 text-lg cursor-pointer"
          onClick={() => {
            toggleColorMode()
            setTheme(theme === 'light' ? 'dark' : 'light')
          }}
        />
      )}
    </>
    // <IconButton
    //   size="md"
    //   aria-label={`Toggle ${colorMode === 'dark' ? 'light' : 'dark'} mode`}
    //   icon={colorMode === 'dark' ? <FiSun /> : <FiMoon />}
    //   fontSize="20px"
    //   onClick={() => {
    //     toggleColorMode()
    //     setTheme(theme === 'light' ? 'dark' : 'light')
    //   }}
    //   borderRadius={5}
    //   variant="ghost"
    //   transition="transform 1s"
    //   w={50}
    //   data-splitbee-event="Button Click"
    //   data-splitbee-event-type="Dark Mode Toggle"
    // />
  )
}

export default DarkModeSwitch

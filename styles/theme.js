import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"
import { theme as chakraTheme } from '@chakra-ui/react'

const fonts = {
    ...chakraTheme.fonts,
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
    heading: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
}

const breakpoints = createBreakpoints({
    sm: "30em",
    md: "64em",
    lg: "72em"
})

const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
}

const overrides = {
    fonts,
    breakpoints,
    config
}

const customTheme = extendTheme(overrides)

export default customTheme
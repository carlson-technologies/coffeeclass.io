import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

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
    breakpoints,
    config
}

const customTheme = extendTheme(overrides)

export default customTheme
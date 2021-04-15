import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const fonts = {
    body: `Inter,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
    heading: `Inter,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
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

const colors = {
    brand: {
        50: "#55a1e6",
        100: "#41729F",
        200: '#41729F',
        300: "#375a7a",
        500: "#41729F",
        800: "white"
    }
}

const overrides = {
    fonts,
    breakpoints,
    config,
    colors
}

const customTheme = extendTheme(overrides)

export default customTheme
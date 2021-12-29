import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { device } from "./constants/devices";

const fonts = {
  body: `Inter,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  heading: `Inter,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
};

const breakpoints = createBreakpoints({
  sm: device.mobileS,
  md: device.mobileM,
  lg: device.mobileL,
  xl: device.tablet,
  "2xl": device.laptop,
  "3xl": device.laptopL,
});

const config = {
  // initialColorMode: "light",
  useSystemColorMode: true,
  cssVarPrefix: "coffeeclass-io",
};

const colors = {
  brand_one: {
    50: "#EAD9CD",
    100: "#E3CDBC",
    200: "#DCC0AC",
    300: "#D5B39B",
    400: "#CEA78B",
    500: "#C89B7B", // main
    600: "#BB855E",
    700: "#AA7047",
    800: "#8E5E3B",
    900: "#714B2F",
  },
  brand_two: {
    50: "#F9EBD7",
    100: "#F7E4CA",
    200: "#F5DDBC",
    300: "#F3D7AF",
    400: "#F1D0A2",
    500: "#EFC995", // main
    600: "#E9B46A",
    700: "#E29F40",
    800: "#D3881F",
    900: "#A96D19",
  },
  brand_three: {
    50: "#CDD7EA",
    100: "#BCC9E3",
    200: "#ACBCDC",
    300: "#9BAFD5",
    400: "#8BA1CE",
    500: "#7B95C8", // main
    600: "#5E7DBB",
    700: "#4768AA",
    800: "#3B578E",
    900: "#2F4571",
  },
  brand_four: {
    50: "#C9EFD4",
    100: "#BEECCC",
    200: "#B3E8C3",
    300: "#A9E5BB",
    400: "#82DA9D",
    500: "#5CCE7E", // main
    600: "#39BF61",
    700: "#2E994E",
    800: "#22733A",
    900: "#174D27",
  },
  brand_five: {
    50: "#DEDEEB",
    100: "#D4D3E4",
    200: "#C9C8DD",
    300: "#BEBDD6",
    400: "#B3B2D0",
    500: "#A8A6C9", // main
    600: "#8C8AB7",
    700: "#706EA6",
    800: "#5A578E",
    900: "#484672",
  },
  custom_yellow: {
    50: "#FFF29F",
    100: "#FFEE80",
    200: "#FFEA60",
    300: "#FFE540",
    400: "#FFE120",
    500: "#FFDD00", // main
    600: "#DFC100",
    700: "#BFA600",
    800: "#9F8A00",
    900: "#806E00",
  },
  brown: {
    50: "",
    100: "",
    200: "",
    300: "",
    400: "",
    500: "#bb8b62", // main
    600: "",
    700: "",
    800: "",
    900: "",
  },
};

const overrides = {
  fonts,
  breakpoints,
  config,
  colors,
};

const customTheme = extendTheme(overrides);

export default customTheme;

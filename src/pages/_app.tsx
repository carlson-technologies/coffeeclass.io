import React, { ReactChild } from "react";
import { MDXProvider } from "@mdx-js/react";
import MDXComponents from "../components/MDXComponents";
import { useColorMode, ChakraProvider } from "@chakra-ui/react";
import { prismLightTheme, prismDarkTheme } from "../styles/prism";
import { Global, css } from "@emotion/react";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import customTheme from "../styles/theme";
import { lightAvatarTheme, darkAvatarTheme } from "../styles/avatar";
import { AppProps } from "next/app";

interface Props {
  children: ReactChild[];
}

const GlobalStyle = ({ children }: Props) => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Global
        styles={css`
          ${colorMode === "light" ? prismLightTheme : prismDarkTheme};
          ${colorMode === "light" ? lightAvatarTheme : darkAvatarTheme};
          #__next {
            background-color: ${colorMode === "light" ? "#fff" : "gray.700"};
            color: ${colorMode === "light" ? "black" : "white"};
            transition: width .5s ease;
          }
          html {
            background-color: ${colorMode === "light" ? "#fff" : "gray.700"};
          }
          ::selection {
            background-color: ${colorMode === "light" ? "#EAD9CD" : "#d1bd9b"};
          }
          ::-moz-selection {
            background: ${colorMode === "light" ? "#EAD9CD" : "#d1bd9b"};
          }
        `}
      />
      {children}
    </>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <MDXProvider components={MDXComponents}>
        <GlobalStyle>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </GlobalStyle>
      </MDXProvider>
    </ChakraProvider>
  );
}

export default MyApp;

import { MDXProvider } from '@mdx-js/react'
import MDXComponents from '../components/MDXComponents'
import { useColorMode, ChakraProvider } from "@chakra-ui/react"
import { prismLightTheme, prismDarkTheme } from '../styles/prism'
import { Global, css } from '@emotion/react'
import { DefaultSeo } from 'next-seo'
import SEO from '../../next-seo.config'
import customTheme from '../styles/theme'
import { lightAvatarTheme, darkAvatarTheme } from "../styles/avatar.js"

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode()
  return (
    <>
      <Global
        styles={css`
          ${colorMode === 'light' ? prismLightTheme : prismDarkTheme};
          ${colorMode === 'light' ? lightAvatarTheme : darkAvatarTheme};
          #__next {
            background-color: ${colorMode === 'light' ? '#fff' : '#15161a'};
            color: ${colorMode === 'light' ? 'black' : 'white'};
          }
          html {
            background-color: ${colorMode === 'light' ? '#fff' : '#15161a'};
          }
          ::selection {
            background-color: ${colorMode === 'light' ? '#EAD9CD' : '#75694f'};
          }
          ::-moz-selection {
            background: ${colorMode === 'light' ? '#EAD9CD' : '#714B2F'};
          }
        `}
      />
      {children}
    </>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <MDXProvider components={MDXComponents}>
        <GlobalStyle>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </GlobalStyle>
      </MDXProvider>
    </ChakraProvider>
  )
}

export default MyApp
import { MDXProvider } from '@mdx-js/react'
import MDXComponents from '../components/MDXComponents'
import { useColorMode, ColorModeProvider } from "@chakra-ui/react"
import { prismLightTheme, prismDarkTheme } from '../styles/prism'
import { Global, css } from '@emotion/react'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import { Chakra } from "../src/Chakra"

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode()
  return (
    <>
      <Global
        styles={css`
          ${colorMode === 'light' ? prismLightTheme : prismDarkTheme};
          #__next {
            background-color: ${colorMode === 'light' ? '#f7f7fa' : '#15161a'};
            color: ${colorMode === 'light' ? 'black' : 'white'};
          }
          html {
            background-color: ${colorMode === 'light' ? '#f7f7fa' : '#15161a'};
          }
          ::selection {
            background-color: #FBD38D;
          }
          ::-moz-selection {
            background: #FBD38D;
          }
        `}
      />
      {children}
    </>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <ColorModeProvider
        options={{
          useSystemColorMode: false,
        }}>
        <MDXProvider components={MDXComponents}>
          <GlobalStyle>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </GlobalStyle>
        </MDXProvider>
      </ColorModeProvider>
    </Chakra>
  )
}

export default MyApp
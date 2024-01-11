import { useColorMode, ChakraProvider } from '@chakra-ui/react'
import { Global, css } from '@emotion/react'
import { MDXProvider } from '@mdx-js/react'
import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import React from 'react'

import { config } from '@/lib/common/config'

import MDXComponents from '../components/MDXComponents'
import { lightAvatarTheme, darkAvatarTheme } from '../styles/avatar'
import { carbonLight, carbonDark } from '../styles/carbon'
import { prismLightTheme, prismDarkTheme } from '../styles/prism'
import customTheme from '../styles/theme'
import '../styles/global.css'

interface Props {
  children: React.ReactNode
}

const GlobalStyle = ({ children }: Props) => {
  const { colorMode } = useColorMode()
  return (
    <>
      <Global
        styles={css`
          ${colorMode === 'light' ? prismLightTheme : prismDarkTheme};
          ${colorMode === 'light' ? lightAvatarTheme : darkAvatarTheme};
          ${colorMode === 'light' ? carbonLight : carbonDark};
          #__next {
            background-color: ${colorMode === 'light' ? '#fff' : 'gray.700'};
            color: ${colorMode === 'light' ? 'black' : 'white'};
            transition: width 0.5s ease;
          }
          html {
            background-color: ${colorMode === 'light' ? '#fff' : 'gray.700'};
          }
          ::selection {
            background-color: ${colorMode === 'light' ? '#EAD9CD' : '#d1bd9b'};
          }
          ::-moz-selection {
            background: ${colorMode === 'light' ? '#EAD9CD' : '#d1bd9b'};
          }
        `}
      />
      {children}
    </>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <MDXProvider components={MDXComponents}>
          <GlobalStyle>
            <DefaultSeo {...config.seo} />
            <Component {...pageProps} />
          </GlobalStyle>
        </MDXProvider>
      </ThemeProvider>
    </ChakraProvider>
  )
}

export default MyApp

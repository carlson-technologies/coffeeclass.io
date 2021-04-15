import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from "@chakra-ui/react"
import theme from '../styles/theme'
import { GoogleFonts } from 'next-google-fonts'

export default class MyDocument extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <GoogleFonts href="https://fonts.googleapis.com/css?family=Inter&display=swap" />
                <Head></Head>
                <body>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
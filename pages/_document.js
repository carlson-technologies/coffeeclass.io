import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from "@chakra-ui/react"
import theme from '../styles/theme'
import { GoogleFonts } from 'next-google-fonts'
import { GA_TRACKING_ID } from '../lib/gtag'

export default class MyDocument extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <GoogleFonts href="https://fonts.googleapis.com/css?family=Inter&display=swap" />
                <Head>
                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                        }}
                    />
                </Head>
                <body>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
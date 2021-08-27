import { useEffect } from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from "@chakra-ui/react"
import theme from '../styles/theme'
import { GoogleFonts } from 'next-google-fonts'
import { GA_TRACKING_ID } from '../scripts/gtag'

export default class MyDocument extends NextDocument {
    render() {
        // Add splitbee event tracking
        function handleState() {
            window.splitbee.track("Snippet Helpful")
        }

        useEffect(() => {
            window.addEventListener('load', handleState)
            return () => {
                window.removeEventListener('load', handleState)
            }
        })
        return (
            <Html lang="en">
                <GoogleFonts href="https://fonts.googleapis.com/css?family=Inter&display=swap" />
                <Head>
                    {/* Google Adsense */}
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8586017200531248"
                        crossOrigin="anonymous"></script>

                    {/* Splitbee Analytics */}
                    <script async src="https://cdn.splitbee.io/sb.js"></script>

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
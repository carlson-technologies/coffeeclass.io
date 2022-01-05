import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "../styles/theme";
import { GoogleFonts } from "next-google-fonts";
import { GA_TRACKING_ID } from "../scripts/gtag";

declare global {
  interface Window {
    splitbee: any;
  }
}

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    // Add splitbee event tracking
    function handleState() {
      window.splitbee.track("Button Click");
    }

    if (typeof window !== "undefined") {
      window.addEventListener("load", handleState);
    }

    return (
      <Html lang="en">
        <GoogleFonts href="https://fonts.googleapis.com/css?family=Inter&display=swap" />
        <Head>
          {/* PWA */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/favicon.ico"></link>

          {/* Algolia */}
          {/* <link
            rel="stylesheet"
            href="https://unpkg.com/instantsearch.css@7/themes/satellite-min.css"
          /> */}

          {process.env.NODE_ENV === "production" && (
            <>
              {/* Google Adsense */}
              <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8586017200531248"
                crossOrigin="anonymous"
              ></script>

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
            </>
          )}
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

import NextDocument, { Html, Main, NextScript, DocumentContext, Head } from "next/document";
import { ServerStyleSheet } from "styled-components";
import React from "react";

class Document extends NextDocument {
  static async getInitialProps (ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await NextDocument.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: sheet.getStyleElement()
      };
    } finally {
      sheet.seal();
    }
  }

  render () {
    const { styles } = this.props;
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <link href="https://fonts.googleapis.com/css?family=Rubik:400,500&display=swap&subset=latin-ext" rel="stylesheet" />

          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="format-detection" content="telephone=no" />
          <style dangerouslySetInnerHTML={{ __html: "html { font-family: 'Rubik', sans-serif !important; }" }} />
          {styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;

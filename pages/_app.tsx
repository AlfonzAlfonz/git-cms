import { XcoreProvider } from "@xcorejs/ui";
import NextApp from "next/app";
import React from "react";
import Head from "next/head";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

class App extends NextApp {
  render () {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>

        <XcoreProvider>
          <Component {...pageProps} />
        </XcoreProvider>
      </>
    );
  }
}

export default App;

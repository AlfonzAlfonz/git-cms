import { XcoreProvider } from "@xcorejs/ui";
import NextApp from "next/app";
import React from "react";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

class App extends NextApp {
  render () {
    const { Component, pageProps } = this.props;

    return (
      <>
        <XcoreProvider>
          <Component {...pageProps} />
        </XcoreProvider>
      </>
    );
  }
}

export default App;

import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { getCssText } from '../stitches.config';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
        <Head>
          <link rel="apple-touch-icon" href="/favicon.png"></link>
          <link rel="shortcut icon" href="/favicon.png" />
          <meta name="theme-color" content="black" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="" />
          <meta name="twitter:title" content="See a warriors history" />
          <meta name="twitter:description" content="See a warriors history" />
          <meta name="twitter:image" content="" />
          <meta name="twitter:creator" content="@peacefall battle history" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Peacefall" />
          <meta property="og:description" content="See a warriors history" />
          <meta property="og:site_name" content="Peacefall" />
          <meta property="og:url" content="" />
          <meta property="og:image" content="" />

          <link
            href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

import { AppProps } from 'next/app';
import { Header, GridLayout } from '@peacefall-ui';
import Head from 'next/head';
import { globalStyles } from '../style/globalCss';

function CustomApp({ Component, pageProps }: AppProps) {
  globalStyles();
  return (
    <GridLayout>
      <Header />
      <Head>
        <title>See some Peacefall Stats for your battles</title>
      </Head>
      {/* could use an exported lib layout here too!!! 🎉 */}
      <main>
        <Component {...pageProps} />
      </main>
      <footer>...</footer>
    </GridLayout>
  );
}

export default CustomApp;

import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { globalStyles } from '../style/globalCss';

function CustomApp({ Component, pageProps }: AppProps) {
  globalStyles();
  return (
    <>
      <Head>
        <title>Welcome to Peacefall Warrior History</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;

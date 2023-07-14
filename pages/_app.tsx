import "@/styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Instant Recorder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

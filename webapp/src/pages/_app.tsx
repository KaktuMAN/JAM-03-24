import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ThemeProvider } from '@mui/material/styles';
import theme from "@components/Theme";
import CssBaseline from '@mui/material/CssBaseline';
import { ReactElement, ReactNode} from "react"
import Head from "next/head";
import "@styles/auth.css";
import "@styles/index.css";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>WallOfTimeLog</title>
      </Head>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
)
}

export default MyApp

import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserContextProvider from "../context/UserContext";
import { NextUIProvider } from "@nextui-org/react";
import EmployeeContextProvider from "../context/EmployeeContext";
import "react-datalist-input/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import CurrentUsersContextProvider from "../context/CurrentsEmployees";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Head from "next/head";
import "animate.css";
import { TokenContextProvider } from "../context/CurrentToken";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CurrentUsersContextProvider>
        <UserContextProvider>
          <EmployeeContextProvider>
            <TokenContextProvider>
              <NextUIProvider>
                <Head>
                  <link href=" https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
                  <link
                    rel="apple-touch-icon"
                    sizes="57x57"
                    href="/apple-icon-57x57.png"
                  />
                  <link
                    rel="apple-touch-icon"
                    sizes="60x60"
                    href="/apple-icon-60x60.png"
                  />
                  <link
                    rel="apple-touch-icon"
                    sizes="72x72"
                    href="/apple-icon-72x72.png"
                  />
                  <link
                    rel="apple-touch-icon"
                    sizes="76x76"
                    href="/apple-icon-76x76.png"
                  />
                  <link
                    rel="apple-touch-icon"
                    sizes="114x114"
                    href="/apple-icon-114x114.png"
                  />
                  <link
                    rel="apple-touch-icon"
                    sizes="120x120"
                    href="/apple-icon-120x120.png"
                  />
                  <link
                    rel="apple-touch-icon"
                    sizes="144x144"
                    href="/apple-icon-144x144.png"
                  />
                  <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="/apple-icon-152x152.png"
                  />
                  <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-icon-180x180.png"
                  />
                  <link
                    rel="icon"
                    type="image/png"
                    sizes="192x192"
                    href="/android-icon-192x192.png"
                  />
                  <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                  />
                  <link
                    rel="icon"
                    type="image/png"
                    sizes="96x96"
                    href="/favicon-96x96.png"
                  />
                  <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                  />
                  <link rel="manifest" href="/manifest.json" />
                  <meta name="msapplication-TileColor" content="#ffffff" />
                  <meta
                    name="msapplication-TileImage"
                    content="/ms-icon-144x144.png"
                  />
                  <meta name="theme-color" content="#ffffff"></meta>
                </Head>
                <Component {...pageProps} />
              </NextUIProvider>
            </TokenContextProvider>
          </EmployeeContextProvider>
        </UserContextProvider>
      </CurrentUsersContextProvider>
    </>
  );
}

export default MyApp;

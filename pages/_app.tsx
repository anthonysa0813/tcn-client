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
import { IntlProvider } from "react-intl";
import en from "../lang/en.json";
import es from "../lang/es.json";
import { useRouter } from "next/dist/client/router";
import CurrentLangContextProvider from "../context/CurrentLang";

const messages = {
  en,
  es,
};

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  return (
    <CurrentLangContextProvider>
      <CurrentUsersContextProvider>
        <UserContextProvider>
          <EmployeeContextProvider>
            <NextUIProvider>
              <Head>
                <link href=" https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
              </Head>
              <Component {...pageProps} />
            </NextUIProvider>
          </EmployeeContextProvider>
        </UserContextProvider>
      </CurrentUsersContextProvider>
    </CurrentLangContextProvider>
  );
}

export default MyApp;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserContextProvider from "../context/UserContext";
import { NextUIProvider } from "@nextui-org/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </UserContextProvider>
  );
}

export default MyApp;

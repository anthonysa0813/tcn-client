import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserContextProvider from "../context/UserContext";
import { NextUIProvider } from "@nextui-org/react";
import EmployeeContextProvider from "../context/EmployeeContext";
import "animate.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <EmployeeContextProvider>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </EmployeeContextProvider>
    </UserContextProvider>
  );
}

export default MyApp;

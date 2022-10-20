import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserContextProvider from "../context/UserContext";
import { NextUIProvider } from "@nextui-org/react";
import EmployeeContextProvider from "../context/EmployeeContext";
import "animate.css";
import "react-datalist-input/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";

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

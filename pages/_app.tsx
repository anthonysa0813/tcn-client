import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserContextProvider from "../context/UserContext";
import { NextUIProvider } from "@nextui-org/react";
import EmployeeContextProvider from "../context/EmployeeContext";
import "animate.css";
import "react-datalist-input/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import CurrentUsersContextProvider from "../context/CurrentsEmployees";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CurrentUsersContextProvider>
      <UserContextProvider>
        <EmployeeContextProvider>
          <NextUIProvider>
            <Component {...pageProps} />
          </NextUIProvider>
        </EmployeeContextProvider>
      </UserContextProvider>
    </CurrentUsersContextProvider>
  );
}

export default MyApp;

import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import {
  EmployeeContext,
  EmployeeContextProps,
} from "../../context/EmployeeContext";
import styles from "../../styles/client/Navbar.module.css";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { IntlProvider } from "react-intl";
import translate, { changeLanguage, messages } from "../../lang/home";
import { PropMessageNavbarLangs } from "../../interfaces";
import { EmployeeInterface } from "../../interfaces/index";
import {
  CurrentLangContext,
  CurrentLangContextType,
} from "../../context/CurrentLang";

const PersonIcon = dynamic(() =>
  import("@mui/icons-material/Person").then((res) => res.default)
);

const LogoutIcon = dynamic(() =>
  import("@mui/icons-material/Logout").then((res) => res.default)
);

const Image = dynamic(() => import("next/image").then((res) => res.default));

const Link = dynamic(() => import("next/link").then((res) => res.default));

interface Prop {
  data?: any;
}

const Navbar = () => {
  const { employeeGlobal, setEmployeeGlobal } =
    useContext<EmployeeContextProps>(EmployeeContext);
  const { currentLangState, setCurrenLangState } =
    useContext<CurrentLangContextType>(CurrentLangContext);
  const { name, surnames } = employeeGlobal;
  const router = useRouter();
  const logout = () => {
    setEmployeeGlobal({
      id: "",
      name: "",
      surnames: "",
      email: "",
      phone: "",
      cv: "",
      callingCode: "",
      typeJob: "",
      password: "",
      service: [],
    });
    localStorage.removeItem("countries");
    localStorage.removeItem("employee");
    localStorage.removeItem("email");
    Cookies.remove("token");
    router.push("/");
  };

  useEffect(() => {
    // setEmployeeUnparse(window.localStorage.getItem("employee") || "");
    const resEmployeeLocalStorage =
      window.localStorage.getItem("employee") || "";
    if (Boolean(resEmployeeLocalStorage)) {
      const localStoraEmployee = JSON.parse(
        window.localStorage.getItem("employee") || ""
      );
      console.log("localStoraEmployee", localStoraEmployee);

      setEmployeeGlobal(localStoraEmployee);
    }
  }, []);

  return (
    <>
        <header className={styles.header}>
          <div className="wrapper">
            <div className={styles.headerContainer}>
              <div className="logoContainer">
                <Image
                  src="/images/LogoContact.png"
                  alt="Logo de Contact bpo"
                  width={200}
                  height={100}
                  onClick={() => router.push("/")}
                />
              </div>
              <nav className={styles.menu}>
                {!name && <Link href="/campaign">Puestos de trabajo</Link>}
                {name && (
                  <span className={styles.iconUser}>
                    {/* <User set="bold" primaryColor="black" /> */}
                    <PersonIcon />
                    {name} {surnames}
                    <div className={styles.miniMenu}>
                      <Link href="/employee/edit">Perfil</Link>
                      <Link href="/employee/applications">postulaciones</Link>
                    </div>
                  </span>
                )}
                {!name && (
                  <>
                    <Link href="/login" className={styles.btn}>
                      <span>Iniciar sesión</span>
                    </Link>
                  </>
                )}
                {name && (
                  <button
                    type="button"
                    className={styles.buttonDark}
                    onClick={logout}
                    style={{ cursor: "pointer" }}
                  >
                    <span>salir</span>
                    <LogoutIcon />
                  </button>
                )}
              </nav>
            </div>
          </div>
        </header>
     
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   console.log("ctx", ctx);
//   // const response = await import(`../../lang/${locale}.json`);
//   // console.log(response);

//   return {
//     props: {
//       data: "",
//     },
//   };
// };

export default Navbar;

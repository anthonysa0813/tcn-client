import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import {
  EmployeeContext,
  EmployeeContextProps,
} from "../../context/EmployeeContext";
import styles from "../../styles/client/Navbar.module.css";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import Image from "next/image";

import {
  CurrentLangContext,
  CurrentLangContextType,
} from "../../context/CurrentLang";
import MenuItemCustom from "./cardMetun";

const PersonIcon = dynamic(() =>
  import("@mui/icons-material/Person").then((res) => res.default)
);

const LogoutIcon = dynamic(() =>
  import("@mui/icons-material/Logout").then((res) => res.default)
);

// const Image = dynamic(() => import("next/image").then((res) => res.default));

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
            <div className={styles.logoContainer}>
              <Image
                src="https://www.contactbpo.pe/img/logo.png"
                alt="Logo de Contact BPO"
                width={200}
                height={30}
                onClick={() => router.push("/")}
              />
            </div>
            <nav className={styles.menu}>
              {!name && (
                <Link href="/trabaja-con-nosotros">Puestos de trabajo</Link>
              )}
              {name && (
                // <span className={styles.iconUser}>
                //   <PersonIcon />
                //   {name} {surnames}
                //   <div className={styles.miniMenu}>
                //     <Link href="/employee/edit">Perfil</Link>
                //     <Link href="/employee/applications">postulaciones</Link>
                //   </div>
                // </span>
                <MenuItemCustom
                  name={name}
                  surnames={surnames}
                  logout={logout}
                />
              )}
              {!name && (
                <>
                  <Link href="/login" className={styles.btn}>
                    <span>Iniciar sesión</span>
                  </Link>
                </>
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

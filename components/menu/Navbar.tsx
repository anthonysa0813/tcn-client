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

const Navbar = ({ data }: Prop) => {
  const { employeeGlobal, setEmployeeGlobal } =
    useContext<EmployeeContextProps>(EmployeeContext);
  const { currentLangState, setCurrenLangState } =
    useContext<CurrentLangContextType>(CurrentLangContext);
  const { name, surnames } = employeeGlobal;
  const [currentLang, setCurrentLang] = useState("");
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
    Cookies.remove("token");
    router.push("/");
  };

  useEffect(() => {
    // console.log(currentLangState);
    console.log("currenLangState", currentLangState);
    changeLanguage(currentLangState);
  }, [currentLangState]);

  const changeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(router.pathname, router.pathname, {
      locale: e.target.value,
    });
    // setCurrentLang(e.target.value);
    setCurrenLangState(e.target.value);
  };

  return (
    <>
      <IntlProvider
        locale={currentLangState}
        messages={messages[currentLangState as keyof PropMessageNavbarLangs]}
      >
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
                {!name && (
                  <Link href="/campaign">{translate("jobPosition")}</Link>
                )}
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
                      <span>{translate("login")}</span>
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
                <select onChange={changeLang} className={styles.selectButton}>
                  <option value="es">{translate("langEs")}</option>
                  <option value="en">{translate("langEn")}</option>
                </select>
              </nav>
            </div>
          </div>
        </header>
      </IntlProvider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log("ctx", ctx);
  // const response = await import(`../../lang/${locale}.json`);
  // console.log(response);

  return {
    props: {
      data: "",
    },
  };
};

export default Navbar;

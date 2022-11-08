import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import {
  EmployeeContext,
  EmployeeContextProps,
} from "../../context/EmployeeContext";
import styles from "../../styles/client/Navbar.module.css";
import ModalLogin from "../employees/ModalLogin";
import { User } from "react-iconly";
import { HiLogout } from "react-icons/hi";
import Cookies from "js-cookie";
import Image from "next/image";

const Navbar = () => {
  const { employeeGlobal, setEmployeeGlobal } =
    useContext<EmployeeContextProps>(EmployeeContext);
  const { name, surnames } = employeeGlobal;
  const router = useRouter();
  //   console.log("employeeGlobal", name);
  const [showModalLogin, setshowModalLogin] = useState(false);
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

  return (
    <>
      {showModalLogin && <ModalLogin setshowModalLogin={setshowModalLogin} />}
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
            <nav>
              <ul>
                {!name && (
                  <>
                    {/* <li>
                      <Link href="#services">
                        <a>Servicios</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#team">
                        <a>Nuestro Equipo</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#clients">
                        <a>Clientes</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <a>Contáctanos</a>
                      </Link>
                    </li> */}
                    <li>
                      <Link href="/campaign">
                        <a>Trabaja con Nosotros</a>
                      </Link>
                    </li>
                  </>
                )}
                {name && (
                  <span className={styles.iconUser}>
                    <User set="bold" primaryColor="black" />
                    {name} {surnames}
                    <div className={styles.miniMenu}>
                      <Link href="/employee/edit">
                        <a>Perfil</a>
                      </Link>
                      <Link href="/employee/applications">
                        <a> postulaciones</a>
                      </Link>
                    </div>
                  </span>
                )}
                {!name && (
                  <li
                    className={styles.btn}
                    onClick={() => setshowModalLogin(true)}
                  >
                    <a>Inicia sesión</a>
                  </li>
                )}
                {name && (
                  <button
                    type="button"
                    className={styles.buttonDark}
                    onClick={logout}
                    style={{ cursor: "pointer" }}
                  >
                    <HiLogout />
                  </button>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;

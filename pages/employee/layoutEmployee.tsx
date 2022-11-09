import React, { useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/menu/Navbar";
import styles from "../../styles/employees/Layout.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/router";
import { BsKeyFill } from "react-icons/bs";
import {
  Work,
  EditSquare,
  ArrowUpSquare,
  Password,
  Wallet,
} from "react-iconly";
import { EmployeeContext } from "../../context/EmployeeContext";

interface Prop {
  children: JSX.Element[] | JSX.Element;
  name: string;
}

const LayoutEmployee = ({ children, name }: Prop) => {
  const { employeeGlobal } = useContext(EmployeeContext);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const arrAsPath = router.asPath;
  const { status } = employeeGlobal;

  const pathActive = (path: string) => {
    if (arrAsPath === path) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={styles.mainLayout}>
      <Navbar />
      <main>
        <div className={styles.profileGrid}>
          <div
            className={`${styles.asideMenu} ${showMenu ? styles.active : ""}`}
          >
            <div
              className={styles.boxMenu}
              onClick={() => setShowMenu(!showMenu)}
            >
              <AiOutlineMenu />
            </div>
            {showMenu && (
              <nav
                className={`${
                  styles.navigation
                } animate__animated animate__slideInLeft ${
                  !showMenu ? "animate__slideOutLeft" : ""
                }`}
              >
                <Link href="/campaign">
                  <a
                    className={pathActive("/campaign") ? styles.activeLink : ""}
                  >
                    <Work
                      set="bold"
                      primaryColor="primary"
                      style={{ width: "20px", height: "20px" }}
                    />
                    Ver Campañas Disponibles
                  </a>
                </Link>
                <Link href="/employee/edit">
                  <a
                    className={
                      pathActive("/employee/edit") ? styles.activeLink : ""
                    }
                  >
                    <EditSquare set="bold" primaryColor="primary" />
                    Editar Información
                  </a>
                </Link>
                <Link href="/employee/applications">
                  <a
                    className={
                      pathActive("/employee/applications")
                        ? styles.activeLink
                        : ""
                    }
                  >
                    <ArrowUpSquare set="bold" primaryColor="primary" />
                    Ver postulaciones
                  </a>
                </Link>
                <Link href="/employee/changePassword">
                  <a
                    className={
                      pathActive("/employee/changePassword")
                        ? styles.activeLink
                        : ""
                    }
                  >
                    <Password set="bold" primaryColor="primary  " />
                    Cambiar la contraseña
                  </a>
                </Link>
                {/* {false && (
                  <Link href="/employee/payments">
                    <a
                      className={
                        pathActive("/employee/payments")
                          ? styles.activeLink
                          : ""
                      }
                    >
                      <Wallet set="bold" primaryColor="primary" />
                      Historial de pagos
                    </a>
                  </Link>
                )} */}
              </nav>
            )}
          </div>
          <div className={`${styles.mainProfile}`}>{children}</div>
        </div>
      </main>
    </div>
  );
};

export default LayoutEmployee;

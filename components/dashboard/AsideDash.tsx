import Link from "next/link";
import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { BsChevronBarRight } from "react-icons/bs";
import styles from "../../styles/admin/AsideDashboard.module.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { AddUser, Document, PaperPlus, Password, People } from "react-iconly";
import Image from "next/image";
import { BiAlignLeft } from "react-icons/bi";
import { GrClose } from "react-icons/gr";

const AsideDash = () => {
  const { userGlobal } = useContext(UserContext);
  const router = useRouter();
  const arrAsPath = router.asPath.split("/");
  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const setWindowDimensions = () => {
    if (window !== undefined) {
      setWindowWidth(window.innerWidth);
    }
  };

  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener("resize", setWindowDimensions);
      return () => {
        window.removeEventListener("resize", setWindowDimensions);
      };
    }
  }, []);

  useEffect(() => {
    setShowMenu(true);
  }, [windowWidth]);

  const pathActive = (path: string) => {
    const pathName = arrAsPath[arrAsPath.length - 1];
    if (pathName === path) {
      return true;
    } else {
      return false;
    }
  };

  const outSession = () => {
    Cookies.remove("token");
    sessionStorage.clear();
    router.push("/admin");
  };

  return (
    <>
      <aside className={styles.aside}>
        <div className={styles.boxIcon}>
          {showMenu ? (
            <GrClose
              className={styles.svgMenu}
              onClick={() => {
                setShowMenu((state) => !state);
              }}
            />
          ) : (
            <BiAlignLeft
              className={styles.svgMenu}
              onClick={() => {
                setShowMenu((state) => !state);
              }}
            />
          )}
        </div>
        {showMenu && (
          <div className={styles.asideContainer}>
            <div className="menuHeader">
              <Image
                src="/images/LogoContact.png"
                alt="Logo de Contact bpo"
                className={styles.image}
                width={200}
                height={100}
              />
            </div>

            <nav
              className={`${styles.menu}  animate__animated animate__fadeInLeft`}
            >
              <ul>
                {/* <Link href="/admin/clients" style={{ display: "inline" }}>
            <a className={pathActive("clients") ? styles.activeLink : ""}>
            <Document set="bold" primaryColor="primary" />
            Lista de Clientes
            </a>
          </Link> */}
                <Link
                  href="/admin/employees"
                  className={pathActive("employees") ? styles.activeLink : ""}
                >
                  <Document set="bold" primaryColor="primary" />
                  Lista de Empleados
                </Link>
                <Link
                  href="/admin/newService"
                  className={pathActive("newService") ? styles.activeLink : ""}
                >
                  <PaperPlus set="bold" primaryColor="primary" />
                  Crear nuevo Puesto
                </Link>
                <Link
                  href="/admin/changePassword"
                  className={
                    pathActive("changePassword") ? styles.activeLink : ""
                  }
                >
                  <Password set="bold" primaryColor="primary" />
                  Editar información
                </Link>
                <Link
                  href="/admin/listServices"
                  className={
                    pathActive("listServices") ? styles.activeLink : ""
                  }
                >
                  <Document set="bold" primaryColor="primary" />
                  Puestos Disponibles
                </Link>
                {userGlobal.superAdmin && (
                  <>
                    <Link
                      href="/admin/changeRole"
                      className={
                        pathActive("changeRole") ? styles.activeLink : ""
                      }
                    >
                      <People set="bold" primaryColor="primary" />
                      Cambiar role a un usuario
                    </Link>
                    <Link
                      href="/admin/createNewUser"
                      className={
                        pathActive("createNewUser") ? styles.activeLink : ""
                      }
                    >
                      <AddUser set="bold" primaryColor="primary" />
                      Crear un nuevo usuario
                    </Link>
                  </>
                )}
              </ul>
            </nav>
            <div className={styles.profile}>
              {/* <h4>{userGlobal.name}</h4> */}
              <h4 onClick={outSession}>Salir</h4>
              <BsChevronBarRight onClick={outSession} />
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default AsideDash;

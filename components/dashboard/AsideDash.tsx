import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import styles from "../../styles/admin/AsideDashboard.module.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

const Image = dynamic(() => import("next/image").then((res) => res.default));

const FileIcon = dynamic(() =>
  import("@mui/icons-material/Article").then((res) => res.default)
);

const FilePlusIcon = dynamic(() =>
  import("@mui/icons-material/Difference").then((res) => res.default)
);

const KeyIcon = dynamic(() =>
  import("@mui/icons-material/VpnKey").then((res) => res.default)
);

const JobIcon = dynamic(() =>
  import("@mui/icons-material/Work").then((res) => res.default)
);

const RoleIcon = dynamic(() =>
  import("@mui/icons-material/SupervisedUserCircle").then((res) => res.default)
);

const NewUserIcon = dynamic(() =>
  import("@mui/icons-material/PersonAddAlt").then((res) => res.default)
);

const CloseIcon = dynamic(() =>
  import("@mui/icons-material/Close").then((res) => res.default)
);

const MenuIcon = dynamic(() =>
  import("@mui/icons-material/menu").then((res) => res.default)
);

const LogoutIcon = dynamic(() =>
  import("@mui/icons-material/Logout").then((res) => res.default)
);

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
            <CloseIcon
              className={styles.svgMenu}
              onClick={() => {
                setShowMenu((state) => !state);
              }}
            />
          ) : (
            <MenuIcon
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
                <Link
                  href="/admin/employees"
                  className={pathActive("employees") ? styles.activeLink : ""}
                >
                  <FileIcon />
                  Lista de Empleados
                </Link>
                <Link
                  href="/admin/newService"
                  className={pathActive("newService") ? styles.activeLink : ""}
                >
                  <FilePlusIcon />
                  Crear nuevo Puesto
                </Link>
                <Link
                  href="/admin/changePassword"
                  className={
                    pathActive("changePassword") ? styles.activeLink : ""
                  }
                >
                  <KeyIcon />
                  Editar información
                </Link>
                <Link
                  href="/admin/listServices"
                  className={
                    pathActive("listServices") ? styles.activeLink : ""
                  }
                >
                  <JobIcon />
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
                      <RoleIcon />
                      Cambiar role a un usuario
                    </Link>
                    <Link
                      href="/admin/createNewUser"
                      className={
                        pathActive("createNewUser") ? styles.activeLink : ""
                      }
                    >
                      <NewUserIcon />
                      Crear un nuevo usuario
                    </Link>
                  </>
                )}
              </ul>
            </nav>
            <div className={styles.profile}>
              {/* <h4>{userGlobal.name}</h4> */}
              <h4 onClick={outSession}>Salir</h4>
              <LogoutIcon onClick={outSession} />
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default AsideDash;

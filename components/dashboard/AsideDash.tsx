import Link from "next/link";
import React, { FC, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { BsChevronBarRight } from "react-icons/bs";
import styles from "../../styles/admin/AsideDashboard.module.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const AsideDash: FC = () => {
  const { userGlobal } = useContext(UserContext);
  const router = useRouter()
  const arrAsPath = router.asPath.split("/")
  console.log(arrAsPath[arrAsPath.length - 1])

  const pathActive = (path: string) => {
    const pathName = arrAsPath[arrAsPath.length - 1]
    if(pathName === path) {
      return true
    }else {
      return false
    }
  }

  const outSession = () => {
    Cookies.remove("token")
    sessionStorage.clear()
    router.push("/admin")
  }

  return (
    <aside className={styles.asideContainer}>
      <h1 className={styles.title}>Contact BPO</h1>
      <nav className="menu">
        <ul>
          <Link href="/admin/clients" style={{display: "inline"}}>
            <a  className={pathActive("clients") ? styles.activeLink : ""}>Lista de Clientes</a>
          </Link>
          <Link href="/admin/employees">
            <a className={pathActive("employees") ? styles.activeLink : ""}>Lista de Empleados</a>
          </Link>
          <Link href="/admin/newService">
            <a className={pathActive("newService") ? styles.activeLink : ""}>Crear nuevo Servicio</a>
          </Link>
        </ul>
      </nav>
      <div className={styles.profile}>
        {/* <h4>{userGlobal.name}</h4> */}
        <h4 onClick={outSession}>Salir</h4>
        <BsChevronBarRight onClick={outSession} />
      </div>
    </aside>
  );
};

export default AsideDash;

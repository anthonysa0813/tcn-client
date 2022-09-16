import Link from "next/link";
import React, { FC, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { BsChevronBarRight } from "react-icons/bs";
import styles from "../../styles/admin/AsideDashboard.module.css";

const AsideDash: FC = () => {
  const { userGlobal } = useContext(UserContext);
  console.log("context", userGlobal);
  return (
    <aside className={styles.asideContainer}>
      <h1 className={styles.title}>Contact BPO</h1>
      <nav className="menu">
        <ul>
          <Link href="/admin/clients">
            <a>Lista de Clientes</a>
          </Link>
          <Link href="/admin/employees">
            <a>Lista de Empleados</a>
          </Link>
        </ul>
      </nav>
      <div className={styles.profile}>
        <h4>{userGlobal.name}</h4>
        <BsChevronBarRight />
      </div>
    </aside>
  );
};

export default AsideDash;

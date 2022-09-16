import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import ButtonPrimary from "../../components/buttons/Button";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import { UserContext } from "../../context/UserContext";
import { getFetchApi } from "../../helpers/useFetch";
import styles from "../../styles/admin/ClientsDashboard.module.css";

const Clients = () => {
  const token = Cookies.get("token");
  const { userGlobal } = useContext(UserContext);
  const router = useRouter();
  const [clientsArr, setClientsArr] = useState([]);
  useEffect(() => {
    if (!token || Object.values(userGlobal).includes("")) {
      router.push("/admin/login");
    }
    getFetchApi("clients").then((res) => {
      // console.log("res", res);
      setClientsArr(res);
    });
  }, []);

  return (
    <LayoutDashboard>
      <header className={styles.asideHead}>
        <h1>Lista de todos los clientes ({clientsArr.length})</h1>
        <ButtonPrimary
          onClick={() => console.log("jeje")}
          type="button"
          color={"dark"}
          content="Agregar Nuevo Cliente"
        />
      </header>
      <table className={styles.table}>
        <tr className={styles.tableHead}>
          <th>Nombre del cliente</th>
          <th>Email</th>
          <th>Telefono</th>
          <th>Mensaje</th>
          <th>Estado</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
      </table>
    </LayoutDashboard>
  );
};

export default Clients;

import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import ButtonPrimary from "../../components/buttons/Button";
import TablesDash from "../../components/dashboard/clients/TablesDash";
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
      <TablesDash data={clientsArr} />
    </LayoutDashboard>
  );
};

export default Clients;

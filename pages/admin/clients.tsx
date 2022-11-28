import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import ButtonPrimary from "../../components/buttons/Button";
import TablesDash from "../../components/dashboard/clients/TablesDash";
import NewClientForm from "../../components/dashboard/forms/NewClientForm";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import ModalComponent from "../../components/dashboard/ModalComponent";
import { UserContext } from "../../context/UserContext";
import { getFetchApi } from "../../helpers/useFetch";
import styles from "../../styles/admin/ClientsDashboard.module.css";

const Clients = () => {
  const token = Cookies.get("token");
  const { userGlobal } = useContext(UserContext);
  const router = useRouter();
  const [clientsArr, setClientsArr] = useState([]);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
    getFetchApi("clients").then((res) => {
      setClientsArr(res);
    });
  }, [token, router]);

  const showModal = () => {
    setModal(!modal);
  };

  return (
    <LayoutDashboard>
      <header className={styles.asideHead}>
        <h1 className={styles["text-black"]}>
          Lista de todos los clientes ({clientsArr.length})
        </h1>
        <ButtonPrimary
          onClick={() => showModal()}
          type="button"
          color={"dark"}
          content="Agregar Nuevo Cliente"
        />
      </header>
      <TablesDash data={clientsArr} />
      {modal ? (
        <ModalComponent>
          <NewClientForm setModal={setModal} />
        </ModalComponent>
      ) : (
        <></>
      )}
    </LayoutDashboard>
  );
};

export default Clients;

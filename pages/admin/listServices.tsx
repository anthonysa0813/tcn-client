import React, { useEffect, useState, useContext } from "react";
import { Button, Modal, Table, Text, useModal } from "@nextui-org/react";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import { Service } from "../../interfaces";
import styles from "../../styles/admin/ListServices.module.css";
import { EmployeeInterface } from "../../interfaces/index";
import { userAgent } from "next/server";
import Link from "next/link";
import { API_URL } from "../../utils/constanstApi";
import { randomId } from "../../helpers/randomID";
import TableListStaticData from "../../components/dashboard/clients/TableListStaticData";

const ListServicesPage = () => {
  const [servicesArr, setServicesArr] = useState<Service[] | []>([]);
  const { setVisible, bindings } = useModal();
  const [offsetSliceValue, setOffsetSliceValue] = useState(5);
  const [currentEmployee, setCurrentEmployee] = useState<EmployeeInterface>({
    id: "",
    name: "",
    surnames: "",
    email: "",
    phone: "",
    status: true,
    cv: "",
    callingCode: "",
    typeJob: "",
    service: [],
    password: "",
    message: "",
    country: "",
  });

  useEffect(() => {
    fetch(`${API_URL}/services`)
      .then((res) => res.json())
      .then((data) => {
        setServicesArr(data.services);
      });
  }, []);

  const watchAllEmployee = (data: EmployeeInterface[] | []) => {
    setOffsetSliceValue(data.length);
  };

  return (
    <LayoutDashboard>
      <>
        <h1 className={styles.title}>Lista de Campañas</h1>
        <hr />
        {servicesArr.map((service: Service) => {
          return (
            <div key={service._id} className={styles.tableService}>
              <div className={styles.tableHead}>
                <h4>{service.title}</h4>
                <Button
                  size={"xs"}
                  style={{ padding: ".5rem" }}
                  color={"secondary"}
                  onClick={() => watchAllEmployee(service.employees)}
                >
                  {" "}
                  Ver Todos
                </Button>
              </div>
              <TableListStaticData
                data={service.employees}
                total={service.employees.length}
                offsetSliceValue={offsetSliceValue}
              />
            </div>
          );
        })}
      </>
    </LayoutDashboard>
  );
};

export default ListServicesPage;

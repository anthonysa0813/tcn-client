import React, { useEffect, useState, useContext } from "react";
import { Button, Modal, Table, Text, useModal } from "@nextui-org/react";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import { Service, ServiceI } from "../../interfaces";
import styles from "../../styles/admin/ListServices.module.css";
import { EmployeeInterface } from "../../interfaces/index";
import TableListStaticData from "../../components/dashboard/clients/TableListStaticData";
import ServiceItem from "../../components/servcies/ServiceItem";

const ListServicesPage = () => {
  const [servicesArr, setServicesArr] = useState<ServiceI[] | []>([]);
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
    fetch(`${process.env.NEXT_PUBLIC_DB_URL}/services`)
      .then((res) => res.json())
      .then((data) => {
        setServicesArr(data.services);
      });
  }, [servicesArr]);

  const changeStatusService = async (currentService: ServiceI) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/services/${currentService._id}`,
      {
        method: "PUT",
      }
    ).then((resServ) => {
      if (resServ.status === 200) {
        fetch(`${process.env.NEXT_PUBLIC_DB_URL}/services`)
          .then((res) => res.json())
          .then((data) => {
            setServicesArr(data.services);
          });
      }
    });
  };

  return (
    <LayoutDashboard>
      <>
        <h1 className={styles.title}>Lista de Campañas</h1>
        <hr />
        {servicesArr.map((service: ServiceI) => {
          return (
            <ServiceItem
              key={service._id}
              service={service}
              changeStatusService={() => changeStatusService(service)}
            />
          );
        })}
      </>
    </LayoutDashboard>
  );
};

export default ListServicesPage;

import { GetServerSideProps } from "next";

import React, { useEffect, useState, useContext } from "react";
import { Button, Modal, Table, Text, useModal } from "@nextui-org/react";
import LayoutDashboard from "../../../components/dashboard/LayoutDashboard";
import { Service, ServiceI } from "../../../interfaces";
import styles from "../../../styles/admin/ListServices.module.css";
import { EmployeeInterface } from "../../../interfaces/index";
import ServiceItem from "../../../components/servcies/ServiceItem";

interface ServiceResponse {
  total: number;
  services: ServiceI[] | [];
}

interface Prop {
  services: ServiceI[] | [];
}

const ListServicesPage = ({ services }: Prop) => {
  const [servicesArr, setServicesArr] = useState<ServiceI[] | []>([]);

  useEffect(() => {
    if (services.length > 0) {
      setServicesArr(services);
    }
  }, []);

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
        <h1 className={styles.title}>Puestos de trabajo</h1>
        <hr />
        {servicesArr.map((service: ServiceI) => {
          return (
            <ServiceItem
              key={service._id}
              service={service}
              setServicesArr={setServicesArr}
              changeStatusService={() => changeStatusService(service)}
            />
          );
        })}
      </>
    </LayoutDashboard>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch(
    `https://contactbpo-server-production.up.railway.app/api/services`
  );
  const data = await response.json();

  return {
    props: {
      services: data.services,
    },
  };
};

export default ListServicesPage;

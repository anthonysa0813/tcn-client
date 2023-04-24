import { GetServerSideProps } from "next";
import React, { useEffect, useState, useContext } from "react";
import LayoutDashboard from "../../../components/dashboard/LayoutDashboard";
import { ServiceI } from "../../../interfaces";
import styles from "../../../styles/admin/ListServices.module.css";
import ServiceItem from "../../../components/servcies/ServiceItem";
import dynamic from "next/dynamic";
import { TokenContext } from "../../../context/CurrentToken";

const Head = dynamic(() => import("next/head").then((res) => res.default));

interface Prop {
  services: ServiceI[] | [];
}

const ListServicesPage = ({ services }: Prop) => {
  const [servicesArr, setServicesArr] = useState<ServiceI[] | []>([]);
  const { privateToken } = useContext(TokenContext);

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
        headers: {
          Authorization: privateToken.token,
        },
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
    <>
      <Head>
        <title>Contact Bpo Admin | Lista de Puestos de Trabajos</title>
        <meta
          name="description"
          content="Contact BPO página administrador de Contact BPO - lista de trabajos"
        />
      </Head>
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
    </>
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

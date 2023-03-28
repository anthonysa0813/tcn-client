import React, { useEffect } from "react";
import LayoutEmployee from "./layoutEmployee";
import styles from "../../styles/client/Campaign.module.css";
import { GetServerSideProps } from "next/types";
import { Service, ServiceI } from "../../interfaces";
import dynamic from "next/dynamic";

const Head = dynamic(() => import("next/head").then((res) => res.default));

interface ServiceProp {
  services: ServiceI[] | [];
}

const ServiceCard = dynamic(
  () => import("../../components/dashboard/clients/ServiceCard"),
  {
    ssr: false,
  }
);

const CampaignEmployees = ({ services }: ServiceProp) => {
  // useEffect(() => {}, []);
  return (
    <>
      <Head>
        <title>Contact BPO | Puestos Disponibles</title>
        <meta
          name="description"
          content="Puestos de trabajo disponibles con relación a Contact BPO."
        />
      </Head>
      <LayoutEmployee>
        <main className={styles.main}>
          <div className={styles.wrapper}>
            <div className={styles.mainContainer}>
              <h3>Puestos de trabajos</h3>
              <div className={styles.servicesGrid}>
                {services?.map((service) => {
                  return (
                    <>
                      <ServiceCard key={service._id} service={service} />
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </LayoutEmployee>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch(`${process.env.DB_URL}/services`);
  const data = await response.json();

  return {
    props: {
      services: data.services,
    },
  };
};

export default CampaignEmployees;

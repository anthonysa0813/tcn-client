import type { GetServerSideProps } from "next";
import Head from "next/head";
import Navbar from "../components/menu/Navbar";
import styles from "../styles/client/Campaign.module.css";
import { Service } from "../interfaces";
import dynamic from "next/dynamic";

interface ServiceProp {
  services: Service[] | [];
}

const ServiceCard = dynamic(
  () => import("../components/dashboard/clients/ServiceCard"),
  {
    ssr: false,
  }
);

const CampaignPage = ({ services }: ServiceProp) => {
  return (
    <>
      <Head>
        <title>Contact Bpo | Campañas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
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

export default CampaignPage;

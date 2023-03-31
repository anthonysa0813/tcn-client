import type { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "../styles/client/Campaign.module.css";
import dynamic from "next/dynamic";
import { ServiceI } from "../interfaces";
import Navbar from "../components/menu/Navbar";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";
import NotFoundJobs from "../components/cards/NotFoundJobs";

interface ServiceProp {
  services: ServiceI[] | [];
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
        <title>Contact Bpo | Trabaja con Nosotros</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.mainContainer}>
            {services.length > 0 && <h3>Puestos de trabajos</h3>}
            {services.length === 0 && <NotFoundJobs />}
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

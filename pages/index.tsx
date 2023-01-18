import type { NextPage } from "next";
import { useEffect, useContext } from "react";
import Head from "next/head";
import ServiceIconCard from "../components/cards/ServiceIconCard";
import Slider from "../components/carousel/Slider";
import Hero from "../components/Hero";
import Navbar from "../components/menu/Navbar";
// import styles from "../styles/Home.module.css";
import styles from "../styles/client/Hero.module.css";

import { IntlProvider } from "react-intl";
import translate, { changeLanguage, messages } from "../lang/home";
import { PropMessageNavbarLangs } from "../interfaces";
import {
  CurrentLangContext,
  CurrentLangContextType,
} from "../context/CurrentLang";

const Home: NextPage = () => {
  const { currentLangState, setCurrenLangState } =
    useContext<CurrentLangContextType>(CurrentLangContext);

  useEffect(() => {
    // console.log(currentLangState);
    console.log("currenLangState", currentLangState);
    changeLanguage(currentLangState);
  }, [currentLangState]);

  return (
    <>
      <IntlProvider
        locale={currentLangState}
        messages={messages[currentLangState as keyof PropMessageNavbarLangs]}
      >
        <Head>
          <title>Contact Bpo</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <main>
          <Hero id="main">
            <div className={`${styles.heroContainer} ${styles.heroPortada}`}>
              <div className="wrapper ">
                <h1>
                  Ofrecemos soluciones tecnológicas multicanal y desarrollo de
                  plataformas digitales utilizando la innovación como base para
                  diseñar y ejecutar cada proyecto.
                </h1>
              </div>
            </div>
          </Hero>
          <div className={styles.heroTitle}>
            <div className="wrapper ">
              <div className={styles.textContainer}>
                <div className={styles.textContent}>
                  <h1>
                    Nos encanta lo que hacemos, por eso tenemos los mejores{" "}
                    <span>
                      servicios adecuados a la necesidad de cada cliente.
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <Hero bg="blueSecondary" nameHero="services">
            <div className="wrapper">
              <div className={styles.servicesGrid}>
                <ServiceIconCard
                  title="ATENCIÓN INBOUND"
                  description="Sabemos que somos la cara de nuestros clientes. La calidad de servicio es lo más importante."
                  imageUrl="https://www.contactbpo.pe/img/service1.png"
                  borderActive
                  titleButton="Ver más"
                />

                <ServiceIconCard
                  title="VENTAS MULTICANAl"
                  description="Consolidamos todos los canales digitales y tradicionales con Inbound Marketing para maximizar tus ventas."
                  imageUrl="https://www.contactbpo.pe/img/service2.png"
                  borderActive
                  titleButton="Ver más"
                />

                <ServiceIconCard
                  title="COBRANZAS"
                  description="Gestionamos cobranzas preventivas, medias y tardías utilizando diversos canales de comunicación."
                  imageUrl="https://www.contactbpo.pe/img/service3.png"
                  borderActive
                  titleButton="Ver más"
                />

                <ServiceIconCard
                  title="INNOVACIÓN DIGITAL"
                  description="Desarrollamos plataformas Web, Móvil e Inteligencia Artificial para generar eficiencia en los negocios."
                  titleButton="Ver más"
                  imageUrl="https://www.contactbpo.pe/img/service4.png"
                />
              </div>
            </div>
          </Hero>
          <Hero bg="blueLight" nameHero="empresas">
            <div className="wrapper">
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "1.5rem",
                  color: "#8e8ea1",
                  fontWeight: "lighter",
                  marginBottom: "1.5rem",
                }}
              >
                Ellos confían en nosotros
              </h2>
              <Slider />
            </div>
          </Hero>
        </main>
      </IntlProvider>
    </>
  );
};

export default Home;

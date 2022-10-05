import type { NextPage } from "next";
import Head from "next/head";
import Hero from "../components/Hero";
import Navbar from "../components/menu/Navbar";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact Bpo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <Hero title="Main Page" bg="purple" id="main"/>
        <Hero title="Servicios" bg="dark" id="services"/>
        <Hero title="Nuestro Equipo" bg="green" id="team"/>
        <Hero title="Clientes"  bg="gray" id="clients"/>
      </main>
    </>
  );
};

export default Home;

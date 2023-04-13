import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState, useContext } from "react";
import styles from "../../styles/users/RegisterUser.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  EmployeeContext,
  EmployeeContextProps,
} from "../../context/EmployeeContext";
import { loginFetchApi } from "../../helpers/useFetch";
import Cookies from "js-cookie";
import { EmployeeInterface } from "../../interfaces";

import { useFormik } from "formik";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import ModalComponent from "../../components/dashboard/ModalComponent";
import RegisterModalDone from "../../components/modals/RegisterModalDone";

const ArrowBackIosNewIcon = dynamic(() =>
  import("@mui/icons-material/ArrowBackIosNew").then((res) => res.default)
);

const Image = dynamic(() => import("next/image").then((res) => res.default));
const Head = dynamic(() => import("next/head").then((res) => res.default));

const Footer = dynamic(() =>
  import("../../components/dashboard/clients/Footer").then((res) => res.default)
);

const RegisterForm = dynamic(() =>
  import("../../components/dashboard/forms/RegisterForm").then(
    (res) => res.default
  )
);

const RegisterPage: NextPage = ({ data }: any) => {
  const [activeModalRegisterDone, setActiveModalRegisterDone] = useState(true);
  const [cvValue, setCvValue] = useState("" as any);
  const router = useRouter();

  const notifyErrorExtension = () =>
    toast.warning("La extensión del cv es incorrecto");

  useEffect(() => {
    if (cvValue) {
      const extension = cvValue.type.split("/")[1];
      if (extension !== "pdf") {
        notifyErrorExtension();
      }
    }
    console.log(cvValue);
  }, [cvValue]);

  const closeRegisterModal = () => {
    setActiveModalRegisterDone(false);
  };

  return (
    <>
      {activeModalRegisterDone && (
        <RegisterModalDone closeModal={closeRegisterModal} />
      )}
      <ToastContainer />
      <Head>
        <title>Contact Bpo | registrarse</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Navbar /> */}
      <main className={styles.main}>
        <div className={styles.bannerColumn}>
          <Image
            src="/images/draw4.svg"
            alt="draw animado para registro"
            width={500}
            height={500}
          />
        </div>
        <div className={styles.registerSection}>
          <div className="wrapper">
            <div className={styles.back} onClick={() => router.push("/")}>
              <ArrowBackIosNewIcon />
              <span>Volver a la página principal</span>
            </div>
            <h1>Registrate</h1>
            <RegisterForm
              setActiveModalRegisterDone={setActiveModalRegisterDone}
            />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // data de nombres de paises
  const res = await fetch("http://country.io/names.json");
  const data = await res.json();
  // data de código telefónico
  const resCode = await fetch("http://country.io/phone.json");
  const dataCode = await resCode.json();

  return {
    props: {
      data: {
        countriesNames: data,
        callingCode: dataCode,
      },
    },
  };
};

export default RegisterPage;

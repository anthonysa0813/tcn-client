import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/client/LoginPage.module.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const ForgetPassForm = dynamic(() =>
  import("../components/dashboard/clients/ForgetPassForm").then(
    (res) => res.default
  )
);
const LoginClient = dynamic(() =>
  import("../components/dashboard/clients/LoginClient").then(
    (res) => res.default
  )
);
const Footer = dynamic(() =>
  import("../components/dashboard/clients/Footer").then((res) => res.default)
);

const Paper = dynamic(() =>
  import("@mui/material/Paper").then((res) => res.default)
);

const LoginPage = () => {
  const [showForgetPasswordForm, setShowForgetPasswordForm] = useState(false);
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Contact Bpo | Campañas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Navbar /> */}
      <main className={styles.mainLogin}>
        <div className={styles.drawContainer}>
          <Image
            src="/images/draw1.svg"
            alt="Logo de Contact bpo"
            width={500}
            height={500}
            onClick={() => router.push("/")}
          />
        </div>
        <div className={styles.formContainer}>
          <Paper elevation={2} className={styles.formPaper}>
            {showForgetPasswordForm ? (
              <ForgetPassForm
                setShowForgetPasswordForm={setShowForgetPasswordForm}
              />
            ) : (
              <LoginClient
                setShowForgetPasswordForm={setShowForgetPasswordForm}
              />
            )}
          </Paper>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default LoginPage;
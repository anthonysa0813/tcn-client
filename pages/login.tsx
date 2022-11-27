import React, { useState } from "react";
import { Paper } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/client/LoginPage.module.css";
import CopyrightIcon from "@mui/icons-material/Copyright";
import LoginClient from "../components/dashboard/clients/LoginClient";
import ForgetPassForm from "../components/dashboard/clients/ForgetPassForm";

const LoginPage = () => {
  const [showForgetPasswordForm, setShowForgetPasswordForm] = useState(false);

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
            // onClick={() => router.push("/")}
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
        <div className={styles.footer}>
          <span>
            Contact | Copyright 2022 <CopyrightIcon />
          </span>
        </div>
      </main>
    </>
  );
};

export default LoginPage;

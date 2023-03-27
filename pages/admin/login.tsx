import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import { toast, ToastContainer } from "react-toastify";
import styles from "../../styles/admin/Login.module.css";
import { loginFetchApi } from "../../helpers/useFetch";
import { UserContext } from "../../context/UserContext";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Paper } from "@mui/material";
import ForgetPassAdmin from "../../components/forms/ForgetPassAdmin";

const LoginAdminFormComponent = dynamic(() =>
  import("../../components/forms/LoginAdminForm").then((res) => res.default)
);

const LoginAdminForm = () => {
  const [showForgetPass, setShowForgetPass] = useState(false);

  return (
    <main className={styles.main}>
      <Paper elevation={2}>
        {showForgetPass ? (
          <ForgetPassAdmin setShowForgetPass={setShowForgetPass} />
        ) : (
          <LoginAdminFormComponent setShowForgetPass={setShowForgetPass} />
        )}
      </Paper>
      <ToastContainer />
    </main>
  );
};

export default LoginAdminForm;

import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/client/LoginPage.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendEmailToNewPassword } from "../../../apis/employee/useEmployeeFetch";
import { toast, ToastContainer } from "react-toastify";

interface Prop {
  setShowForgetPasswordForm: Dispatch<SetStateAction<boolean>>;
}

const ForgetPassForm = ({ setShowForgetPasswordForm }: Prop) => {
  const [values, setValues] = useState({
    email: "",
  });
  const toastAlertNotExistEmail = () => toast.error("El email no existe");
  const toastAlertSuccess = () =>
    toast.success("hemos enviado un mensaje a tu correo...");
  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      sendEmailToNewPassword("employees/forget-password", values).then(
        (res) => {
          console.log("res", res, values);
          localStorage.setItem("email", values.email);
          if (res.message === "Hubo un error") {
            toastAlertNotExistEmail();
          } else {
            toastAlertSuccess();
          }
        }
      );
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Debe de ser un email").required("Requerido"),
    }),
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div
        className={styles.menu}
        onClick={() => setShowForgetPasswordForm((state) => !state)}
      >
        <ArrowBackIosNewIcon />
        <span>Volver</span>
      </div>
      <p>Te enviaremos los siguientes pasos a tu correo</p>
      <ToastContainer />
      <div className={styles.field}>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          size="small"
          {...getFieldProps("email")}
        />
        {errors.email && touched.email && (
          <span className="text-danger ">{errors.email} </span>
        )}
      </div>

      <div className={styles.field}>
        <Button color="primary" type="submit">
          Enviar
        </Button>
      </div>
    </form>
  );
};

export default ForgetPassForm;

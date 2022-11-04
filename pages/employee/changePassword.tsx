import React, { useState, useContext, useEffect } from "react";
import LayoutEmployee from "./layoutEmployee";
import styles from "../../styles/employees/ChangePassword.module.css";
import { EmployeeContext } from "../../context/EmployeeContext";
import ButtonPrimary from "../../components/buttons/Button";
import useForm from "../../hooks/useForm";
import { ToastContainer, toast } from "react-toastify";
import { resetPassword } from "../../apis/employee/useEmployeeFetch";
import "react-toastify/dist/ReactToastify.css";

const ChangePasswordPage = () => {
  // const [password, setPassword] = useState("")
  // const [repeatPassword, setRepeatPassword] = useState("")
  const { password, onChange } = useForm({
    password: "",
  });
  const { employeeGlobal } = useContext(EmployeeContext);
  const [tokenValue, setTokenValue] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setTokenValue(token || "");
  }, []);

  const notifyWarning = () =>
    toast.warning("Necesitas escribir una nueva contraseña");
  const notifyWarningCharacter = () =>
    toast.warning("debe de ser mayor o igual a 6 caracteres");
  const notifySuccess = () => toast.success("Se ha modificado su contraseña");
  const notifyError = () => toast.success("Hubo un errror");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([password].includes("")) {
      notifyWarning();
      return;
    }
    if (password.length < 6) {
      notifyWarningCharacter();
      return;
    }
    resetPassword("employees/new-password", {
      email: employeeGlobal.email,
      token: tokenValue,
      password: password,
    })
      .then((res) => {
        console.log(res);
        if ((res.message = "La contraseña ha sido modificado")) {
          notifySuccess();
        }
      })
      .catch((err) => {
        notifyError();
      });
  };

  return (
    <LayoutEmployee name="Cambiar la contraseña">
      <h3>Cambia tu contraseña</h3>
      <ToastContainer />
      <form onSubmit={onSubmit}>
        <div className={styles.section}>
          <div className={styles.keyContainer}>
            <label>Nueva Contraseña: </label>
            <div className={styles.inputSection}>
              <input
                type="text"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <ButtonPrimary
          color="dark"
          content="guardar"
          onClick={() => console.log("jeje")}
          type="submit"
        />
      </form>
    </LayoutEmployee>
  );
};

export default ChangePasswordPage;

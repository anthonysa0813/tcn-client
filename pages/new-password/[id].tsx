import React, { useEffect, useState } from "react";
import ButtonPrimary from "../../components/buttons/Button";
import Navbar from "../../components/menu/Navbar";
import useForm from "../../hooks/useForm";
import styles from "../../styles/employees/ForgetPassword.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from "../../apis/employee/useEmployeeFetch";
import Router, { useRouter } from "next/router";

const NewPasswordPage = () => {
  // const router = useRouter()
  const { query } = useRouter();
  const token = query.id || "";

  const fieldsEmptys = () => toast.error("Todos los campos son obligatorios");
  const passwordNotEquals = () => toast.error("Las contraseñas no son iguales");
  const messageSuccess = () =>
    toast.success("Se ha modificado su contraseña ✌");
  const moreCharacters = () =>
    toast.warning("La contraseña debería de tener más o igual a 6 caracteres");
  const [currentEmail, setCurrentEmail] = useState("");

  useEffect(() => {
    console.log("jeje");
    const emailUser = localStorage.getItem("email");
    setCurrentEmail(emailUser || "");
  }, []);

  const { password, repeatPassword, onChange } = useForm({
    password: "",
    repeatPassword: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([password, repeatPassword].includes("")) {
      fieldsEmptys();
      return;
    }

    if (password !== repeatPassword) {
      passwordNotEquals();
      return;
    }

    if (password.length < 6) {
      moreCharacters();
      return;
    }

    resetPassword("employees/new-password", {
      email: currentEmail,
      password,
      token,
    }).then((res) => {
      messageSuccess();
    });
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <section className={styles.container}>
        <h4>Recuperar Contraseña</h4>
        <span>Te enviaremos un mensaje de confirmación a tu correo: </span>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.field}>
            <label htmlFor="">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="">Repetir Password:</label>
            <input
              type="password"
              name="repeatPassword"
              value={repeatPassword}
              onChange={onChange}
            />
          </div>
          <div className="field">
            <ButtonPrimary color="dark" content="Enviar" type="submit" />
          </div>
        </form>
      </section>
    </>
  );
};

export default NewPasswordPage;

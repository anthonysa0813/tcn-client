import React, { useState, ChangeEvent, useContext } from "react";
import styles from "../../styles/employees/ModalLogin.module.css";
import { IoIosCloseCircle } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { loginFetchApi } from "../../helpers/useFetch";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import {
  EmployeeContext,
  EmployeeContextProps,
} from "../../context/EmployeeContext";
import { useRouter } from "next/router";
import { Loading } from "@nextui-org/react";

interface Prop {
  setshowModalLogin: (state: boolean) => void;
}

const notify = () => toast.success("Bienvenido!");
const notifyWarning = () => toast.warning("email y password son requeridos");

const ModalLogin = ({ setshowModalLogin }: Prop) => {
  const { employeeGlobal, setEmployeeGlobal } =
    useContext<EmployeeContextProps>(EmployeeContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const closeModal = () => {
    setshowModalLogin(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      console.log("Todos los campos son obligatorios");
      notifyWarning();
      return;
    }
    setShowLoading(true);

    loginFetchApi("auth/employee/login", form).then((res) => {
      if (res.message) {
        const notifyErrorMessage = () => toast.error(res.message);
        notifyErrorMessage();
        setShowLoading(false);
      }
      if (res.employee) {
        localStorage.setItem("employee", JSON.stringify(res.employee));
        sessionStorage.setItem("token", res.token);
        Cookies.set("token", res.token, { expires: 7 });
        setEmployeeGlobal(res.employee);
        notify();
        setShowLoading(false);
        setTimeout(() => {
          setshowModalLogin(false);
          router.push("/employee/edit");
        }, 1500);
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.mainModal}>
        <div className={styles.modalContainer}>
          <h3>Inicia Sesión</h3>
          <form className={styles.form} onSubmit={handleSubmit}>
            <IoIosCloseCircle onClick={closeModal} />
            <div className={styles.field}>
              <label>Email: </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.field}>
              <label>Password: </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <button className={styles.button}>Iniciar Sesión</button>
            {showLoading && <Loading />}
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalLogin;

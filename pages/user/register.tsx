import { Input } from "@nextui-org/react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  MouseEvent,
  useEffect,
  useState,
  useContext,
} from "react";

import Navbar from "../../components/menu/Navbar";
import styles from "../../styles/users/RegisterUser.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeListener } from "process";
import {
  EmployeeContext,
  EmployeeContextProps,
} from "../../context/EmployeeContext";
import ButtonPrimary from "../../components/buttons/Button";
import Image from "next/image";
import ModalLogin from "../../components/employees/ModalLogin";
import { API_URL } from "../../utils/constanstApi";
import { loginFetchApi } from "../../helpers/useFetch";
import Cookies from "js-cookie";
import { Loading } from "@nextui-org/react";
import { EmployeeInterface } from "../../interfaces";

interface FormInterface {
  passwordFirst: string;
  confirmPassword: string;
  email: string;
}

const RegisterPage: NextPage = ({ data }: any) => {
  const [showModalLogin, setshowModalLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({} as EmployeeInterface);
  const {
    name,
    surnames,
    email,
    callingCode,
    country,
    message,
    cv,
    typeJob,
    phone,
    password,
    confirmPassword,
  } = formValues;
  const router = useRouter();
  const notify = () => toast.success("Se registró satisfactoriamente!");
  const notifyError = () => toast.error("Todos los campos son obligatorios");
  const notifyPasswordNotEquals = () =>
    toast.warning("Las contraseñas no coinciden");
  const notifyEmailValidation = () => toast.warning("Email inválido");
  const notifyPasswordCharacter = () =>
    toast.warning("La contraseña debería de ser mayor a 5 caracteres");
  const notifyErrorExtension = () =>
    toast.warning("La extensión del cv es incorrecto");
  const { employeeGlobal, setEmployeeGlobal } =
    useContext<EmployeeContextProps>(EmployeeContext);

  useEffect(() => {
    if (cv) {
      const extension = cv.type.split("/")[1];
      if (extension !== "pdf") {
        notifyErrorExtension();
      }
    }
  }, [cv]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const handleOption = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      callingCode: data.callingCode[e.target.value],
      country: data.countriesNames[e.target.value],
    });
  };

  const readInputTypeFile = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let dataform = new FormData();
    dataform.append("name", name);
    dataform.append("surnames", surnames);
    dataform.append("email", email);
    dataform.append("password", password || "");
    dataform.append("callingCode", callingCode || "");
    dataform.append("country", country || "");
    dataform.append("message", message || "");
    dataform.append("cv", cv);
    dataform.append("typeJob", typeJob || "");
    dataform.append("phone", phone || "");
    if (
      [
        name,
        surnames,
        email,
        password,
        callingCode,
        country,
        cv,
        phone,
      ].includes("")
    ) {
      notifyError();
      return;
    }
    if (confirmPassword !== password) {
      notifyPasswordNotEquals();
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      notifyEmailValidation();
      return;
    }
    if (password?.length <= 5) {
      notifyPasswordCharacter();
      return;
    }
    setIsLoading(true);
    sendData(dataform);
  };
  const sendData = async (dataObject: FormData) => {
    try {
      const res = await fetch(`${API_URL}/employees`, {
        method: "POST",
        body: dataObject,
      });
      const data = await res.json();
      console.log("se creo ", data);
      loginFetchApi("auth/employee/login", {
        email: data.email,
        password: data.password,
      }).then((resposeLogin) => {
        if (resposeLogin) {
          notify();
          Cookies.set("token", resposeLogin.token, { expires: 7 });
          setIsLoading(false);
          setTimeout(() => {
            router.push("/campaign");
          }, 1500);
        }
      });
      setEmployeeGlobal(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showModalLogin && <ModalLogin setshowModalLogin={setshowModalLogin} />}
      <ToastContainer />
      <Head>
        <title>Contact Bpo | registrarse</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Navbar /> */}
      <main className={styles.main}>
        <div className={styles.bannerColumn}></div>
        <div className={styles.registerSection}>
          <div className="wrapper">
            <h1>Registrate</h1>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
              <div className={styles.wrapper}>
                <div className={styles.formContent}>
                  <div className={styles.field}>
                    <label>
                      Nombres<span>(*)</span>:
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="">
                      Apellidos<span>(*)</span>:
                      <input
                        type="text"
                        name="surnames"
                        value={surnames}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="">
                      Email<span>(*)</span>:
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="">
                      Número de contacto<span>(*)</span>:
                      <input
                        type="number"
                        name="phone"
                        value={phone}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="">
                      Contraseña<span>(*)</span>:
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="">
                      Repetir Contraseña<span>(*)</span>:
                      <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="">
                      País<span>(*)</span>:
                      <select
                        name="callingCode"
                        onChange={handleOption}
                        className={styles.select}
                      >
                        <option value="--">Seleccione</option>
                        {Object.keys(data.countriesNames).map(
                          (country: any, index) => {
                            return (
                              <option key={index} value={country}>
                                {data.countriesNames[country]}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </label>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="">
                      CV(extensión del archivo: pdf)<span>(*)</span>:
                      <input
                        type="file"
                        name="cv"
                        onChange={readInputTypeFile}
                      />
                    </label>
                  </div>
                  <div className={styles.field}>
                    <span>(*): Campo obligatorio</span>
                  </div>

                  <div className={styles.buttonField}>
                    <button type="submit" className={styles.register}>
                      Registrarse
                    </button>
                    <button
                      className={styles.account}
                      type="button"
                      onClick={() => setshowModalLogin(true)}
                    >
                      Ya tengo cuenta
                    </button>
                    {isLoading && <Loading>Loading</Loading>}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
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

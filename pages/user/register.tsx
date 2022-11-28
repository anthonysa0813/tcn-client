import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
  useContext,
} from "react";

import styles from "../../styles/users/RegisterUser.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  EmployeeContext,
  EmployeeContextProps,
} from "../../context/EmployeeContext";

import ModalLogin from "../../components/employees/ModalLogin";
import { API_URL } from "../../utils/constanstApi";
import { loginFetchApi } from "../../helpers/useFetch";
import Cookies from "js-cookie";
import { EmployeeInterface } from "../../interfaces";
import Image from "next/image";
import Footer from "../../components/dashboard/clients/Footer";
// import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";

// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { BeatLoader } from "react-spinners";
// import RegisterForm from "../../components/dashboard/forms/RegisterForm";
import dynamic from "next/dynamic";

interface FormInterface {
  passwordFirst: string;
  confirmPassword: string;
  email: string;
}

const RegisterPage: NextPage = ({ data }: any) => {
  const [showModalLogin, setshowModalLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDesabled, setIsDesabled] = useState(false);
  const RegisterForm = dynamic(() =>
    import("../../components/dashboard/forms/RegisterForm").then(
      (res) => res.default
    )
  );

  const [formValues, setFormValues] = useState({} as EmployeeInterface);
  const [cvValue, setCvValue] = useState("" as any);
  const router = useRouter();
  const notifySuccess = () => toast.success("Se registró satisfactoriamente!");
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
    if (cvValue) {
      const extension = cvValue.type.split("/")[1];
      if (extension !== "pdf") {
        notifyErrorExtension();
      }
    }
    console.log(cvValue);
  }, [cvValue]);

  // const handleOption = (e: ChangeEvent<HTMLSelectElement>) => {
  //   setFormValues({
  //     ...formValues,
  //     callingCode: data.callingCode[e.target.value],
  //     country: data.countriesNames[e.target.value],
  //   });
  // };

  // const readInputTypeFile = (e: any) => {
  //   setCvValue(e.target.files[0]);
  // };

  // new logic
  const { errors, touched, getFieldProps, values } = useFormik({
    initialValues: {
      name: "",
      surnames: "",
      email: "",
      password: "",
      country: "",
      phone: "",
      repeatPassword: "",
    },
    onSubmit: (values) => {
      setIsLoading(true);
      let dataform = new FormData();
      dataform.append("name", values.name);
      dataform.append("surnames", values.surnames);
      dataform.append("email", values.email);
      dataform.append("password", values.password || "");
      // dataform.append("callingCode", callingCode || "");
      dataform.append("country", values.country || "");
      dataform.append("cv", cvValue);
      dataform.append("phone", values.phone || "");
      console.log("dataform", dataform);
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Requerido"),
      surnames: Yup.string().required("Requerido"),
      email: Yup.string().email("Debe de ser un email").required("Requerido"),
      password: Yup.string().required("Requerido"),
      repeatPassword: Yup.string()
        .required("Requerido")
        .oneOf([Yup.ref("password"), null], "Las contraseñas no son iguales"),
      country: Yup.string().required("Requerido"),
      phone: Yup.string().required("Requerido"),
    }),
  });

  const { country, email, name, password, phone, surnames } = values;
  useEffect(() => {
    if ([country, email, name, password, phone, surnames].includes("")) {
      setIsDesabled(true);
    } else {
      setIsDesabled(false);
    }
  }, [country, email, name, password, phone, surnames]);
  const sendData = async (dataObject: FormData) => {
    try {
      const res = await fetch(`${API_URL}/employees`, {
        method: "POST",
        body: dataObject,
      });
      const data = await res.json();
      loginFetchApi("auth/employee/login", {
        email: email,
        password: password,
      }).then((resposeLogin) => {
        if (resposeLogin) {
          // console.log("responseLogin", resposeLogin);
          notifySuccess();
          Cookies.set("token", resposeLogin.token, { expires: 7 });
          setIsLoading(false);
          setTimeout(() => {
            router.push("/campaign");
          }, 1500);
        }
      });
      console.log("dataaaa ====>", data);
      setEmployeeGlobal(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let dataform = new FormData();
    dataform.append("name", name);
    dataform.append("surnames", surnames);
    dataform.append("email", email);
    dataform.append("password", password || "");
    //  dataform.append("callingCode", callingCode || "");
    dataform.append("country", country || "");
    //  dataform.append("message", message || "");
    dataform.append("cv", cvValue);
    //  dataform.append("typeJob", typeJob || "");
    dataform.append("phone", phone || "");
    console.log("dataform", dataform);
    setIsLoading(true);
    sendData(dataform);
  };

  const [valuesSupport, setValuesSupport] = useState({
    password: "",
    showPassword: false,
    showRepeatPassword: false,
  });

  const handleClickShowPassword = () => {
    setValuesSupport({
      ...valuesSupport,
      showPassword: !valuesSupport.showPassword,
    });
  };

  const handleClickShowRepeatPassword = () => {
    setValuesSupport({
      ...valuesSupport,
      showRepeatPassword: !valuesSupport.showRepeatPassword,
    });
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
            <h1>Registrate</h1>
            <RegisterForm data={data} />
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

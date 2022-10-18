import React, {
  useState,
  useContext,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import LayoutEmployee from "./layoutEmployee";
import styles from "../../styles/users/Register.module.css";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import {
  EmployeeContext,
  EmployeeContextProps,
} from "../../context/EmployeeContext";
import { GetServerSideProps } from "next";
import { Button, Tooltip } from "@nextui-org/react";
import { ArrowRight } from "react-iconly";
import { HiOutlineMail } from "react-icons/hi";
import { BiWorld } from "react-icons/bi";
import { AiFillFileText } from "react-icons/ai";

const EditPage = ({ data }: any) => {
  const [formValues, setFormValues] = useState({
    name: "",
    surnames: "",
    email: "",
    callingCode: "",
    country: "",
    phone: "",
    message: "",
    cv: "",
    typeJob: "",
    password: "",
    confirmPassword: "",
  });
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
  const notify = () => toast.success("Se actualizó satisfactoriamente!");
  const { employeeGlobal, setEmployeeGlobal } =
    useContext<EmployeeContextProps>(EmployeeContext);

  const { id } = employeeGlobal;

  useEffect(() => {
    console.log(employeeGlobal);
    fetch(`http://localhost:5050/api/employees/${id}`)
      .then((res) => res.json())
      .then((data) => setFormValues(data));
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
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
    dataform.append("password", password);
    dataform.append("callingCode", callingCode);
    dataform.append("country", country);
    dataform.append("message", message);
    dataform.append("cv", cv);
    dataform.append("typeJob", typeJob);
    dataform.append("phone", phone);
    sendData(dataform);
  };

  const sendData = async (dataObject: FormData) => {
    try {
      const res = await fetch(`http://localhost:5050/api/employees/${id}`, {
        method: "PUT",
        body: dataObject,
      });
      const data = await res.json();
      notify();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LayoutEmployee name="editar información">
      <h1>Edita tu información</h1>
      <div className={styles.nextAction}>
        <Tooltip
          content={
            "Sí haz actualizado algun campo, primero guarda la información antes de ir a la siguiente pestaña..."
          }
          color="primary"
        >
          <Button onPress={() => router.push("/employee/moreDetails")}>
            agrega más información <ArrowRight />
          </Button>
        </Tooltip>
      </div>
      <ToastContainer />
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <div className={styles.textInfo}>
            <label>Nombres:</label>
            <span className={styles.subText}>
              Porfavor, escribir tus nombres completos.
            </span>
          </div>
          <div className="buttonContent">
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.textInfo}>
            <label htmlFor="">Apellidos:</label>
            <span className={styles.subText}>
              Porfavor, escribir tus Apellidos completos
            </span>
          </div>
          <div className="buttonContent">
            <input
              type="text"
              name="surnames"
              value={surnames}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.textInfo}>
            <label htmlFor="" className={styles.label}>
              <HiOutlineMail style={{ height: "30px", width: 30 }} />
              Email:
            </label>
            <span className={styles.subText}>Mantén un correo actualizado</span>
          </div>
          <div className="buttonContent">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.field}>
          <div className={styles.textInfo}>
            <label
              htmlFor="
            "
              className={styles.label}
            >
              <BiWorld style={{ height: "30px", width: 30 }} />
              Dónde vives:
            </label>
            <span className={styles.subText}>
              Conocer tu país nos dará mejor cobertura para informarnos con
              usted.
            </span>
          </div>
          <div className="buttonContent">
            <select
              name="callingCode"
              onChange={handleOption}
              className={styles.select}
            >
              {Object.keys(data.countriesNames).map((country: any, index) => {
                return (
                  <option key={index} value={country}>
                    {data.countriesNames[country]}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.textInfo}>
            <label htmlFor="" className={styles.label}>
              <AiFillFileText style={{ height: "30px", width: 30 }} />
              CV:
            </label>
            <span className={styles.subText}>
              Comparte tu cv para conocer un poco más sobre ti
            </span>
          </div>
          <div className="buttonContent">
            <input type="file" name="cv" onChange={readInputTypeFile} />
            <a
              href={employeeGlobal.cv}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cvText}
            >
              Ver mi cv
            </a>
          </div>
        </div>
        <div className={styles.optionsJob}>
          <h5 className={styles.titleJob}>
            ¿En qué modo le gustaría trabajar?
          </h5>
          <div className={styles.fieldJob}>
            <label>
              <input
                type="radio"
                value="PRESENCIAL"
                name="typeJob"
                id="typeJob"
                onChange={handleChange}
              />
              Presencial
            </label>
            <label>
              <input
                type="radio"
                value="REMOTO"
                name="typeJob"
                id="typeJob"
                onChange={handleChange}
              />
              Remoto
            </label>
            <label>
              <input
                type="radio"
                value="HIBRIDO"
                name="typeJob"
                id="typeJob"
                onChange={handleChange}
              />
              Híbrido
            </label>
          </div>
        </div>
        <div className={styles.buttonField}>
          <button type="submit" className={styles.register}>
            Editar
          </button>
        </div>
      </form>
    </LayoutEmployee>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // data de nombres de paises
  const res = await fetch("http://country.io/names.json");
  const data = await res.json();
  // data de código telefónico
  const resCode = await fetch("http://country.io/phone.json");
  const dataCode = await resCode.json();

  // current User
  return {
    props: {
      data: {
        countriesNames: data,
        callingCode: dataCode,
      },
    },
  };
};

export default EditPage;

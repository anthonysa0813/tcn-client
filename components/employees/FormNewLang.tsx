import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import styles from "../../styles/employees/FormNewLang.module.css";
import { Languages, nivels } from "../../utils/activitiesToBussiness";
import ButtonPrimary from "../buttons/Button";
import useForm from "../../hooks/useForm";
import { EmployeeInterface, LangResponse } from "../../interfaces";
import { createLang } from "../../apis/languages/useFetchLang";
import { Button } from "@nextui-org/react";
import DatalistInput from "react-datalist-input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Prop {
  openLang: () => void;
  setStateListLang: (state: any) => void;
  stateListLang: LangResponse[] | [];
}

const FormNewLang = ({ openLang, setStateListLang, stateListLang }: Prop) => {
  const [idEmployee, setIdEmployee] = useState("");
  const [error, setError] = useState(false);
  const [formLang, setFormLang] = useState("");
  const [formOral, setFormOral] = useState("");
  const [formWriter, setFormWriter] = useState("");
  const notifyError = () => toast.error("Todos los campos son obligatorios");
  const notifySuccess = () =>
    toast.success("Se ha agregado un nuevo idioma 👍");

  useEffect(() => {
    let id: EmployeeInterface | null = null;
    id = JSON.parse(localStorage.getItem("employee") || "");
    setIdEmployee(id?.id || "");
  }, [idEmployee, formLang, formOral, formWriter]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ([formLang, formOral, formWriter].includes("")) {
      setError(true);
      notifyError();
      return;
    }

    createLang("language", idEmployee, {
      lang: formLang,
      levelOral: formOral,
      levelWriter: formWriter,
      idEmployee,
    }).then((res) => {
      const existLang = stateListLang.find((l) => l._id === res._id);
      if (!existLang) {
        setStateListLang([...stateListLang, res]);
      }
      notifySuccess();
      setTimeout(() => {
        openLang();
      }, 2000);
    });
  };

  return (
    <form className={styles.formLang} onSubmit={handleSubmit}>
      <h2>Agrea un nuevo idioma</h2>
      <ToastContainer />
      <div className={styles.boxClose}>
        <IoIosCloseCircle onClick={openLang} className={styles.svg} />
      </div>
      <div className={styles.field}>
        <DatalistInput
          placeholder="Nombre del idioma"
          label="Selecciona porfavor el idioma"
          onSelect={(item) => setFormLang(item.value)}
          items={Languages}
        />
      </div>
      <div className={styles.field}>
        <DatalistInput
          placeholder="Nivel"
          label="Nivel de Escritura"
          onSelect={(item) => setFormWriter(item.value)}
          items={nivels}
        />
      </div>
      <div className={styles.field}>
        <DatalistInput
          placeholder="Nivel"
          label="Nivel Oral"
          onSelect={(item) => setFormOral(item.value)}
          items={nivels}
        />
      </div>
      {/* <ButtonPrimary color="dark" content="Guardar idioma" type="submit" /> */}
      {/* <button type="submit">Agregar idioma</button> */}
      <Button type="submit">Guardar</Button>
    </form>
  );
};

export default FormNewLang;

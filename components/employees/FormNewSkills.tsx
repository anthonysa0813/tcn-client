import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import styles from "../../styles/employees/FormNewSkills.module.css";
import {
  habilidades,
  habilidadesTech,
  skills,
} from "../../utils/activitiesToBussiness";
import ButtonPrimary from "../buttons/Button";
import DatalistInput from "react-datalist-input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createKnoledge } from "../../apis/knoledges/useKnoledges";
import { KnoledgeInterface } from "../../interfaces";
import { v4 as uuidv4 } from "uuid";
interface Prop {
  openSkill: () => void;
  idEmployee: string;
  knoledgesList: [] | KnoledgeInterface[];
  setKnoledgesList: React.Dispatch<
    React.SetStateAction<[] | KnoledgeInterface[]>
  >;
}

const FormNewSkills = ({
  openSkill,
  idEmployee,
  knoledgesList,
  setKnoledgesList,
}: Prop) => {
  const [expValue, setExpValue] = useState("");
  const [optionValue, setOptionValue] = useState("");
  const [client, setClient] = useState(false);
  const [tech, setTech] = useState(false);
  const [error, setError] = useState(false);
  const notifyError = () => toast.error("Todos los campos son obligatorios");
  const notifySuccess = () =>
    toast.success("Se ha agregado un nueva Habilidad 👍");

  useEffect(() => {
    if (optionValue === "atención al cliente") {
      setClient(true);
      setTech(false);
    }
    if (optionValue === "tecnología") {
      setClient(false);
      setTech(true);
    }
  }, [optionValue]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (expValue === "") {
      console.log("todos los campos son oblogatorios");
      setError(true);
      notifyError();
      return;
    }
    createKnoledge("knoledge", idEmployee, {
      name: expValue,
      employee: idEmployee,
    }).then((res) => {
      console.log(res);
      notifySuccess();
      setExpValue("");
      setKnoledgesList([...knoledgesList, res]);
    });
  };

  const options = [
    {
      id: uuidv4(),
      value: "atención al cliente",
    },
    {
      id: uuidv4(),
      value: "tecnología",
    },
  ];
  return (
    <form className={styles.formNewSkill} onSubmit={onSubmit}>
      <div className={styles.boxClose}>
        <IoIosCloseCircle onClick={openSkill} className={styles.svg} />
      </div>
      <h2>Añade una nueva Habilidad</h2>
      <ToastContainer />
      <div className={styles.field}>
        <DatalistInput
          placeholder=""
          label="Elige que tipo de habilidades deseas agregar"
          onSelect={(item) => setOptionValue(item.value)}
          items={options}
          value={optionValue}
        />
        {client && (
          <DatalistInput
            placeholder="Asistente"
            label="Agrega una habilidad y/o conocimiento que tengas"
            onSelect={(item) => setExpValue(item.value)}
            items={habilidades}
            value={expValue}
          />
        )}

        {tech && (
          <DatalistInput
            placeholder="Asistente"
            label="Agrega una habilidad en Tecnología (*opcional)"
            onSelect={(item) => setExpValue(item.value)}
            items={habilidadesTech}
            value={expValue}
          />
        )}

        <ButtonPrimary
          color="dark"
          content="Guardar"
          onClick={() => console.log("guardando skills")}
          type="submit"
        />
      </div>
    </form>
  );
};

export default FormNewSkills;

import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import styles from "../../styles/employees/FormNewSkills.module.css";
import {
  HabilitiesInNivelsExperience,
  HabilitiesInTimeExperienceYears,
  levels,
  skills,
  Years,
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
  const [expYears, setExpYears] = useState(false);
  const [expLevel, setExpLevel] = useState(false);
  const [yearsValue, setYearsValue] = useState("");
  const [levelValue, setLevelValue] = useState("");
  const [error, setError] = useState(false);
  const notifyError = () => toast.error("Todos los campos son obligatorios");
  const notifySuccess = () =>
    toast.success("Se ha agregado un nueva Habilidad 👍");

  useEffect(() => {
    if (optionValue === "Habilidades en tiempo de experiencia(años)") {
      setExpYears(true);
      setExpLevel(false);
    }
    if (optionValue === "Habilidades por niveles") {
      setExpYears(false);
      setExpLevel(true);
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
      level: expYears ? yearsValue : levelValue,
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
      value: "Habilidades en tiempo de experiencia(años)",
    },
    {
      id: uuidv4(),
      value: "Habilidades por niveles",
    },
  ];

  // formik

  return (
    <form className={styles.formNewSkill} onSubmit={onSubmit}>
      <div className={styles.boxClose}>
        <IoIosCloseCircle onClick={openSkill} className={styles.svg} />
      </div>
      <h1>Añade una nueva Habilidad</h1>
      <ToastContainer />
      <div className={styles.field}>
        <DatalistInput
          placeholder=""
          label="Elige que tipo de habilidades deseas agregar"
          onSelect={(item) => setOptionValue(item.value)}
          items={options}
          value={optionValue}
        />
        {expYears && (
          <>
            <DatalistInput
              placeholder="Call center"
              label="Elige una opción"
              onSelect={(item) => setExpValue(item.value)}
              items={HabilitiesInTimeExperienceYears}
              value={expValue}
            />
            <DatalistInput
              placeholder="1"
              label="Años en esta experiencia"
              onSelect={(item) => setYearsValue(item.value)}
              items={Years}
              value={yearsValue}
            />
          </>
        )}

        {expLevel && (
          <>
            <DatalistInput
              placeholder="Microsoft Office"
              label="Elige una habilidad"
              onSelect={(item) => setExpValue(item.value)}
              items={HabilitiesInNivelsExperience}
              value={expValue}
            />
            <DatalistInput
              placeholder="Básico"
              label="Añadir el nivel"
              onSelect={(item) => setLevelValue(item.value)}
              items={levels}
              value={levelValue}
            />
          </>
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

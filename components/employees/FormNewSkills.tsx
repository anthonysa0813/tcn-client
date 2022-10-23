import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import styles from "../../styles/employees/FormNewSkills.module.css";
import { skills } from "../../utils/activitiesToBussiness";
import ButtonPrimary from "../buttons/Button";
import DatalistInput from "react-datalist-input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createKnoledge } from "../../apis/knoledges/useKnoledges";
import { KnoledgeInterface } from "../../interfaces";
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
  const [error, setError] = useState(false);
  const notifyError = () => toast.error("Todos los campos son obligatorios");
  const notifySuccess = () =>
    toast.success("Se ha agregado un nueva Habilidad 👍");
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
  return (
    <form className={styles.formNewSkill} onSubmit={onSubmit}>
      <div className={styles.boxClose}>
        <IoIosCloseCircle onClick={openSkill} className={styles.svg} />
      </div>
      <h2>Añade una nueva Habilidad</h2>
      <ToastContainer />
      <div className={styles.field}>
        <DatalistInput
          placeholder="Asistente"
          label="Agrega una habilidad y/o conocimiento que tengas"
          onSelect={(item) => setExpValue(item.value)}
          items={skills}
          value={expValue}
        />
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

import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import styles from "../../styles/employees/FormNewSkills.module.css";
import { skills } from "../../utils/activitiesToBussiness";
import ButtonPrimary from "../buttons/Button";
import DatalistInput from "react-datalist-input";

interface Prop {
  openSkill: () => void;
}

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

const FormNewSkills = ({ openSkill }: Prop) => {
  const [expValue, setExpValue] = useState("");
  return (
    <form className={styles.formNewSkill} onSubmit={onSubmit}>
      <div className={styles.boxClose}>
        <IoIosCloseCircle onClick={openSkill} className={styles.svg} />
      </div>
      <h2>Añade una nueva Habilidad</h2>
      <div className={styles.field}>
        <DatalistInput
          placeholder="Asistente"
          label="Agrega una habilidad y/o conocimiento que tengas"
          onSelect={(item) => setExpValue(item.value)}
          items={skills}
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

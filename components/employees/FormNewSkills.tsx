import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import styles from "../../styles/employees/FormNewSkills.module.css";
import { skills } from "../../utils/activitiesToBussiness";
import ButtonPrimary from "../buttons/Button";

interface Prop {
  openSkill: () => void;
}

const FormNewSkills = ({ openSkill }: Prop) => {
  return (
    <form className={styles.formNewSkill}>
      <div className={styles.boxClose}>
        <IoIosCloseCircle onClick={openSkill} className={styles.svg} />
      </div>
      <h2>Añade una nueva Habilidad</h2>
      <span>Escribe una habilidad y/o conocimiento que tengas</span>
      <div className={styles.field}>
        <input
          list="skills"
          name="skill"
          id="skill"
          placeholder="Asistente de ventas"
        />
        <datalist id="skills">
          {Object.values(skills).map((skill) => {
            return (
              <option value={skill} key={skill}>
                {skill}
              </option>
            );
          })}
        </datalist>
        <ButtonPrimary
          color="dark"
          content="Guardar"
          onClick={() => console.log("guardando skills")}
          type="button"
        />
      </div>
    </form>
  );
};

export default FormNewSkills;

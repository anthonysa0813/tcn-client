import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import styles from "../../styles/employees/FormNewLang.module.css";
import { Languages, nivels } from "../../utils/activitiesToBussiness";
import ButtonPrimary from "../buttons/Button";

interface Prop {
  openLang: () => void;
}

const FormNewLang = ({ openLang }: Prop) => {
  return (
    <form className={styles.formLang}>
      <h2>Agrea un nuevo idioma</h2>
      <div className={styles.boxClose}>
        <IoIosCloseCircle onClick={openLang} className={styles.svg} />
      </div>
      <div className={styles.field}>
        <span>Idioma</span>
        <input list="languages" name="language" id="language" />
        <datalist id="languages">
          {Object.values(Languages).map((lang) => {
            return (
              <option value={lang} key={lang}>
                {lang}
              </option>
            );
          })}
        </datalist>
      </div>
      <div className={styles.field}>
        <span>Nivel Escrito</span>
        <input list="nivelsWriter" name="nivelsWrite" id="nivelsWrite" />
        <datalist id="nivelsWriter">
          {Object.values(nivels).map((nivel) => {
            return (
              <option value={nivel} key={nivel}>
                {nivel}
              </option>
            );
          })}
        </datalist>
      </div>
      <div className={styles.field}>
        <span>Nivel Oral</span>
        <input list="nivelsOrals" name="nivelsOral" id="nivelsOral" />
        <datalist id="nivelsOrals">
          {Object.values(nivels).map((nivel) => {
            return (
              <option value={nivel} key={nivel}>
                {nivel}
              </option>
            );
          })}
        </datalist>
      </div>
      <ButtonPrimary
        color="dark"
        content="Guardar idioma"
        onClick={() => console.log("heje")}
        type="button"
      />
    </form>
  );
};

export default FormNewLang;

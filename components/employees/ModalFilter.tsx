import React, { useEffect, useState } from "react";
import DatalistInput from "react-datalist-input";
import styles from "../../styles/admin/ModalFilter.module.css";
import { v4 as uuidv4 } from "uuid";
import { Languages, nivels, skills } from "../../utils/activitiesToBussiness";
import ButtonPrimary from "../buttons/Button";
import { IoIosCloseCircle } from "react-icons/io";
import { EmployeeInterface } from "../../interfaces";
import {
  getEmployeeByFilterHability,
  getEmployeeFilterByLanguage,
} from "../../apis/employee/useEmployeeFetch";

interface Prop {
  setShowModalFilters: React.Dispatch<React.SetStateAction<boolean>>;
  setEmployeeData: React.Dispatch<React.SetStateAction<EmployeeInterface[]>>;
}

const ModalFilter = ({ setShowModalFilters, setEmployeeData }: Prop) => {
  const [mainValue, setMainValue] = useState("");
  const [showLangInput, setShowLangInput] = useState(false);
  const [lang, setLang] = useState("");
  const [nivelLang, setNivelLang] = useState("");
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [skillValue, setSkillValue] = useState("");
  // getEmployeeByFilterHability;
  // getEmployeeFilterByLanguage;

  const options = [
    { id: uuidv4(), value: "idiomas" },
    { id: uuidv4(), value: "habilidades y/o conocimientos" },
  ];

  useEffect(() => {
    if (mainValue === "idiomas") {
      setShowLangInput(true);
    } else {
      setShowLangInput(false);
    }
    if (mainValue === "habilidades y/o conocimientos") {
      setShowSkillInput(true);
    } else {
      setShowSkillInput(false);
    }
    if (mainValue === "") {
      setShowSkillInput(false);
      setShowLangInput(false);
    }
  }, [mainValue]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (showLangInput) {
      getEmployeeFilterByLanguage("language", lang, nivelLang).then((res) => {
        const filterArr = res.filter((user: any) => user.employee !== null);
        console.log("resuultados: ", filterArr);
        setEmployeeData(filterArr);
      });
    }

    if (showSkillInput) {
      getEmployeeByFilterHability("knoledge", skillValue).then((res) => {
        console.log(res);
        let newArr = res.map((userResponse: any) => userResponse.employee);
        setEmployeeData(newArr);
      });
    }
  };

  return (
    <form className={styles.modalFilterGrid} onSubmit={onSubmit}>
      <div className={styles.boxClose}>
        <IoIosCloseCircle
          onClick={() => setShowModalFilters((state) => !state)}
          className={styles.svg}
        />
      </div>
      <h1>Elige las siguientes opciones</h1>
      <div className={styles.container}>
        <DatalistInput
          className={styles.dataList}
          placeholder=""
          label="Busca por idioma ó habilidades"
          onSelect={(item) => setMainValue(item.value)}
          items={options}
          value={mainValue}
        />
        {showLangInput && (
          <>
            <DatalistInput
              className={styles.dataList}
              placeholder=""
              label="Elige el idioma"
              onSelect={(item) => setLang(item.value)}
              items={Languages}
              value={lang}
            />
            <DatalistInput
              className={styles.dataList}
              placeholder=""
              label="Elige el nivel"
              onSelect={(item) => setNivelLang(item.value)}
              items={[...nivels, { id: uuidv4(), value: "todos" }]}
              value={nivelLang}
            />
          </>
        )}
        {showSkillInput && (
          <DatalistInput
            className={styles.dataList}
            placeholder=""
            label="Elige la habilidad"
            onSelect={(item) => setSkillValue(item.value)}
            items={skills}
            value={skillValue}
          />
        )}
      </div>
      <ButtonPrimary color="dark" content="Buscar" type="submit" />
    </form>
  );
};

export default ModalFilter;

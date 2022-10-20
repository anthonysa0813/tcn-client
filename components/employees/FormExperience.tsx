import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { CourntriesDataResponse } from "../../interfaces";
import styles from "../../styles/employees/Experience.module.css";
import {
  Area,
  countriesDataResponse,
  dataListActivities,
  Months,
  nivelExperience,
  subArea,
  years,
} from "../../utils/activitiesToBussiness";
import ButtonPrimary from "../buttons/Button";
import DatalistInput from "react-datalist-input";
import { useCurrentState } from "@nextui-org/react";

interface Prop {
  openExperience: () => void;
}

const FormExperience = ({ openExperience }: Prop) => {
  const [countriesData, setCountriesData] = useState({} as Object);
  const [checkPresent, setCheckPresent] = useState(false);
  const [activityValue, setActivityValue] = useState("");
  const [nivelExp, setNivelExp] = useState("");
  const [areaValue, setAreaValue] = useState("");
  const [subAreaValue, setSubAreaValue] = useState("");
  const [monthValue, setMonthValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [montFinal, setMontFinal] = useState("");
  const [yearFinal, setyearFinal] = useState("");
  useEffect(() => {
    const local: string = localStorage.getItem("countries") || "";
    const countries = JSON.parse(local);
    setCountriesData(countries);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={styles.formGrid} onSubmit={onSubmit}>
      <div className="experienceHead">
        <h1 className={styles.title}>Añade una nueva Experiencia</h1>
        <div className={styles.boxClose}>
          <IoIosCloseCircle onClick={openExperience} className={styles.svg} />
        </div>
      </div>
      <div className={styles.formBody}>
        <div className={styles.field}>
          <label htmlFor="">Empresa</label>
          <input type="text" name="empresa" placeholder="Ingresa el nombre" />
        </div>
        <div className={styles.field}>
          <DatalistInput
            className="dataList"
            placeholder="call center"
            label="Actividad de la empresa"
            onSelect={(item) => setActivityValue(item.value)}
            items={dataListActivities}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="">Puesto</label>
          <input type="text" placeholder="nombre del puesto" />
        </div>
        <div className={styles.field}>
          <DatalistInput
            className="dataList"
            placeholder=""
            label="Nivel de experiencia"
            onSelect={(item) => setNivelExp(item.value)}
            items={nivelExperience}
          />
        </div>
        <div className={styles.field}>
          <DatalistInput
            className="dataList"
            placeholder=""
            label="Área del Puesto"
            onSelect={(item) => setAreaValue(item.value)}
            items={Area}
          />
        </div>
        <div className={styles.field}>
          <DatalistInput
            className="dataList"
            placeholder=""
            label="Subárea"
            onSelect={(item) => setSubAreaValue(item.value)}
            items={subArea}
          />
        </div>
        <div className={styles.field}>
          <DatalistInput
            className="dataList"
            placeholder=""
            label="País"
            onSelect={(item) => setSubAreaValue(item.value)}
            items={countriesDataResponse}
          />
        </div>
        <div className={styles.fieldSecond}>
          <label htmlFor="">Fecha de Inicio</label>
          <div className={styles.fieldSecondaryGrid}>
            <div className={styles.firstInput}>
              <DatalistInput
                className="dataList"
                placeholder="Enero"
                label="Mes"
                onSelect={(item) => setMonthValue(item.value)}
                items={Months}
              />
            </div>
            <div className={styles.secondInput}>
              <DatalistInput
                className="dataList"
                placeholder=""
                label="Año"
                onSelect={(item) => setYearValue(item.value)}
                items={years}
              />
            </div>
          </div>
        </div>
        <div className={styles.fieldSecond}>
          <label htmlFor="">Fecha de Fin</label>
          <div className={styles.fieldSecondaryGrid}>
            <div className={styles.firstInput}>
              <DatalistInput
                className="dataList"
                placeholder=""
                label="Mes"
                onSelect={(item) => setMontFinal(item.value)}
                items={Months}
              />
            </div>
            <div className={styles.secondInput}>
              <DatalistInput
                className="dataList"
                placeholder=""
                label="Año"
                onSelect={(item) => setyearFinal(item.value)}
                items={years}
              />
            </div>
            <div className={styles.presentField}>
              <input
                type="radio"
                id="present"
                name="present"
                value="present"
                onClick={() => setCheckPresent(!checkPresent)}
                checked={checkPresent}
              />
              <span>Presente</span>
            </div>
          </div>
        </div>
        <div className={styles.fieldTextArea}>
          <span className="">Describa el puesto:</span>
          <textarea name="description" id="" cols={80} rows={10}></textarea>
        </div>
      </div>
      <ButtonPrimary
        color="dark"
        content="Guardar datos"
        onClick={() => console.log("jeje")}
        type="submit"
      />
    </form>
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

export default FormExperience;

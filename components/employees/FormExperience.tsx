import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { CourntriesDataResponse } from "../../interfaces";
import styles from "../../styles/employees/Experience.module.css";
import {
  Area,
  dataListActivities,
  Months,
  nivelExperience,
  subArea,
  years,
} from "../../utils/activitiesToBussiness";
import ButtonPrimary from "../buttons/Button";

interface Prop {
  openExperience: () => void;
}

const FormExperience = ({ openExperience }: Prop) => {
  const [countriesData, setCountriesData] = useState({} as Object);
  const [checkPresent, setCheckPresent] = useState(false);
  useEffect(() => {
    const local: string = localStorage.getItem("countries") || "";
    const countries = JSON.parse(local);
    setCountriesData(countries);
  }, []);

  return (
    <form className={styles.formGrid}>
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
          <label htmlFor="">Actividad de la empresa</label>
          <input
            list="activities"
            name="activity"
            id="activity"
            placeholder="tecnología..."
          />
          <datalist id="activities">
            {Object.values(dataListActivities).map((value) => {
              return (
                <option value={value} key={value}>
                  {value}
                </option>
              );
            })}
          </datalist>
        </div>
        <div className={styles.field}>
          <label htmlFor="">Puesto</label>
          <input type="text" placeholder="nombre del puesto" />
        </div>
        <div className={styles.field}>
          <label htmlFor="">Nivel de experiencia</label>
          <input
            list="experiences"
            name="experience"
            id="experience"
            placeholder="tecnología..."
          />
          <datalist id="experiences">
            {Object.values(nivelExperience).map((exp) => {
              return (
                <option value={exp} key={exp}>
                  {exp}
                </option>
              );
            })}
          </datalist>
        </div>
        <div className={styles.field}>
          <label htmlFor="">Área del Puesto</label>
          <input
            list="areas"
            name="area"
            id="area"
            placeholder="tecnología..."
          />
          <datalist id="areas">
            {Object.values(Area).map((a) => {
              return (
                <option value={a} key={a}>
                  {a}
                </option>
              );
            })}
          </datalist>
        </div>
        <div className={styles.field}>
          <label htmlFor="">Subárea</label>
          <input
            list="subareas"
            name="subarea"
            id="subarea"
            placeholder="tecnología..."
          />
          <datalist id="subareas">
            {Object.values(subArea).map((a) => {
              return (
                <option value={a} key={a}>
                  {a}
                </option>
              );
            })}
          </datalist>
        </div>
        <div className={styles.field}>
          <label htmlFor="">País</label>
          <input
            list="countries"
            name="country"
            id="country"
            placeholder="Perú..."
          />
          <datalist id="countries">
            {Object.values(countriesData).map((a) => {
              return (
                <option value={a} key={a}>
                  {a}
                </option>
              );
            })}
          </datalist>
        </div>
        <div className={styles.fieldSecond}>
          <label htmlFor="">Fecha de Inicio</label>
          <div className={styles.fieldSecondaryGrid}>
            <div className={styles.firstInput}>
              <span>Mes</span>
              <input
                list="startMonths"
                name="startMonth"
                id="startMonth"
                placeholder="Febrero"
              />
              <datalist id="startMonths">
                {Object.values(Months).map((month) => {
                  return (
                    <option value={month} key={month}>
                      {month}
                    </option>
                  );
                })}
              </datalist>
            </div>
            <div className={styles.secondInput}>
              <span>Año</span>
              <input
                list="startYears"
                name="startYear"
                id="startYear"
                placeholder="2019"
              />
              <datalist id="startYears">
                {Object.values(years).map((year) => {
                  return (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  );
                })}
              </datalist>
            </div>
          </div>
        </div>
        <div className={styles.fieldSecond}>
          <label htmlFor="">Fecha de Fin</label>
          <div className={styles.fieldSecondaryGrid}>
            <div className={styles.firstInput}>
              <span>Mes</span>
              <input
                list="endMonths"
                name="endMonth"
                id="endMonth"
                placeholder="Diciembre"
              />
              <datalist id="endMonths">
                {Object.values(Months).map((month) => {
                  return (
                    <option value={month} key={month}>
                      {month}
                    </option>
                  );
                })}
              </datalist>
            </div>
            <div className={styles.secondInput}>
              <span>Año</span>
              <input
                list="endYears"
                name="endYear"
                id="endYear"
                placeholder="2022"
              />
              <datalist id="endYears">
                {Object.values(years).map((year) => {
                  return (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  );
                })}
              </datalist>
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
        type="button"
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

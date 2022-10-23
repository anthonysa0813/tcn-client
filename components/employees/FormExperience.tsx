import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import {
  CourntriesDataResponse,
  EmployeeInterface,
  Experience,
} from "../../interfaces";
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
import useForm from "../../hooks/useForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createExperienceApi,
  updateExperience,
} from "../../apis/experience/useFecthExperience";
import { SetStateAction } from "react";
import { getDate } from "../../helpers/getDate";

interface Prop {
  openExperience: () => void;
  dataListExperiences: Experience[] | [];
  setDataListExperiences: React.Dispatch<SetStateAction<[] | Experience[]>>;
  editMode?: boolean;
  currentExperience?: Experience;
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormExperience = ({
  openExperience,
  dataListExperiences,
  setDataListExperiences,
  editMode,
  currentExperience,
  setEditMode,
}: Prop) => {
  const [countriesData, setCountriesData] = useState({} as Object);
  const [checkPresent, setCheckPresent] = useState(false);
  const [activityValue, setActivityValue] = useState("");
  const [country, setCountry] = useState("");
  const [countryRef, setCountryRef] = useState("");
  const [nivelExp, setNivelExp] = useState(
    editMode ? currentExperience?.level : ""
  );
  const [areaValue, setAreaValue] = useState("");
  const [subAreaValue, setSubAreaValue] = useState("");
  const [monthValue, setMonthValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [montFinal, setMontFinal] = useState("");
  const [yearFinal, setyearFinal] = useState("");
  const [idEmployee, setIdEmployee] = useState("");
  const [currentExperienceId, setCurrentExperienceId] = useState("");
  const [initialForm, setInitialForm] = useState({
    nameBussiness: editMode ? currentExperience?.nameBussiness : "",
    title: editMode ? currentExperience?.title : "",
    description: editMode ? currentExperience?.description : "",
    nameRef: editMode ? currentExperience?.nameRef : "",
    emailRef: editMode ? currentExperience?.emailRef : "",
    phoneRef: editMode ? currentExperience?.phoneRef : "",
  });

  const {
    nameBussiness,
    title,
    description,
    onChange,
    emailRef,
    nameRef,
    phoneRef,
  } = useForm(initialForm);
  const [error, setError] = useState(false);
  const notifyError = () => toast.error("Todos los campos son obligatorios");
  const notifySuccess = () =>
    toast.success("Se ha agregado un nueva experiencia 👍");
  const notifySuccessEdit = () => toast.success("Se ha editado 👌");

  useEffect(() => {
    const local: string = localStorage.getItem("countries") || "";
    const countries = JSON.parse(local);
    let id: EmployeeInterface | null = null;
    id = JSON.parse(localStorage.getItem("employee") || "");
    setIdEmployee(id?.id || "");
    setCountriesData(countries);
  }, []);

  useEffect(() => {
    const { month: initialMonth, year: initialYear } = getDate(
      currentExperience?.dateStart || ""
    );
    const { month: finalMonth, year: finalYear } = getDate(
      currentExperience?.dateEnd || ""
    );

    console.log({
      initialMonth,
      initialYear,
      finalMonth,
      finalYear,
    });
    setMonthValue(initialMonth);
    setYearValue(initialYear);
    setMontFinal(finalMonth);
    setyearFinal(finalYear);
    setCurrentExperienceId(currentExperience?._id || "");
    setCountry(currentExperience?.country || "");
    setAreaValue(currentExperience?.area || "");
    setSubAreaValue(currentExperience?.subarea || "");
    setActivityValue(currentExperience?.activyBussiness || "");
    setCountryRef(currentExperience?.countryRef || "");
  }, [currentExperience]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      [
        activityValue,
        nivelExp,
        areaValue,
        subAreaValue,
        monthValue,
        yearValue,
        montFinal,
        yearFinal,
      ].includes("")
    ) {
      setError(false);
      notifyError();
      return;
    }
    const dataForm = {
      title: title || "",
      nameBussiness: nameBussiness || "",
      activyBussiness: activityValue,
      description: description || "",
      area: areaValue,
      subarea: subAreaValue,
      country,
      level: nivelExp || "",
      dateStart: `${monthValue}/${yearValue}`,
      dateEnd: `${montFinal}/${yearFinal}`,
      currentJob: checkPresent,
      employee: idEmployee,
      nameRef,
      emailRef,
      countryRef,
      phoneRef,
    };
    if (editMode) {
      updateExperience(
        "experiences",
        idEmployee,
        currentExperienceId,
        dataForm
      ).then((res) => {
        notifySuccessEdit();
        const filterArrUpdate = dataListExperiences.filter(
          (exp) => exp._id !== res._id
        );
        setDataListExperiences([...filterArrUpdate, res]);
        setTimeout(() => {
          // openExperience();
          closeEditMode();
        }, 2000);
      });
    } else {
      createExperienceApi("experiences", dataForm, idEmployee).then((res) => {
        console.log(res);
        notifySuccess();
        setDataListExperiences([...dataListExperiences, res]);
        setTimeout(() => {
          openExperience();
        }, 2000);
      });
    }
  };

  const closeEditMode = () => {
    if (setEditMode) {
      setEditMode(false);
    }
  };

  return (
    <form className={styles.formGrid} onSubmit={onSubmit}>
      <div className="experienceHead">
        <ToastContainer />
        <h1 className={styles.title}>
          {editMode ? "Editar" : "Añade una nueva Experiencia"}
        </h1>
        <div className={styles.boxClose}>
          <IoIosCloseCircle
            onClick={editMode ? closeEditMode : openExperience}
            className={styles.svg}
          />
        </div>
      </div>
      <div className={styles.formBody}>
        <div className={styles.field}>
          <label htmlFor="">Empresa</label>
          <input
            type="text"
            name="nameBussiness"
            onChange={onChange}
            value={nameBussiness}
            placeholder="Ingresa el nombre"
          />
        </div>
        <div className={styles.field}>
          <DatalistInput
            className="dataList"
            placeholder="call center"
            label="Actividad de la empresa"
            onSelect={(item) => setActivityValue(item.value)}
            items={dataListActivities}
            value={activityValue}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="">Puesto</label>
          <input
            type="text"
            name="title"
            onChange={onChange}
            value={title}
            placeholder="nombre del puesto"
          />
        </div>
        <div className={styles.field}>
          <DatalistInput
            className="dataList"
            placeholder=""
            label="Nivel de experiencia"
            onSelect={(item) => setNivelExp(item.value)}
            items={nivelExperience}
            value={nivelExp}
          />
        </div>
        <div className={styles.field}>
          <DatalistInput
            className="dataList"
            placeholder=""
            label="Área del Puesto"
            onSelect={(item) => setAreaValue(item.value)}
            items={Area}
            value={areaValue}
          />
        </div>
        <div className={styles.field}>
          <DatalistInput
            className="dataList"
            placeholder=""
            label="Subárea"
            onSelect={(item) => setSubAreaValue(item.value)}
            items={subArea}
            value={subAreaValue}
          />
        </div>
        <div className={styles.field}>
          <DatalistInput
            className="dataList"
            placeholder=""
            label="País"
            onSelect={(item) => setCountry(item.value)}
            items={countriesDataResponse}
            value={country}
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
                value={monthValue}
              />
            </div>

            <div className={styles.secondInput}>
              <DatalistInput
                className="dataList"
                placeholder=""
                label="Año"
                onSelect={(item) => setYearValue(item.value)}
                items={years}
                value={yearValue}
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
                value={montFinal}
              />
            </div>
            <div className={styles.secondInput}>
              <DatalistInput
                className="dataList"
                placeholder=""
                label="Año"
                onSelect={(item) => setyearFinal(item.value)}
                items={years}
                value={yearFinal}
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
        <div className={styles.referenceField}>
          <div className={styles.titleReference}>
            <h5>Añade una referencia (*opcional)</h5>
          </div>

          {/*
           */}
          <div className={styles.field}>
            <label htmlFor="">Nombre de la Persona</label>
            <input
              type="text"
              name="nameRef"
              onChange={onChange}
              // value={nameBussiness}
              value={nameRef}
              placeholder="Ingresa el nombre"
            />
          </div>
          <div className={styles.field}>
            <DatalistInput
              className="dataList"
              placeholder="Peru"
              label="País"
              onSelect={(item) => setCountryRef(item.value)}
              items={countriesDataResponse}
              value={countryRef}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="">Email Corporativo</label>
            <input
              type="email"
              name="emailRef"
              onChange={onChange}
              value={emailRef}
              placeholder="example@empresa.com"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="">Número de tlf</label>
            <input
              type="number"
              name="phoneRef"
              onChange={onChange}
              value={phoneRef}
            />
          </div>
        </div>
        <div className={styles.fieldTextArea}>
          <span className="">Describa el puesto:</span>
          <textarea
            name="description"
            onChange={onChange}
            value={description}
            id=""
            cols={80}
            rows={10}
          ></textarea>
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

import React, { useState, useEffect, useContext } from "react";
import LayoutEmployee from "./layoutEmployee";
import styles from "../../styles/employees/Edit.module.css";
import { ArrowLeft, Calling, InfoCircle, ArrowRight } from "react-iconly";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Button, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/router";
import {
  BsFillFileEarmarkTextFill,
  BsFillArrowUpRightCircleFill,
  BsFillPlusCircleFill,
  BsFillXCircleFill,
} from "react-icons/bs";
import { GiPublicSpeaker, GiSkills } from "react-icons/gi";

import EditorProfile from "../../components/EditorProfile/EditorProfile";
import NewLanguage from "../../components/forms/NewLanguage";
import useLang from "../../hooks/useLang";
import ButtonPrimary from "../../components/buttons/Button";
import ModalComponent from "../../components/dashboard/ModalComponent";
import FormExperience from "../../components/employees/FormExperience";
import FormNewLang from "../../components/employees/FormNewLang";
import FormNewSkills from "../../components/employees/FormNewSkills";
import { GetServerSideProps } from "next";
import { API_URL_DEV } from "../../utils/constanstApi";
import {
  deleteLangByEmployee,
  getAllLanguagesByEmployee,
} from "../../apis/languages/useFetchLang";
import {
  EmployeeContext,
  EmployeeContextProps,
} from "../../context/EmployeeContext";
import { Experience, LangResponse } from "../../interfaces";
import { IoMdClose } from "react-icons/io";
import { getExperienceByEmployee } from "../../apis/experience/useFecthExperience";
import FormToDeleteExp from "../../components/employees/FormToDeleteExp";

const MoreDetails = () => {
  const router = useRouter();

  const [showModalToLang, setShowModalToLang] = useState(false);
  const [showModalExperience, setshowModalExperience] = useState(false);
  const [showModalSkills, setShowModalSkills] = useState(false);
  const [dataListExperiences, setDataListExperiences] = useState<
    Experience[] | []
  >([]);
  const [showModalToDelete, setshowModalToDelete] = useState(false);
  const { employeeGlobal, setEmployeeGlobal } =
    useContext<EmployeeContextProps>(EmployeeContext);

  const { id: idEmployee } = employeeGlobal;
  const openExperience = () => {
    setshowModalExperience((state) => !state);
  };
  const [stateListLang, setStateListLang] = useState<LangResponse[] | []>([]);
  const [currentExperience, setcurrentExperience] = useState<Experience>(
    {} as Experience
  );
  const [editMode, setEditMode] = useState(false);

  const openLang = () => {
    setShowModalToLang((state) => !state);
  };

  const openSkill = () => {
    setShowModalSkills((state) => !state);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    getAllLanguagesByEmployee(idEmployee).then((res) => {
      setStateListLang(res);
    });
    getExperienceByEmployee("experiences", idEmployee).then((res) => {
      setDataListExperiences(res);
    });
  }, []);

  const deleteLangCall = (idLang: string) => {
    deleteLangByEmployee(idLang).then((res) => {
      console.log(res);
      const filterLang = stateListLang.filter((l) => l._id !== idLang);
      setStateListLang(filterLang);
    });
  };

  return (
    <>
      <LayoutEmployee name="Seguir editando">
        <div className={styles.alert}>
          <span className={styles.alertCotent}>
            <InfoCircle set="bold" primaryColor="currentColor" />
            Tú información es importante para nosotros, porfavor date el tiempo
            de completar todos los espacios.
          </span>
        </div>
        <div className={styles.menu}>
          <Button
            onPress={() => router.back()}
            style={{ marginTop: 20, padding: 0 }}
          >
            <ArrowLeft />
            atrás
          </Button>
          {/* <Button
            onPress={() => router.push("/employee/skills")}
            style={{ marginTop: 20, padding: 0 }}
          >
            Añadir habilidades
            <ArrowRight />
          </Button> */}
        </div>
        <form onSubmit={onSubmit}>
          <div className={styles.field}>
            <div className="info">
              <div className={styles.titleHead}>
                <Calling set="bold" style={{ marginInline: ".5rem" }} />
                <p>Número Telefónico: </p>
              </div>
              <span className={styles.subText}>
                Guarda tu número telefónico, para no perder futuros proyectos
                juntos.
              </span>
            </div>
            <div className={styles.inputSection}>
              <input type="number" className={styles.input} />
            </div>
          </div>
          <div className={styles.field}>
            <div className="info">
              <div className={styles.titleHead}>
                <FaLinkedin
                  style={{
                    marginInline: ".5rem",
                    width: "20px",
                    height: "20px",
                  }}
                />
                <p>URL LinkeDln: </p>
              </div>
              <span className={styles.subText}>
                Comparte tu LinkeDin para saber más sobre ti.
              </span>
            </div>
            <div className={styles.inputSection}>
              <input type="text" className={styles.input} />
            </div>
          </div>
          <div className={styles.field}>
            <div className="info">
              <div className={styles.titleHead}>
                <FaGithub
                  style={{
                    marginInline: ".5rem",
                    width: "20px",
                    height: "20px",
                  }}
                />
                <p>URL GitHub: </p>
              </div>
              <span className={styles.subText}>
                Sí eres programador, compartenos tu repositorio.
              </span>
            </div>
            <div className={styles.inputSection}>
              <input type="text" className={styles.input} />
            </div>
          </div>
          <div className={styles.field}>
            <div className="info">
              <div className={styles.titleHead}>
                <GiSkills
                  style={{
                    marginInline: ".5rem",
                    width: "20px",
                    height: "20px",
                  }}
                />
                <p>Añade tus Habilidades y Conocimientos: </p>
              </div>
              <span className={styles.subText}>
                Escribe una palabra simple o compuesta.Ej: desarrollador
                Frontend
              </span>
            </div>
            <div className={styles.inputSection}>
              <Button
                onPress={() => setShowModalSkills(!showModalSkills)}
                style={{
                  marginTop: 20,
                  padding: 0,
                  marginInlineStart: 0,
                }}
                className={styles.button}
              >
                <BsFillPlusCircleFill />
                <p>Agregar una habilidad </p>
              </Button>
            </div>
          </div>
          <div className={`${styles.field}`}>
            <div className="info">
              <div className={styles.titleHead}>
                <GiPublicSpeaker
                  style={{
                    marginInline: ".5rem",
                    width: "20px",
                    height: "20px",
                  }}
                />
                <p>Idioma(s): </p>
              </div>
              <span className={styles.subText}>
                Agrega los idiomas que consideres que domincas
              </span>
              <div className={styles.listGridLang}>
                {stateListLang &&
                  stateListLang.map((language) => {
                    return (
                      <span key={language._id}>
                        {language.lang}
                        <IoMdClose
                          onClick={() => deleteLangCall(language._id)}
                        />
                      </span>
                    );
                  })}
              </div>
            </div>
            <div className={styles.inputSection}>
              <Button
                onPress={() => setShowModalToLang(!showModalToLang)}
                style={{
                  marginTop: 20,
                  padding: 0,
                  marginInlineStart: 0,
                }}
                className={styles.button}
              >
                <BsFillPlusCircleFill />
                <p>Agregar idioma</p>
              </Button>
            </div>
          </div>

          <div className={styles.profileProfesional}>
            <div className="info">
              <div className={`${styles.titleHead} ${styles.experienceHead}`}>
                <div className={styles.infoLeft}>
                  <BsFillFileEarmarkTextFill
                    style={{
                      marginInline: ".5rem",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                  <h3>Perfil Profesional y Experiencia: </h3>
                </div>
                <Button
                  onPress={openExperience}
                  style={{
                    padding: 0,
                    marginInlineStart: 0,
                  }}
                  className={styles.button}
                >
                  <BsFillPlusCircleFill />
                  <p>Agregar eperiencia</p>
                </Button>
              </div>
              <span className={styles.subText}>
                Los datos que ingreses será utilizados para futuras
                postulaciones.
              </span>
            </div>
            <div className={styles.experiencesList}>
              {dataListExperiences.length > 0 &&
                dataListExperiences.map((exp) => {
                  return (
                    <div key={exp._id} className={styles.experienceGrid}>
                      <div className={styles.infoExperience}>
                        <h5>{exp.title}</h5>
                        <span className={styles.titleBussiness}>
                          {exp.nameBussiness}
                        </span>
                        <div className="placeAndDate">
                          <span>
                            {exp.dateStart} - {exp.dateEnd}, {exp.country}
                          </span>
                        </div>
                        <div className="readMore">
                          <span>Leer completo</span>
                        </div>
                      </div>
                      <div className={styles.actionsExperiences}>
                        <BiEditAlt
                          onClick={() => {
                            setEditMode((state) => !state);
                            setcurrentExperience(exp);
                          }}
                        />
                        <MdDelete
                          onClick={() => {
                            setcurrentExperience(exp);
                            setshowModalToDelete((state) => !state);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* <EditorProfile /> */}
          <ButtonPrimary
            color="dark"
            content="Guardar"
            onClick={() => console.log("click")}
            type="submit"
          />
        </form>
      </LayoutEmployee>
      {showModalToDelete && (
        <ModalComponent>
          <FormToDeleteExp
            setshowModalToDelete={setshowModalToDelete}
            currentExperience={currentExperience}
            setDataListExperiences={setDataListExperiences}
            dataListExperiences={dataListExperiences}
          />
        </ModalComponent>
      )}

      {showModalExperience && (
        <ModalComponent>
          <FormExperience
            openExperience={openExperience}
            dataListExperiences={dataListExperiences}
            setDataListExperiences={setDataListExperiences}
          />
        </ModalComponent>
      )}
      {editMode && (
        <ModalComponent>
          <FormExperience
            openExperience={openExperience}
            dataListExperiences={dataListExperiences}
            setDataListExperiences={setDataListExperiences}
            editMode={editMode}
            currentExperience={currentExperience}
            setEditMode={setEditMode}
          />
        </ModalComponent>
      )}
      {showModalToLang && (
        <ModalComponent>
          <FormNewLang
            openLang={openLang}
            setStateListLang={setStateListLang}
            stateListLang={stateListLang}
          />
        </ModalComponent>
      )}

      {showModalSkills && (
        <ModalComponent>
          <FormNewSkills openSkill={openSkill} />
        </ModalComponent>
      )}
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   // data de nombres de paises
//   const response = await fetch(`${API_URL_DEV}/language/all/${idEmployee}`);
//   const data = await response.json();

//   // current User
//   return {
//     props: {
//       data: {
//         languagesList: []
//       },
//     },
//   };
// };

export default MoreDetails;

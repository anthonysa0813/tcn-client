import React, { useState, useEffect } from "react";
import LayoutEmployee from "./layoutEmployee";
import styles from "../../styles/employees/Edit.module.css";
import { ArrowLeft, Calling, InfoCircle, ArrowRight } from "react-iconly";
import { FaLinkedin, FaGithub } from "react-icons/fa";
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

const MoreDetails = () => {
  const router = useRouter();
  // const {
  //   addCounter,
  //   showLang,
  //   counterLang,
  //   language2,
  //   language3,
  //   language4,
  //   close,
  // } = useLang();
  // useEffect(() => {
  //   showLang();
  // }, [counterLang]);
  const [showModalToLang, setShowModalToLang] = useState(false);
  const [showModalExperience, setshowModalExperience] = useState(false);
  const [showModalSkills, setShowModalSkills] = useState(false);
  const openExperience = () => {
    setshowModalExperience((state) => !state);
  };

  const openLang = () => {
    setShowModalToLang((state) => !state);
  };

  const openSkill = () => {
    setShowModalSkills((state) => !state);
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
          <Button
            onPress={() => router.push("/employee/skills")}
            style={{ marginTop: 20, padding: 0 }}
          >
            Añadir habilidades
            <ArrowRight />
          </Button>
        </div>
        <form>
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
          <div className={styles.field}>
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
          </div>
          {showModalExperience && (
            <ModalComponent>
              <FormExperience openExperience={openExperience} />
            </ModalComponent>
          )}
          {showModalToLang && (
            <ModalComponent>
              <FormNewLang openLang={openLang} />
            </ModalComponent>
          )}

          {showModalSkills && (
            <ModalComponent>
              <FormNewSkills openSkill={openSkill} />
            </ModalComponent>
          )}

          {/* <EditorProfile /> */}
          <ButtonPrimary
            color="dark"
            content="Guardar"
            onClick={() => console.log("click")}
            type="button"
          />
        </form>
      </LayoutEmployee>
    </>
  );
};

export default MoreDetails;

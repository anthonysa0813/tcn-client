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
import { GiPublicSpeaker } from "react-icons/gi";

import EditorProfile from "../../components/EditorProfile/EditorProfile";
import NewLanguage from "../../components/forms/NewLanguage";
import useLang from "../../hooks/useLang";
import ButtonPrimary from "../../components/buttons/Button";

const MoreDetails = () => {
  const router = useRouter();
  const {
    addCounter,
    showLang,
    counterLang,
    language2,
    language3,
    language4,
    close,
  } = useLang();
  useEffect(() => {
    showLang();
  }, [counterLang]);

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
                <GiPublicSpeaker
                  style={{
                    marginInline: ".5rem",
                    width: "20px",
                    height: "20px",
                  }}
                />
                <p>Idioma: </p>
              </div>
              <span className={styles.subText}>
                Ejmplo: {"Inglés - intermedio"}.
              </span>
              <div className={styles.titleHeadSecondary}>
                <BsFillArrowUpRightCircleFill />
                <p>Nivel: </p>
              </div>
            </div>
            <div className={styles.inputSection}>
              <input type="text" className={styles.input} />
              <select id="">
                <option value="">Seleccione</option>
                <option value="Principiante">Principiante</option>
                <option value="Conversacional">Conversacional</option>
                <option value="Fluido">Fluído</option>
              </select>
              <Button
                onPress={addCounter}
                style={{
                  marginTop: 20,
                  padding: 0,
                  marginInlineStart: 0,
                  marginInlineEnd: "-1rem",
                }}
                className={styles.button}
              >
                <BsFillPlusCircleFill />
                <p>Agregar otro idioma</p>
              </Button>
            </div>
          </div>
          {language2 && (
            <>
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
                    <p>Idioma 2: </p>
                  </div>
                  <span className={styles.subText}>
                    Ejmplo: {"Inglés - intermedio"}.
                  </span>
                  <div className={styles.titleHeadSecondary}>
                    <BsFillArrowUpRightCircleFill />
                    <p>Nivel: </p>
                  </div>
                </div>
                <div className={styles.inputSection}>
                  <input type="text" className={styles.input} />
                  <select id="">
                    <option value="">Seleccione</option>
                    <option value="Principiante">Principiante</option>
                    <option value="Conversacional">Conversacional</option>
                    <option value="Fluido">Fluído</option>
                  </select>
                  <Button
                    onPress={() => close(2)}
                    style={{ marginTop: 20, padding: 0 }}
                    className={styles.button}
                  >
                    <BsFillXCircleFill />
                    <p>eliminar</p>
                  </Button>
                </div>
              </div>
            </>
          )}
          {language3 && (
            <>
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
                    <p>Idioma 3: </p>
                  </div>
                  <span className={styles.subText}>
                    Ejmplo: {"Inglés - intermedio"}.
                  </span>
                  <div className={styles.titleHeadSecondary}>
                    <BsFillArrowUpRightCircleFill />
                    <p>Nivel: </p>
                  </div>
                </div>
                <div className={styles.inputSection}>
                  <input type="text" className={styles.input} />
                  <select id="">
                    <option value="">Seleccione</option>
                    <option value="Principiante">Principiante</option>
                    <option value="Conversacional">Conversacional</option>
                    <option value="Fluido">Fluído</option>
                  </select>
                  <Button
                    onPress={() => close(3)}
                    style={{ marginTop: 20, padding: 0 }}
                    className={styles.button}
                  >
                    <BsFillXCircleFill />
                    <p>eliminar</p>
                  </Button>
                </div>
              </div>
            </>
          )}
          {language4 && (
            <>
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
                    <p>Idioma 4: </p>
                  </div>
                  <span className={styles.subText}>
                    Ejmplo: {"Inglés - intermedio"}.
                  </span>
                  <div className={styles.titleHeadSecondary}>
                    <BsFillArrowUpRightCircleFill />
                    <p>Nivel: </p>
                  </div>
                </div>
                <div className={styles.inputSection}>
                  <input type="text" className={styles.input} />
                  <select id="">
                    <option value="">Seleccione</option>
                    <option value="Principiante">Principiante</option>
                    <option value="Conversacional">Conversacional</option>
                    <option value="Fluido">Fluído</option>
                  </select>
                  <Button
                    onPress={() => close(4)}
                    style={{ marginTop: 20, padding: 0 }}
                    className={styles.button}
                  >
                    <BsFillXCircleFill />
                    <p>eliminar</p>
                  </Button>
                </div>
              </div>
            </>
          )}

          <div className={styles.profileProfesional}>
            <div className="info">
              <div className={styles.titleHead}>
                <BsFillFileEarmarkTextFill
                  style={{
                    marginInline: ".5rem",
                    width: "20px",
                    height: "20px",
                  }}
                />
                <h3>Perfil Profesional y Experiencia: </h3>
              </div>
              <span className={styles.subText}>
                Los datos que ingreses será utilizados para futuras
                postulaciones.
              </span>
            </div>
          </div>
          <EditorProfile />
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

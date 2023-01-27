import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import {
  EmployeeContext,
  EmployeeContextProps,
} from "../../../context/EmployeeContext";
import {
  EmployeeInterface,
  Service,
  ServiceI,
} from "../../../interfaces/index";
import styles from "../../../styles/client/Campaign.module.css";
// import ModalShowService from "./ModalShowService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { getEmployeeById } from "../../../apis/employee/useEmployeeFetch";

interface Prop {
  service: ServiceI;
}
const ModalShowService = dynamic(() =>
  import("./ModalShowService").then((res) => res.default)
);

const ServiceCard = ({ service }: Prop) => {
  const { employeeGlobal, setEmployeeGlobal } =
    useContext<EmployeeContextProps>(EmployeeContext);
  const [showModal, setShowModal] = useState(false);
  const [servicesId, setServisceId] = useState([] as string[]);
  const [currentServiceId, setCurrentServiceId] = useState("");
  const [isPostulate, setIsPostulate] = useState(false);
  const [idEmployee, setIdEmployee] = useState("");
  const [employeeUnparse, setEmployeeUnparse] = useState("");

  const router = useRouter();

  useEffect(() => {
    console.log("services :D", service);
    const resEmployeeLocalStorage =
      window.localStorage.getItem("employee") || "";
    if (Boolean(resEmployeeLocalStorage)) {
      const getId: EmployeeInterface = JSON.parse(
        localStorage.getItem("employee") || ""
      );
      setEmployeeGlobal(getId);
      setIdEmployee(getId.id);
    }
  }, []);

  useEffect(() => {
    if (idEmployee) {
      getEmployeeById("employees", idEmployee).then((res) => {
        setServisceId(res?.servicesId || []);
        setCurrentServiceId(service._id);
        const isValid = servicesId.includes(currentServiceId);
        console.log("isValid", isValid);
        setIsPostulate(isValid);
      });
    }
  }, [currentServiceId, idEmployee]);

  const applicationJob = (idJob: string = "") => {
    if (!employeeGlobal.id) {
      const notify = () => toast.error("Necesitas de una cuenta registrada");
      notify();
      setTimeout(() => {
        router.push("/user/register");
      }, 700);
    }
    const employeeId = employeeGlobal.id;
    fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/employees/${employeeId}/${idJob}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        if (data.messageError) {
          const notifyError = () => toast.error(data.messageError);
          notifyError();
        } else {
          const notify = () => toast.success(data.message);
          notify();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {showModal && (
        <ModalShowService service={service} setShowModal={setShowModal} />
      )}
      <div
        className={`${styles.card} ${
          isPostulate ? styles.isPostulateActive : ""
        }`}
      >
        <ToastContainer />
        <div className={styles.titleContainer}>
          <h4 className={styles.title}>{service.title}</h4>
          <span
            className={!service.status ? `${styles.desactiveAnnounce}` : ""}
          >
            {service.status ? "Activo" : "Finalizado"}
          </span>
        </div>
        <div className={styles.infoContainer}>
          <p dangerouslySetInnerHTML={{ __html: service.description }}></p>
        </div>
        <div className={styles.actions}>
          <button className={styles.button} onClick={() => setShowModal(true)}>
            ver más a detalle
          </button>
          <button
            className={`${isPostulate ? styles.buttonDisabled : styles.button}`}
            onClick={() => applicationJob(service?._id)}
            disabled={isPostulate ? true : false}
          >
            {isPostulate ? "Postulado" : "Postular"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;

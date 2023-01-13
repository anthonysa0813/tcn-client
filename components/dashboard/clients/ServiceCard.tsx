import React, { useState, useContext, useEffect } from "react";
import {
  EmployeeContext,
  EmployeeContextProps,
} from "../../../context/EmployeeContext";
import { Service } from "../../../interfaces/index";
import styles from "../../../styles/client/Campaign.module.css";
// import ModalShowService from "./ModalShowService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { API_URL } from "../../../utils/constanstApi";
import dynamic from "next/dynamic";
import { getEmployeeById } from "../../../apis/employee/useEmployeeFetch";

interface Prop {
  service: Service;
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

  const router = useRouter();

  useEffect(() => {
    // setServisceId(employeeGlobal?.servicesId || []);
    if (employeeGlobal.id) {
      getEmployeeById("employees", employeeGlobal.id).then((res) => {
        console.log("res", res);
        setServisceId(res?.servicesId || []);
        setCurrentServiceId(service._id);
        const isValid = servicesId.includes(currentServiceId);
        setIsPostulate(isValid);
      });
    }
  }, [currentServiceId]);

  const applicationJob = (idJob: string = "") => {
    if (!employeeGlobal.id) {
      const notify = () => toast.error("Necesitas de una cuenta registrada");
      notify();
      setTimeout(() => {
        router.push("/user/register");
      }, 700);
    }
    const employeeId = employeeGlobal.id;
    fetch(`${API_URL}/employees/${employeeId}/${idJob}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        if (data.messageError) {
          const notifyError = () => toast.error(data.messageError);
          notifyError();
        } else {
          const notify = () => toast.success("Aplicaste a este puesto");
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
          <h4 className={styles.companyTitle}>{service.company}</h4>
        </div>
        <div className={styles.infoContainer}>
          {/* <p>{service.description}</p> */}
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

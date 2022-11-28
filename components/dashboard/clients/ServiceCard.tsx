import React, { useState, useContext } from "react";
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
  const router = useRouter();

  const applicationJob = (idJob: string = "") => {
    if (!employeeGlobal.id) {
      const notify = () => toast.error("Necesitas de una cuenta registrada");
      notify();
      setTimeout(() => {
        router.push("/user/register");
      }, 250);
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
      <div className={styles.card}>
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
            className={styles.button}
            onClick={() => applicationJob(service?._id)}
          >
            Postular
          </button>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;

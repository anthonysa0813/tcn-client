import React, { useContext } from "react";
import { formatDate } from "../../../helpers/formatDate";
import { Service } from "../../../interfaces";
import styles from "../../../styles/client/Campaign.module.css";
import { IoIosCloseCircle } from "react-icons/io";
import { useRouter } from "next/router";
import {
  EmployeeContext,
  EmployeeContextProps,
} from "../../../context/EmployeeContext";
import { toast } from "react-toastify";
import { API_URL } from "../../../utils/constanstApi";

interface Prop {
  service: Service;
  setShowModal: (state: boolean) => void;
}

const ModalShowService = ({ service, setShowModal }: Prop) => {
  const { employeeGlobal, setEmployeeGlobal } =
    useContext<EmployeeContextProps>(EmployeeContext);
  const router = useRouter();

  const closeModal = () => {
    setShowModal(false);
  };

  const applicationJob = async (idJob: string = "") => {
    if (!employeeGlobal.id) {
      const notify = () => toast.error("Necesitas de una cuenta registrada");
      notify();
      setTimeout(() => {
        router.push("/user/register");
      }, 1500);
    }
    const employeeId = employeeGlobal.id;
    await fetch(`${API_URL}/employees/${employeeId}/${idJob}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        const notify = () => toast.success("Aplicaste a este puesto");
        notify();
      });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>
        <IoIosCloseCircle onClick={closeModal} />
        <div className="headModal">
          <h4>{service.title}</h4>
          <h4>{service.company}</h4>
        </div>
        <div className={styles.infoBody}>
          <p dangerouslySetInnerHTML={{ __html: service.description }}></p>
        </div>
        <div className="infoDate">
          <span>Fecha de Publicación: {formatDate(service.createdAt)}</span>
        </div>
        {/* <div className="actions">
          <button
            className={styles.button}
            onClick={() => applicationJob(service._id)}
          >
            Aplicar
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ModalShowService;

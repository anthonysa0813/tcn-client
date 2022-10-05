import React from 'react';
import { formatDate } from '../../../helpers/formatDate';
import { Service } from '../../../interfaces';
import styles from "../../../styles/client/Campaign.module.css";
import {IoIosCloseCircle} from "react-icons/io"

interface Prop {
    service: Service,
    setShowModal: (state: boolean) => void
}

const ModalShowService = ({service, setShowModal}: Prop) => {

    const closeModal = () => {
        setShowModal(false);
    }
  return (
    <div className={styles.modal}>
        <div className={styles.modalContainer}>
            <IoIosCloseCircle onClick={closeModal} />
            <div className="headModal">
                <h4>{service.title}</h4>
                <h4>{service.company}</h4>
            </div>
            <div className="infoBody">
                <p dangerouslySetInnerHTML={{ __html: service.description }}></p>
            </div>
            <div className="infoDate">
                <span>Fecha de Publicación: {formatDate(service.createdAt)}</span>
            </div>
            <div className="actions">
                <button className={styles.button}>Aplicar</button>
            </div>
        </div>
    </div>
  )
}

export default ModalShowService
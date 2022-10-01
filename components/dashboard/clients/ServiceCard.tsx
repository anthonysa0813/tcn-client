import React, {useState} from 'react'
import { Service } from '../../../interfaces/index';
import styles from "../../../styles/client/Campaign.module.css";
import ModalShowService from './ModalShowService';


interface Prop {
    service: Service;
}

const ServiceCard = ({service}: Prop) => {
    const [showModal, setShowModal] = useState(false)
  return (
    <>
    {
        showModal && <ModalShowService service={service} setShowModal={setShowModal} />
    }
    <div className={styles.card}>
        <div className={styles.titleContainer}>
            <h4 className={styles.title}>{service.title}</h4>
            <h4 className={styles.companyTitle}>{service.company}</h4>
        </div>
        <div className={styles.infoContainer}>
            <p>{service.description}</p>
        </div>
        <div className={styles.actions}>
            <button className={styles.button} onClick={() => setShowModal(true)}>ver más a detalle</button>
            <button className={styles.button}>aplicar</button>
        </div>
    </div>
    </>
  )
}

export default ServiceCard
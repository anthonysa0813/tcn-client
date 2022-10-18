import React, {useState, useContext} from 'react'
import { EmployeeContext, EmployeeContextProps } from '../../../context/EmployeeContext';
import { Service } from '../../../interfaces/index';
import styles from "../../../styles/client/Campaign.module.css";
import ModalShowService from './ModalShowService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';


interface Prop {
    service: Service;
}


const ServiceCard = ({service}: Prop) => {
    const {employeeGlobal, setEmployeeGlobal} = useContext<EmployeeContextProps>(EmployeeContext);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter()
   
    
    const applicationJob = (idJob: string = "") => {
        if(!employeeGlobal.id){
            const notify = () => toast.error("Necesitas de una cuenta registrada");
            notify();
            setTimeout(() => {
                router.push("/user/register")
            }, 1500)
        }
        const employeeId = employeeGlobal.id;
        fetch(`http://localhost:5050/api/employees/${employeeId}/${idJob}`, {
            method: 'POST',
        })
            .then(res => res.json())
            .then(data => {
                const notify = () => toast.success("Aplicaste a este puesto");
                notify()
            })
    }

    return (
        <>
    {
        showModal && <ModalShowService service={service} setShowModal={setShowModal} />
    }
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
            <button className={styles.button} onClick={() => setShowModal(true)}>ver más a detalle</button>
            <button className={styles.button} onClick={() => applicationJob(service?._id)}>aplicar</button>
        </div>
    </div>
    </>
  )
}

export default ServiceCard
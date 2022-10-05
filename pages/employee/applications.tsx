
import { GetServerSideProps } from 'next'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { EmployeeContext, EmployeeContextProps } from '../../context/EmployeeContext';
import { EmployeeInterface, Service } from '../../interfaces';
import LayoutEmployee from './layoutEmployee';
import styles from "../../styles/employees/Applications.module.css";


interface DataProp {
    data: EmployeeInterface
}

const ApplicationsPage = () => {
    const {employeeGlobal, setEmployeeGlobal} = useContext<EmployeeContextProps>(EmployeeContext);
    const [applicationsState, setApplicationsState] = useState<Service[] | []>([])

    useLayoutEffect(() => {
        getInfo(employeeGlobal.id);
        console.log("employeeGlobal ========= ", employeeGlobal)
    }, [])

    const getInfo = async (id: string) => {
        const res = await fetch(`http://localhost:5050/api/employees/${id}`);
        const  data = await res.json();
        console.log("data", data);
        setApplicationsState(data.service);
    }
    return (
        <>
        <LayoutEmployee name="aplicaciones de trabajo">
            <h4>Aplicaciones</h4>
            <div className={styles.applicationsGrid}>
                {
                    applicationsState.map((service: Service) => {
                       return (
                        <div key={service._id} className={styles.serviceCard}>
                            <h4>{service.title}</h4>
                            <button>ver los detalles</button>
                        </div>
                       ) 
                    })
                }
            </div>
        </LayoutEmployee>
    </>
  )
}




export default ApplicationsPage
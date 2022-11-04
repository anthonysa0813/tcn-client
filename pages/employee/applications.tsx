import { GetServerSideProps } from "next";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  EmployeeContext,
  EmployeeContextProps,
} from "../../context/EmployeeContext";
import { EmployeeInterface, Service } from "../../interfaces";
import LayoutEmployee from "./layoutEmployee";
import styles from "../../styles/employees/Applications.module.css";
import { API_URL } from "../../utils/constanstApi";
import { IoIosArrowUp } from "react-icons/io";
import "animate.css";

interface DataProp {
  data: EmployeeInterface;
}
const CardCollapse = dynamic(
  () => import("../../components/dashboard/employee/CardCollapse"),
  {
    ssr: false,
  }
);

const ApplicationsPage = () => {
  const { employeeGlobal, setEmployeeGlobal } =
    useContext<EmployeeContextProps>(EmployeeContext);
  const [applicationsState, setApplicationsState] = useState<Service[] | []>(
    []
  );
  const [activeDetails, setActiveDetails] = useState(false);
  const [currentService, setCurrentService] = useState("");

  useLayoutEffect(() => {
    getInfo(employeeGlobal.id);
    console.log("employeeGlobal ========= ", employeeGlobal);
  }, []);

  const getInfo = async (id: string) => {
    const res = await fetch(`${API_URL}/employees/${id}`);
    const data = await res.json();
    const setArr = new Set(data.service);
    setApplicationsState(data.service);
  };
  return (
    <>
      <LayoutEmployee name="aplicaciones de trabajo">
        <div className={styles.wrapper}>
          <h4>Mis Postulaciones</h4>
          <div className={styles.applicationsGrid}>
            {applicationsState.map((service: Service, index) => {
              return <CardCollapse key={service._id} service={service} />;
            })}
          </div>
        </div>
      </LayoutEmployee>
    </>
  );
};

export default ApplicationsPage;

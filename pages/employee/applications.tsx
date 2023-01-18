// import { GetServerSideProps } from "next";
import React, { useContext, useLayoutEffect, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  EmployeeContext,
  EmployeeContextProps,
} from "../../context/EmployeeContext";
import { EmployeeInterface, Service } from "../../interfaces";
import styles from "../../styles/employees/Applications.module.css";

const CardCollapse = dynamic(
  () => import("../../components/dashboard/employee/CardCollapse"),
  {
    ssr: false,
  }
);

const LayoutEmployee = dynamic(() => import("./layoutEmployee"), {
  ssr: false,
});

const ApplicationsPage = () => {
  const { employeeGlobal, setEmployeeGlobal } =
    useContext<EmployeeContextProps>(EmployeeContext);
  const [applicationsState, setApplicationsState] = useState<Service[] | []>(
    []
  );
  useEffect(() => {
    if (window.localStorage) {
      const getId: EmployeeInterface = JSON.parse(
        localStorage.getItem("employee") || ""
      );
      setEmployeeGlobal(getId);
    }
  }, []);

  useEffect(() => {
    if (Boolean(Object.values(employeeGlobal).length)) {
      getInfo(employeeGlobal.id);
    }
  }, [employeeGlobal]);
  // useLayoutEffect(() => {
  //   getInfo(employeeGlobal.id);
  // }, [employeeGlobal]);

  const getInfo = async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/employees/${id}`
    );
    const data = await res.json();
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

import { GetServerSideProps } from "next";
import React, { useContext, useLayoutEffect, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  EmployeeContext,
  EmployeeContextProps,
} from "../../context/EmployeeContext";
import {
  EmployeeInterface,
  IApplicationJobResponse,
  Service,
} from "../../interfaces";
import styles from "../../styles/employees/Applications.module.css";
import { EmployeeApi } from "../../apis/employee";

const Head = dynamic(() => import("next/head").then((res) => res.default));

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
  const [currentApplicationByUser, setCurrentApplicationByUser] = useState<
    IApplicationJobResponse[] | []
  >([]);

  useEffect(() => {
    if (window.localStorage) {
      const getId: EmployeeInterface = JSON.parse(
        localStorage.getItem("employee") || ""
      );
      console.log({ getId });
      setEmployeeGlobal(getId);
    }
  }, []);

  useEffect(() => {
    if (Boolean(Object.values(employeeGlobal).length)) {
      getInfo(employeeGlobal.id);
    }
  }, [employeeGlobal]);

  const getInfo = async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/employees/${id}`
    );
    const data = await res.json();
    const { data: getInfoApplication } = await EmployeeApi.get(
      `/employees/get-applications-jobs/${employeeGlobal.id}`
    );
    console.log(getInfoApplication);
    setCurrentApplicationByUser(getInfoApplication);
    setApplicationsState(data.service);
  };
  return (
    <>
      <Head>
        <title>Contact Bpo | Mis Postulaciones</title>
        <meta
          name="description"
          content="Página de mis postulaciones en Contact BPO"
        />
      </Head>
      <LayoutEmployee name="aplicaciones de trabajo">
        <div className={styles.wrapper}>
          {applicationsState.length > 0 && <h4>Mis Postulaciones</h4>}
          <div className={styles.applicationsGrid}>
            {applicationsState.length === 0 && (
              <h3>No tienes postulaciones abiertas</h3>
            )}
            {applicationsState.map((service: Service, index) => {
              return (
                <CardCollapse
                  key={service._id}
                  service={service}
                  applications={currentApplicationByUser}
                />
              );
            })}
          </div>
        </div>
      </LayoutEmployee>
    </>
  );
};

export default ApplicationsPage;

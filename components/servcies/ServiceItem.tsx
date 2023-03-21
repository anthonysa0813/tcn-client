import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Text, useModal } from "@nextui-org/react";
import { EmployeeInterface, Service, ServiceI } from "../../interfaces";
import styles from "../../styles/admin/ListServices.module.css";
import TableListStaticData from "../dashboard/clients/TableListStaticData";

interface Prop {
  service: ServiceI;
  changeStatusService: () => Promise<void>;
}

const ServiceItem = ({ service, changeStatusService }: Prop) => {
  const [offsetSliceValue, setOffsetSliceValue] = useState(5);
  const [currentService, setCurrentService] = useState({} as ServiceI);

  useEffect(() => {
    setCurrentService(service);
    console.log({ service });
  }, [service]);

  const watchAllEmployee = (data: EmployeeInterface[] | []) => {
    setOffsetSliceValue(data.length);
  };

  return (
    <div key={currentService._id} className={styles.tableService}>
      <div className={styles.tableHead}>
        <h4>{currentService.title}</h4>
        <Button
          size={"xs"}
          style={{ padding: ".5rem" }}
          color={currentService.status ? "success" : "error"}
          onClick={() => changeStatusService()}
        >
          {" "}
          {currentService.status ? "Activo" : "Finalizado"}
        </Button>
        <Button
          size={"xs"}
          style={{ padding: ".5rem" }}
          color={"secondary"}
          onClick={() => watchAllEmployee(currentService.employees || [])}
        >
          {" "}
          Ver Todos
        </Button>
      </div>
      <TableListStaticData
        data={currentService.employees || []}
        // total={service.employees.length}
        idService={currentService._id || ""}
        offsetSliceValue={offsetSliceValue}
      />
    </div>
  );
};

export default ServiceItem;

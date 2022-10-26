import { Button, Modal, Table, Text, useModal } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import { Service } from "../../interfaces";
import styles from "../../styles/admin/ListServices.module.css";
import { EmployeeInterface } from "../../interfaces/index";
import { userAgent } from "next/server";
import Link from "next/link";
import { API_URL } from "../../utils/constanstApi";

const ListServicesPage = () => {
  const [servicesArr, setServicesArr] = useState<Service[] | []>([]);
  const { setVisible, bindings } = useModal();
  const [currentEmployee, setCurrentEmployee] = useState<EmployeeInterface>({
    id: "",
    name: "",
    surnames: "",
    email: "",
    phone: "",
    status: true,
    cv: "",
    callingCode: "",
    typeJob: "",
    service: [],
    password: "",
    message: "",
    country: "",
  });

  useEffect(() => {
    fetch(`${API_URL}/services`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data service", data);
        setServicesArr(data);
      });
  }, []);

  return (
    <LayoutDashboard>
      <>
        <h1>Lista de Campañas</h1>
        <hr />
        {servicesArr.map((service: Service) => {
          return (
            <div key={service._id} className={styles.tableService}>
              <h4>{service.title}</h4>
              <Table
                aria-label="Example table with static content"
                css={{
                  height: "auto",
                  minWidth: "100%",
                }}
              >
                <Table.Header>
                  <Table.Column>Nombre Completo</Table.Column>
                  <Table.Column>Telefóno</Table.Column>
                  <Table.Column>CV</Table.Column>
                </Table.Header>
                <Table.Body>
                  {service.employees.map((employee: EmployeeInterface) => {
                    return (
                      <Table.Row key={employee.id}>
                        <Table.Cell>{employee.name}</Table.Cell>
                        <Table.Cell>{employee.email}</Table.Cell>
                        <Table.Cell>
                          <Button
                            color="secondary"
                            auto
                            size="sm"
                            onClick={() => {
                              setVisible(true);
                              setCurrentEmployee(employee);
                            }}
                          >
                            ver detalles
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </div>
          );
        })}
        <Modal
          scroll
          width="600px"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          {...bindings}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              {currentEmployee.name} {currentEmployee.surnames}
            </Text>
          </Modal.Header>
          <Modal.Body>
            <div className="field">
              <strong>Mensaje: </strong>
              <p>{currentEmployee.message}</p>
            </div>
            <div className="field">
              <strong>País:</strong>
              <p>{currentEmployee.country}</p>
            </div>
            <div className="field">
              <strong>Código de País:</strong>
              <p>{currentEmployee.callingCode}</p>
            </div>
            <div className="field">
              <strong>Email:</strong>
              <p>{currentEmployee.email}</p>
            </div>
            <div className="field">
              <strong># telefónico:</strong>
              <p>{currentEmployee.phone}</p>
            </div>
            <div className="field">
              <strong>Cv:</strong>
              <Button
                color="primary"
                auto
                size="sm"
                style={{ marginBlock: "1rem" }}
              >
                <Link href={currentEmployee.cv || ""}>
                  <a target="_blank">abrir el enlace del cv</a>
                </Link>
              </Button>
            </div>
            <div className="field">
              <strong>Tipo de Trabajo:</strong>
              <p>{currentEmployee.typeJob}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onClick={() => setVisible(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </LayoutDashboard>
  );
};

export default ListServicesPage;

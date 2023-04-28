import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, Table, Text, useModal } from "@nextui-org/react";
import { EmployeeInterface } from "../../../interfaces";
import styles from "../../../styles/admin/TableEmployee.module.css";
import DropDownSelect from "../../buttons/DrownDownSelect";
import { UserContext } from "../../../context/UserContext";
import Link from "next/link";
import { EmployeeApi } from "../../../apis/employee";

type Props = {
  data: EmployeeInterface[];
  total?: string | number;
  offsetSliceValue: number;
  idService: string;
};

// interface IResponseApplication {
//   _id?: string;
//   employee: string;
//   service: string;
//   status: string;
//   __v?: number;
// }

const TableListStaticData = ({
  data,
  total,
  offsetSliceValue = 5,
  idService,
}: Props) => {
  const { setVisible, bindings } = useModal();
  const [currentEmployee, setCurrentEmployee] = useState<EmployeeInterface>(
    {} as EmployeeInterface
  );

  const [currentData, setcurrentData] = useState<EmployeeInterface[] | []>([]);
  const [initialSliceValue, setInitialSliceValue] = useState(0);
  const { userGlobal } = useContext(UserContext);

  useEffect(() => {
    setcurrentData(data.slice(initialSliceValue, offsetSliceValue));
  }, [data, offsetSliceValue, initialSliceValue]);

  const changeStatusJob = async (id: string) => {
    EmployeeApi.post("/employees/change-status-job", {
      statusOption: "VISTO",
      idEmployee: id,
    });
  };

  return (
    <>
      <Table
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>Nombre</Table.Column>
          <Table.Column>Tlf</Table.Column>
          <Table.Column>email</Table.Column>
          <Table.Column>Conocer más</Table.Column>
          <Table.Column>Estado</Table.Column>
        </Table.Header>
        <Table.Body>
          {currentData.map((user: EmployeeInterface) => {
            return (
              <Table.Row key={user.id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.phone}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <Button
                    color="primary"
                    auto
                    onClick={() => {
                      setVisible(true);
                      setCurrentEmployee(user);
                    }}
                  >
                    <span>Ver información</span>
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  {userGlobal.role === "ADMIN_ROLE" ? (
                    <DropDownSelect
                      key={user.id}
                      idService={idService}
                      idUser={user.id}
                      idJob={idService}
                      statusUser={user.statusJob || ""}
                    />
                  ) : (
                    <span>{user.statusJob}</span>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <Modal
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={24} className={styles.title}>
            {currentEmployee.name} {currentEmployee.surnames}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.field}>
            <strong>País:</strong>
            <p>{currentEmployee.country}</p>
          </div>
          <div className={styles.field}>
            <strong>Código de País:</strong>
            <p>+{currentEmployee.callingCode}</p>
          </div>
          <div className={styles.field}>
            <strong>Email:</strong>
            <p>{currentEmployee.email}</p>
          </div>
          <div className={styles.field}>
            <strong>Número telefónico:</strong>
            <p>{currentEmployee.phone}</p>
          </div>
          <div className={styles.field}>
            <strong>LinkedIn:</strong>
            <p>{currentEmployee.linkedin}</p>
          </div>
          <div className={styles.field}>
            <strong>GitHub:</strong>
            <p>{currentEmployee.github}</p>
          </div>
          <div className={styles.field}>
            <strong>Cv:</strong>
            <Button
              color="primary"
              auto
              size="sm"
              style={{ marginBlock: "1rem" }}
              onClick={() => changeStatusJob(currentEmployee.id)}
            >
              <Link href={currentEmployee.cv || ""} target="_blank">
                abrir el enlace del cv
              </Link>
            </Button>
          </div>
          <div className={styles.field}>
            <strong>Tipo de Trabajo:</strong>
            <p>{currentEmployee.typeJob}</p>
          </div>
          <div className={styles.field}>
            <strong>Mensaje: </strong>
            <p>{currentEmployee.message}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TableListStaticData;

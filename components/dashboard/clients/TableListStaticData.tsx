import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Modal,
  Pagination,
  Table,
  Text,
  useModal,
  Loading,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { EmployeeInterface } from "../../../interfaces";
import { changeStatus, getFetchApi } from "../../../helpers/useFetch";
import Link from "next/link";
import ModalUser from "../employee/ModalUser";
import styles from "../../../styles/admin/TableEmployee.module.css";
import { calculatePagination } from "../../../helpers/calculatePagination";
import DropDownSelect from "../../buttons/DrownDownSelect";
import { UserContext } from "../../../context/UserContext";

type Props = {
  data: EmployeeInterface[];
  total: string | number;
  offsetSliceValue: number;
};

const TableListStaticData = ({ data, total, offsetSliceValue = 5 }: Props) => {
  const router = useRouter();
  const { setVisible, bindings } = useModal();
  const [currentEmployee, setCurrentEmployee] = useState<EmployeeInterface>(
    {} as EmployeeInterface
  );
  const [dataList, setDataList] = useState<EmployeeInterface[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [currentData, setcurrentData] = useState<EmployeeInterface[] | []>([]);
  const [initialSliceValue, setInitialSliceValue] = useState(0);
  const { userGlobal } = useContext(UserContext);

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setcurrentData(data.slice(initialSliceValue, offsetSliceValue));
  }, [data, offsetSliceValue]);

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
                      console.log("current", user);
                    }}
                  >
                    <span>Ver información</span>
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  {userGlobal.role === "ADMIN_ROLE" ? (
                    <DropDownSelect
                      idUser={user.id}
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
            >
              {/* <Link href={currentEmployee.cv || ""}>
                <a target="_blank">abrir el enlace del cv</a>
              </Link> */}
              ejeje cv
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

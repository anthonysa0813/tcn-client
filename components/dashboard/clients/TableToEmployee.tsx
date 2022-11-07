import React, { useState, useEffect } from "react";
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

type Props = {
  data: EmployeeInterface[];
  total: string | number;
  endpoint?: string;
};

const TableToEmployee = ({ data, total, endpoint = "" }: Props) => {
  const router = useRouter();
  const { setVisible, bindings } = useModal();
  const [currentEmployee, setCurrentEmployee] = useState<EmployeeInterface>(
    {} as EmployeeInterface
  );
  const [dataList, setDataList] = useState<EmployeeInterface[] | []>([]);
  const [loading, setLoading] = useState(false);

  const [pageNumber, setPageNumber] = useState(0);

  // const changeStatusById = async (id: string) => {
  //   const res = await changeStatus("employees", id);
  //   if (res) {
  //     router.reload();
  //   }
  // };

  useEffect(() => {
    getFetchApi(endpoint).then((res) => {
      setDataList(res.users);
    });
  }, []);

  useEffect(() => {
    setDataList(data);
  }, [data]);

  useEffect(() => {
    setLoading(true);
    getFetchApi(`${endpoint}?offset=${pageNumber * 5}&limit=${5}`).then(
      (res) => {
        setDataList(res.users);
        if (res.users.length > 0) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    );
  }, [pageNumber]);

  const resetDataList = () => {
    setPageNumber(0);
    getFetchApi(`${endpoint}?offset=${pageNumber}&limit=${5}`).then((res) => {
      setDataList(res.users);
      if (res.users.length > 0) {
        setLoading(false);
        setPageNumber(0);
      } else {
        setLoading(false);
        setPageNumber(0);
      }
    });
  };

  return (
    <>
      {loading ? (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      ) : (
        <Table
          aria-label="Example table with static content"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>
            {/* <Table.Column>Estado</Table.Column> */}
            <Table.Column>Nombre Completo</Table.Column>
            <Table.Column>Email</Table.Column>
            {/* <Table.Column>Mensaje</Table.Column> */}
            <Table.Column>Telefóno</Table.Column>
            <Table.Column>Información general</Table.Column>
          </Table.Header>
          <Table.Body>
            {dataList.length === 0 ? (
              <Table.Row>
                <Table.Cell>{"No existen más datos"}</Table.Cell>
                <Table.Cell>{""}</Table.Cell>
                <Table.Cell>{""}</Table.Cell>
                <Table.Cell>{""}</Table.Cell>
              </Table.Row>
            ) : (
              dataList.map((user: EmployeeInterface) => {
                return (
                  <Table.Row key={user.id}>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.phone}</Table.Cell>
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
                  </Table.Row>
                );
              })
            )}
          </Table.Body>
        </Table>
      )}
      <div className={styles.actions}>
        <Button color="primary" auto onClick={() => resetDataList()}>
          Página: 0
        </Button>
        <Pagination
          total={calculatePagination(Number(total), 5)}
          initialPage={pageNumber}
          onChange={(page: number) => setPageNumber(page)}
        />
      </div>
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
              <Link href={currentEmployee.cv || ""}>
                <a target="_blank">abrir el enlace del cv</a>
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

// <Link href={user.cv || ""}>
//   <a target="_blank">Ver información</a>
// </Link>
export default TableToEmployee;

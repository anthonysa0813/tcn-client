import React, { useState } from "react";
import { Button, Modal, Table, Text, useModal } from "@nextui-org/react";
import { useRouter } from "next/router";
import { EmployeeInterface } from "../../../interfaces";
import { changeStatus } from "../../../helpers/useFetch";
import Link from "next/link";
import ModalUser from "../employee/ModalUser";

type Props = {
  data: EmployeeInterface[];
};

const TableToEmployee = ({ data }: Props) => {
  console.log(data);
  const router = useRouter();
  const { setVisible, bindings } = useModal();
  const [currentEmployee, setCurrentEmployee] = useState<EmployeeInterface>(
    {} as EmployeeInterface
  );

  const changeStatusById = async (id: string) => {
    const res = await changeStatus("employees", id);
    if (res) {
      router.reload();
    }
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
          {/* <Table.Column>Estado</Table.Column> */}
          <Table.Column>Nombre Completo</Table.Column>
          <Table.Column>Email</Table.Column>
          {/* <Table.Column>Mensaje</Table.Column> */}
          <Table.Column>Telefóno</Table.Column>
          <Table.Column>Información general</Table.Column>
          <Table.Column>Status</Table.Column>
        </Table.Header>
        <Table.Body>
          {data.map((user: EmployeeInterface) => {
            return (
              <Table.Row key={user.id}>
                {/* <Table.Cell>
                  <input
                    type="checkbox"
                    onClick={() => changeStatusById(user.id)}
                    // checked={user.status ? true : false}
                  />
                </Table.Cell> */}
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                {/* <Table.Cell>{user.message}</Table.Cell> */}
                <Table.Cell>{user.phone}</Table.Cell>
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
                  {user.status ? (
                    <p className="text-success">Activo</p>
                  ) : (
                    <p className="text-danger">No activo</p>
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
  );
};

// <Link href={user.cv || ""}>
//   <a target="_blank">Ver información</a>
// </Link>
export default TableToEmployee;

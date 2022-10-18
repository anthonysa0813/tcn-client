import { Button, Table } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";
import { EmployeeInterface } from "../../../interfaces";
import { changeStatus } from "../../../helpers/useFetch";
import Link from "next/link";

type Props = {
  data: EmployeeInterface[];
};

const TableToEmployee = ({ data }: Props) => {
  const router = useRouter();
  const changeStatusById = async (id: string) => {
    const res = await changeStatus("employees", id);
    if (res) {
      router.reload();
    }
  };

  return (
    <Table
      aria-label="Example table with static content"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header>
        <Table.Column>Estado</Table.Column>
        <Table.Column>Nombre Completo</Table.Column>
        <Table.Column>Email</Table.Column>
        <Table.Column>Mensaje</Table.Column>
        <Table.Column>Telefóno</Table.Column>
        <Table.Column>CV</Table.Column>
        <Table.Column>Status</Table.Column>
      </Table.Header>
      <Table.Body>
        {data.map((user: EmployeeInterface) => {
          return (
            <Table.Row key={user.id}>
              <Table.Cell>
                <input
                  type="checkbox"
                  onClick={() => changeStatusById(user.id)}
                  checked={user.status ? true : false}
                />
              </Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.message}</Table.Cell>
              <Table.Cell>{user.phone}</Table.Cell>
              <Table.Cell>
                <Button color="primary" auto>
                  <Link href={user.cv || ""}>
                    <a target="_blank">CV</a>
                  </Link>
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
  );
};

export default TableToEmployee;

import React from "react";
import { Table } from "@nextui-org/react";
import { ClientData, ClientResponse } from "../../../interfaces";
// import { ClientResponse } from "../../../interfaces";

const TablesDash = ({ data }: ClientData) => {
  return (
    <Table
      aria-label="Example table with static content"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header>
        <Table.Column>Nombre Completo</Table.Column>
        <Table.Column>Email</Table.Column>
        <Table.Column>Mensaje</Table.Column>
        <Table.Column>Telefóno</Table.Column>
        <Table.Column>Status</Table.Column>
      </Table.Header>
      <Table.Body>
        {data.map((user: ClientResponse) => {
          return (
            <Table.Row key={user._id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.message}</Table.Cell>
              <Table.Cell>{user.phone}</Table.Cell>
              <Table.Cell>{user.status}</Table.Cell>
            </Table.Row>
          );
        })}
        <Table.Row key="1">
          <Table.Cell>Tony Reichert</Table.Cell>
          <Table.Cell>CEO</Table.Cell>
          <Table.Cell>Active</Table.Cell>
          <Table.Cell>CEO</Table.Cell>
          <Table.Cell>Active</Table.Cell>
        </Table.Row>
        <Table.Row key="2">
          <Table.Cell>Zoey Lang</Table.Cell>
          <Table.Cell>Technical Lead</Table.Cell>
          <Table.Cell>Paused lorem</Table.Cell>
          <Table.Cell>CEO</Table.Cell>
          <Table.Cell>Active</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default TablesDash;

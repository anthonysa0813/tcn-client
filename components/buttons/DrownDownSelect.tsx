import React, { useState } from "react";
import { Dropdown } from "@nextui-org/react";
// import { chenageStatusJobFetch } from "../../apis/employee/useEmployeeFetch";

interface Prop {
  statusUser: string;
  idUser: string;
}

const DropDownSelect = ({ statusUser, idUser }: Prop) => {
  const menuItems = [
    { key: "DESCARTADO", name: "DESCARTADO" },
    { key: "SELECCIONADO", name: "SELECCIONADO" },
    { key: "CONTRATADO", name: "CONTRATADO" },
  ];
  const [stateStatus, setStateStatus] = useState(statusUser);

  const changeStatus = (value: string) => {
    setStateStatus(value);
    // chenageStatusJobFetch("employees/change-status-job", {
    //   idEmployee: idUser,
    //   statusOption: value,
    // }).then((res: any) => {
    //   console.log(res);
    //   console.log("data: D", {
    //     idEmployee: idUser,
    //     statusOption: value,
    //   });
    // });
  };

  return (
    <Dropdown>
      <Dropdown.Button flat>{stateStatus}</Dropdown.Button>
      <Dropdown.Menu aria-label="Dynamic Actions" items={menuItems}>
        {menuItems.map((item) => {
          return (
            <Dropdown.Item
              key={item.key}
              color={item.key === "delete" ? "error" : "default"}
            >
              <span onClick={() => changeStatus(item.name)}>{item.name}</span>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownSelect;

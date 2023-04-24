import { GetServerSideProps } from "next";
import React, { useState, useEffect, useContext } from "react";
import { Dropdown } from "@nextui-org/react";
import { chenageStatusJobFetch } from "../../apis/employee/useEmployeeFetch";
import { ServiceApi } from "../../apis/services";
import { EmployeeApi } from "../../apis/employee/employeeApi";
import { API_URL } from "../../utils/constanstApi";
import { TokenContext } from "../../context/CurrentToken";

interface Prop {
  statusUser: string;
  idUser: string;
  idService?: string;
}

interface IResponseApplication {
  _id?: string;
  employee: string;
  service: string;
  status: string;
  __v?: number;
}

const DropDownSelect = ({ statusUser, idUser, idService }: Prop) => {
  const menuItems = [
    { key: "DESCARTADO", name: "DESCARTADO" },
    { key: "SELECCIONADO", name: "SELECCIONADO" },
    { key: "CONTRATADO", name: "CONTRATADO" },
  ];
  const [stateStatus, setStateStatus] = useState("");
  const [currentJobInfo, setCurrentJobInfo] = useState<IResponseApplication>(
    {} as IResponseApplication
  );
  const { privateToken } = useContext(TokenContext);

  useEffect(() => {
    getJobApplication(`/employees/get-applications-jobs/${idUser}`);
  }, [statusUser]);

  const getJobApplication = async (url: string) => {
    const { data } = await EmployeeApi.get<IResponseApplication[] | []>(url, {
      headers: {
        Authorization: privateToken.token,
      },
    });

    const value = data.filter((v) => v.service === idService);
    setCurrentJobInfo(value[0]);
    setStateStatus(value[0]?.status || "");
  };

  const changeStatus = async (value: string) => {
    setStateStatus(value);
    const response = await EmployeeApi.put(
      `/employees/status-job/${currentJobInfo._id}`,
      {
        status: value,
      }
    );
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

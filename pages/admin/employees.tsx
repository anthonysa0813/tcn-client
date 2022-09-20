import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import { UserContext } from "../../context/UserContext";
import { getFetchApi } from "../../helpers/useFetch";
import { EmployeeInterface } from "../../interfaces";
import TableToEmployee from "../../components/dashboard/clients/TableToEmployee"

const Employees = () => {
  const token = Cookies.get("token");
  const { userGlobal } = useContext(UserContext);
  const router = useRouter();
  const [employeeData, setEmployeeData] = useState<EmployeeInterface[]>([])

  useEffect(() => {
    // if (!token || Object.values(userGlobal).includes("")) {
    if (!token ) {
      router.push("/admin/login");
    }
    getFetchApi("employees").then((res) => {
      // console.log("res", res);
      setEmployeeData(res);
    });

  }, []);

  return (
    <LayoutDashboard>
      <h1>Lista de Empleados</h1>
      <TableToEmployee data={employeeData} />
    </LayoutDashboard>
  );
};

export default Employees;

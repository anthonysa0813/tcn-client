import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import { UserContext } from "../../context/UserContext";
import { getFetchApi } from "../../helpers/useFetch";
import { EmployeeInterface } from "../../interfaces";
import TableToEmployee from "../../components/dashboard/clients/TableToEmployee";
import ButtonPrimary from "../../components/buttons/Button";
import styles from "../../styles/employees/ListEmployee.module.css";
import ModalComponent from "../../components/dashboard/ModalComponent";
import ModalFilter from "../../components/employees/ModalFilter";

const Employees = () => {
  const token = Cookies.get("token");
  const { userGlobal } = useContext(UserContext);
  const router = useRouter();
  const [employeeData, setEmployeeData] = useState<EmployeeInterface[]>([]);
  const [showModalFilters, setShowModalFilters] = useState(false);
  const [totalEmployee, setTotalEmployee] = useState(1);

  useEffect(() => {
    // if (!token || Object.values(userGlobal).includes("")) {
    if (!token) {
      router.push("/admin/login");
    }
    getFetchApi("employees").then((res) => {
      // console.log("res", res);
      setEmployeeData(res.users);
      setTotalEmployee(res.total);
    });
  }, []);

  return (
    <>
      <LayoutDashboard>
        <h1>Lista de Empleados</h1>
        <div className={styles.menu}>
          <ButtonPrimary
            color="dark"
            content="Añadir filtros"
            type="button"
            onClick={() => setShowModalFilters(true)}
            iconName="filter"
          />
        </div>
        <TableToEmployee
          data={employeeData}
          total={totalEmployee}
          endpoint="employees"
        />
      </LayoutDashboard>
      {showModalFilters && (
        <ModalComponent>
          <ModalFilter
            setShowModalFilters={setShowModalFilters}
            setEmployeeData={setEmployeeData}
          />
        </ModalComponent>
      )}
    </>
  );
};

export default Employees;

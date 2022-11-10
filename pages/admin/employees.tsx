import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CSVLink } from "react-csv";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import { UserContext } from "../../context/UserContext";
import { getFetchApi } from "../../helpers/useFetch";
import { EmployeeInterface } from "../../interfaces";
import TableToEmployee from "../../components/dashboard/clients/TableToEmployee";
import ButtonPrimary from "../../components/buttons/Button";
import styles from "../../styles/employees/ListEmployee.module.css";
import ModalComponent from "../../components/dashboard/ModalComponent";
import ModalFilter from "../../components/employees/ModalFilter";

interface PropCSV {
  nombre: string;
  apellidos: string;
  dni: string;
  celular: string;
  pais: string;
  codigo: string;
  email: string;
  estado: string;
}

const headers2 = [
  { label: "First Name", key: "firstname" },
  { label: "Last Name", key: "lastname" },
  { label: "Email", key: "email" },
];

const headers = [
  { label: "Nombre", key: "nombre" },
  { label: "Apellidos", key: "apellidos" },
  { label: "Email", key: "email" },
  { label: "DNI", key: "dni" },
  { label: "Celular", key: "celular" },
  { label: "Código de país", key: "códogio" },
  { label: "País", key: "país" },
  { label: "Estado", key: "estado" },
];

const data = [
  { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
];

const Employees = () => {
  const token = Cookies.get("token");
  const { userGlobal } = useContext(UserContext);
  const router = useRouter();
  const [employeeData, setEmployeeData] = useState<EmployeeInterface[]>([]);
  const [showModalFilters, setShowModalFilters] = useState(false);
  const [totalEmployee, setTotalEmployee] = useState(1);
  const [exportData, setExportData] = useState<string[][] | []>([]);

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
    console.log("employeedata", employeeData);
    const arrToExportExcel = employeeData.map((employee) => {
      return [
        employee.name || "",
        employee.surnames || "",
        employee.email || "",
        employee.dni || "",
        employee.phone || "",
        employee.callingCode || "",
        employee.country || "",
        employee.statusJob || "",
      ];
    });
    setExportData([
      [
        "Nombre",
        "Apellidos",
        "Email",
        "DNI",
        "Celular",
        "Código",
        "País",
        "Estado",
      ],
      ...arrToExportExcel,
    ]);
  }, []);

  return (
    <>
      <LayoutDashboard>
        <h1 className={styles.title}>Lista de Empleados</h1>
        <div className={styles.menu}>
          <div className={styles.buttonExcel}>
            <CSVLink data={exportData} filename="Lista de usuarios">
              Descargar lista
            </CSVLink>
          </div>
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

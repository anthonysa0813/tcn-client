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
import { utils, writeFile } from "xlsx";
import { RiFileExcel2Fill } from "react-icons/ri";
import { generateExcelFile } from "../../helpers/exportFileExcel";
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

const Employees = () => {
  const token = Cookies.get("token");
  const { userGlobal } = useContext(UserContext);
  const router = useRouter();
  const [employeeData, setEmployeeData] = useState<EmployeeInterface[]>([]);
  const [showModalFilters, setShowModalFilters] = useState(false);
  const [totalEmployee, setTotalEmployee] = useState(1);
  const [exportData, setExportData] = useState<PropCSV[] | []>([]);

  useEffect(() => {
    // if (!token || Object.values(userGlobal).includes("")) {
    if (!token) {
      router.push("/admin/login");
    }
    getFetchApi("employees").then((res) => {
      console.log("res", res);
      setEmployeeData(res.users);
      setTotalEmployee(res.total);
    });
    const arrToExportExcel = employeeData.map((employee) => {
      return {
        nombre: employee.name || "",
        apellidos: employee.surnames || "",
        dni: employee.dni || "",
        celular: employee.phone || "",
        pais: employee.country || "",
        codigo: employee.callingCode || "",
        email: employee.email || "",
        estado: employee.statusJob || "",
      };
    });
    setExportData(arrToExportExcel);
  }, []);

  const exportExcelFile = () => {
    let wb = utils.book_new();
    let ws = utils.json_to_sheet(exportData);
    utils.book_append_sheet(wb, ws, "Lista de Empleados");
    writeFile(wb, "ListaDeEmpleados.xlsx");
  };

  return (
    <>
      <LayoutDashboard>
        <h1 className={styles.title}>Lista de Empleados</h1>
        <div className={styles.menu}>
          <div className="actions">
            <button
              className={styles.buttonExcel}
              onClick={() => generateExcelFile(exportData)}
            >
              <RiFileExcel2Fill />
              Descargar Lista
            </button>
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

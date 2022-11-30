import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getFetchApi } from "../../helpers/useFetch";
import { EmployeeInterface } from "../../interfaces";
import styles from "../../styles/employees/ListEmployee.module.css";
import { generateExcelFile } from "../../helpers/exportFileExcel";
import dynamic from "next/dynamic";
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

const DownloadIcon = dynamic(() =>
  import("@mui/icons-material/FileDownload").then((res) => res.default)
);

const LayoutDashboard = dynamic(() =>
  import("../../components/dashboard/LayoutDashboard").then(
    (res) => res.default
  )
);

const TableToEmployee = dynamic(() =>
  import("../../components/dashboard/clients/TableToEmployee").then(
    (res) => res.default
  )
);

const ButtonPrimary = dynamic(() =>
  import("../../components/buttons/Button").then((res) => res.default)
);

const ModalComponent = dynamic(() =>
  import("../../components/dashboard/ModalComponent").then((res) => res.default)
);

const ModalFilter = dynamic(() =>
  import("../../components/employees/ModalFilter").then((res) => res.default)
);

const Employees = () => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [employeeData, setEmployeeData] = useState<EmployeeInterface[]>([]);
  const [showModalFilters, setShowModalFilters] = useState(false);
  const [totalEmployee, setTotalEmployee] = useState(1);
  const [exportData, setExportData] = useState<PropCSV[] | []>([]);

  useEffect(() => {
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
  }, [token, router, employeeData]);

  // const exportExcelFile = () => {
  //   let wb = utils.book_new();
  //   let ws = utils.json_to_sheet(exportData);
  //   utils.book_append_sheet(wb, ws, "Lista de Empleados");
  //   writeFile(wb, "ListaDeEmpleados.xlsx");
  // };

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
              <DownloadIcon />
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

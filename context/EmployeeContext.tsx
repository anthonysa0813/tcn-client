import { createContext, Dispatch, SetStateAction, useState } from "react";
import { ContextInitial, EmployeeInterface } from "../interfaces";

export type EmployeeContextProps = {
  employeeGlobal: EmployeeInterface;
  setEmployeeGlobal: Dispatch<
    SetStateAction<{
      id: string;
      email: string;
      name: string;
      surnames: string;
      phone: string;
      cv: string;
      callingCode: string;
      typeJob: string;
      service: string[] | [] | any;
      password: string;
    }>
  >;
};

export const EmployeeContext = createContext<EmployeeContextProps>(
  {} as EmployeeContextProps
);

type ChildrenType = {
  children: JSX.Element | JSX.Element[];
};

const EmployeeContextProvider = ({ children }: ChildrenType) => {
  const [employeeGlobal, setEmployeeGlobal] = useState({
    id: "",
    name: "",
    surnames: "",
    email: "",
    phone: "",
    cv: "",
    callingCode: "",
    typeJob: "",
    password: "",
    service: [],
  });

  return (
    <EmployeeContext.Provider value={{ employeeGlobal, setEmployeeGlobal }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContextProvider;

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { ContextInitial, EmployeeInterface } from "../interfaces";

export type EmployeeContextProps = {
  employeeGlobal: EmployeeInterface;
  setEmployeeGlobal: Dispatch<SetStateAction<EmployeeInterface>>;
};

export const EmployeeContext = createContext<EmployeeContextProps>(
  {} as EmployeeContextProps
);

type ChildrenType = {
  children: JSX.Element | JSX.Element[];
};

const EmployeeContextProvider = ({ children }: ChildrenType) => {
  const [employeeGlobal, setEmployeeGlobal] = useState({} as EmployeeInterface);

  return (
    <EmployeeContext.Provider value={{ employeeGlobal, setEmployeeGlobal }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContextProvider;

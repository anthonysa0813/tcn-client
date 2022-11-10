import {
  ChangeStatusRequest,
  RequestResetPassword,
  RequestSendNewPassword,
} from "../../interfaces";
import { API_URL } from "../../utils/constanstApi";

// http://localhost:5050/api/knoledge/?hability=Desarrollador front-end
export const getEmployeeByFilterHability = async (
  endpoint: string,
  habilityValue: string
) => {
  const response = await fetch(
    `${API_URL}/${endpoint}/?hability=${habilityValue}`
  );
  const dataResponse = await response.json();
  return dataResponse;
};

// http://localhost:5050/api/language/filter?language=Inglés&nivel=Básico
export const getEmployeeFilterByLanguage = async (
  endpoint: string,
  lang: string,
  level: string
) => {
  const response = await fetch(
    `${API_URL}/${endpoint}/filter?language=${lang}&nivel=${level}`
  );
  const dataResponse = await response.json();
  return dataResponse;
};

// http://localhost:5050/api/employees/6337ce27a2424699beb7cac2
export const saveInformationGeneral = async <T>(
  endpoint: string,
  idEmployee: string,
  data: T
) => {
  const response = await fetch(`${API_URL}/${endpoint}/${idEmployee}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataResponse = await response.json();
  return dataResponse;
};

export const getEmployeeById = async (endpoint: string, idEmployee: string) => {
  const response = await fetch(`${API_URL}/${endpoint}/${idEmployee}`);
  const data = await response.json();
  return data;
};

export const sendEmailToNewPassword = async (
  endpoint: string,
  data: RequestSendNewPassword
) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataResponse = await response.json();
  return dataResponse;
};

export const resetPassword = async (
  endpoint: string,
  data: RequestResetPassword
) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataResponse = await response.json();
  return dataResponse;
};

export const chenageStatusJobFetch = async (
  endpoint: string,
  data: ChangeStatusRequest
) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataResponse = await response.json();
  return dataResponse;
};

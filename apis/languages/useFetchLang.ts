import { LangObject } from "../../interfaces";
import { API_URL } from "../../utils/constanstApi";

export const createLang = async (
  ENDPOINT: string,
  idEmployee: string,
  data: LangObject
) => {
  const response = await fetch(`${API_URL}/${ENDPOINT}/${idEmployee}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  return responseData;
};

// http://localhost:5050/api/language/all/633a64c57aea5ece75d1a02e
export const getAllLanguagesByEmployee = async (idEmployee: string) => {
  const response = await fetch(`${API_URL}/language/all/${idEmployee}`);
  const data = await response.json();
  return data;
};

export const deleteLangByEmployee = async (idLang: string) => {
  const response = await fetch(`${API_URL}/language/${idLang}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

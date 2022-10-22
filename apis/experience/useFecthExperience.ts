import { Experience } from "../../interfaces";
import { API_URL_DEV } from "../../utils/constanstApi";

// http://localhost:5050/api/experiences/633a64c57aea5ece75d1a02e
export const createExperienceApi = async (
  endpoint: string,
  dataExp: Experience,
  idEmployee: string
) => {
  const response = await fetch(`${API_URL_DEV}/${endpoint}/${idEmployee}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataExp),
  });
  const data = await response.json();
  return data;
};

export const getExperienceByEmployee = async (
  endpoint: string,
  idEmployee: string
) => {
  const response = await fetch(`${API_URL_DEV}/${endpoint}/${idEmployee}`);
  const data = await response.json();
  return data;
};

export const deleteExperience = async (
  endpoint: string,
  idEmployee: string,
  idExperience: string
) => {
  const response = await fetch(
    `${API_URL_DEV}/${endpoint}/${idEmployee}/${idExperience}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  return data;
};

export const updateExperience = async (
  endpoint: string,
  idEmployee: string,
  idExperience: string,
  dataExp: Experience
) => {
  const response = await fetch(
    `${API_URL_DEV}/${endpoint}/${idEmployee}/${idExperience}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataExp),
    }
  );
  const data = await response.json();
  return data;
};

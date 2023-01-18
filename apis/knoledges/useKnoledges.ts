import { KnoledgeInterface } from "../../interfaces";

export const createKnoledge = async (
  endpoint: string,
  idEmployee: string,
  data: KnoledgeInterface
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DB_URL}/${endpoint}/${idEmployee}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const dataResponse = await response.json();
  return dataResponse;
};

export const getKnoledges = async (endpoint: string, idEmployee: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DB_URL}/${endpoint}/${idEmployee}`
  );
  const dataResponse = await response.json();
  return dataResponse;
};

export const deleteKnoledgesFetch = async (
  endpoint: string,
  idKnowledge: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DB_URL}/${endpoint}/${idKnowledge}`,
    {
      method: "DELETE",
    }
  );
  const dataResponse = await response.json();
  return dataResponse;
};

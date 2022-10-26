import Cookies from "js-cookie";
import { ClientInterface, FormProp } from "../interfaces";
import { API_URL } from "../utils/constanstApi";

const token = Cookies.get("token");

export const loginFetchApi = async (endpoint: string, dataUser: FormProp) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUser),
  });
  const data = await response.json();
  return data;
};

export const getFetchApi = async (endpoint: string) => {
  console.log("token client", token);
  const response = await fetch(`${API_URL}/${endpoint}`);
  const data = await response.json();
  return data;
};

export const changeStatus = async (endpoint: string, id: string) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}/${id}/active`, {
      method: "PUT",
    });
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (
  endpoint: string,
  dataUser: ClientInterface
) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUser),
  });
  const data = await response.json();
  return data;
};

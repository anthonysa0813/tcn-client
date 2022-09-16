import Cookies from "js-cookie";
import { FormProp } from "../interfaces";

const token = Cookies.get("token");

export const loginFetchApi = async (endpoint: string, dataUser: FormProp) => {
  const response = await fetch(`http://localhost:5050/api/${endpoint}`, {
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
  const response = await fetch(`http://localhost:5050/api/${endpoint}`);
  const data = await response.json();
  return data;
};

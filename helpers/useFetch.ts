import { FormProp } from "../interfaces";

export const loginFetchApi = async (endpoint: string, dataUser: FormProp) => {
  console.log(`http://localhost:5050/api/${endpoint}`);
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

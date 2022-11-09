import { UserResponse } from "../../interfaces";
import { API_URL } from "./../../utils/constanstApi";
export const searchUserAuth = async (endpoint: string) => {
  const response = await fetch(`${API_URL}/${endpoint}`);
  const dataResponse = await response.json();
  return dataResponse;
};

export const updateUserAuth = async (
  endpoint: string,
  data: UserResponse,
  token: string
) => {
  const response = await fetch(`${API_URL}/${endpoint}/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
  const dataResponse = await response.json();
  return dataResponse;
};

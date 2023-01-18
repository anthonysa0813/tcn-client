import { UserResponse } from "../../interfaces";
export const searchUserAuth = async (endpoint: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_}/${endpoint}`);
  const dataResponse = await response.json();
  return dataResponse;
};

export const updateUserAuth = async (
  endpoint: string,
  data: UserResponse,
  token: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DB_URL}/${endpoint}/${data.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    }
  );
  const dataResponse = await response.json();
  return dataResponse;
};

export const getAllUsers = async (endpoint: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/${endpoint}`);
  const data = await response.json();
  return data;
};

// http://localhost:5050/api/auth/register
export const createUserAuth = async (endpoint: string, data: UserResponse) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DB_URL}/${endpoint}`,
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

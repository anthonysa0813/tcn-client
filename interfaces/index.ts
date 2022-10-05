import { ButtonHTMLAttributes, Dispatch, SetStateAction } from "react";

export interface FormProp {
  email: string;
  password: string;
}

export interface UserResponse {
  email: string;
  role: string;
  name: string;
  id?: string;
}

export interface ContextInitial {
  user?: UserResponse;
  setUser?: Dispatch<SetStateAction<UserResponse | null>>;
}

export interface ChildProp {
  children: JSX.Element | JSX.Element[];
}

export interface ClientResponse {
  name: string;
  usernames: string;
  email: string;
  _id?: string;
  phone: string;
  message: string;
  __v?: string;
  status?: string;
}

export interface ClientInterface {
  name: string,
  surnames: string,
  email: string,
  phone: string,
  message?: string
}


export interface ClientData {
  data: ClientResponse[];
}




export interface EmployeeInterface  {
  id: string,
  name: string,
  surnames: string,
  email: string,
  phone: string,
  status?: true,
  cv: string,
  callingCode: string,
  typeJob: string,
  service: string[] | [] ,
  password: string
}


export interface Service {
  _id: string,
  title: string,
  company: string,
  description: string,
  createdAt: string,
  updatedAt: string,
  __v?: number
}

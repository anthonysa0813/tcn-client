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
  status: string;
}

export interface ClientData {
  data: ClientResponse[];
}

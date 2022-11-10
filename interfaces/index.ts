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
  superAdmin?: boolean;
}

export interface ContextInitial {
  user?: UserResponse;
  setUser?: Dispatch<SetStateAction<UserResponse | null>>;
}

export interface ChildProp {
  children: JSX.Element | JSX.Element[] | boolean;
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
  name: string;
  surnames: string;
  email: string;
  phone: string;
  message?: string;
}

export interface ClientData {
  data: ClientResponse[];
}

export interface EmployeeInterface {
  id: string;
  name: string;
  surnames: string;
  email: string;
  phone?: string;
  status?: true;
  country?: string;
  cv?: any;
  callingCode?: string;
  typeJob?: string;
  service?: string[] | [];
  password: string;
  message?: string;
  linkedin?: string;
  github?: string;
  confirmPassword?: string;
  statusJob?: string;
  dni?: string;
}

export interface ChangeStatusRequest {
  idEmployee: string;
  statusOption: string;
}

export interface Service {
  _id?: string;
  title: string;
  company: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  employees?: any;
  __v?: number;
}

export interface CourntriesDataResponse {
  countriesNames: any;
  callingCode: string;
}

export interface LangObject {
  lang: string;
  levelWriter: string;
  levelOral: string;
  levelRead?: string;
  levelListen?: string;
  idEmployee: string;
}

export interface LangResponse {
  _id: string;
  lang: string;
  levelWriter: string;
  levelOral: string;
  employee: string;
  __v?: number;
}

export interface Experience {
  activyBussiness: string;
  area: string;
  country: string;
  currentJob: boolean;
  dateEnd: string;
  dateStart: string;
  description: string;
  employee: string;
  level: string;
  nameBussiness: string;
  subarea: string;
  title: string;
  _id?: string;
  nameRef?: string;
  emailRef?: string;
  countryRef?: string;
  phoneRef?: string;
}

export interface KnoledgeInterface {
  name: string;
  employee?: string;
  level: string;
  _id?: string;
  __v?: string;
}

export interface RequestSendNewPassword {
  email: string;
}

export interface RequestResetPassword {
  email: string;
  password: string;
  token: string | string[];
}

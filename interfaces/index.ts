import { Dispatch, SetStateAction } from "react";

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

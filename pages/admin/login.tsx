import React, { FC, useState } from "react";
import { loginFetchApi } from "../../helpers/useFetch";
import useForm from "../../hooks/useForm";
import { FormProp } from "../../interfaces";
import Cookies from "js-cookie";
import styles from "../../styles/admin/Login.module.css";

const Login: FC = () => {
  const { email, password, form, onChange } = useForm<FormProp>({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      console.log("algunos de los campos están vacios");
      return;
    }
    loginFetchApi("auth/login", form).then((res) => {
      const { token, user } = res;
      console.log("token", token);
      Cookies.set("token", token, { expires: 7 });
    });
  };

  return (
    <>
      <main className={`${styles["main-container"]}`}>
        <form
          className={` ${styles["form-container"]}`}
          onSubmit={handleSubmit}
        >
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <button type="submit">Ingresar</button>
        </form>
      </main>
    </>
  );
};

export default Login;

import React, { FC, useContext, useState } from "react";
import { loginFetchApi } from "../../helpers/useFetch";
import useForm from "../../hooks/useForm";
import { FormProp } from "../../interfaces";
import Cookies from "js-cookie";
import styles from "../../styles/admin/Login.module.css";
import { useRouter } from "next/router";
import { UserContext } from "../../context/UserContext";

const Login: FC = () => {
  const { email, password, form, onChange } = useForm<FormProp>({
    email: "",
    password: "",
  });
  const { userGlobal, setUserGlobal } = useContext(UserContext);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    setError(false);
    loginFetchApi("auth/login", form).then((res) => {
      const { token, user } = res;

      setUserGlobal(user);
      Cookies.set("token", token, { expires: 7 });
      if (token && Boolean(Object.keys(user).length > 0)) {
        router.push("/admin");
      }
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
          {error && <span>Todos los campos son obligatorios</span>}
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

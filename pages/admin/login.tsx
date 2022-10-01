import React, { FC, useContext, useState } from "react";
import { loginFetchApi } from "../../helpers/useFetch";
import useForm from "../../hooks/useForm";
import { FormProp } from "../../interfaces";
import Cookies from "js-cookie";
import styles from "../../styles/admin/Login.module.css";
import { useRouter } from "next/router";
import { UserContext } from "../../context/UserContext";
import { Button, Input, Spacer } from "@nextui-org/react";

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
      sessionStorage.setItem("token", token);
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
          <h1>ContactBpo Login</h1>
          {error && <span>Todos los campos son obligatorios</span>}
          <Spacer y={1.5} />

            <Input
              type="email"
              clearable
              underlined
              labelPlaceholder="Email"
              name="email"
              value={email}
              onChange={onChange}
              
            />
             <Spacer y={2.5} />
            <Input
              clearable
              underlined
              labelPlaceholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
            />
          <Spacer y={1.5} />

           <Button type="submit">
              Ingresar
          </Button>
        </form>
      </main>
    </>
  );
};

export default Login;

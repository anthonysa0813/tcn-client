import React, { FC, useContext, useState } from "react";
import { loginFetchApi } from "../../helpers/useFetch";
import useForm from "../../hooks/useForm";
import { FormProp } from "../../interfaces";
import Cookies from "js-cookie";
import styles from "../../styles/admin/Login.module.css";
import { useRouter } from "next/router";
import { UserContext } from "../../context/UserContext";
import { Button, Input, Loading, Spacer } from "@nextui-org/react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login: FC = () => {
  const { email, password, form, onChange } = useForm<FormProp>({
    email: "",
    password: "",
  });
  const { userGlobal, setUserGlobal } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const router = useRouter();
  const toastWarning = (message: string) => toast.warning(message);
  const toastSuccess = (message: string) => toast.success(message);

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
    setShowLoading(true);
    loginFetchApi("auth/login", form).then((res) => {
      if (res.message) {
        console.log(res.message);
        setShowLoading(false);
        toastWarning(res.message);
      } else {
        const { token, user } = res;
        console.log(res);
        setUserGlobal(user);
        sessionStorage.setItem("token", token);
        Cookies.set("token", token, { expires: 7 });
        toastSuccess("Bienvenido...");
        if (token && Boolean(Object.keys(user).length > 0)) {
          router.push("/admin/employees");
          setShowLoading(false);
        }
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <main className={`${styles["main-container"]}`}>
        <form
          className={` ${styles["form-container"]}`}
          onSubmit={handleSubmit}
        >
          <div className={styles.logoContent}>
            <Image
              src="/images/LogoContact.png"
              alt="Logo de Contact bpo"
              className={styles.image}
              width={200}
              height={100}
            />
            <div className={styles.subtitle}>
              <span>Admin</span>
            </div>
          </div>
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

          <Input.Password
            labelPlaceholder="Password"
            underlined
            name="password"
            value={password}
            onChange={onChange}
          />
          {/* <Spacer y={1.6} />
          <Input.Password
            labelPlaceholder="Custom icons"
            visibleIcon={<AiFillEye fill="currentColor" />}
            hiddenIcon={<AiFillEyeInvisible fill="currentColor" />}
          /> */}

          {/* <Input
            clearable
            underlined
            labelPlaceholder="Password"
            type="password"
          /> */}
          <Spacer y={1.5} />

          <Button type="submit">Ingresar</Button>
          {showLoading && <Loading />}
        </form>
      </main>
    </>
  );
};

export default Login;

import React, { useState } from "react";
import ButtonPrimary from "../../components/buttons/Button";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import useForm from "../../hooks/useForm";
import styles from "../../styles/admin/ChangeRole.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { searchUserAuth, updateUserAuth } from "../../apis/auth/fetchFunctions";
import { UserResponse } from "../../interfaces";
import { Loading } from "@nextui-org/react";
import Cookies from "js-cookie";

const ChangeRole = () => {
  const { email, onChange } = useForm({ email: "" });
  const toastWarning = (message: string) => toast.warning(message);
  const toastError = (message: string) => toast.error(message);
  const toastSuccess = (message: string) => toast.success(message);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserResponse>({} as UserResponse);
  const token = Cookies.get("token") || "";

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ([email].includes("")) {
      toastWarning("El campo está vácio...");
      return;
    }
    setLoading(true);
    searchUserAuth(`auth/search/${email}`).then((res) => {
      if (res.message) {
        toastError(res.message);
        setLoading(false);
        setUser(res.user);
      } else {
        setUser(res.user);
        setLoading(false);
      }
    });
  };

  const activeUser = () => {
    updateUserAuth("auth", { ...user, role: "ADMIN_ROLE" }, token).then(
      (res) => {
        setUser(res.user);
        toastSuccess(
          `el usuario ${user.email} ha sido actualizado como administrador`
        );
      }
    );
  };

  const desactiveUser = () => {
    updateUserAuth("auth", { ...user, role: "USER_ROLE" }, token).then(
      (res) => {
        setUser(res.user);
        toastSuccess(
          `el usuario ${user.email} ha sido actualizado como USER_ROLE`
        );
      }
    );
  };

  return (
    <LayoutDashboard>
      <div className={styles.mainGrid}>
        <h1>Busca y activa una cuenta como administrador</h1>
        <ToastContainer />
        <form className={styles.searchField} onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="example@gmail.com"
            name="email"
            value={email}
            onChange={onChange}
          />
          <ButtonPrimary color="dark" content="Buscar" type="submit" />
        </form>
        {loading && <Loading />}
        {Object.values(user).length > 0 && (
          <div className={styles.fieldUser}>
            <div className={styles.field}>
              <span>{user.email}</span>
            </div>
            <div className={styles.field}>
              <span>{user.role}</span>
            </div>
            <div className={styles.field}>
              <button
                className={`${styles.button} ${
                  user.role === "ADMIN_ROLE" ? "red" : "primary"
                }`}
                onClick={
                  user.role === "ADMIN_ROLE" ? desactiveUser : activeUser
                }
              >
                {user.role === "ADMIN_ROLE" ? "desactivar" : "activar"}
              </button>
            </div>
          </div>
        )}
      </div>
    </LayoutDashboard>
  );
};

export default ChangeRole;

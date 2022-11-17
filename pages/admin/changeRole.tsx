import React, { useState, useEffect } from "react";
import ButtonPrimary from "../../components/buttons/Button";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import useForm from "../../hooks/useForm";
import styles from "../../styles/admin/ChangeRole.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllUsers,
  searchUserAuth,
  updateUserAuth,
} from "../../apis/auth/fetchFunctions";
import { UserResponse } from "../../interfaces";
import { Loading } from "@nextui-org/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const ChangeRole = () => {
  const { email, onChange } = useForm({ email: "" });
  const toastWarning = (message: string) => toast.warning(message);
  const toastError = (message: string) => toast.error(message);
  const toastSuccess = (message: string) => toast.success(message);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserResponse>({} as UserResponse);
  const [usersData, setUsersData] = useState<UserResponse[] | []>([]);
  const token = Cookies.get("token") || "";
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showUniqueUser, setShowUniqueUser] = useState(false);
  const [userUniqueInfo, setUserUniqueInfo] = useState({} as UserResponse);
  const router = useRouter();

  useEffect(() => {
    getAllUsers("auth").then((res) => {
      console.log(res);
      setUsersData(res);
    });
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ([email].includes("")) {
      toastWarning("El campo está vácio...");
      return;
    }
    setLoading(true);
    setShowUniqueUser(true);

    setShowAllUsers(false);
    searchUserAuth(`auth/search/${email}`).then((res) => {
      if (res.message) {
        console.log(res);
        toastError(res.message);
        setLoading(false);
        setShowUniqueUser(false);
        setUser(res.user);
        setUserUniqueInfo(res.user);
      } else {
        setUser(res.user);
        setLoading(false);
        setUserUniqueInfo(res.user);
        setShowUniqueUser(true);
      }
    });
  };

  const activeUser = (user: UserResponse) => {
    updateUserAuth("auth", { ...user, role: "ADMIN_ROLE" }, token).then(
      (res) => {
        setUser(res.user);
        toastSuccess(
          `el usuario ${user.email} ha sido actualizado como administrador`
        );
      }
    );
  };

  const desactiveUser = (user: UserResponse) => {
    updateUserAuth("auth", { ...user, role: "USER_ROLE" }, token).then(
      (res) => {
        setUser(res.user);
        toastSuccess(
          `el usuario ${user.email} ha sido actualizado como USER_ROLE`
        );
      }
    );
  };

  const changeStatusFunction = (user: UserResponse) => {
    if (user.role === "ADMIN_ROLE") {
      desactiveUser(user);
      getAllUsers("auth").then((res) => {
        console.log(res);
        setUsersData(res);
      });
    } else {
      activeUser(user);
      getAllUsers("auth").then((res) => {
        console.log(res);
        setUsersData(res);
      });
    }
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

        <div className="actionWatchAllUsers">
          <button
            className={styles.watchAllUsersButton}
            onClick={() => {
              setShowAllUsers((state) => !state);
              setShowUniqueUser(false);
            }}
          >
            {showAllUsers ? "ocultar lista" : "Ver todos los usuarios"}
          </button>
        </div>
        {loading && <Loading />}
        {showUniqueUser && (
          <div className={styles.fieldUser}>
            <div className={styles.field}>
              <span>{userUniqueInfo.email}</span>
            </div>
            <div className={styles.field}>
              <span>{userUniqueInfo.role}</span>
            </div>
            <div className={styles.field}>
              <button
                className={`${styles.button} ${
                  userUniqueInfo.role === "ADMIN_ROLE" ? "red" : "primary"
                }`}
                onClick={() => changeStatusFunction(userUniqueInfo)}
              >
                {userUniqueInfo.role === "ADMIN_ROLE"
                  ? "desactivar"
                  : "activar"}
              </button>
            </div>
          </div>
        )}
        {showAllUsers &&
          usersData.map((user) => {
            return (
              <div className={styles.fieldUser} key={user.id}>
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
                    onClick={() => changeStatusFunction(user)}
                  >
                    {user.role === "ADMIN_ROLE" ? "desactivar" : "activar"}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </LayoutDashboard>
  );
};

export default ChangeRole;

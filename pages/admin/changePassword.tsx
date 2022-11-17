import React, { useState, useEffect, useContext } from "react";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import useForm from "../../hooks/useForm";
import styles from "../../styles/admin/editInfo.module.css";
import { UserContext } from "../../context/UserContext";
import { updateUserAuth } from "../../apis/auth/fetchFunctions";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const { userGlobal } = useContext(UserContext);
  const { id } = userGlobal;
  const alertDanger = (message: string) => {
    return toast.error(message);
  };
  const alertWarning = (message: string) => {
    return toast.warning(message);
  };
  const alertSuccess = (message: string) => {
    return toast.success(message);
  };

  const { password, onChange } = useForm({
    password: "",
  });

  const [error, setError] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([password].includes("")) {
      setError(true);
      setTimeout(() => {
        setError(false);
        alertWarning("Todos los campos son obligatorios.");
      }, 2000);
      return;
    }
    setError(false);
    const token = Cookies.get("token");
    updateUserAuth("auth", { ...userGlobal, password: password }, token || "")
      .then((res) => {
        console.log(res);
        alertSuccess("Se ha actualizado");
      })
      .catch((err) => {
        console.log(err);
        alertDanger("Ocurrió un error");
      });
  };

  return (
    <LayoutDashboard>
      <h3>Edita tu información Personal</h3>
      <form className={styles.info} onSubmit={onSubmit}>
        {error && <span>Debes de ingresar una clave</span>}
        <ToastContainer />
        <div className={styles.field}>
          <label>Nueva Contraseña: </label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className={styles.fieldButton}>
          <button type="submit">Editar</button>
        </div>
      </form>
    </LayoutDashboard>
  );
};

export default ChangePassword;

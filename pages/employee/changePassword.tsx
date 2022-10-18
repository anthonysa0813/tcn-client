import React from "react";
import LayoutEmployee from "./layoutEmployee";
import styles from "../../styles/employees/ChangePassword.module.css";
import ButtonPrimary from "../../components/buttons/Button";

const ChangePasswordPage = () => {
  return (
    <LayoutEmployee name="Cambiar la contraseña">
      <h3>Cambia tu contraseña</h3>
      <form>
        <div className={styles.section}>
          <div className={styles.keyContainer}>
            <label>Contraseña actual: </label>
            <div className={styles.inputSection}>
              <input type="text" />
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.keyContainer}>
            <label>Nueva Contraseña: </label>
            <div className={styles.inputSection}>
              <input type="text" />
            </div>
          </div>
        </div>
        <ButtonPrimary
          color="dark"
          content="guardar"
          onClick={() => console.log("jeje")}
          type="button"
        />
      </form>
    </LayoutEmployee>
  );
};

export default ChangePasswordPage;

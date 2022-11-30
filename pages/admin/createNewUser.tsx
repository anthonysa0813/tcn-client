import React, { useState, useRef } from "react";
import generator from "generate-password";
import styles from "../../styles/admin/CreateNewUser.module.css";
import DatalistInput from "react-datalist-input";
import { v4 as uuid } from "uuid";
import useForm from "../../hooks/useForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastSuccess, toastWarning } from "../../helpers/alerts";
import { createUserAuth } from "../../apis/auth/fetchFunctions";
import dynamic from "next/dynamic";

const KeyIcon = dynamic(() =>
  import("@mui/icons-material/Key").then((res) => res.default)
);

const LayoutDashboard = dynamic(() =>
  import("../../components/dashboard/LayoutDashboard").then(
    (res) => res.default
  )
);

const roles = [
  { id: uuid(), value: "ADMIN_ROLE" },
  { id: uuid(), value: "USER_ROLE" },
];

const CreateNewUser = () => {
  const [roleValue, setRoleValue] = useState("");
  const [initialForm, setInitialForm] = useState({
    names: "",
    email: "",
    password: "",
  });
  const { email, names, onChange } = useForm(initialForm);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState(false);
  // useEffect(() => {
  //   if (passwordInputRef.current) {
  //     console.log("password: ", passwordInputRef.current.value);
  //   }
  // }, []);

  const generatePassword = () => {
    const passRandom = generator.generate({
      length: 10,
      numbers: true,
    });
    if (passwordInputRef.current) {
      passwordInputRef.current.value = passRandom;
    }
    // setInitialForm({
    //   ...initialForm,
    //   password: passRandom,
    // });
  };

  const isAdmin = () => {
    setIsSuperAdmin((state) => !state);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if ([email, names, password, roleValue].includes("")) {
    //   toastWarning("todos los campos son obligatorios");
    //   return;
    // }
    if (passwordInputRef.current) {
      console.log("form", {
        names,
        email,
        password: passwordInputRef.current.value,
        role: roleValue,
        superAdmin: isSuperAdmin,
      });

      createUserAuth("auth/register", {
        name: names,
        email,
        password: passwordInputRef.current.value,
        role: roleValue,
        superAdmin: isSuperAdmin,
      }).then((res) => {
        if (Object.keys(res).length > 0) {
          toastSuccess(`El usuario  ${res.name} ha sido creado`);
          setMessage(true);
        }
      });
    }
  };

  return (
    <LayoutDashboard>
      <div className={styles.main}>
        <h1>Crea un nuevo usuario y elige su role</h1>
        {message && (
          <span>Hemos enviado un correo al usuario con sus datos.</span>
        )}
        <form className={styles.form} onSubmit={onSubmit}>
          <ToastContainer />
          <div className={styles.field}>
            <label htmlFor="name">Nombres:</label>
            <input type="text" name="names" value={names} onChange={onChange} />
          </div>
          <div className={styles.field}>
            <label htmlFor="name">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className={styles.field}>
            <div className={styles.headField}>
              <label htmlFor="name">Password:</label>
              <button onClick={generatePassword} type="button">
                {" "}
                <KeyIcon style={{ fontSize: "16px" }} />
                <span>Generar Password</span>
              </button>
            </div>
            <input type="text" ref={passwordInputRef} />
          </div>
          <div className={styles.field}>
            <DatalistInput
              placeholder="role"
              label="Elige el role"
              onSelect={(item) => setRoleValue(item.value)}
              items={roles}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="name">
              ¿Es superAdmin?: <span>(Opcional)</span>
            </label>
            <div className="option">
              <input type="checkbox" checked={isSuperAdmin} onClick={isAdmin} />{" "}
              Sí lo es
            </div>
          </div>
          <button type="submit" className={styles.buttonSubmit}>
            submit
          </button>
        </form>
      </div>
    </LayoutDashboard>
  );
};

export default CreateNewUser;

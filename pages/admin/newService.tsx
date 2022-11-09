import React, { useState, useContext, useEffect } from "react";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Input } from "@nextui-org/react";
import useForm from "../../hooks/useForm";
import { createNewServicefetch } from "../../helpers/employeeFetch";
import styles from "../../styles/admin/form/NewServiceForm.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context/UserContext";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
interface FormProp {
  title: string;
  company: string;
  description?: string;
}

const notify = () => toast.success("Se creó el servicio!");
const notifyWarning = (message: string) => toast.warning(message);

const NewServicePage = () => {
  const [descriptionState, setDescriptionState] = useState("");
  const { title, company, form, onChange } = useForm<FormProp>({
    title: "",
    company: "",
  });
  const [error, setError] = useState(false);
  const { userGlobal } = useContext(UserContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const { role } = userGlobal;

  useEffect(() => {
    console.log("role", role);
    if (role !== "ROLE_ADMIN") {
      console.log("es admin");
      setIsDisabled(true);
    }
  }, [role]);

  const handleChange = (e: string) => {
    setDescriptionState(e);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ([title, company, descriptionState].includes("")) {
      setError(true);
      notifyWarning("Están vaciós algunos campos...");
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    setError(false);
    createNewServicefetch({
      title,
      company,
      description: descriptionState,
    }).then((res) => {
      notify();
    });
  };

  return (
    <LayoutDashboard>
      <ToastContainer />

      <div className="wrapper">
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.title}>Crear un nuevo servicio</h1>
          {role !== "ADMIN_ROLE" && (
            <p className={styles.alert}>
              Únicamente los usuarios con un role <span>ADMIN_ROLE</span>,
              podrán crear.
            </p>
          )}
          <div className={styles.field}>
            <label>Título:</label>
            <Input
              type="text"
              clearable
              underlined
              name="title"
              value={title}
              onChange={onChange}
            />
          </div>
          <div className={styles.field}>
            <label>Nombre de la compañia:</label>
            <Input
              type="text"
              clearable
              underlined
              name="company"
              value={company}
              onChange={onChange}
            />
          </div>
          <div className={styles.field}>
            <QuillNoSSRWrapper
              value={descriptionState}
              onChange={handleChange}
              theme="snow"
            />
          </div>
          <button
            type={role !== "ADMIN_ROLE" ? "button" : "submit"}
            className={`${styles.button} ${
              role !== "ADMIN_ROLE" ? styles.inactive : ""
            }`}
            // disabled={true}
          >
            Crear
          </button>
        </form>
      </div>
    </LayoutDashboard>
  );
};

export default NewServicePage;

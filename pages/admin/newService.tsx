import React, { useState, useContext, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Input } from "@nextui-org/react";
import useForm from "../../hooks/useForm";
import { createNewServicefetch } from "../../helpers/employeeFetch";
import styles from "../../styles/admin/form/NewServiceForm.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context/UserContext";
import { TokenContext } from "../../context/CurrentToken";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const Head = dynamic(() => import("next/head").then((res) => res.default));

const LayoutDashboard = dynamic(
  import("../../components/dashboard/LayoutDashboard").then(
    (res) => res.default
  )
);
interface FormProp {
  title: string;
  schedule: string;
  salary: string;
  requirements: string;
  description?: string;
}

const notify = () => toast.success("Se creó el servicio!");
const notifyWarning = (message: string) => toast.warning(message);

const NewServicePage = () => {
  const [descriptionState, setDescriptionState] = useState("");

  const [initialValues, setInitialValues] = useState({
    title: "",
    schedule: "",
    salary: "",
    requirements: "",
  });
  const { title, salary, schedule, requirements, form, onChange } =
    useForm<FormProp>(initialValues);
  const [error, setError] = useState(false);
  const { userGlobal } = useContext(UserContext);
  const { privateToken } = useContext(TokenContext);

  const [isDisabled, setIsDisabled] = useState(false);
  const { role } = userGlobal;

  useEffect(() => {
    if (role !== "ROLE_ADMIN") {
      setIsDisabled(true);
    }
  }, [role]);

  const handleChange = (e: string) => {
    setDescriptionState(e);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      [title, salary, schedule, requirements, descriptionState].includes("")
    ) {
      setError(true);
      notifyWarning("Están vaciós algunos campos...");
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    setError(false);
    createNewServicefetch(
      {
        title,
        salary,
        schedule,
        requirements,
        description: descriptionState,
      },
      privateToken.token
    ).then((res) => {
      console.log({ res });
      notify();
      setDescriptionState("");
      setInitialValues({
        title: "",
        schedule: "",
        salary: "",
        requirements: "",
      });
    });
  };

  return (
    <>
      <Head>
        <title>Contact Bpo Admin | Crea un Nuevo Puesto</title>
      </Head>
      <LayoutDashboard>
        <ToastContainer />

        <div className="wrapper">
          <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.title}>Crear un nuevo puesto laboral</h1>
            {role !== "ADMIN_ROLE" && (
              <p className={styles.alert}>
                Únicamente los usuarios con un role <span>ADMIN_ROLE</span>,
                podrán crear.
              </p>
            )}
            <div className={styles.subwrapper}>
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
                <label>Requerimientos:</label>
                <Input
                  type="text"
                  clearable
                  underlined
                  name="requirements"
                  value={requirements}
                  onChange={onChange}
                  placeholder="habilidades blandas, experiencia en ventas,etc..."
                />
              </div>

              <div className={styles.fieldSecondary}>
                <div className={styles.subField}>
                  <label>Horario:</label>
                  <Input
                    type="text"
                    clearable
                    underlined
                    name="schedule"
                    value={schedule}
                    onChange={onChange}
                    placeholder="L - V (8am -6pm)"
                  />
                </div>
                <div className={styles.subField}>
                  <label>Salario:</label>
                  <Input
                    type="text"
                    clearable
                    underlined
                    name="salary"
                    value={salary}
                    onChange={onChange}
                    placeholder="2000"
                  />
                </div>
              </div>
              <div className={styles.field} style={{ marginBlock: "3rem" }}>
                <label style={{ marginBlockEnd: "1rem" }}>
                  Descripción del puesto:
                </label>
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
            </div>
          </form>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default NewServicePage;

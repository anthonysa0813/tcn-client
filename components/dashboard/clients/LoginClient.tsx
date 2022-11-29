import React, { Dispatch, SetStateAction, useContext, useState } from "react";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import {
//   Button,
//   FormControl,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
//   TextField,
// } from "@mui/material";
import styles from "../../../styles/client/LoginPage.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import {
  EmployeeContext,
  EmployeeContextProps,
} from "../../../context/EmployeeContext";
import { loginFetchApi } from "../../../helpers/useFetch";
// import BeatLoader from "react-spinners/BeatLoader";
// import Link from "next/link";
import dynamic from "next/dynamic";

interface Prop {
  setShowForgetPasswordForm: Dispatch<SetStateAction<boolean>>;
}

const Visibility = dynamic(() =>
  import("@mui/icons-material/Visibility").then((res) => res.default)
);

const VisibilityOff = dynamic(() =>
  import("@mui/icons-material/VisibilityOff").then((res) => res.default)
);

const Button = dynamic(() =>
  import("@mui/material/Button").then((res) => res.default)
);

const FormControl = dynamic(() =>
  import("@mui/material/FormControl").then((res) => res.default)
);
const IconButton = dynamic(() =>
  import("@mui/material/IconButton").then((res) => res.default)
);
const InputAdornment = dynamic(() =>
  import("@mui/material/InputAdornment").then((res) => res.default)
);
const InputLabel = dynamic(() =>
  import("@mui/material/InputLabel").then((res) => res.default)
);
const OutlinedInput = dynamic(() =>
  import("@mui/material/OutlinedInput").then((res) => res.default)
);
const TextField = dynamic(() =>
  import("@mui/material/TextField").then((res) => res.default)
);

const BeatLoader = dynamic(() =>
  import("react-spinners/BeatLoader").then((res) => res.default)
);
const Link = dynamic(() => import("next/link").then((res) => res.default));

const LoginClient = ({ setShowForgetPasswordForm }: Prop) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const notifySuccess = () => toast.success("Bienvenido!");
  // const notifyError = () => toast.warning("email y/o password son incorrectos");
  const { setEmployeeGlobal } =
    useContext<EmployeeContextProps>(EmployeeContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      loginFetchApi("auth/employee/login", values).then((res) => {
        if (res.message) {
          const notifyErrorMessage = () => toast.error(res.message);
          notifyErrorMessage();
          setLoading(false);
        }
        if (res.employee) {
          localStorage.setItem("employee", JSON.stringify(res.employee));
          sessionStorage.setItem("token", res.token);
          setLoading(false);
          Cookies.set("token", res.token, { expires: 7 });
          setEmployeeGlobal(res.employee);
          notifySuccess();
          setTimeout(() => {
            router.push("/employee/edit");
          }, 500);
        }
      });
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Debe de ser un email").required("Requerido"),
      password: Yup.string().required("Requerido"),
    }),
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <ToastContainer />
        <h4>
          Contact BPO | <span>Login</span>
        </h4>
        <div className={styles.field}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            size="small"
            {...getFieldProps("email")}
          />
          {errors.email && touched.email && (
            <span className="text-danger ">{errors.email} </span>
          )}
        </div>
        <FormControl sx={{ width: "100%" }} size="small" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            {...getFieldProps("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {errors.password && touched.password && (
            <span className="text-danger ">{errors.password} </span>
          )}
        </FormControl>
        <div className={styles.field}>
          <span
            className={styles.textSm}
            onClick={() => setShowForgetPasswordForm(true)}
          >
            olvidé mi contraseña
          </span>
        </div>

        <div className={styles.field}>
          <Button color="primary" variant="contained" type="submit">
            Entrar
          </Button>
        </div>
        <div className={styles.field}>
          <Button color="primary" variant="outlined" type="button">
            <Link href="/user/register">registrarme</Link>
          </Button>
        </div>
        <div className={styles.fieldCenter}>
          {loading && <BeatLoader color="#0072f5" />}
        </div>
      </form>
    </>
  );
};

export default LoginClient;

import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  CSSProperties,
} from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import styles from "../../../styles/client/LoginPage.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";
import {
  EmployeeContext,
  EmployeeContextProps,
} from "../../../context/EmployeeContext";
import { loginFetchApi } from "../../../helpers/useFetch";
import { Loading } from "@nextui-org/react";
import { BounceLoader } from "react-spinners";
import BeatLoader from "react-spinners/BeatLoader";

interface Prop {
  setShowForgetPasswordForm: Dispatch<SetStateAction<boolean>>;
}

const LoginClient = ({ setShowForgetPasswordForm }: Prop) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const notifySuccess = () => toast.success("Bienvenido!");
  // const notifyError = () => toast.warning("email y/o password son incorrectos");
  const { employeeGlobal, setEmployeeGlobal } =
    useContext<EmployeeContextProps>(EmployeeContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      setLoading(true);
      loginFetchApi("auth/employee/login", values).then((res) => {
        console.log(res);
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
          }, 1000);
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
          <Button color="primary" type="submit">
            Entrar
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

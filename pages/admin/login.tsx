import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import { toast, ToastContainer } from "react-toastify";
import styles from "../../styles/admin/Login.module.css";
import { loginFetchApi } from "../../helpers/useFetch";
import { UserContext } from "../../context/UserContext";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Visibility = dynamic(() =>
  import("@mui/icons-material/Visibility").then((res) => res.default)
);

const Image = dynamic(() => import("next/image").then((res) => res.default));

const VisibilityOff = dynamic(() =>
  import("@mui/icons-material/VisibilityOff").then((res) => res.default)
);

const Button = dynamic(() =>
  import("@mui/material/Button").then((res) => res.default)
);

const Paper = dynamic(() =>
  import("@mui/material/Paper").then((res) => res.default)
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

const LoginAdminForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const toastWarning = (message: string) => toast.warning(message);
  const toastSuccess = (message: string) => toast.success(message);
  const { userGlobal, setUserGlobal } = useContext(UserContext);
  const router = useRouter();

  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("values", values);
      setLoading(true);
      loginFetchApi("auth/login", values).then((res) => {
        if (res.message) {
          console.log(res.message);
          setShowLoading(false);
          setLoading(false);
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
      setShowLoading(true);
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
    <main className={styles.main}>
      <Paper elevation={2}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/LogoContact.png"
              alt="Logo de Contact bpo"
              width={200}
              height={100}
              onClick={() => router.push("/")}
            />
            <h5>ADMIN</h5>
          </div>
          <div className={styles.field}>
            <FormControl sx={{ width: "100%" }} size="small" variant="outlined">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                size="small"
                style={{ width: "100%" }}
                sx={{ width: "100%" }}
                {...getFieldProps("email")}
              />
              {errors.email && touched.email && (
                <span className="text-danger ">{errors.email} </span>
              )}
            </FormControl>
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
              // onClick={() => setShowForgetPasswordForm(true)}
            >
              olvidé mi contraseña
            </span>
          </div>

          <div className={styles.field}>
            <Button
              color="primary"
              sx={{ width: "100%" }}
              variant="contained"
              type="submit"
            >
              Entrar
            </Button>
          </div>
          <div className={styles.fieldCenter}>
            {loading && <BeatLoader color="#0072f5" />}
          </div>
        </form>
      </Paper>
      <ToastContainer />
    </main>
  );
};

export default LoginAdminForm;

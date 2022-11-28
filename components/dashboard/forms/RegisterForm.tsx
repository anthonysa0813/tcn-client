import React, { useEffect, useState, useContext } from "react";
import styles from "../../../styles/users/RegisterUser.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { API_URL } from "../../../utils/constanstApi";
import { loginFetchApi } from "../../../helpers/useFetch";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/dist/client/router";
import {
  EmployeeContext,
  EmployeeContextProps,
} from "../../../context/EmployeeContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
// import { BeatLoader } from "react-spinners";
import dynamic from "next/dist/shared/lib/dynamic";

interface Prop {
  data: any;
}

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
const Select = dynamic(() =>
  import("@mui/material/Select").then((res) => res.default)
);

const MenuItem = dynamic(() =>
  import("@mui/material/MenuItem").then((res) => res.default)
);

const Button = dynamic(() =>
  import("@mui/material/Button").then((res) => res.default)
);

const BeatLoader = dynamic(() =>
  import("react-spinners/BeatLoader").then((res) => res.default)
);

const RegisterForm = ({ data }: Prop) => {
  const router = useRouter();
  const [isDesabled, setIsDesabled] = useState(false);
  const { employeeGlobal, setEmployeeGlobal } =
    useContext<EmployeeContextProps>(EmployeeContext);
  const [cvValue, setCvValue] = useState("" as any);
  const [isLoading, setIsLoading] = useState(false);
  const notifySuccess = () => toast.success("Se registró satisfactoriamente!");

  const { errors, touched, getFieldProps, values } = useFormik({
    initialValues: {
      name: "",
      surnames: "",
      email: "",
      password: "",
      country: "",
      phone: "",
      repeatPassword: "",
    },
    onSubmit: (values) => {
      //  setIsLoading(true);
      let dataform = new FormData();
      dataform.append("name", values.name);
      dataform.append("surnames", values.surnames);
      dataform.append("email", values.email);
      dataform.append("password", values.password || "");
      // dataform.append("callingCode", callingCode || "");
      dataform.append("country", values.country || "");
      //  dataform.append("cv", cvValue);
      dataform.append("phone", values.phone || "");
      console.log("dataform", dataform);
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Requerido"),
      surnames: Yup.string().required("Requerido"),
      email: Yup.string().email("Debe de ser un email").required("Requerido"),
      password: Yup.string().required("Requerido"),
      repeatPassword: Yup.string()
        .required("Requerido")
        .oneOf([Yup.ref("password"), null], "Las contraseñas no son iguales"),
      country: Yup.string().required("Requerido"),
      phone: Yup.string().required("Requerido"),
    }),
  });

  const { country, email, name, password, phone, surnames } = values;
  useEffect(() => {
    if ([country, email, name, password, phone, surnames].includes("")) {
      setIsDesabled(true);
    } else {
      setIsDesabled(false);
    }
  }, [country, email, name, password, phone, surnames]);
  const sendData = async (dataObject: FormData) => {
    try {
      const res = await fetch(`${API_URL}/employees`, {
        method: "POST",
        body: dataObject,
      });
      const data = await res.json();
      loginFetchApi("auth/employee/login", {
        email: email,
        password: password,
      }).then((resposeLogin) => {
        if (resposeLogin) {
          // console.log("responseLogin", resposeLogin);
          notifySuccess();
          Cookies.set("token", resposeLogin.token, { expires: 7 });
          setIsLoading(false);
          setTimeout(() => {
            router.push("/campaign");
          }, 1500);
        }
      });
      console.log("dataaaa ====>", data);
      setEmployeeGlobal(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let dataform = new FormData();
    dataform.append("name", name);
    dataform.append("surnames", surnames);
    dataform.append("email", email);
    dataform.append("password", password || "");
    //  dataform.append("callingCode", callingCode || "");
    dataform.append("country", country || "");
    //  dataform.append("message", message || "");
    dataform.append("cv", cvValue);
    //  dataform.append("typeJob", typeJob || "");
    dataform.append("phone", phone || "");
    console.log("dataform", dataform);
    setIsLoading(true);
    sendData(dataform);
  };

  const [valuesSupport, setValuesSupport] = useState({
    password: "",
    showPassword: false,
    showRepeatPassword: false,
  });

  const handleClickShowPassword = () => {
    setValuesSupport({
      ...valuesSupport,
      showPassword: !valuesSupport.showPassword,
    });
  };

  const handleClickShowRepeatPassword = () => {
    setValuesSupport({
      ...valuesSupport,
      showRepeatPassword: !valuesSupport.showRepeatPassword,
    });
  };

  const readInputTypeFile = (e: any) => {
    setCvValue(e.target.files[0]);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        <p>
          llena el formulario, postula y mantén el seguimiento a tus
          postulaciones.
        </p>
        <div className={styles.formContent}>
          <div className={styles.field}>
            <TextField
              id="outlined-basic"
              label="Nombres"
              type="text"
              variant="outlined"
              sx={{ width: "100%" }}
              size="small"
              {...getFieldProps("name")}
            />
            {errors.name && touched.name && (
              <span className="text-danger ">{errors.name} </span>
            )}
          </div>
          <div className={styles.field}>
            <TextField
              id="outlined-basic"
              label="Apellidos"
              variant="outlined"
              sx={{ width: "100%" }}
              size="small"
              {...getFieldProps("surnames")}
            />
            {errors.surnames && touched.surnames && (
              <span className="text-danger ">{errors.surnames} </span>
            )}
          </div>
          <div className={styles.field}>
            <TextField
              id="outlined-basic"
              label="Email"
              type="email"
              variant="outlined"
              sx={{ width: "100%" }}
              size="small"
              {...getFieldProps("email")}
            />
            {errors.email && touched.email && (
              <span className="text-danger ">{errors.email} </span>
            )}
          </div>
          <div className={styles.field}>
            <TextField
              id="outlined-basic"
              label="Número Telefónico"
              variant="outlined"
              type="number"
              sx={{ width: "100%" }}
              size="small"
              {...getFieldProps("phone")}
            />
            {errors.phone && touched.phone && (
              <span className="text-danger ">{errors.phone} </span>
            )}
          </div>

          <div className={styles.field}>
            <FormControl sx={{ width: "100%" }} size="small" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={valuesSupport.showPassword ? "text" : "password"}
                {...getFieldProps("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {valuesSupport.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors.password && touched.password && (
                <span className="text-danger ">{errors.password} </span>
              )}
            </FormControl>
          </div>

          <div className={styles.field}>
            <FormControl sx={{ width: "100%" }} size="small" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={valuesSupport.showRepeatPassword ? "text" : "password"}
                {...getFieldProps("repeatPassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowRepeatPassword}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {valuesSupport.showRepeatPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors.repeatPassword && touched.repeatPassword && (
                <span className="text-danger ">{errors.repeatPassword} </span>
              )}
            </FormControl>
          </div>

          <div className={styles.field}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">País</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="País"
                size="small"
                {...getFieldProps("country")}
              >
                <MenuItem value={""}>Seleccione</MenuItem>
                {Object.keys(data.countriesNames).map((country: any, index) => {
                  return (
                    <MenuItem key={index} value={country}>
                      {" "}
                      {data.countriesNames[country]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {errors.country && touched.country && (
              <span className="text-danger ">{errors.country} </span>
            )}
          </div>
          <div className={styles.field}>
            <label className="custom-file-upload">
              {/* CV(extensión del archivo: pdf)<span>(*)</span>: */}
              <input
                type="file"
                name="cv"
                onChange={readInputTypeFile}
                // {...getFieldProps("cv")}
              />
            </label>
            {cvValue && <p className={styles.titlePdf}>{cvValue.name}</p>}
          </div>

          <div className={styles.buttonField}>
            <div className={styles.field}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={isDesabled}
              >
                registrarme
              </Button>
            </div>
            <div className={styles.field}>
              <Button color="secondary" type="button">
                <Link href="/login">Ya tengo cuenta</Link>
              </Button>
            </div>
            {isLoading && <BeatLoader color="#0072f5" />}
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;

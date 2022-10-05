import React, {useState, useContext, ChangeEvent, FormEvent, useEffect} from 'react';
import LayoutEmployee from './layoutEmployee';
import styles from "../../styles/users/Register.module.css";
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import { EmployeeContext, EmployeeContextProps } from '../../context/EmployeeContext';
import { GetServerSideProps } from 'next';

const EditPage = ({data}: any) => {

    const [formValues, setFormValues] = useState({
        name: "", 
        surnames: "",
        email: "",
        callingCode: "", 
        country: "", 
        phone: "",
        message: "",
        cv: "",
        typeJob: "",
        password: "",
        confirmPassword: "",
    })
    const {name, surnames, email, callingCode, country, message, cv, typeJob, phone, password, confirmPassword} = formValues;
    const router = useRouter();
    const notify = () => toast.success("Se actualizó satisfactoriamente!");
    const {employeeGlobal, setEmployeeGlobal} = useContext<EmployeeContextProps>(EmployeeContext);
    console.log("EmployeeContextProps",employeeGlobal);
    const {id} = employeeGlobal;

    useEffect(() => {
        fetch(`http://localhost:5050/api/employees/${id}`).then(res => res.json())
            .then(data => setFormValues(data))
    }, [id])
    

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
       console.log(e.target.value);
    }

    const handleOption = (e: ChangeEvent<HTMLSelectElement>) => {
        setFormValues({
            ...formValues,
            callingCode: data.callingCode[e.target.value],
            country: data.countriesNames[e.target.value]
        });
    }

    const readInputTypeFile = (e: any) => {
       setFormValues({
            ...formValues,
            [e.target.name]: e.target.files[0]
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();      
        let dataform = new FormData();
        dataform.append("name", name);
        dataform.append("surnames", surnames);
        dataform.append("email", email);
        dataform.append("password", password);
        dataform.append("callingCode", callingCode);
        dataform.append("country", country);
        dataform.append("message", message);
        dataform.append("cv", cv);
        dataform.append("typeJob", typeJob);
        dataform.append("phone", phone);
        sendData(dataform);

    }


    const sendData = async (dataObject: FormData) => {
        
        try {
            const res = await fetch(`http://localhost:5050/api/employees/${id}`, {
                method: 'PUT',
                body: dataObject,
                })
            const data = await res.json()
            notify()
            return data;
        } catch (error) {
            console.log(error);
        }
    }

  

  return (
    <LayoutEmployee name="editar información">
        <h1>Edita tu información</h1>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div className={styles.field}>
            <ToastContainer />
                <label>
                    Nombres:
                    <input type="text" name="name" value={name} onChange={handleChange}/>
                </label>
            </div>
            <div className={styles.field}>
                <label htmlFor="">
                    Apellidos:
                    <input type="text" name="surnames" value={surnames} onChange={handleChange}/>
                </label>
            </div>
            <div className={styles.field}>
                <label htmlFor="">
                    Email:
                    <input type="email" name="email" value={email} onChange={handleChange}/>
                </label>
            </div>
            <div className={styles.field}>
                <label htmlFor="">
                    Número de contacto:
                    <input type="number" name="phone" value={phone} onChange={handleChange}/>
                </label>
            </div>
            
            <div className={styles.field}>
                <label htmlFor="">
                    Contraseña:
                    <input type="password" name="password" value={password} onChange={handleChange}/>
                </label>
            </div>

            <div className={styles.field}>
                <label htmlFor="">
                    Repetir Contraseña:
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange}/>
                </label>
            </div>
            
            
            <div className={styles.field}>
                <label htmlFor="">
                    País:
                <select name="callingCode" onChange={handleOption} className={styles.select} >
                    {
                        Object.keys(data.countriesNames).map( (country: any, index) => {
                            return (
                                <option key={index}  value={country} >{data.countriesNames[country]}</option>
                            )
                        }) 
                    }
                </select>
                </label>
            </div>
            <div className={styles.field}>
                <label htmlFor="">
                    CV:
                    <input type="file" name="cv" onChange={(readInputTypeFile)} />
                </label>
            </div>
            <h5>¿En qué modo le gustaría trabajar?</h5>
            <div className={styles.optionsJob}>
                <div className="field">
                    <label>
                    <input type="radio" value="PRESENCIAL" name="typeJob" id="typeJob" onChange={handleChange} />
                    Presencial
                    </label>
                </div>
                
                <div className="field">
                    <label>
                    <input type="radio" value="REMOTO" name="typeJob" id="typeJob"  onChange={handleChange}/>
                    Remoto
                    </label>
                </div>
                
                <div className="field">
                    <label>
                    <input type="radio" value="HIBRIDO" name="typeJob" id="typeJob" onChange={handleChange} />
                        Híbrido
                    </label>
                </div>
            </div>
            <div className={styles.fieldText}>
                <label htmlFor="">
                    Dejanós un mensaje:
                    <textarea name="message" onChange={handleChange} id=""></textarea>
                </label>
            </div>
            <div className={styles.buttonField}>
                <button type="submit" className={styles.register}>Editar</button>
            </div>
          </form>
    </LayoutEmployee>
  )
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // data de nombres de paises
    const res = await fetch("http://country.io/names.json");
    const data = await res.json();
    // data de código telefónico
    const resCode = await fetch("http://country.io/phone.json");
    const dataCode = await resCode.json();

    // current User

    return {
        props: {
            data: {
                countriesNames: data,
                callingCode: dataCode
            }
        }
    }
}


export default EditPage
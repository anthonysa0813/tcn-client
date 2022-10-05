import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { EmployeeContext, EmployeeContextProps } from '../../context/EmployeeContext';
import styles from "../../styles/client/Navbar.module.css";
import ModalLogin from '../employees/ModalLogin';


const Navbar = () => {
    const {employeeGlobal, setEmployeeGlobal} = useContext<EmployeeContextProps>(EmployeeContext);
    const { name, surnames } = employeeGlobal;
    const router = useRouter()
    const [showModalLogin, setshowModalLogin ] = useState(false)
    const logout = () =>{
        setEmployeeGlobal({
            id: "",
            name: "",
            surnames: "",
            email: "",
            phone: "",
            cv: "",
            callingCode: "",
            typeJob: "",
            password: "",
            service: [],
        })
        router.push("/")
    }




  return (
    <>
    {
        showModalLogin && (
            <ModalLogin  setshowModalLogin={setshowModalLogin} />
        )
    }
    <header className={styles.header}>
        <div className="wrapper">
            <div className={styles.headerContainer}>
                <h1>ContactBpo</h1>
                <nav>
                    <ul>
                        <li>
                            <Link href="#services">
                               <a>Servicios</a>
                            </Link>
                            </li>
                        <li>
                            <Link href="#team">
                             <a>
                             Nuestro Equipo
                             </a>
                            </Link>
                           </li>
                        <li>
                            <Link href="#clients">
                                <a>Clientes</a>
                            </Link>
                            </li>
                        <li>
                            <Link href="/">
                                <a>Contáctanos</a>
                            </Link>
                            </li>
                        <li>
                            <Link href="/user/register">
                                <a>Trabaja con Nosotros</a>
                            </Link>
                            </li>
                        <li>
                            <Link href="/campaign">
                                <a>Campañas</a>
                            </Link>
                        </li>
                      {
                        !name && (
                        <li onClick={() => setshowModalLogin(true)}>
                            <a>Login</a>
                        </li>
                        )
                      }
                        {
                            name  && (
                                <li className={styles.user}>
                                    <h3>{`${name?.split("")[0].toUpperCase()} ${surnames?.split("")[0].toUpperCase()}`}</h3>
                                    <div className={styles.miniMenu}>
                                            <Link href="/employee/profile">
                                                <a>Perfil</a>
                                            </Link>
                                            <Link href="/employee/applications">
                                                <a> postulaciones</a>
                                            </Link>
                                            <div onClick={logout}>
                                                <a>Cerrar Sesión</a>
                                            </div>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    </>
  )
}

export default Navbar
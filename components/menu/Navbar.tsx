import Link from 'next/link';
import React from 'react';
import styles from "../../styles/client/Navbar.module.css";


const Navbar = () => {
  return (
    <header className={styles.header}>
        <div className="wrapper">
            <div className={styles.headerContainer}>
                <h1>ContactBpo</h1>
                <nav>
                    <ul>
                        <li>
                            <Link href="/">
                                <a>Servicios</a>
                            </Link>
                            </li>
                        <li>
                            <Link href="/">
                             <a>
                             Nuestro Equipo
                             </a>
                            </Link>
                           </li>
                        <li>
                            <Link href="/">
                                <a>Clientes</a>
                            </Link>
                            </li>
                        <li>
                            <Link href="/">
                                <a>Contáctanos</a>
                            </Link>
                            </li>
                        <li>
                            <Link href="/">
                                <a>Trabaja con Nosotros</a>
                            </Link>
                            </li>
                        <li>
                            <Link href="/campaign">
                                <a>Campañas</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
  )
}

export default Navbar
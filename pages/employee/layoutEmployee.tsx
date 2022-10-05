
import Head from 'next/head'
import Link from 'next/link';
import React from 'react'
import Navbar from '../../components/menu/Navbar';
import styles from "../../styles/employees/Layout.module.css";

interface Prop {
    children: JSX.Element[] | JSX.Element,
    name: string
}

const LayoutEmployee = ({children, name}: Prop) => {
  return (
    <>
    <Head>
      <title>Contact Bpo | {name} </title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar />
    <main>
        <div className={styles.profileGrid}>
            <div className={styles.asideMenu}>
                <h1>Menu</h1>
                <nav>
                    <ul>
                        <Link href="/employee/edit">Editar Información Personal</Link>
                        <Link href="/employee/applications">Ver postulaciones</Link>
                    </ul>
                </nav>
            </div>
            <div className={`${styles.mainProfile}`}>
                <div className="wrapper">
                    {children}
                </div>
            </div>
        </div>
    </main>
    </>
  )
}

export default LayoutEmployee
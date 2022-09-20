import React from 'react'
import { ChildProp } from '../../interfaces/index';
import styles from "../../styles/admin/ModalComponent.module.css";

const ModalComponent = ({children}: ChildProp) => {
  return (
    <div className={styles.modalContainer}>
        {children}
    </div>
  )
}

export default ModalComponent
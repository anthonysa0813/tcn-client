import React from "react";
import ModalComponent from "../dashboard/ModalComponent";
import styles from "../../styles/employees/RegisterModalDone.module.css";
import Image from "next/image";
import dynamic from "next/dynamic";

const CloseIcon = dynamic(() =>
  import("@mui/icons-material/Close").then((res) => res.default)
);

interface Prop {
  closeModal: () => void;
}

const RegisterModalDone = ({ closeModal }: Prop) => {
  return (
    <ModalComponent center>
      <div className={styles.container}>
        <div className={styles.boxClose}>
          <CloseIcon onClick={closeModal} className={styles.svg} />
        </div>
        <div className={styles.logoSection}>
          <Image
            src="/images/drawRegisterDone.svg"
            alt="draw animado celebrando"
            width={400}
            height={400}
          />
        </div>
        <div className={styles.infoText}>
          <h1>
            Gracias por registrarte en <span>contact BPO</span>
          </h1>
          <span>
            Te hemos enviado un mensaje a tu correo para la activación de su
            cuenta
          </span>
        </div>
      </div>
    </ModalComponent>
  );
};

export default RegisterModalDone;

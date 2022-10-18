import React from "react";
import styles from "../../styles/employees/Edit.module.css";
import { GiPublicSpeaker } from "react-icons/gi";

const FieldInput = () => {
  return (
    <div className={styles.inputSection}>
      <input type="text" className={styles.input} />
    </div>
  );
};

export default FieldInput;

import React from "react";
import styles from "../../styles/components/buttons/InputFileUpload.module.css";
import Link from "next/link";

interface Prop {
  cv: string;
}

export const InputFileUpload = ({ cv }: Prop) => {
  return (
    <button className={styles.button} type="button">
      <Link className={styles.text} target="_blank" href={cv}>
        Ver mi CV
      </Link>
    </button>
  );
};

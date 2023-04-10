import React from "react";
import styles from "../../styles/components/buttons/InputFileUpload.module.css";
import Link from "next/link";

interface Prop {
  cv: string;
}

const LINK_BACKEND = "https://contactbpo-server-production.up.railway.app/";

export const InputFileUpload = ({ cv }: Prop) => {
  const link = cv.slice(5);
  return (
    <button className={styles.button} type="button">
      <Link
        className={styles.text}
        target="_blank"
        href={`${LINK_BACKEND}${link}`}
      >
        Ver mi CV
      </Link>
    </button>
  );
};

import React from "react";
import CopyrightIcon from "@mui/icons-material/Copyright";
import styles from "../../../styles/client/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <span>
        Contact | Copyright 2022 <CopyrightIcon />
      </span>
    </div>
  );
};

export default Footer;

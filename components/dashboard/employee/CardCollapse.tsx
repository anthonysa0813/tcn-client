import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import styles from "../../../styles/employees/Applications.module.css";
import { Service } from "../../../interfaces/index";

interface Prop {
  service: Service;
}

const CardCollapse = ({ service }: Prop) => {
  const [activeDetails, setActiveDetails] = useState(false);
  const [currentService, setCurrentService] = useState("");

  return (
    <div key={service._id} className={styles.serviceCard}>
      <div className={styles.serviceCardHead}>
        <h3>{service.title}</h3>
        <IoIosArrowUp
          className={`${styles.icon} ${
            currentService === service._id
              ? styles.activeDetails
              : styles.desactiveDetails
          }`}
          onClick={() => {
            setActiveDetails((state) => !state);
            setCurrentService((state: string) => {
              if (state === service._id) {
                return "";
              } else {
                return service._id || "";
              }
            });
          }}
        />
      </div>
      {currentService === service._id && (
        <div className={styles.serviceCardBody}>
          <p dangerouslySetInnerHTML={{ __html: service.description }}></p>
        </div>
      )}
    </div>
  );
};

export default CardCollapse;

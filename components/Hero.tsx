import React from 'react';
import styles from "../styles/client/Hero.module.css";

interface Prop {
    title: string;
    bg: string;
    id: string
}

const Hero = ({title, bg, id}: Prop) => {
  return (
    <div className={`${styles.heroContainer} ${bg}`} id={id}>
        <div className="wrapper">
            <div className={styles.heroGrid}>
                <h1>{title}</h1>
            </div>
        </div>
    </div>
  )
}

export default Hero
import React from "react";
import styles from "../style/Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.footer_container}`}>
      <p className={styles.footer_p}>
        Project by Gabriel Parra, Elkin Morillo, Alejandro Solarte, Juan
        Morillo, Daniel Cerón
        <br />
        GitHub: ParraJesus, Elkin2814, AlejandroSolartel <br />
        Probability and Statistics Course <br />
        Faculty of Electronic Engineering and Telecommunications
        <br />
        University of Cauca 2025
      </p>
    </footer>
  );
};

export default Footer;

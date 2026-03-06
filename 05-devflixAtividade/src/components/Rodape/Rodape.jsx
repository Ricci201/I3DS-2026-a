import React from "react";
import styles from "./Rodape.module.css";

const Rodape = ({ children, link }) => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        Feito com ❤️ por{" "}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {children}
        </a>
      </p>

      <span className={styles.copy}>
        © {new Date().getFullYear()} SSFlix
      </span>
    </footer>
  );
};

export default Rodape;
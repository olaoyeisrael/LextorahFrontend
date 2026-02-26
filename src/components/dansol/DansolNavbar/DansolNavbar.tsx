import React from "react";
import { Link } from "react-router-dom";
import styles from "./DansolNavbar.module.css";

const DansolNavbar: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/dansol-schools" className={styles.logo}>
          <div className={styles.logoIcon}>
            <img
              src="/images/dansol/Dansol-Schools-Logo.png"
              alt="Supreme Foundation Schools Logo"
              width={34}
              height={34}
              
            />
          </div>
          <span className={styles.logoText}>Lextorah</span>
        </Link>

        <div className={styles.actions}>
          <Link to="/login" className={styles.loginBtn}>
            Log In
          </Link>
          <Link to="#support" className={styles.helpBtn}>
            Get Help
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default DansolNavbar;

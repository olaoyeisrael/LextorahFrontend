import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./BasilNavbar.module.css";

const BasilNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/basil-schools" className={styles.logo}>
          <div className={styles.logoIcon}>
            <img
              src="/images/basil/Basil-Schools-logo.png"
              alt="Supreme Foundation Schools Logo"
              width={34}
              height={34}
              
            />
          </div>
        </Link>

        <div className={styles.navActions}>
          <Link to="/login" className={styles.loginButton}>
            Log In
          </Link>
          <Link to="#support" className={styles.helpButton}>
            Get Help
          </Link>
        </div>

        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ""}`}></span>
        </button>

        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <Link to="#login" className={styles.mobileLoginButton} onClick={() => setMobileMenuOpen(false)}>
              Log In
            </Link>
            <Link to="#support" className={styles.mobileHelpButton} onClick={() => setMobileMenuOpen(false)}>
              Get Help
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default BasilNavbar;

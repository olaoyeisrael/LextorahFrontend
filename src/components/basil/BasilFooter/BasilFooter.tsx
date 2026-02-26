import React from "react";
import { Link } from "react-router-dom";
import { basilData } from "../../../data/basilSchoolsData";
import styles from "./BasilFooter.module.css";

const BasilFooter: React.FC = () => {
  const { footer } = basilData;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <img
                  src="/images/basil/Basil-Schools-logo.png"
                  alt="Supreme Foundation Schools Logo"
                  width={34}
                  height={34}
                  
                />
              </div>
            </div>
            <p className={styles.brandDescription}>{footer.tagline}</p>
          </div>

          <div className={styles.links}>
            <h3 className={styles.linksTitle}>Quick Links</h3>
            <ul className={styles.linksList}>
              {footer.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.powered}>
            <h3 className={styles.poweredTitle}>{footer.poweredBy.title}</h3>
            <div className={styles.poweredLogo}>
              <div className={styles.poweredLogoIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#EC4899"/>
                  <path d="M2 17L12 22L22 17" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className={styles.poweredLogoText}>{footer.poweredBy.items[0]?.label}</span>
            </div>
            <p className={styles.poweredDescription}>{footer.poweredBy.items[1]?.label}</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default BasilFooter;

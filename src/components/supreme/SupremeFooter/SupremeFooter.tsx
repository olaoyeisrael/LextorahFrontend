import React from "react";
import { Link } from "react-router-dom";
import { supremeData } from "../../../data/supremeSchoolsData";
import styles from "./SupremeFooter.module.css";

const SupremeFooter: React.FC = () => {
  const { footer } = supremeData;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandSection}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <img
              src="/images/supreme-foundation/Supreme-Foundation-hero.png"
              alt="Supreme Foundation Schools Logo"
              width={42}
              height={42}
              
            />
              </div>
            </div>
            <p className={styles.tagline}>{footer.tagline}</p>
          </div>

          <div className={styles.linksSection}>
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

          <div className={styles.poweredSection}>
            <h3 className={styles.linksTitle}>{footer.poweredBy.title}</h3>
            <ul className={styles.linksList}>
              {footer.poweredBy.items.map((item, index) => (
                <li key={index}>
                  <Link to={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default SupremeFooter;

import React from "react";
import { basilData } from "../../../data/basilSchoolsData";
import styles from "./BasilIntegrity.module.css";

const CheckIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" fill="transparent" fillOpacity="0.2"/>
    <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BasilIntegrity: React.FC = () => {
  const { integrity } = basilData;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{integrity.title}</h2>

          <ul className={styles.list}>
            {integrity.items.map((item, index) => (
              <li key={index} className={styles.listItem}>
                <div className={styles.listIcon}>
                  <CheckIcon />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BasilIntegrity;

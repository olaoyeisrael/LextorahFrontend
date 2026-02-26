import React from "react";
import { dansolData } from "../../../data/dansolSchoolsData";
import styles from "./DansolIntegrity.module.css";

const CheckIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DansolIntegrity: React.FC = () => {
  const { integrity } = dansolData;

  // Parse bold text in items
  const renderItemText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index}>{part}</strong>;
      }
      return part;
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.leftSide}>
            <div className={styles.integrityCard}>
              <div className={styles.integrityIcon}>
                <img
                  src="/images/dansol/icons/integrity.png"
                  alt={`Integrity Icon`}
                  width={56}
                  height={56}
                />
              </div>
              <h3 className={styles.integrityTitle}>{integrity.title}</h3>
              <p className={styles.integritySubtitle}>{integrity.subtitle}</p>
            </div>
          </div>

          <div className={styles.rightSide}>
            <h2 className={styles.title}>{integrity.guidelinesTitle}</h2>
            <ul className={styles.list}>
              {integrity.items.map((item, index) => (
                <li key={index} className={styles.listItem}>
                  <div className={styles.listIcon}>
                    <CheckIcon />
                  </div>
                  <span>{renderItemText(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DansolIntegrity;

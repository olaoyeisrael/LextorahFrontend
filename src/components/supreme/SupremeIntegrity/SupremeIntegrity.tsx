import React from "react";
import { supremeData } from "../../../data/supremeSchoolsData";
import styles from "./SupremeIntegrity.module.css";

const SupremeIntegrity: React.FC = () => {
  const { integrity } = supremeData;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <img
                        src="/images/supreme-foundation/icons/responsible.png"
                alt={`Responsible Icon`}
                width={24}
                height={24}
              />
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>{integrity.title}</h2>

          <ul className={styles.list}>
            {integrity.items.map((item, index) => (
              <li key={index} className={styles.listItem}>
                <img
                              src="/images/supreme-foundation/icons/checkmark.png"
                      alt={`Checkmark Icon`}
                      width={16}
                      height={16}
                    />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        
      </div>
    </section>
  );
};

export default SupremeIntegrity;

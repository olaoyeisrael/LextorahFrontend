import { dataProtectionFeatures } from "../../../data/parentsData";
import styles from "./DataProtection.module.css";

export default function DataProtection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Data Protection & Privacy</h2>
        </div>

        <div className={styles.grid}>
          {dataProtectionFeatures.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardIcon}>
                <img
                  src={feature.icon}
                  alt="Exam Preparation Icon"
                  width={32}
                  height={32}
                                />
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

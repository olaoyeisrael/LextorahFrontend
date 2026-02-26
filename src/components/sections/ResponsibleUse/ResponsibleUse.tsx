import { responsibleUseFeatures } from "../../../data/parentsData";
import styles from "./ResponsibleUse.module.css";

export default function ResponsibleUse() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Responsible Use & Academic Integrity</h2>
          <p className={styles.subtitle}>
            We understand parents&apos; concerns around AI and learning. Lextorah AI is designed for responsible educational use.
          </p>
        </div>

        <div className={styles.grid}>
          {responsibleUseFeatures.map((feature, index) => (
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

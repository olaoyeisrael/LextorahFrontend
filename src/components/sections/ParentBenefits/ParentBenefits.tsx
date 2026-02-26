import { parentBenefits } from "../../../data/parentsData";
import styles from "./ParentBenefits.module.css";

export default function ParentBenefits() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>What This Means for Parents</h2>
          <p className={styles.subtitle}>
            Supporting your child&apos;s education with confidence and peace of mind
          </p>
        </div>

        <div className={styles.grid}>
          {parentBenefits.map((benefit, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardIcon}>
                <img
                  src={benefit.icon}
                  alt="Exam Preparation Icon"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className={styles.cardTitle}>{benefit.title}</h3>
              <p className={styles.cardDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

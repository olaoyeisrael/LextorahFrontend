import styles from "./FormalEducation.module.css";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FormalEducationProps {
  features: Feature[];
}

export default function FormalEducation({ features }: FormalEducationProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Designed for Formal Education</h2>
          <p className={styles.subtitle}>
            Lextorah AI is built for regulated educational environments.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
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

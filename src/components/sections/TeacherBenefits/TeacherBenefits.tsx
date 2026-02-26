import styles from "./TeacherBenefits.module.css";

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface TeacherBenefitsProps {
  benefits: Benefit[];
}

export default function TeacherBenefits({ benefits }: TeacherBenefitsProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>How Lextorah AI Supports You</h2>
          <p className={styles.subtitle}>
            Lextorah AI helps teachers and tutors work more effectively.
          </p>
        </div>

        <div className={styles.grid}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardIcon}>
                <img
                  src={benefit.icon}
                  alt="Academic Subjects Icon"
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

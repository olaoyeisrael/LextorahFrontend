import styles from "./GettingStarted.module.css";

interface Step {
  icon: string;
  title: string;
  description: string;
}

interface GettingStartedProps {
  steps: Step[];
}

export default function GettingStarted({ steps }: GettingStartedProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Getting Started & Support</h2>
        </div>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.stepItem}>
              <div className={styles.stepNumber}>
                <img
                  src={step.icon}
                  alt="Step Icon"
                  width={32}
                  height={32}
                />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.note}>
          <p>
            Lextorah AI empowers teachers and tutors to teach more effectively while supporting every
            learner with integrity and care.
          </p>
        </div>
      </div>
    </section>
  );
}

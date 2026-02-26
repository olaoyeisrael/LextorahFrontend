import styles from "./MeetMsLexiTeacher.module.css";

interface MeetMsLexiTeacherProps {
  features: string[];
}

export default function MeetMsLexiTeacher({ features }: MeetMsLexiTeacherProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Meet Ms Lexi® — Your AI Teaching Support Tutor</h2>
          <p className={styles.subtitle}>
            At the centre of the platform is Ms Lexi, an AI learning support tutor that assists teaching.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.avatarWrapper}>
            <img
              src="/images/Ms-Lexi-AI-Tutor.png"
              alt="Ms. Lexi - AI Teaching Support Tutor"
              width={280}
              height={320}
              className={styles.avatar}
            />
          </div>

          <div className={styles.features}>
            <h3 className={styles.featuresTitle}>How Ms Lexi Assists Teaching</h3>
            <ul className={styles.featuresList}>
              {features.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  <span className={styles.checkIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className={styles.importantNote}>
              <div>
                <strong>Important:</strong> Ms Lexi supports learning alongside teachers. She does not replace classroom teaching — she provides extra help when students need it.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

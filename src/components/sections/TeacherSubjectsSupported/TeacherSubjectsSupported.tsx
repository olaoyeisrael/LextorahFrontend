import { languagesSupported } from "../../../data/parentsData";
import styles from "./TeacherSubjectsSupported.module.css";

interface TeacherSubjectsSupportedProps {
  exams: string[];
}

export default function TeacherSubjectsSupported({ exams }: TeacherSubjectsSupportedProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Subjects, Languages & Exam Support</h2>
          <p className={styles.subtitle}>
            Comprehensive coverage across academic areas
          </p>
        </div>

        <div className={styles.grid}>
          {/* Academic Subjects */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <img
                src="/icons/book.png"
                alt="Academic Subjects Icon"
                width={32}
                height={32}
              />
            </div>
            <h3 className={styles.cardTitle}>Academic Subjects</h3>
            <p className={styles.cardListDescription}>
              Curriculum-aligned broad and secondary subjects
            </p>
          </div>

          {/* Language Learning Support */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <img
                src="/icons/language.png"
                alt="Language Learning Icon"
                width={32}
                height={32}
              />
            </div>
            <h3 className={styles.cardTitle}>Language Learning Support</h3>
            <ul className={styles.languageList}>
              {languagesSupported.map((lang, index) => (
                <li key={index} className={styles.languageItem}>
                  <img
                    src="/icons/checkmark.png"
                    alt="Checkmark Icon"
                    width={14}
                    height={14}
                  />
                  <span>{lang.label}</span>
                </li>
              ))}
            </ul>
            <p className={styles.cardDescription}>
              Curriculum-aligned broad and secondary subjects
            </p>
          </div>

          {/* Exam & Assessment Support */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <img
                src="/icons/document.png"
                alt="Exam Preparation Icon"
                width={32}
                height={32}
              />
            </div>
            <h3 className={styles.cardTitle}>Exam & Assessment Support</h3>
            <div className={styles.examGrid}>
              {exams.map((exam, index) => (
                <li key={index} className={styles.examBadge}>
                  <img
                    src="/icons/checkmark.png"
                    alt="Checkmark Icon"
                    width={14}
                    height={14}
                  />
                  <span>{exam}</span>
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

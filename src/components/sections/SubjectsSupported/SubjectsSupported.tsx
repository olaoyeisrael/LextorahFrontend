import { languagesSupported, examsSupported } from "../../../data/parentsData";
import styles from "./SubjectsSupported.module.css";

export default function SubjectsSupported() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Subjects, Languages & Exams Supported</h2>
          <p className={styles.subtitle}>
            Lextorah AI supports learning across a comprehensive range of academic areas
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
            <p className={styles.cardDescription}>
              Core school and secondary subjects aligned with curriculum standards
            </p>
          </div>

          {/* Language Learning */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <img
                src="/icons/language.png"
                alt="Language Learning Icon"
                width={32}
                height={32}
              />
            </div>
            <h3 className={styles.cardTitle}>Language Learning</h3>
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
          </div>

          {/* Exam Preparation */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <img
                src="/icons/document.png"
                alt="Exam Preparation Icon"
                width={32}
                height={32}
              />
            </div>
            <h3 className={styles.cardTitle}>Exam Preparation</h3>
            <div className={styles.examList}>
              {examsSupported.map((exam, index) => (
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

import styles from "./LearnerSubjectsSupported.module.css";

interface Subject {
  name: string;
  icon: string;
}

interface Language {
  name: string;
  primary?: boolean;
}

interface LearnerSubjectsSupportedProps {
  subjects: Subject[];
  languages: Language[];
  categories: Subject[];
}

export default function LearnerSubjectsSupported({
  subjects,
  languages,
  categories,
}: LearnerSubjectsSupportedProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Subjects, Languages & Exams Supported</h2>
          <p className={styles.subtitle}>
            Comprehensive coverage across academic subjects, language learning, and exam preparation.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Academic Subjects */}
          <div className={styles.card}>
            <div className={styles.featureIcon}>
              <img
                src="/icons/academic.png"
                alt="Book Icon"
                width={32}
                height={32}
                />
            </div>
            <h3 className={styles.cardTitle}>Academic Subjects</h3>
            <p className={styles.cardSubtitle}>
              Subjects aligned with junior and secondary education curriculum
            </p>
            <div className={styles.subjectGrid}>
              {subjects.slice(0, 5).map((subject, index) => (
                <div key={index} className={styles.subjectItem}>
                  <span className={styles.subjectName}>{subject.name}</span>
                </div>
              ))}
              {subjects.slice(5).map((subject, index) => (
                <div key={index + 5} className={styles.subjectItem}>
                  <span className={styles.subjectName}>{subject.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Language Learning */}
          <div className={styles.card}>
            <div className={styles.featureIcon}>
              <img
                src="/icons/globe.png"
                alt="Book Icon"
                width={32}
                height={32}
                />
            </div>
            <h3 className={styles.cardTitle}>Language Learning</h3>
            <p className={styles.cardSubtitle}>
              Build fluency in major global languages with conversation practice
            </p>
            <div className={styles.languageGrid}>
              {languages.map((lang, index) => (
                <div
                  key={index}
                  className={styles.languageItem}
                >
                  <span className={styles.langName}>{lang.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subject Categories Icons */}
        <div className={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <div key={index} className={styles.categoryItem}>
              <div className={styles.categoryIcon}>
                <img
                src={category.icon}
                alt="Icon"
                width={32}
                height={32}
              />
              </div>
              <span className={styles.categoryName}>{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

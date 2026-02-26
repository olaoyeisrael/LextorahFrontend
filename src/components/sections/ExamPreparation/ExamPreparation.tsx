import styles from "./ExamPreparation.module.css";

interface ExamCategory {
  title: string;
  exams: string[];
  icon?: string;
}

interface ExamFeature {
  featureNo: string;
  title: string;
  description: string;
}

interface ExamPreparationProps {
  categories: ExamCategory[];
  features: ExamFeature[];
}

export default function ExamPreparation({ categories, features }: ExamPreparationProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Exam Preparation Support</h2>
          <p className={styles.subtitle}>
            Prepare confidently for major examinations with targeted support and practice
          </p>
        </div>

        {/* Exam Categories */}
        <div className={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <div key={index} className={styles.categoryCard}>
              <div className={styles.categoryIcon}>
                {category.icon ? (
                  <img
                    src={category.icon}
                    alt={`${category.title} Icon`}
                    width={32}
                    height={32}
                  />
                ) : null}
            </div>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <ul className={styles.examList}>
                {category.exams.map((exam, i) => (
                  <li key={i} className={styles.examItem}>
                    {exam}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* How Ms Lexi Helps */}
        <div className={styles.featuresSection}>
          <h3 className={styles.featuresTitle}>How Ms Lexi® Helps with Exam Preparation</h3>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <span>{feature.featureNo}</span>
                </div>
                <div className={styles.featureContent}>
                  <h4 className={styles.featureTitle}>{feature.title}</h4>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

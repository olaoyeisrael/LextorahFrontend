import styles from "./LearningTech.module.css";

interface LearningTechProps {
  title: string;
  description: string;
  subtitle: string;
  features: string[];
  note: string;
  image: string;
}

export default function LearningTech({
  title,
  description,
  subtitle,
  features,
  note,
  image,
}: LearningTechProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <p className={styles.subtitle}>{subtitle}</p>
          <ul className={styles.features}>
            {features.map((feature, index) => (
              <li key={index} className={styles.featureItem}>
                <span className={styles.checkIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <p className={styles.note}>{note}</p>
        </div>
        <div className={styles.learningTechimageWrapper}>
          <img
            src={image}
            alt="Learning Technologies"
            width={400}
            height={600}
            className={styles.learningImage}
          />
        </div>
      </div>
    </section>
  );
}

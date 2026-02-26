import styles from "./ChrislandLeadership.module.css";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface ChrislandLeadershipProps {
  badge: string;
  title: string;
  description: string;
  features: Feature[];
}

export default function ChrislandLeadership({
  badge,
  title,
  description,
  features,
}: ChrislandLeadershipProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>{badge}</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
                <span className={styles.icon}>
                  <img
                    src={feature.icon}
                    alt="Checkmark Icon"
                    width={24}
                    height={24}
                  />
                </span>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

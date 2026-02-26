import styles from "./GrangeLeadership.module.css";

interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface GrangeLeadershipProps {
  title: string;
  description: string;
  features: Feature[];
}

export default function GrangeLeadership({
  title,
  description,
  features,
}: GrangeLeadershipProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <img
              src="/images/grange/icons/leadership.png"
              alt={`Leadership Icon`}
              width={20}
              height={20}
            />
          </div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${styles.featureCard} ${styles[feature.color]}`}
            >
              <div className={styles.iconWrapper}>
                <img
                  src={feature.icon}
                  alt={`${feature.title} Icon`}
                  width={20}
                  height={20}
                />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

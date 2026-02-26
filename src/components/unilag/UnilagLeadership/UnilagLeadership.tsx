import styles from "./UnilagLeadership.module.css";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface UnilagLeadershipProps {
  title: string;
  description: string;
  features: Feature[];
}

export default function UnilagLeadership({
  title,
  description,
  features,
}: UnilagLeadershipProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <img
              src="/images/unilag/icons/leadership.png"
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
              className={`${styles.featureCard}`}
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

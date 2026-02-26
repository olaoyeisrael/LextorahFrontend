import styles from "./LagoonPlatformUsage.module.css";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface LagoonPlatformUsageProps {
  badge: string;
  title: string;
  features: Feature[];
}

export default function LagoonPlatformUsage({
  badge,
  title,
  features,
}: LagoonPlatformUsageProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>
            <img
                        src="/images/lagoon/icons/platform.png"
                alt={`Platform Icon`}
                width={20}
                height={20}
              />
              {badge}
            </span>
          <h2 className={styles.title}>{title}</h2>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={`${styles.iconWrapper}`}>
                <img
                            src={feature.icon}
                    alt={`${feature.title} Icon`}
                    width={16}
                    height={16}
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

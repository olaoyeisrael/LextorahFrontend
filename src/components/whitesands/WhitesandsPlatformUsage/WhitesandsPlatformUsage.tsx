import styles from "./WhitesandsPlatformUsage.module.css";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface WhitesandsPlatformUsageProps {
  title: string;
  subtitle: string;
  features: Feature[];
}

export default function WhitesandsPlatformUsage({
  title,
  subtitle,
  features,
}: WhitesandsPlatformUsageProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
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

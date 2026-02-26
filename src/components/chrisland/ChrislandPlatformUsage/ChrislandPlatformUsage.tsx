import styles from "./ChrislandPlatformUsage.module.css";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface ChrislandPlatformUsageProps {
  title: string;
  features: Feature[];
}

export default function ChrislandPlatformUsage({
  title,
  features,
}: ChrislandPlatformUsageProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <img
                    src={feature.icon}
                    alt="Checkmark Icon"
                    width={24}
                    height={24}
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

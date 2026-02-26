import styles from "./WhitesandsLeadership.module.css";

interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface WhitesandsLeadershipProps {
  title: string;
  description: string;
  features: Feature[];
}

export default function WhitesandsLeadership({
  title,
  description,
  features,
}: WhitesandsLeadershipProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <img
              src="/images/whitesands/icons/leadership.png"
              alt={`$Leadership Icon`}
              width={24}
              height={24}
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
              <span className={styles.iconWrapper}>
                <img
                  src={feature.icon}
                  alt={`${feature.title} Icon`}
                  width={20}
                  height={20}
                />
                </span>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

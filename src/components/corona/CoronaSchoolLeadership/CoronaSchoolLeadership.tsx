import styles from "./CoronaSchoolLeadership.module.css";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface CoronaSchoolLeadershipProps {
  title: string;
  description: string;
  features: Feature[];
}

function FeatureIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    performance: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.5 18.49L9.5 12.48L13.5 16.48L22 6.92L20.59 5.51L13.5 13.48L9.5 9.48L2 16.99L3.5 18.49Z" fill="#DC2626"/>
      </svg>
    ),
    warning: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill="#DC2626"/>
      </svg>
    ),
    trends: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="#DC2626"/>
      </svg>
    ),
    reviews: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" fill="#DC2626"/>
      </svg>
    ),
  };

  return <span className={styles.featureIcon}>{icons[icon] || icons.performance}</span>;
}

export default function CoronaSchoolLeadership({
  title,
  description,
  features,
}: CoronaSchoolLeadershipProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <span className={styles.icon}>
                <img
                    src="/images/corona/icons/school-leadership.png"
                    alt="Leadership Icon"
                    width={24}
                    height={24}
                />
            </span>
            <h2 className={styles.title}>{title}</h2>
          </div>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
                <img
                    src={feature.icon} 
                    alt={`${feature.title} Icon`}
                    width={26}
                    height={26}
                />
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

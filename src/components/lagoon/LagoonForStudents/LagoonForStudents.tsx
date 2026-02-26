import styles from "./LagoonForStudents.module.css";

interface Benefit {
  icon: string;
  title: string;
}

interface LagoonForStudentsProps {
  badge: string;
  title: string;
  subtitle: string;
  benefits: Benefit[];
  image: string;
}

export default function LagoonForStudents({
  badge,
  title,
  subtitle,
  benefits,
  image,
}: LagoonForStudentsProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img
            src={image}
            alt="Student learning"
            width={500}
            height={400}
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <span className={styles.badge}>
            <img
                        src="/images/lagoon/icons/student.png"
                alt={`Student Icon`}
                width={20}
                height={20}
              />
              {badge}
            </span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>

          <ul className={styles.benefitsList}>
            {benefits.map((benefit, index) => (
              <li key={index} className={styles.benefitItem}>
                <div className={styles.iconWrapper}>
                  <img
                            src={benefit.icon}
                    alt={`${benefit.title} Icon`}
                    width={16}
                    height={16}
                  />
                </div>
                <span className={styles.benefitTitle}>{benefit.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

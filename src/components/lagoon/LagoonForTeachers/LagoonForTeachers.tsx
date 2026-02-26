import styles from "./LagoonForTeachers.module.css";

interface Benefit {
  icon: string;
  title: string;
}

interface LagoonForTeachersProps {
  badge: string;
  title: string;
  subtitle: string;
  benefits: Benefit[];
  image: string;
}

export default function LagoonForTeachers({
  badge,
  title,
  subtitle,
  benefits,
  image,
}: LagoonForTeachersProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>
            <img
                        src="/images/lagoon/icons/teacher.png"
                alt={`Teacher Icon`}
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

        <div className={styles.imageWrapper}>
          <img
            src={image}
            alt="Teacher teaching"
            width={500}
            height={400}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
